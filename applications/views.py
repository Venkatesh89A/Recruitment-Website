from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Application

@api_view(['POST'])
def apply_job(request):
    app = Application.objects.create(
        student_name=request.data.get('student_name'),
        email=request.data.get('email'),
        job_title=request.data.get('job_title'),
        resume=request.FILES.get('resume')
    )

    return Response({
        "message": "Application Submitted",
        "application_id": app.id
    })

@api_view(['GET'])
def track_status(request, id):
    app = Application.objects.get(id=id)

    return Response({
        "student_name": app.student_name,
        "job_title": app.job_title,
        "status": app.status,
        "withdrawn": app.is_withdrawn
    })

@api_view(['PUT'])
def withdraw_application(request, id):
    app = Application.objects.get(id=id)
    app.is_withdrawn = True
    app.status = "Withdrawn"
    app.save()

    return Response({
        "message": "Application Withdrawn Successfully"
    })