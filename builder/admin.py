import os
from django.contrib import admin
from django.urls import path, reverse
from django.shortcuts import redirect
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.conf import settings
from django.template.response import TemplateResponse

from .models import WebSection, CustomPage, PageSection
from .utils.web_cloner import fetch_section_snapshot
from django.template.loader import render_to_string

@admin.register(WebSection)
class WebSectionAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'section_type', 'source_url', 'selector',
        'fetch_button', 'editor_button', 'created_at'
    )
    readonly_fields = ('preview',)
    actions = ['fetch_html_action']
    search_fields = ['name']

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                'fetch-section/<int:section_id>/',
                self.admin_site.admin_view(self.fetch_section),
                name='fetch_section_html'
            ),
            path(
                'edit-section/<int:section_id>/',
                self.admin_site.admin_view(self.edit_section_view),
                name='edit_section_html'
            ),
        ]
        return custom_urls + urls

    def fetch_button(self, obj):
        return format_html(
            '<a class="button" href="{}">Fetch HTML</a>',
            reverse('admin:fetch_section_html', args=[obj.pk])
        )
    fetch_button.short_description = "Fetch HTML"

    def editor_button(self, obj):
        return format_html(
            '<a class="button" href="{}" target="_blank" '
            'style="background:#198754; color:white; padding:4px 8px; border-radius:4px;">🛠 Edit Section</a>',
            reverse('admin:edit_section_html', args=[obj.pk])
        )
    editor_button.short_description = "GrapesJS Editor"

    def fetch_section(self, request, section_id):
        section = WebSection.objects.get(pk=section_id)
        html = fetch_section_snapshot(section)
        if html:
            section.html_content = html
            section.save()
            self.message_user(request, f"✅ HTML fetched for: {section.name}")
        else:
            self.message_user(request, f"❌ Failed to fetch HTML for: {section.name}", level='error')
        return redirect("admin:builder_websection_change", section_id)

    def edit_section_view(self, request, section_id):
        section = WebSection.objects.get(pk=section_id)

        if request.method == "POST":
            new_html = request.POST.get("html_content", "")
            if new_html:
                section.html_content = new_html
                section.save()

                section_dir = os.path.join(settings.BASE_DIR, 'static', 'section_assets', str(section_id))
                os.makedirs(section_dir, exist_ok=True)

                # ✅ Wrap it with full HTML including JS/CSS
                full_html = render_to_string("builder/preview_wrapper.html", {
                    "inner_html": new_html,
                })

                with open(os.path.join(section_dir, 'preview.html'), "w", encoding="utf-8") as f:
                    f.write(full_html)

                self.message_user(request, "✅ Section saved with JS wrapper")
                return redirect("admin:builder_websection_change", section_id)

        html_content = section.html_content or ""
        return TemplateResponse(request, "admin/grapes_editor.html", {
            "section": section,
            "section_inner_html": html_content,
            "form_action": request.get_full_path(),
        })

    def preview(self, obj):
        preview_path = f"/static/section_assets/{obj.pk}/preview.html"
        full_file_path = os.path.join(settings.BASE_DIR, preview_path.strip("/"))

        if os.path.exists(full_file_path):
            return mark_safe(f"""
                <div style="margin-bottom: 10px;">
                    <a href='{preview_path}' target="_blank"
                    style="padding: 6px 12px; background: #0d6efd; color: white; border-radius: 5px; text-decoration: none;">
                        🔍 View Fullscreen
                    </a>
                </div>

                <style>
                    .resizable-iframe {{
                        transition: height 0.4s ease;
                        width: 100%;
                        border: none;
                        display: block;
                        overflow: hidden;
                    }}
                </style>

                <div style="border: 1px solid #ccc; border-radius: 12px; margin: 20px auto;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; max-width: 430px; overflow: hidden;">
                    <iframe src='{preview_path}'
                            class="resizable-iframe"
                            onload="autoResizeIframe(this)"
                            sandbox="allow-same-origin allow-scripts allow-forms">
                    </iframe>
                </div>

                <script>
                    function autoResizeIframe(iframe) {{
                        let lastHeight = 0;
                        function resize() {{
                            try {{
                                const doc = iframe.contentDocument || iframe.contentWindow.document;
                                if (!doc) return;
                                const newHeight = doc.body.scrollHeight;
                                if (newHeight !== lastHeight) {{
                                    iframe.style.height = newHeight + 'px';
                                    lastHeight = newHeight;
                                }}
                            }} catch (e) {{
                                console.warn('⚠️ Resize blocked (cross-origin?):', e);
                            }}
                        }}
                        resize();
                        setInterval(resize, 800); // Re-check every 0.8s
                    }}
                </script>
            """)
        return "(No Preview Available)"



    def fetch_html_action(self, request, queryset):
        for section in queryset:
            try:
                html = fetch_section_snapshot(section)
                if html:
                    section.html_content = html
                    section.save()
                    self.message_user(request, f"✅ Fetched: {section.name}")
                else:
                    self.message_user(request, f"❌ Failed: {section.name}", level='error')
            except Exception as e:
                self.message_user(request, f"❌ Error for {section.name}: {e}", level='error')
    fetch_html_action.short_description = "Fetch HTML (Section Snapshot)"


class PageSectionInline(admin.TabularInline):
    model = PageSection
    extra = 1
    autocomplete_fields = ['section']
    ordering = ['order']


@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at', 'preview_link')
    prepopulated_fields = {"slug": ("title",)}
    inlines = [PageSectionInline]

    def preview_link(self, obj):
        url = reverse('render_custom_page', args=[obj.slug])
        return format_html(
            '<a href="{}" target="_blank" '
            'style="padding:4px 8px; background:#198754; color:white; border-radius:4px; text-decoration:none;">👁️ View Page</a>',
            url
        )
    preview_link.short_description = "Live Preview"
