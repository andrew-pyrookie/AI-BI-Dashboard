from rest_framework import serializers
from .models import Users, ApiIntegrations

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password_hash', 'role', 'created_at']
        extra_kwargs = {'password_hash': {'write_only': True}}

class ApiIntegrationsSerializer(serializers.ModelSerializer):
    user = UsersSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=Users.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = ApiIntegrations
        fields = ['id', 'user', 'user_id', 'api_name', 'api_key', 'created_at']
