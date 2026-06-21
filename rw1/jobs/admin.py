from django.contrib import admin
from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "category", "posted_by", "is_active", "posted_at")
    list_filter = ("category", "is_active", "location")
    search_fields = ("title", "description", "location")
