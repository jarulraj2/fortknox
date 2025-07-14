from rest_framework import serializers
from .models import Post, Menu, SubMenu, Page, Section

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class SubMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubMenu
        fields = ['id', 'name', 'url']

class MenuSerializer(serializers.ModelSerializer):
    submenus = SubMenuSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = ['id', 'title', 'slug', 'submenus']

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'section_type', 'title', 'content', 'order']