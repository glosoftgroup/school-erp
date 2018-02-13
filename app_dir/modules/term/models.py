from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now


class Term(models.Model):
    name = models.CharField(
        pgettext_lazy('Term field', 'name'), unique=True, max_length=128)
    description = models.TextField(
        verbose_name=pgettext_lazy('Term field', 'description'), blank=True, null=True)
    updated_at = models.DateTimeField(
        pgettext_lazy('Term field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('Term field', 'created'),
                                   default=now, editable=False)

    class Meta:
        app_label = 'term'
        verbose_name = pgettext_lazy('Term model', 'term')
        verbose_name_plural = pgettext_lazy('Terms model', 'term')

    def __str__(self):
        return str(self.name)




