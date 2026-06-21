from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.exceptions import PermissionDenied
from django.db import IntegrityError
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone

from jobs.models import Job

from .forms import ApplicationForm, ApplicationStatusUpdateForm
from .models import Application, ApplicationStatusHistory


def is_recruiter(user):
    """Recruiters/Admins are Django staff users (per default User model)."""
    return user.is_staff


# ---------------------------------------------------------------------------
# Applicant-facing views
# ---------------------------------------------------------------------------

@login_required
def apply_job(request, job_id):
    """Apply Job + Upload Resume + Upload Cover Letter."""
    job = get_object_or_404(Job, id=job_id, is_active=True)

    # Block duplicate active applications to the same job
    existing = Application.objects.filter(
        applicant=request.user, job=job
    ).exclude(status=Application.STATUS_WITHDRAWN).first()
    if existing:
        messages.info(request, "You have already applied for this job.")
        return redirect("applications:my_applications")

    if request.method == "POST":
        form = ApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            application = form.save(commit=False)
            application.applicant = request.user
            application.job = job
            try:
                application.save()
            except IntegrityError:
                messages.error(request, "You have already applied for this job.")
                return redirect("applications:my_applications")

            ApplicationStatusHistory.objects.create(
                application=application,
                old_status=None,
                new_status=application.status,
                changed_by=request.user,
                note="Application submitted",
            )
            messages.success(request, "Your application was submitted successfully.")
            return redirect("applications:my_applications")
    else:
        form = ApplicationForm()

    return render(request, "applications/apply_job.html", {"job": job, "form": form})


@login_required
def my_applications(request):
    """View Applications (applicant's own list) + status tracking."""
    applications = (
        Application.objects.filter(applicant=request.user)
        .select_related("job")
        .order_by("-applied_at")
    )
    return render(
        request, "applications/my_applications.html", {"applications": applications}
    )


@login_required
def application_detail(request, application_id):
    """Application Status Tracking — detail + full status history timeline."""
    application = get_object_or_404(Application, id=application_id)

    if application.applicant != request.user and not is_recruiter(request.user):
        raise PermissionDenied("You do not have permission to view this application.")

    history = application.status_history.all().order_by("-changed_at")
    return render(
        request,
        "applications/application_detail.html",
        {"application": application, "history": history},
    )


@login_required
def withdraw_application(request, application_id):
    """Withdraw Application."""
    application = get_object_or_404(
        Application, id=application_id, applicant=request.user
    )

    if not application.can_withdraw():
        messages.error(request, "This application can no longer be withdrawn.")
        return redirect("applications:my_applications")

    if request.method == "POST":
        old_status = application.status
        application.status = Application.STATUS_WITHDRAWN
        application.withdrawn_at = timezone.now()
        application.save(update_fields=["status", "withdrawn_at", "updated_at"])

        ApplicationStatusHistory.objects.create(
            application=application,
            old_status=old_status,
            new_status=application.status,
            changed_by=request.user,
            note="Withdrawn by applicant",
        )
        messages.success(request, "Your application has been withdrawn.")
        return redirect("applications:my_applications")

    return render(
        request, "applications/withdraw_confirm.html", {"application": application}
    )


# ---------------------------------------------------------------------------
# Recruiter/Admin-facing views
# ---------------------------------------------------------------------------

@login_required
@user_passes_test(is_recruiter)
def manage_applications(request):
    """View Applications (recruiter/admin view across all jobs, with filters)."""
    applications = Application.objects.select_related("job", "applicant").all()

    status = request.GET.get("status")
    job_id = request.GET.get("job")
    search = request.GET.get("q")

    if status:
        applications = applications.filter(status=status)
    if job_id:
        applications = applications.filter(job_id=job_id)
    if search:
        applications = applications.filter(applicant__username__icontains=search)

    jobs = Job.objects.filter(posted_by=request.user)
    return render(
        request,
        "applications/manage_applications.html",
        {
            "applications": applications,
            "jobs": jobs,
            "status_choices": Application.STATUS_CHOICES,
        },
    )


@login_required
@user_passes_test(is_recruiter)
def update_application_status(request, application_id):
    """Application Status Tracking — recruiter updates status (Pending -> ... -> Selected/Rejected)."""
    application = get_object_or_404(Application, id=application_id)

    if request.method == "POST":
        form = ApplicationStatusUpdateForm(request.POST, instance=application)
        if form.is_valid():
            old_status = application.status
            updated = form.save(commit=False)
            note = form.cleaned_data.get("note")
            updated.save()

            ApplicationStatusHistory.objects.create(
                application=updated,
                old_status=old_status,
                new_status=updated.status,
                changed_by=request.user,
                note=note or "",
            )
            messages.success(request, "Application status updated.")
            return redirect("applications:manage_applications")
    else:
        form = ApplicationStatusUpdateForm(instance=application)

    return render(
        request,
        "applications/update_status.html",
        {"application": application, "form": form},
    )
