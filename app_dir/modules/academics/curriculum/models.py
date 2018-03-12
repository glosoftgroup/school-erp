from __future__ import unicode_literals

from django.db import models
from ..subject.models import Subject
from ..classes.models import Class
from ..academic_year.models import AcademicYear
from django.contrib.postgres.fields import JSONField
import json


class Curriculum(models.Model):
    subject       = models.ForeignKey(Subject, default=1, on_delete=models.CASCADE)
    academicclass = models.ForeignKey(Class,  default=1, on_delete=models.CASCADE)
    academicyear  = models.ForeignKey(AcademicYear,  default=1, on_delete=models.CASCADE)
    topics        = JSONField(default={})


    class Meta:
        app_label = 'curriculum'

    def __str__(self):
        return self.subject.name

    @property
    def get_json_data(self):
        return json.dumps(self.topics)



