from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from ..stream.models import Stream
from ...academic_year.models import AcademicYear
from ...room.models import Room


class Class(models.Model):
    name = models.CharField(
        pgettext_lazy('Class field', 'name'), unique=True, max_length=128)
    room = models.ForeignKey(Room , on_delete=models.CASCADE)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    stream = models.ForeignKey(Stream, on_delete=models.CASCADE)
    class_teacher = models.CharField(
        pgettext_lazy('Class field', 'class_teacher'), max_length=128)
    no_of_students = models.CharField(
        pgettext_lazy('Class field', 'no_of_students'), max_length=128)


    class Meta:
        app_label = 'class'

    def __str__(self):
        return self.name



