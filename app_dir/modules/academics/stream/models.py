from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy


class Stream(models.Model):
    name = models.CharField(
        pgettext_lazy('Stream field', 'name'), unique=True, max_length=128)


    class Meta:
        app_label = 'stream'

    def __str__(self):
        return self.name



