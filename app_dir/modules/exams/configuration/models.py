from __future__ import unicode_literals

from django.db import models
from app_dir.modules.academics.subject.models import Subject
from app_dir.modules.academics.classes.models import Class
from app_dir.modules.academics.academic_year.models import AcademicYear
from app_dir.modules.term.models import Term
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now


class ExamConfiguration(models.Model):
    subject       = models.ForeignKey(Subject, on_delete=models.CASCADE)
    academicclass = models.ForeignKey(Class, on_delete=models.CASCADE)
    academicyear  = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    term  = models.ForeignKey(Term, on_delete=models.CASCADE)
    is_percentage = models.BooleanField(
        pgettext_lazy('ExamConfiguration field', 'isPercentage'),
        default=False)
    pass_marks = models.CharField(
        pgettext_lazy('ExamConfiguration field', 'pass_mark'), blank=True, null=True, max_length=128)
    total_marks = models.CharField(
        pgettext_lazy('ExamConfiguration field', 'pass_mark'), blank=True, null=True, max_length=128)
    updated_at = models.DateTimeField(
        pgettext_lazy('ExamConfiguration field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('ExamConfiguration field', 'created'),
                                   default=now, editable=False)

    def __str__(self):
        return self.academicyear.name

class Assignment(models.Model):
    examId = models.ForeignKey(ExamConfiguration, related_name='assignment',  on_delete=models.CASCADE)
    name = models.CharField(
        pgettext_lazy('Assignment field', 'name'), max_length=128)
    marks = models.CharField(
        pgettext_lazy('Assignment field', 'marks'), max_length=128)

    def __str__(self):
        return self.name

class Cat(models.Model):
    examId = models.ForeignKey(ExamConfiguration, related_name='cat', on_delete=models.CASCADE)
    name = models.CharField(
        pgettext_lazy('Cat field', 'name'), max_length=128)
    marks = models.CharField(
        pgettext_lazy('Cat field', 'marks'), max_length=128)

    def __str__(self):
        return self.name

class Exam(models.Model):
    examId = models.ForeignKey(ExamConfiguration, related_name='exam', on_delete=models.CASCADE)
    name = models.CharField(
        pgettext_lazy('Exam field', 'name'), max_length=128)
    marks = models.CharField(
        pgettext_lazy('Exam field', 'marks'), max_length=128)

    def __str__(self):
        return self.name



