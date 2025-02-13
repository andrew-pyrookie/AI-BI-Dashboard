from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UploadedDataViewSet, ProcessedDataViewSet

router = DefaultRouter()
router.register(r'uploaded-data', UploadedDataViewSet, basename='uploaded-data')
router.register(r'processed-data', ProcessedDataViewSet, basename='processed-data')

urlpatterns = [
    path('', include(router.urls)),
]
