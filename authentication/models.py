from django.db import models


class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.username


class Admin(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    admin_role = models.CharField(max_length=50)

    def __str__(self):
        return self.user.username


class UserRelationship(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="following"
    )

    related_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="followers"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} follows {self.related_user.username}"