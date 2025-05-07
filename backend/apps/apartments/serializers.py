from rest_framework import serializers
from .models import Apartment


class ApartmentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.email")

    class Meta:
        model = Apartment
        fields = [
            "name",
            "slug",
            "description",
            "price",
            "number_of_rooms",
            "square",
            "availability",
            "owner",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["slug", "owner", "created_at", "updated_at"]
