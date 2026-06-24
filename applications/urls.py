from django.urls import path
from .views import apply_job, track_status, withdraw_application

urlpatterns = [
    path('apply/', apply_job, name='apply_job'),
    path('status/<int:id>/', track_status, name='track_status'),
    path('withdraw/<int:id>/', withdraw_application, name='withdraw_application'),
]