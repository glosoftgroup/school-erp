from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from ..subject.models import Subject
from ..academic_year.models import AcademicYear
from ..classes.models import Class


class Curriculum(models.Model):
    subject      = models.ForeignKey(Subject , on_delete=models.CASCADE)
    topic        = models.CharField(null=True, blank=True, max_length=128)
    subtopic     = models.CharField(null=True, blank=True, max_length=128)
    period       = models.CharField(null=True, blank=True, max_length=128)
    objective    = models.CharField(null=True, blank=True, max_length=300)
    competencies = models.CharField(null=True, blank=True, max_length=300)
    values       = models.CharField(null=True, blank=True, max_length=300)


    class Meta:
        app_label = 'curriculum'

    def __str__(self):
        return self.subject.name



