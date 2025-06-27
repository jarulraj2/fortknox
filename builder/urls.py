from django.urls import path
from .views import render_custom_page
from . import views
urlpatterns = [
    path('pages/<slug:slug>/', render_custom_page, name='render_custom_page'),
    path('upload-to-static/<int:section_id>/', views.upload_to_static, name='upload_static'),
    path('list-assets/<int:section_id>/', views.list_section_images, name='list_section_images'),
   path('websection/edit-section/<int:section_id>/', views.edit_section, name='edit_section'),


]
