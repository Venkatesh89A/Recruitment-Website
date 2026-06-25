from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import RegisterSerializer, UserSerializer
from rest_framework.exceptions import NotAuthenticated


# Register API
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# Protected Profile API
class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = getattr(self.request, 'user', None)
        if user is None or getattr(user, 'is_anonymous', True):
            raise NotAuthenticated('Authentication credentials were not provided.')
        return user


# Logout API
class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({
            "message": "Logout Successful"
        })