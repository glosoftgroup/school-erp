from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from decimal import Decimal
from django.utils.translation import pgettext_lazy
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.timezone import now


class Room(models.Model):
    name = models.CharField(
        pgettext_lazy('Room field', 'name'), unique=True, max_length=128)
    description = models.TextField(
        verbose_name=pgettext_lazy('Room field', 'description'), blank=True, null=True)


class Classes(models.Model):
    name = models.CharField(
        pgettext_lazy('Classes field', 'name'), unique=True, max_length=128)
    description = models.TextField(
        verbose_name=pgettext_lazy('Classes field', 'description'), blank=True, null=True)
    max_capacity = models.IntegerField(
        pgettext_lazy('Classes field', 'quantity'),
        validators=[MinValueValidator(0)], default=Decimal(1))
    current_capacity = models.IntegerField(
        pgettext_lazy('Classes field', 'quantity'),
        validators=[MinValueValidator(0)], default=Decimal(1))
    class_teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL, blank=True, null=True,
        verbose_name=pgettext_lazy('Classes field', 'user'))
    floor = models.CharField(
        pgettext_lazy('Classes field', 'name'), blank=True, null=True,
        default='', max_length=128)
    updated_at = models.DateTimeField(
        pgettext_lazy('Classes field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('Room field', 'created'),
                                   default=now, editable=False)

    class Meta:
        app_label = 'room'
        verbose_name = pgettext_lazy('Classes model', 'room')
        verbose_name_plural = pgettext_lazy('Classes model', 'room')

    def __repr__(self):
        class_ = type(self)
        return '<%s.%s(pk=%r, name=%r)>' % (
            class_.__module__, class_.__name__, self.pk, self.name)

    def __str__(self):
        return self.name

