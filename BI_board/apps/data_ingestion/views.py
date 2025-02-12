from rest_framework import viewsets
from .models import UploadedData, ProcessedData
from .serializers import UploadedDataSerializer, ProcessedDataSerializer

class UploadedDataViewSet(viewsets.ModelViewSet):
    queryset = UploadedData.objects.all()
    serializer_class = UploadedDataSerializer

class ProcessedDataViewSet(viewsets.ModelViewSet):
    queryset = ProcessedData.objects.all()
    serializer_class = ProcessedDataSerializer
