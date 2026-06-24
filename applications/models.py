from django.db import models

class Application(models.Model):
    student_name = models.CharField(max_length=100)
    email = models.EmailField()
    job_title = models.CharField(max_length=100)
    resume = models.FileField(upload_to='resumes/')
    status = models.CharField(max_length=20, default='Pending')
    is_withdrawn = models.BooleanField(default=False)

    def __str__(self):
        return self.student_name