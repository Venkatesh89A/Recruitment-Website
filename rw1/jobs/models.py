from django.db import models
from django.contrib.auth.models import User


class Job(models.Model):
    """A job vacancy posted by a recruiter/admin."""

    CATEGORY_CHOICES = [
        ("IT", "Information Technology"),
        ("HR", "Human Resources"),
        ("FIN", "Finance"),
        ("MKT", "Marketing"),
        ("SALES", "Sales"),
        ("OPS", "Operations"),
        ("OTHER", "Other"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    salary = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=150)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="OTHER")
    posted_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="jobs_posted"
    )
    is_active = models.BooleanField(default=True)
    posted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-posted_at"]

    def __str__(self):
        return f"{self.title} ({self.location})"
