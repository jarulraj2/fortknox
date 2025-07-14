from django.contrib import admin
from .models import Menu, SubMenu, Page, Section

class SubMenuInline(admin.TabularInline):  # or StackedInline
    model = SubMenu
    extra = 1  # Add how many blank rows to show

class MenuAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    prepopulated_fields = {"slug": ("title",)}
    inlines = [SubMenuInline]

admin.site.register(Menu, MenuAdmin)

class SectionInline(admin.StackedInline):
    model = Section
    extra = 1

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'published', 'created_at')
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ('title', 'slug')
    list_filter = ('published',)
    inlines = [SectionInline]

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('page', 'section_type', 'order')