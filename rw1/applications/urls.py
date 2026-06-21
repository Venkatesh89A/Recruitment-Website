from django.urls import path

from . import views

app_name = "applications"

urlpatterns = [
    # Applicant-facing
    path("jobs/<int:job_id>/apply/", views.apply_job, name="apply_job"),
    path("my-applications/", views.my_applications, name="my_applications"),
    path("<int:application_id>/", views.application_detail, name="application_detail"),
    path("<int:application_id>/withdraw/", views.withdraw_application, name="withdraw_application"),

    # Recruiter/Admin-facing
    path("manage/", views.manage_applications, name="manage_applications"),
    path("manage/<int:application_id>/update-status/", views.update_application_status, name="update_application_status"),
]
