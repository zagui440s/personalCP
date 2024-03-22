from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .models import AppUser


# Create your views here.
class Sign_up(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = AppUser.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {"user": user.email, "token": token.key}, status=HTTP_201_CREATED
        )


class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.email})
        else:
            return Response(
                "No trainer matching credentials", status=HTTP_404_NOT_FOUND
            )


class PermissionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Info(PermissionView):

    def get(self, request):
        return Response({"email": request.user.email})


class Log_out(PermissionView):

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
