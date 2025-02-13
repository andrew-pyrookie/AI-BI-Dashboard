from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsersViewSet, ApiIntegrationsViewSet

router = DefaultRouter()
router.register(r'users', UsersViewSet, basename='users')
router.register(r'api-integrations', ApiIntegrationsViewSet, basename='api-integrations')

urlpatterns = [
    path('', include(router.urls)),
]
