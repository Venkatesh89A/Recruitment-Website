import os

from django.conf import settings
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models

from jobs.models import Job


# ---------------------------------------------------------------------------
# File upload validation
# ---------------------------------------------------------------------------
ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"]
MAX_UPLOAD_SIZE_MB = 5
MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValidationError(
            f"Unsupported file type '{ext}'. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}."
        )


def validate_file_size(value):
    if value.size > MAX_UPLOAD_SIZE_BYTES:
        raise ValidationError(f"File too large. Maximum allowed size is {MAX_UPLOAD_SIZE_MB}MB.")


def resume_upload_path(instance, filename):
    ext = os.path.splitext(filename)[1].lower()
    return f"resumes/{instance.applicant.id}_{instance.job.id}_{instance.id or 'new'}{ext}"


def cover_letter_upload_path(instance, filename):
    ext = os.path.splitext(filename)[1].lower()
    return f"cover_letters/{instance.applicant.id}_{instance.job.id}_{instance.id or 'new'}{ext}"


class Application(models.Model):
    """An applicant's application to a specific job."""

    STATUS_PENDING = "PENDING"
    STATUS_REVIEWED = "REVIEWED"
    STATUS_SHORTLISTED = "SHORTLISTED"
    STATUS_INTERVIEW = "INTERVIEW_SCHEDULED"
    STATUS_SELECTED = "SELECTED"
    STATUS_REJECTED = "REJECTED"
    STATUS_WITHDRAWN = "WITHDRAWN"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_REVIEWED, "Reviewed"),
        (STATUS_SHORTLISTED, "Shortlisted"),
        (STATUS_INTERVIEW, "Interview Scheduled"),
        (STATUS_SELECTED, "Selected"),
        (STATUS_REJECTED, "Rejected"),
        (STATUS_WITHDRAWN, "Withdrawn"),
    ]

    applicant = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="applications"
    )
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")

    resume = models.FileField(
        upload_to=resume_upload_path,
        validators=[validate_file_extension, validate_file_size],
        help_text="PDF, DOC, or DOCX. Max 5MB.",
    )
    cover_letter_file = models.FileField(
        upload_to=cover_letter_upload_path,
        validators=[validate_file_extension, validate_file_size],
        blank=True,
        null=True,
        help_text="Optional. PDF, DOC, or DOCX. Max 5MB.",
    )
    cover_letter_text = models.TextField(blank=True, null=True)

    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default=STATUS_PENDING)

    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    withdrawn_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ["-applied_at"]
        # An applicant may only have one *active* (non-withdrawn) application per job
        constraints = [
            models.UniqueConstraint(
                fields=["applicant", "job"],
                condition=~models.Q(status="WITHDRAWN"),
                name="unique_active_application_per_job",
            )
        ]

    def __str__(self):
        return f"{self.applicant.get_username()} -> {self.job.title} [{self.status}]"

    def is_withdrawn(self):
        return self.status == self.STATUS_WITHDRAWN

    def can_withdraw(self):
        return self.status not in (self.STATUS_WITHDRAWN, self.STATUS_SELECTED, self.STATUS_REJECTED)


class ApplicationStatusHistory(models.Model):
    """Tracks every status change for an application (audit trail)."""

    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="status_history"
    )
    old_status = models.CharField(max_length=25, blank=True, null=True)
    new_status = models.CharField(max_length=25)
    changed_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, blank=True, null=True
    )
    changed_at = models.DateTimeField(auto_now_add=True)
    note = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ["-changed_at"]
        verbose_name_plural = "Application status histories"

    def __str__(self):
        return f"{self.application_id}: {self.old_status} -> {self.new_status}"
