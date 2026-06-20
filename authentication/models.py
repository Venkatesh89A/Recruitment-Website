from django.db import models

# Applicant Database models.
class Applicants(models.Model):
    User_Id = models.AutoField(primary_key=True)
    Full_Name = models.CharField(max_length=100)
    Email = models.EmailField(unique=True)
    Phone = models.CharField(max_length=10)
    resume = models.FileField(upload_to='resumes/')
    Profile_photo = models.ImageField(upload_to='profiles/')
    Created_at = models.DateTimeField(auto_now_add=True)

