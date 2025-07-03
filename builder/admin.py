import os
from django.contrib import admin, messages
from django.urls import path, reverse
from django.shortcuts import redirect
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.conf import settings
from django.template.response import TemplateResponse
from django.template.loader import render_to_string
from bs4 import BeautifulSoup

from .models import WebSection, CustomPage, PageSection, EditableCSS
from .utils.web_cloner import fetch_section_snapshot


from .forms import EditableCSSForm
from django import forms
from cssbeautifier import beautify as css_beautify 
from csscompressor import compress 
from jsbeautifier import beautify 

from .models import EditableJS
from .forms import EditableJSForm
from .models import EditableJSHistory
from django.http import HttpResponseRedirect
import subprocess
import sys

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
            path('fetch-section/<int:section_id>/', self.admin_site.admin_view(self.fetch_section), name='fetch_section_html'),
            path('edit-section/<int:section_id>/', self.admin_site.admin_view(self.edit_section_view), name='edit_section_html'),
        ]
        return custom_urls + urls

    def fetch_button(self, obj):
        return format_html('<a class="button" href="{}">📥 Fetch HTML</a>', reverse('admin:fetch_section_html', args=[obj.pk]))
    fetch_button.short_description = "Fetch HTML"

    def editor_button(self, obj):
        return format_html('<a class="button" href="{}" target="_blank" style="background:#198754; color:white; padding:4px 8px; border-radius:4px;">🛠 Edit Section</a>', reverse('admin:edit_section_html', args=[obj.pk]))
    editor_button.short_description = "GrapesJS Editor"

    # def fetch_section(self, request, section_id):
    #     section = WebSection.objects.get(pk=section_id)
    #     html = fetch_section_snapshot(section)
    #     if html:
    #         section.html_content = html
    #         section.save()
    #         self.message_user(request, f"✅ HTML fetched for: {section.name}")
    #     else:
    #         self.message_user(request, f"❌ Failed to fetch HTML for: {section.name}", level='error')
    #     return redirect("admin:builder_websection_change", section_id)
    
    def fetch_section(self, request, section_id):
        import subprocess
        import os

        script_path = os.path.join(settings.BASE_DIR, "fetch_snapshot_script.py")
        #python_path = os.path.join(settings.BASE_DIR, "venv", "bin", "python")  # adjust if needed
        python_path = os.path.join(settings.BASE_DIR, "venv", "bin", "python") 

        # ✅ Add Playwright environment fix
        env = {
            **os.environ,
            "DJANGO_SETTINGS_MODULE": "cloneproject.settings",
            "PLAYWRIGHT_BROWSERS_PATH": "0"
        }

        try:
            result = subprocess.run(
                [python_path, script_path, str(section_id)],
                capture_output=True,
                text=True,
                encoding="utf-8",
                timeout=180,
                cwd=settings.BASE_DIR,
                env=env  # ✅ use updated env
            )

            stdout = result.stdout.strip()
            stderr = result.stderr.strip()

            if result.returncode == 0:
                self.message_user(request, f"✅ HTML fetched successfully.\n{stdout}")
            else:
                msg = f"❌ Script failed with return code {result.returncode}\n🔹 STDOUT:\n{stdout}\n\n🔻 STDERR:\n{stderr}"
                self.message_user(request, msg, level='error')

        except subprocess.TimeoutExpired:
            self.message_user(request, "❌ Script timed out.", level='error')

        except Exception as e:
            self.message_user(request, f"❌ Exception: {e}", level='error')

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

                full_html = render_to_string("builder/preview_wrapper.html", {"inner_html": new_html})
                with open(os.path.join(section_dir, 'preview.html'), "w", encoding="utf-8") as f:
                    f.write(full_html)

                self.message_user(request, "✅ Section saved with JS wrapper")
                return redirect("admin:builder_websection_change", section_id)

        return TemplateResponse(request, "admin/grapes_editor.html", {
            "section": section,
            "section_inner_html": section.html_content or "",
            "form_action": request.get_full_path(),
        })

    def preview(self, obj):
        preview_path = f"/static/section_assets/{obj.pk}/preview.html"
        full_file_path = os.path.join(settings.BASE_DIR, preview_path.strip("/"))

        if os.path.exists(full_file_path):
            return mark_safe(f"""
                <div style="margin-bottom: 10px;">
                    <a href='{preview_path}' target="_blank" style="padding: 6px 12px; background: #0d6efd; color: white; border-radius: 5px; text-decoration: none;">
                        🔍 View Fullscreen
                    </a>
                </div>
                <iframe src='{preview_path}' style="width:100%;height:400px;border:1px solid #ccc;"></iframe>
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
    list_display = ('title', 'slug', 'created_at', 'preview_link', 'edit_button')
    prepopulated_fields = {"slug": ("title",)}
    inlines = [PageSectionInline]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('edit-page/<int:page_id>/', self.admin_site.admin_view(self.edit_page_view), name='edit_full_page')
        ]
        return custom_urls + urls

    def preview_link(self, obj):
        url = reverse('render_custom_page', args=[obj.slug])
        return format_html('<a href="{}" target="_blank" style="padding:4px 8px; background:#198754; color:white; border-radius:4px; text-decoration:none;">👁️ View Page</a>', url)
    preview_link.short_description = "Live Preview"

    def edit_button(self, obj):
        url = reverse('admin:edit_full_page', args=[obj.pk])
        return format_html('<a href="{}" target="_blank" style="padding:4px 8px; background:#0d6efd; color:white; border-radius:4px;">✏️ Edit Page</a>', url)
    edit_button.short_description = "Full Page Editor"

    def edit_page_view(self, request, page_id):
        page = CustomPage.objects.get(pk=page_id)
        all_sections = page.pagesection_set.select_related('section').order_by('order')

        full_html = ""
        for ps in all_sections:
            preview_file = os.path.join(settings.BASE_DIR, 'static', 'section_assets', str(ps.section.id), 'preview.html')
            section_html = ""
            if os.path.exists(preview_file):
                with open(preview_file, "r", encoding="utf-8") as f:
                    soup = BeautifulSoup(f.read(), 'html.parser')
                    body = soup.body or soup
                    section_html = ''.join(str(child) for child in body.contents)

            full_html += f'''
            <div id="section-{ps.section.id}" data-type="skylink-block" style="border: 2px dashed #ccc; padding: 20px; margin: 30px 0; background: #fff;">
                <div style="margin-bottom: 10px; font-weight: bold;">🧩 Section: {ps.section.name}</div>
                {section_html}
            </div>
            '''

        if request.method == "POST":
            combined_html = request.POST.get("html_content", "")
            soup = BeautifulSoup(combined_html, 'html.parser')
            for ps in all_sections:
                element = soup.find(id=f"section-{ps.section.id}")
                if element:
                    ps.section.html_content = str(element)
                    ps.section.save()

                    section_dir = os.path.join(settings.BASE_DIR, 'static', 'section_assets', str(ps.section.id))
                    os.makedirs(section_dir, exist_ok=True)

                    full_html_output = render_to_string("builder/preview_wrapper.html", {"inner_html": str(element)})
                    with open(os.path.join(section_dir, 'preview.html'), "w", encoding="utf-8") as f:
                        f.write(full_html_output)

            self.message_user(request, "✅ All sections updated successfully!")
            return redirect("admin:builder_custompage_change", page_id)

        return TemplateResponse(request, "admin/grapes_editor.html", {
            "section": page,
            "section_inner_html": full_html,
            "form_action": request.get_full_path(),
        })
class EditableCSSAdmin(admin.ModelAdmin):
    form = EditableCSSForm

    class Media:
        js = [
            '/static/js/css_minify_button.js',      # your existing script
            '/static/js/css_cache_buster.js',       # 👈 added script for cache busting
        ]

    def response_change(self, request, obj):
        messages.success(request, "✅ CSS updated successfully and applied.")
        # Refresh the same admin page after saving
        return HttpResponseRedirect(
            reverse('admin:builder_editablecss_change', args=(obj.pk,))
        )

admin.site.register(EditableCSS, EditableCSSAdmin)

@admin.register(EditableJS)
class EditableJSAdmin(admin.ModelAdmin):
    form = EditableJSForm

    class Media:
        js = ('js/minify_button.js',) 

class EditableJSHistoryAdmin(admin.ModelAdmin):
    list_display = ['editable_js', 'edited_at']
    readonly_fields = ['editable_js', 'edited_at', 'previous_content', 'new_content']

admin.site.register(EditableJSHistory, EditableJSHistoryAdmin)
