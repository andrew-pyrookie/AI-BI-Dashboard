from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    
    # app-specific URLs
    path("analytics/", include("apps.analytics.urls")),
    path("data-ingestion/", include("apps.data_ingestion.urls")),
    path("users/", include("apps.users.urls")),
]
