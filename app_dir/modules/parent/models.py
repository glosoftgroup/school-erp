from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now


class Parent(models.Model):
    first_name = models.CharField(
        pgettext_lazy('Parent field', 'first name'), blank=True, default='', max_length=128)
    middle_name = models.CharField(
        pgettext_lazy('Parent field', 'middle name'), blank=True, default='', max_length=128)
    last_name = models.CharField(
        pgettext_lazy('Parent field', 'last name'), blank=True, default='', max_length=128)
    email = models.EmailField(
        pgettext_lazy('Parent field', 'email'), blank=True, default='', max_length=128)
    mobile = models.CharField(
        pgettext_lazy('Parent field', 'mobile'), blank=True, default='', max_length=128)

    description = models.TextField(
        verbose_name=pgettext_lazy('Parent field', 'description'), blank=True, null=True)
    updated_at = models.DateTimeField(
        pgettext_lazy('Parent field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('Parent field', 'created'),
                                   default=now, editable=False)

    class Meta:
        app_label = 'parent'
        verbose_name = pgettext_lazy('Parent model', 'parent')
        verbose_name_plural = pgettext_lazy('Parents model', 'parent')

    def __str__(self):
        return str(self.first_name) + ' ' +str(self.last_name)




