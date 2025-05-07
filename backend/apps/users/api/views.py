from django.contrib.auth import get_user_model

from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiExample,
)

from apps.users.api import serializers

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenObtainPairSerializer


@extend_schema(
    description="Register a new user account",
    request=serializers.UserCreateSerializer,
    responses={201: serializers.UserSerializer},
    examples=[
        OpenApiExample(
            "Registration example",
            value={
                "email": "newuser@example.com",
                "password": "StrongPass123",
                "first_name": "Ім’я",
                "last_name": "Прізвище",
            },
            request_only=True,
        )
    ],
)
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserCreateSerializer
    permission_classes = [permissions.AllowAny]


@extend_schema(
    description="User list (for administrators only)",
    parameters=[
        OpenApiParameter(
            name="email", description="Filter by email", required=False, type=str
        ),
        OpenApiParameter(
            name="date_joined",
            description="Filter by registration date (ISO format)",
            required=False,
            type=str,
        ),
    ],
    examples=[
        OpenApiExample(
            "List example",
            value=[
                {
                    "id": 1,
                    "email": "admin@example.com",
                    "first_name": "Name",
                    "last_name": "Lastname",
                    "date_joined": "2023-01-01T00:00:00Z",
                }
            ],
            response_only=True,
        )
    ],
)
class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ["email", "date_joined"]


@extend_schema(
    description="User details (for administrators only)",
    responses={200: serializers.UserSerializer},
)
class AdminUserDetailView(generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAdminUser]
