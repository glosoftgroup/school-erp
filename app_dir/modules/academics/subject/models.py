from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from ..stream.models import Stream
from ..academic_year.models import AcademicYear
from ...room.models import Room


class Subject(models.Model):
    name = models.CharField(
        pgettext_lazy('Subject field', 'name'), unique=True, max_length=128)


    class Meta:
        app_label = 'subject'

    def __str__(self):
        return self.name



