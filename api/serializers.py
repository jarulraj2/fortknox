from rest_framework import serializers
from .models import Post, Menu, SubMenu, Page, Section, SectionCard


# -------------------------------
# Post Serializer
# -------------------------------
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


# -------------------------------
# Menu & SubMenu Serializer
# -------------------------------
class SubMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubMenu
        fields = ['id', 'name', 'url']

class MenuSerializer(serializers.ModelSerializer):
    submenus = SubMenuSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = ['id', 'title', 'slug', 'submenus']


# -------------------------------
# SectionCard Serializer
# -------------------------------
class SectionCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionCard
        fields = '__all__'


# -------------------------------
# Section Serializer (Used inside Page - Nested Cards)
# -------------------------------
class SectionSerializer(serializers.ModelSerializer):
    cards = SectionCardSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = '__all__'


# -------------------------------
# Page Serializer (With Nested Sections + Cards)
# -------------------------------
class PageSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = '__all__'


# -------------------------------
# Simple Page Info Serializer (Used inside Section API)
# -------------------------------
class SimplePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['id', 'title', 'slug']


# -------------------------------
# Section With Page Info (For Section API)
# -------------------------------
class SectionWithPageSerializer(serializers.ModelSerializer):
    page = SimplePageSerializer(read_only=True)
    cards = SectionCardSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = '__all__'
