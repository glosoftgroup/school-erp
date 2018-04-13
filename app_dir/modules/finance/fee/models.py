from __future__ import unicode_literals

from decimal import Decimal
from django.db import models
from django.contrib.postgres.fields import HStoreField
from django.contrib.postgres.fields import JSONField
from django.utils.translation import pgettext_lazy
from app_dir.modules.academics.academic_year.models import AcademicYear
from app_dir.modules.academics.classes.models import Class
from app_dir.modules.term.models import Term


class FeeStructure(models.Model):
    academic_year = models.ForeignKey(
        AcademicYear, related_name='fee_year', blank=True, null=True,
        verbose_name=pgettext_lazy('FeeStructure field', 'academic year'))
    course = models.ForeignKey(
        Class, related_name='fee_class', blank=True, null=True,
        verbose_name=pgettext_lazy('FeeStructure field', 'class'))
    term = models.ForeignKey(
        Term, related_name='fee_term', blank=True, null=True,
        verbose_name=pgettext_lazy('FeeStructure field', 'term'))
    amount = models.DecimalField(max_digits=125, decimal_places=2, default=Decimal(0),
                                 verbose_name=pgettext_lazy('FeeStructure field', 'amount')
                                 )
    name = models.CharField(max_length=100, blank=True)
    attributes = HStoreField(default={}, blank=True)

    class Meta:
        app_label = 'fee'
        unique_together = ("academic_year", "course", "term")

    def save(self, *args, **kwargs):
        self.name = self.academic_year.name +' Term:'+ self.term.name +' Class:'+ self.course.name
        super().save(*args, **kwargs)
    def __str__(self):
        return self.name


class FeeItem(models.Model):
    fee = models.ForeignKey(FeeStructure, related_name='fee_items', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    choice = JSONField(default={})
    amount = models.DecimalField(
        pgettext_lazy('FeeItem field', 'total cost'), default=Decimal(0), max_digits=100, decimal_places=2)

    class Meta:
        app_label = 'fee'

    def __str__(self):
        return self.name
