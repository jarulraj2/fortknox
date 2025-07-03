from django.db import models
from django.utils.text import slugify
import os
import cssutils
from django import forms
from django.conf import settings


class WebSection(models.Model):
    SECTION_TYPE_CHOICES = [
        ('header', 'Header'),
        ('footer', 'Footer'),
        ('hero', 'Hero Section'),
        ('features', 'Features'),
        ('pricing', 'Pricing'),
        ('testimonial', 'Testimonial'),
        ('cta', 'Call to Action'),
        ('content', 'Content Block'),
        ('custom', 'Custom'),
    ]

    name = models.CharField(
        max_length=255,
        default="Untitled Section",
        help_text="Name to identify this section (e.g., Hero Banner)"
    )
    source_url = models.URLField(
        default="https://example.com",
        help_text="Original URL where this section was extracted from"
    )
    selector = models.CharField(
        max_length=255,
        default="body",
        help_text="CSS selector used to extract this section"
    )
    html_content = models.TextField(
        default="<div>No content available</div>",
        help_text="Cloned HTML content of the section"
    )
    section_type = models.CharField(
        max_length=20,
        choices=SECTION_TYPE_CHOICES,
        default='custom',
        help_text="Type of this section (e.g., header, footer)"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.section_type})"



class CustomPage(models.Model):
    title = models.CharField(
        max_length=255,
        default="Untitled Page",
        help_text="Title of the custom page (e.g., Home, About Us)"
    )
    slug = models.SlugField(
        unique=True,
        help_text="Used in URL, e.g., /pages/about/",
        default=""
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)



class PageSection(models.Model):
    page = models.ForeignKey(CustomPage, on_delete=models.CASCADE)
    section = models.ForeignKey(WebSection, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.page.title} - {self.section.name} (Order {self.order})"

class EditableCSS(models.Model):
    name = models.CharField(max_length=100, default='global')
    file_path = models.CharField(max_length=255, default='static/css/global.css')
    version = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.name
    

class EditableJS(models.Model):
    name = models.CharField(max_length=100, default='global')
    file_path = models.CharField(max_length=255, default='static/js/global.js')

    def __str__(self):
        return self.name
    
class EditableJSHistory(models.Model):
    editable_js = models.ForeignKey('EditableJS', on_delete=models.CASCADE)
    edited_at = models.DateTimeField(auto_now_add=True)
    previous_content = models.TextField()
    new_content = models.TextField()

    def __str__(self):
        return f"Edit on {self.edited_at.strftime('%Y-%m-%d %H:%M:%S')}"