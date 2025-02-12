from rest_framework import viewsets
from .models import Users, ApiIntegrations
from .serializers import UsersSerializer, ApiIntegrationsSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class ApiIntegrationsViewSet(viewsets.ModelViewSet):
    queryset = ApiIntegrations.objects.all()
    serializer_class = ApiIntegrationsSerializer
