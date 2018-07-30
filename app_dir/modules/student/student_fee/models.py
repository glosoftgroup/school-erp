from __future__ import unicode_literals

from decimal import Decimal
from django.db import models
from django.contrib.postgres.fields import HStoreField
from django.contrib.postgres.fields import JSONField
from django.utils.translation import pgettext_lazy
from app_dir.modules.academics.academic_year.models import AcademicYear
from app_dir.modules.academics.classes.models import Class
from app_dir.modules.term.models import Term
from app_dir.modules.student.models import Student

class Fee(models.Model):
    student = models.ForeignKey(
        Student, related_name='student_fee', blank=True, null=True,
        verbose_name=pgettext_lazy('Fee field', 'student'))

    academic_year = models.ForeignKey(
        AcademicYear, related_name='student_fee_year', blank=True, null=True,
        verbose_name=pgettext_lazy('Fee field', 'academic year'))
    course = models.ForeignKey(
        Class, related_name='student_fee_class', blank=True, null=True,
        verbose_name=pgettext_lazy('Fee field', 'class'))
    term = models.ForeignKey(
        Term, related_name='student_fee_term', blank=True, null=True,
        verbose_name=pgettext_lazy('Fee field', 'term'))
    amount = models.DecimalField(max_digits=125, decimal_places=2, default=Decimal(0),
                                 verbose_name=pgettext_lazy('FeeStructure field', 'amount')
                                 )
    compulsory_amount = models.DecimalField(max_digits=125, decimal_places=2, default=Decimal(0),
                                 verbose_name=pgettext_lazy('FeeStructure field', 'amount')
                                 )
    name = models.CharField(max_length=100, blank=True)
    attributes = HStoreField(default={}, blank=True)

    class Meta:
        app_label = 'student_fee'
        # unique_together = ("academic_year", "course", "term"

    def save(self, *args, **kwargs):
        self.name = self.academic_year.name +' Term:'+ self.term.name +' Class:'+ self.course.name
        super().save(*args, **kwargs)
    def __str__(self):
        return self.name


class Item(models.Model):
    fee = models.ForeignKey(Fee, related_name='student_fee_items', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    choice = JSONField(default={})
    compulsory = models.BooleanField(default=True)
    amount = models.DecimalField(
        pgettext_lazy('FeeItem field', 'total cost'), default=Decimal(0), max_digits=100, decimal_places=2)

    class Meta:
        app_label = 'fee'

    def save(self, *args, **kwargs):
        total = sum([ n.amount for n in self.fee.fee_items.filter(compulsory=True) ])
        self.fee.compulsory_amount = total
        self.fee.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
