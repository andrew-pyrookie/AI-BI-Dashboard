from django.db import models
from apps.users.models import Users

class UploadedFile(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
