from rest_framework import serializers
from .models import UploadedData, ProcessedData

class UploadedDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedData
        fields = '__all__'

class ProcessedDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessedData
        fields = '__all__'
