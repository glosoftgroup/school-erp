from __future__ import unicode_literals

from django.db import models
from app_dir.modules.academics.subject.models import Subject
from app_dir.modules.academics.academic_year.models import AcademicYear
from app_dir.modules.student.models import Student
from app_dir.modules.term.models import Term
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now


class MarksAllocation(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE,
                                      null=True, blank=True)
    subject = models.CharField(
        pgettext_lazy('MarksAllocation field', 'subject'), max_length=128,
        null=True, blank=True)
    academicclass = models.CharField(
        pgettext_lazy('MarksAllocation field', 'academicclass'), max_length=128,
        null=True, blank=True)
    academicyear = models.ForeignKey(AcademicYear, on_delete=models.CASCADE,
                                      null=True, blank=True)
    term = models.ForeignKey(Term, on_delete=models.CASCADE,
                                      null=True, blank=True)
    is_committed = models.BooleanField(
        pgettext_lazy('MarksAllocation field', 'is_committed'),
        default=False)
    exam = models.CharField(
        pgettext_lazy('MarksAllocation field', 'exam'), blank=True,
        null=True, max_length=128)
    exam_marks = models.CharField(
        pgettext_lazy('MarksAllocation field', 'exam_marks'), blank=True,
        null=True, max_length=128)
    student_marks = models.CharField(
        pgettext_lazy('MarksAllocation field', 'student_marks'), blank=True,
        null=True, max_length=128)
    updated_at = models.DateTimeField(
        pgettext_lazy('MarksAllocation field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('ExamConfiguration field', 'created'),
                                   default=now, editable=False)

    def __str__(self):
        return self.academicyear.name





