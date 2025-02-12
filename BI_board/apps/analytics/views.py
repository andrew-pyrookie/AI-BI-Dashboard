from rest_framework import viewsets
from .models import AnalysisResults, Dashboards, ScheduledReports
from .serializers import AnalysisResultsSerializer, DashboardsSerializer, ScheduledReportsSerializer

class AnalysisResultsViewSet(viewsets.ModelViewSet):
    queryset = AnalysisResults.objects.all()
    serializer_class = AnalysisResultsSerializer

class DashboardsViewSet(viewsets.ModelViewSet):
    queryset = Dashboards.objects.all()
    serializer_class = DashboardsSerializer

class ScheduledReportsViewSet(viewsets.ModelViewSet):
    queryset = ScheduledReports.objects.all()
    serializer_class = ScheduledReportsSerializer
