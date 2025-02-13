from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnalysisResultsViewSet, DashboardsViewSet, ScheduledReportsViewSet

router = DefaultRouter()
router.register(r'analysis-results', AnalysisResultsViewSet, basename='analysis-results')
router.register(r'dashboards', DashboardsViewSet, basename='dashboards')
router.register(r'scheduled-reports', ScheduledReportsViewSet, basename='scheduled-reports')

urlpatterns = [
    path('', include(router.urls)),
]
