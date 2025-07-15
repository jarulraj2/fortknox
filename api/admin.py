from django.contrib import admin
from .models import Menu, SubMenu, Page, Section, SectionCard

class SubMenuInline(admin.TabularInline):
    model = SubMenu
    extra = 1

@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    prepopulated_fields = {"slug": ("title",)}
    inlines = [SubMenuInline]
    search_fields = ('title', 'slug')


class SectionInline(admin.StackedInline):  # Stacked for better space
    model = Section
    extra = 1

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'published', 'created_at')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ('title', 'slug')
    list_filter = ('published',)
    inlines = [SectionInline]


class SectionCardInline(admin.StackedInline):  # ✅ Changed to StackedInline
    model = SectionCard
    extra = 1
    fieldsets = (
        (None, {
           'fields': ('title', 'sub_title', 'description', 'image', 'button_text', 'button_link', 'css_class', 'html_id', 'order')
        }),
    )

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['page', 'section_type', 'title', 'order']
    list_editable = ['order']
    search_fields = ['title', 'section_type']
    inlines = [SectionCardInline]
