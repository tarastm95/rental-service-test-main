from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from apps.users.api.views import (
    CustomTokenObtainPairView,
    UserRegistrationView,
    AdminUserListView,
    AdminUserDetailView,
)

urlpatterns = [
    path("api/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/register/", UserRegistrationView.as_view(), name="user-register"),
    path("api/users/", AdminUserListView.as_view(), name="admin-user-list"),
    path(
        "api/users/<int:pk>/", AdminUserDetailView.as_view(), name="admin-user-detail"
    ),
]
