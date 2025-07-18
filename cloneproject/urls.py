"""
URL configuration for cloneproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
import os
urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/builder/', include('builder.urls')),
    path('', include('builder.urls')),
    path('builder/', include('builder.urls')),
    path('cloudweb/', include('cloudweb.urls')),
    path('api/', include('api.urls')),
] + static(settings.STATIC_URL, document_root=os.path.join(settings.BASE_DIR, 'static'))

if settings.DEBUG:
    urlpatterns += static('/section_assets/', document_root=os.path.join(settings.BASE_DIR, 'static', 'section_assets'))
    