from __future__ import unicode_literals

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import pgettext_lazy
from ..stream.models import Stream
from ...academics.academic_year.models import AcademicYear
from ...room.models import Room

User = get_user_model()


class Class(models.Model):
    name = models.CharField(
        pgettext_lazy('Class field', 'name'), max_length=128)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=True, blank=True)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, null=True, blank=True)
    stream = models.ForeignKey(Stream, on_delete=models.CASCADE, null=True, blank=True)
    class_teacher = models.ForeignKey(User, null=True, blank=True)
    class_group = models.IntegerField(default=0)
    no_of_students = models.CharField(
        pgettext_lazy('Class field', 'no_of_students'), max_length=128)

    class Meta:
        app_label = 'classes'

    def __str__(self):
        return  (str(self.name) + " " + str(self.stream.name))



