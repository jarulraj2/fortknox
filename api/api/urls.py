from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, MenuViewSet, PageViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'menus', MenuViewSet)
router.register(r'pages', PageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]