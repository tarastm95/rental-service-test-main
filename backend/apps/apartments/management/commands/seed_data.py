from django.core.management.base import BaseCommand
import random
from apps.users.factories import UserFactory
from apps.apartments.factories import ApartmentFactory


class Command(BaseCommand):
    help = "Generates test users and apartments"

    def add_arguments(self, parser):
        parser.add_argument(
            "--users",
            type=int,
            default=5,
            help="Number of users to create (default: 5)",
        )
        parser.add_argument(
            "--apartments",
            type=int,
            default=20,
            help="Number of apartments to create (default: 20)",
        )

    def handle(self, *args, **options):
        users = UserFactory.create_batch(options["users"])

        for _ in range(options["apartments"]):
            ApartmentFactory(owner=random.choice(users))

        self.stdout.write(self.style.SUCCESS("Data successfully generated"))
