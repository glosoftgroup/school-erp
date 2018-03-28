from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now
from app_dir.modules.student.models import Student
from app_dir.modules.academics.academic_year.models import AcademicYear


class Attendance(models.Model):
    student = models.ForeignKey(
        Student, related_name='student_attendance', blank=True, null=True,
        verbose_name=pgettext_lazy('Attendance field', 'student'))
    academic_year = models.ForeignKey(
        AcademicYear, related_name='attendance_year', blank=True, null=True,
        verbose_name=pgettext_lazy('Attendance field', 'academic year'))
    attended = models.BooleanField(default=True, blank=True)
    date = models.DateField(pgettext_lazy('Attendance field', 'date'), default=now)
    description = models.TextField(
        verbose_name=pgettext_lazy('Attendance field', 'description'), blank=True, null=True)
    updated_at = models.DateTimeField(
        pgettext_lazy('Attendance field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('Attendance field', 'created'),
                                   default=now, editable=False)

    class Meta:
        app_label = 'attendance'
        unique_together = ('student', 'date')



