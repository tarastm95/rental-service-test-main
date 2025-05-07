import django_filters
from .models import Apartment


class ApartmentFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    rooms = django_filters.NumberFilter(field_name="number_of_rooms")
    available = django_filters.BooleanFilter(field_name="availability")

    class Meta:
        model = Apartment
        fields = ["price_min", "price_max", "rooms", "available"]
