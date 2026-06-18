from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username


class AdminProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='admin_profile'
    )
    admin_level = models.CharField(max_length=50)

    def __str__(self):
        return self.user.username


class UserRelationship(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='following'
    )

    related_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='followers'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} follows {self.related_user.username}"