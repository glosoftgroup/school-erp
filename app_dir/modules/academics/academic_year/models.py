from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now


class AcademicYear(models.Model):
    name = models.CharField(
        pgettext_lazy('AcademicYear field', 'name'), unique=True, max_length=128)
    description = models.TextField(
        verbose_name=pgettext_lazy('AcademicYear field', 'description'), blank=True, null=True)
    start_date = models.DateField(
        pgettext_lazy('AcademicYear field', 'available on'), blank=True, null=True)
    end_date = models.DateField(
        pgettext_lazy('AcademicYear field', 'available on'), blank=True, null=True)

    updated_at = models.DateTimeField(
        pgettext_lazy('AcademicYear field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('AcademicYear field', 'created'),
                                   default=now, editable=False)

    class Meta:
        app_label = 'academic_year'
        verbose_name = pgettext_lazy('AcademicYear model', 'academic_year')
        verbose_name_plural = pgettext_lazy('AcademicYears model', 'academic_year')

    def __str__(self):
        return str(self.start_date) + ' to ' +str(self.end_date)




