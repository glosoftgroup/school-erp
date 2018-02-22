from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now
from . import ReligionChoices
from . import GenderChoices
from app_dir.modules.academics.academic_year.models import AcademicYear


class Student(models.Model):
    adm_no = models.CharField(
        pgettext_lazy('Student field', 'admission number'), default='', unique=True, max_length=128)
    academic_year = models.ForeignKey(
        AcademicYear, related_name='student_year', blank=True, null=True,
        verbose_name=pgettext_lazy('Student field', 'academic year'))
    first_name = models.CharField(
        pgettext_lazy('Student field', 'first name'), default='', max_length=128)
    middle_name = models.CharField(
        pgettext_lazy('Student field', 'middle name'), default='', max_length=128)
    last_name = models.CharField(
        pgettext_lazy('Student field', 'last name'), default='', max_length=128)
    nationality = models.CharField(
        pgettext_lazy('Student field', 'nationality'), default='', max_length=128)
    dob = models.DateField(
        pgettext_lazy('Student field', 'date of birth'), blank=True, null=True)
    pob = models.CharField(
        pgettext_lazy('Student field', 'place of birth'), default='', max_length=128)
    gender = models.CharField(
        max_length=2,
        choices=GenderChoices.CHOICES,
        default=GenderChoices.MALE,
    )
    religion = models.CharField(
        max_length=2,
        choices=ReligionChoices.CHOICES,
        default=ReligionChoices.CHRISTIAN,
    )
    description = models.TextField(
        verbose_name=pgettext_lazy('Student field', 'description'), blank=True, null=True)
    join_date = models.DateField(
        pgettext_lazy('Student field', 'join on'), blank=True, null=True)
    leave_date = models.DateField(
        pgettext_lazy('Student field', 'leave on'), blank=True, null=True)

    updated_at = models.DateTimeField(
        pgettext_lazy('Student field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('Student field', 'created'),
                                  default=now, editable=False)

    class Meta:
        app_label = 'student'
        verbose_name = pgettext_lazy('Student model', 'student')
        verbose_name_plural = pgettext_lazy('Students model', 'student')

    def __str__(self):
        return str(self.first_name) + ' to ' + str(self.last_name)




