from ..models import Student as Table
from django.test import TestCase
from django.urls import reverse

global module
module = 'student'


class StudentTest(TestCase):
    def setUp(self):
        self.data = {
            'first_name': 'Glo',
            'middle_name': 'Soft',
            'last_name': 'Group',
        }
        self.instance = Table(**self.data)

    def test_model_can_create_instance(self):
        """ Test if the model can create an instance."""
        old_count = Table.objects.count()
        self.instance.save()
        new_count = Table.objects.count()

        self.assertNotEqual(old_count, new_count)
        self.assertEqual(self.instance.first_name, 'Glo')

