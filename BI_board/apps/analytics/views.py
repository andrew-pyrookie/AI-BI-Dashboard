# apps/analytics/views.py
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import AnalysisResults, Dashboards, ScheduledReports
from .serializers import AnalysisResultsSerializer, DashboardsSerializer, ScheduledReportsSerializer
from .tasks import run_analytics
from apps.data_ingestion.models import ProcessedData

class AnalyzeDataView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        processed_data_id = request.data.get('processed_data_id')
        if not processed_data_id:
            return Response({"error": "No processed_data_id provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            processed_data = ProcessedData.objects.get(id=processed_data_id, uploaded_data__user=request.user)
            run_analytics.delay(processed_data.id)
            return Response({"message": "Analytics started", "processed_data_id": processed_data.id}, 
                           status=status.HTTP_202_ACCEPTED)
        except ProcessedData.DoesNotExist:
            return Response({"error": "Processed data not found or not owned by you"}, 
                           status=status.HTTP_404_NOT_FOUND)

class AnalysisResultsViewSet(viewsets.ModelViewSet):
    queryset = AnalysisResults.objects.all()
    serializer_class = AnalysisResultsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AnalysisResults.objects.filter(processed_data__uploaded_data__user=self.request.user)

class DashboardsViewSet(viewsets.ModelViewSet):
    queryset = Dashboards.objects.all()
    serializer_class = DashboardsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Dashboards.objects.filter(user=self.request.user)

class ScheduledReportsViewSet(viewsets.ModelViewSet):
    queryset = ScheduledReports.objects.all()
    serializer_class = ScheduledReportsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ScheduledReports.objects.filter(user=self.request.user)