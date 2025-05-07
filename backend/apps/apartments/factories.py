import factory
from django.utils.text import slugify
from apps.users.factories import UserFactory
from .models import Apartment


class ApartmentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Apartment

    name = factory.Faker("sentence", nb_words=3)
    slug = factory.LazyAttribute(lambda obj: slugify(obj.name))
    description = factory.Faker("paragraph")
    price = factory.Faker("pydecimal", left_digits=5, right_digits=2, positive=True)
    number_of_rooms = factory.Faker("random_int", min=1, max=5)
    square = factory.Faker("pydecimal", left_digits=4, right_digits=2, positive=True)
    availability = factory.Faker("boolean", chance_of_getting_true=75)
    owner = factory.SubFactory(UserFactory)
