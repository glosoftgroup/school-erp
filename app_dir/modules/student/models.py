from __future__ import unicode_literals

from django.db import models
from versatileimagefield.fields import VersatileImageField
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now
from . import ReligionChoices
from . import GenderChoices
from app_dir.modules.academics.academic_year.models import AcademicYear
from app_dir.modules.academics.classes.models import Class, Stream
from app_dir.modules.house.models import House
from app_dir.modules.parent.models import Parent


class Student(models.Model):
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
    por = models.CharField(
        pgettext_lazy('Student field', 'place of residence'), default='', max_length=128)
    parents = models.ManyToManyField(Parent)
    gender = models.CharField(
        max_length=23,
        choices=GenderChoices.CHOICES,
        default=GenderChoices.MALE,
    )
    religion = models.CharField(
        max_length=45,
        choices=ReligionChoices.CHOICES,
        default=ReligionChoices.CHRISTIAN,
    )
    description = models.TextField(
        verbose_name=pgettext_lazy('Student field', 'description'), blank=True, null=True)
    image = VersatileImageField(
        'Image',
        upload_to='images/students/',
        width_field='width',
        height_field='height',
        blank=True,
        null=True
    )
    height = models.PositiveIntegerField(
        'Image Height',
        blank=True,
        null=True
    )
    width = models.PositiveIntegerField(
        'Image Width',
        blank=True,
        null=True
    )
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


class StudentOfficialDetails(models.Model):
    student = models.ForeignKey(
        Student, related_name='student_official', blank=True, null=True,
        verbose_name=pgettext_lazy('StudentOfficialDetails field', 'student'))
    adm_no = models.CharField(
        pgettext_lazy('StudentOfficialDetails field', 'admission number'), default='', unique=True, max_length=128)
    academic_year = models.ForeignKey(
        AcademicYear, related_name='student_year', blank=True, null=True,
        verbose_name=pgettext_lazy('StudentOfficialDetails field', 'academic year'))
    course = models.ForeignKey(
        Class, related_name='student_class', blank=True, null=True,
        verbose_name=pgettext_lazy('StudentOfficialDetails field', 'class'))
    house = models.ForeignKey(
        House, related_name='student_house', blank=True, null=True,
        verbose_name=pgettext_lazy('StudentOfficialDetails field', 'house'))

    stream = models.ForeignKey(
        Stream, related_name='student_stream', blank=True, null=True,
        verbose_name=pgettext_lazy('StudentOfficialDetails field', 'stream'))

    join_date = models.DateField(
        pgettext_lazy('Student field', 'join on'), blank=True, null=True)
    leave_date = models.DateField(
        pgettext_lazy('Student field', 'leave on'), blank=True, null=True)
