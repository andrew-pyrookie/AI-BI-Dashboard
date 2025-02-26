# apps/analytics/models.py
from django.db import models
from apps.data_ingestion.models import ProcessedData
from apps.users.models import Users

class AnalysisResults(models.Model):
    processed_data = models.ForeignKey(ProcessedData, on_delete=models.CASCADE, blank=True, null=True)
    summary = models.JSONField(blank=True, null=True)  # Changed to JSONField
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'analysis_results'

class Dashboards(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True)
    dashboard_name = models.CharField(max_length=255)
    config = models.JSONField()  # e.g., {"chart_type": "bar", "data": "sales_forecast"}
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'dashboards'

class ScheduledReports(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True)
    report_name = models.CharField(max_length=255)
    cron_schedule = models.CharField(max_length=255)  # e.g., "0 0 * * *" (daily at midnight)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'scheduled_reports'