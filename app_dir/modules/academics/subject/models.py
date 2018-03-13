from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from django.contrib.postgres.fields import ArrayField


class Subject(models.Model):
    name = models.CharField(
        pgettext_lazy('Subject field', 'name'), unique=True, max_length=128)


    class Meta:
        app_label = 'subject'

    def __str__(self):
        return self.name

class Topic(models.Model):
    subject       = models.ForeignKey(Subject, related_name='topics', on_delete=models.CASCADE)
    name          = models.CharField(null=True, blank=True, max_length=228)
    period        = models.CharField(null=True, blank=True, max_length=228)
    objectives    = ArrayField(models.CharField(max_length=300), blank=True)
    expectations  = ArrayField(models.CharField(max_length=300), blank=True)
    subtopics     = ArrayField(models.CharField(max_length=300), blank=True)


    class Meta:
        app_label = 'topic'

    def __str__(self):
        return self.name



