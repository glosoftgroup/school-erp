from django.test import TestCase
from django.urls import reverse
from app_dir.modules.exams.exam_type.models import ExamType as Table

global module


class ExamTypeTest(TestCase):
    def setUp(self):
        self.data = {
            'name': 'Assignment',
        }
        self.instance = Table(**self.data)

    def test_model_can_create_instance(self):
        """ Test if the model can create an instance."""
        old_count = Table.objects.count()
        self.instance.save()
        new_count = Table.objects.count()

        self.assertNotEqual(old_count, new_count)
        self.assertEqual(self.instance.name, 'Assignment')


