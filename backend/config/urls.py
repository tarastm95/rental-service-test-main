from django.contrib import admin
from django.urls import path, include

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

from apps.apartments.views import (
    ApartmentListCreateAPIView,
    ApartmentRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/users/", include("apps.users.api.urls")),
    path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/v1/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/v1/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"
    ),
    path(
        "api/v1/apartments/",
        ApartmentListCreateAPIView.as_view(),
        name="apartment-list",
    ),
    path(
        "api/v1/apartments/<slug:slug>/",
        ApartmentRetrieveUpdateDestroyAPIView.as_view(),
        name="apartment-detail",
    ),
    path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/v1/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]
