from ..models import Room as Table
from django.test import TestCase
from django.urls import reverse

global module


class StudentTest(TestCase):
    def setUp(self):
        self.data = {
            'name': 'Glo',
        }
        self.instance = Table(**self.data)

    def test_model_can_create_instance(self):
        """ Test if the model can create an instance."""
        old_count = Table.objects.count()
        self.instance.save()
        new_count = Table.objects.count()

        self.assertNotEqual(old_count, new_count)
        self.assertEqual(self.instance.name, 'Glo')

