from django.test import TestCase
from app_dir.modules.exams.exam_type.models import ExamType


class ExamTypeTest(TestCase):
    def setUp(self):
        self.exam_type = ExamType.objects.create(name="assignment")

    def test_exam_type_name(self):
        self.assertEqual(self.exam_type.name, "assignment")
