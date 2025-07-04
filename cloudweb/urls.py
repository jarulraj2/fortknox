# cloudweb/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='cloudweb_home'),
    path('/product', views.product, name='product'),
]
