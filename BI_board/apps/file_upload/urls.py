from django.urls import path
from .views import FileUploadView

urlpatterns = [
    path('api/', FileUploadView.as_view(), name='file-upload'),
]
