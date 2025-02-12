from django.db import models
from apps.data_ingestion.models import ProcessedData
from apps.users.models import Users

class AnalysisResults(models.Model):
    processed_data = models.ForeignKey(ProcessedData, on_delete=models.CASCADE, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'analysis_results'

class Dashboards(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True)
    dashboard_name = models.CharField(max_length=255)
    config = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'dashboards'

class ScheduledReports(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True)
    report_name = models.CharField(max_length=255)
    cron_schedule = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'scheduled_reports'
