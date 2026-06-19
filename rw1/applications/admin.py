from django.contrib import admin

from .models import Application, ApplicationStatusHistory


class StatusHistoryInline(admin.TabularInline):
    model = ApplicationStatusHistory
    extra = 0
    readonly_fields = ("old_status", "new_status", "changed_by", "changed_at", "note")
    can_delete = False
    ordering = ("-changed_at",)


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("id", "applicant", "job", "status", "applied_at", "updated_at")
    list_filter = ("status", "job")
    search_fields = ("applicant__username", "applicant__email", "job__title")
    readonly_fields = ("applied_at", "updated_at", "withdrawn_at")
    inlines = [StatusHistoryInline]

    def save_model(self, request, obj, form, change):
        if change:
            old = Application.objects.get(pk=obj.pk)
            if old.status != obj.status:
                super().save_model(request, obj, form, change)
                ApplicationStatusHistory.objects.create(
                    application=obj,
                    old_status=old.status,
                    new_status=obj.status,
                    changed_by=request.user,
                    note="Updated via admin",
                )
                return
        super().save_model(request, obj, form, change)


@admin.register(ApplicationStatusHistory)
class ApplicationStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ("application", "old_status", "new_status", "changed_by", "changed_at")
    list_filter = ("new_status",)
    readonly_fields = ("application", "old_status", "new_status", "changed_by", "changed_at", "note")
