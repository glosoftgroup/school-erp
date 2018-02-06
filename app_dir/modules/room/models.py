from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy


class Room(models.Model):
    name = models.CharField(
        pgettext_lazy('Room field', 'name'), unique=True, max_length=128)
    description = models.TextField(
        verbose_name=pgettext_lazy('Room field', 'description'), blank=True, null=True)

    updated_at = models.DateTimeField(
        pgettext_lazy('Room field', 'updated at'), auto_now=True, null=True)

    class Meta:
        app_label = 'room'
        verbose_name = pgettext_lazy('Room model', 'room')
        verbose_name_plural = pgettext_lazy('Rooms model', 'room')

    def __repr__(self):
        class_ = type(self)
        return '<%s.%s(pk=%r, name=%r)>' % (
            class_.__module__, class_.__name__, self.pk, self.name)

    def __str__(self):
        return self.name

