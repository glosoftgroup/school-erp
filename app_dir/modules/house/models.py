from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from decimal import Decimal
from django.utils.translation import pgettext_lazy
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.timezone import now


class House(models.Model):
    name = models.CharField(
        pgettext_lazy('House field', 'name'), unique=True, max_length=128)
    description = models.TextField(
        verbose_name=pgettext_lazy('House field', 'description'), blank=True, null=True)
    floor = models.CharField(
        pgettext_lazy('House field', 'name'), blank=True, null=True,
        default='', max_length=128)
    max_capacity = models.IntegerField(
        pgettext_lazy('House field', 'quantity'),
        validators=[MinValueValidator(0)], default=Decimal(1))
    current_capacity = models.IntegerField(
        pgettext_lazy('House field', 'quantity'),
        validators=[MinValueValidator(0)], default=Decimal(1))

    updated_at = models.DateTimeField(
        pgettext_lazy('House field', 'updated at'), auto_now=True, null=True)
    created = models.DateTimeField(pgettext_lazy('House field', 'created'),
                                   default=now, editable=False)



