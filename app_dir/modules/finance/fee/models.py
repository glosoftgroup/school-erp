from __future__ import unicode_literals

from decimal import Decimal
from django.db import models
from django.contrib.postgres.fields import HStoreField
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
    amount = models.DecimalField(max_digits=5, decimal_places=2,
                                 verbose_name=pgettext_lazy('FeeStructure field', 'amount')
                                 )
    name = models.CharField(max_length=100, blank=True)
    attributes = HStoreField(default={}, blank=True)

    class Meta:
        app_label = 'fee'

    def __str__(self):
        return self.name


class FeeItem(models.Model):
    fee = models.ForeignKey(FeeStructure, related_name='fee_items', on_delete=models.CASCADE)
    attributes = HStoreField(default={}, blank=True)
    item_name = models.CharField(
        pgettext_lazy('SoldItem field', 'product name'), max_length=128)
    amount = models.DecimalField(
        pgettext_lazy('SoldItem field', 'total cost'), default=Decimal(0), max_digits=100, decimal_places=2)

    class Meta:
        app_label = 'fee'

    def __str__(self):
        return self.fee
