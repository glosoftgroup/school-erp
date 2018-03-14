from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now
from django.contrib.auth import get_user_model
from app_dir.modules.academics.academic_year.models import AcademicYear
from app_dir.modules.academics.classes.models import Class
from app_dir.modules.academics.subject.models import Subject
from app_dir.modules.term.models import Term

User = get_user_model()


class ClassAllocation(models.Model):
    teacher = models.ForeignKey(User)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    classTaught = models.ForeignKey(Class, on_delete=models.CASCADE)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    academicYear = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)

    hours = models.CharField(
        pgettext_lazy('ClassAllocation field', 'hours_per_week'), max_length=128)

    updated_at = models.DateTimeField(
        pgettext_lazy('Term field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('Term field', 'created'),
                                   default=now, editable=False)

    class Meta:
        app_label = 'class_allocation'
        verbose_name = pgettext_lazy('ClassAllocation model', 'term')
        verbose_name_plural = pgettext_lazy('ClassAllocation model', 'term')

    def __str__(self):
        return str(self.teacher.username)




