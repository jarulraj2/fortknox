from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100, default='', null=False, blank=False)
    content = models.TextField(default='', null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=True)

    def __str__(self):
        return self.title


class Menu(models.Model):
    title = models.CharField(max_length=100, default='', null=False, blank=False)
    slug = models.SlugField(unique=True, default='', null=False, blank=False)

    def __str__(self):
        return self.title


class SubMenu(models.Model):
    menu = models.ForeignKey(Menu, related_name='submenus', on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=100, default='', null=False, blank=False)
    url = models.CharField(max_length=200, default='', null=False, blank=False)

    def __str__(self):
        return f"{self.menu.title} → {self.name}"


class Page(models.Model):
    title = models.CharField(max_length=200, default='', null=False, blank=False)
    slug = models.SlugField(unique=True, default='', null=False, blank=False)
    published = models.BooleanField(default=False, null=False, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=True)

    def __str__(self):
        return self.title


class Section(models.Model):
    SECTION_TYPES = [
        ('hero', 'Hero'),
        ('features', 'Features'),
        ('custom', 'Custom'),
    ]

    page = models.ForeignKey(Page, related_name='sections', on_delete=models.CASCADE)
    section_type = models.CharField(max_length=50, choices=SECTION_TYPES, default='custom')
    title = models.CharField(max_length=200, blank=True, default='')
    content = models.TextField(blank=True, default='')  # Optional text content
    image = models.ImageField(upload_to='section_images/', blank=True, null=True)
    button_text = models.CharField(max_length=100, blank=True, default='')
    custom_css = models.TextField(blank=True, null=True)
    grapesjs_html = models.TextField(blank=True, null=True)  # HTML saved from GrapesJS
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.page.title} - {self.section_type}"

