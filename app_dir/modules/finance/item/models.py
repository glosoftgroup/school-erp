from __future__ import unicode_literals

from django.db import models
from django.utils.translation import pgettext_lazy
from django.core.validators import MinValueValidator, RegexValidator


class Item(models.Model):
    slug = models.SlugField(
        pgettext_lazy('Fee item field', 'internal name'),
        max_length=50, unique=True)
    name = models.CharField(
        pgettext_lazy('Fee item field', 'display name'),
        max_length=100, unique=True)

    class Meta:
        ordering = ('slug', )
        verbose_name = pgettext_lazy('Item model', 'Fee item')
        verbose_name_plural = pgettext_lazy('Fee Items model', 'Fee item')

    def __str__(self):
        return self.name

    def has_values(self):
        return self.values.exists()


class ItemChoiceValue(models.Model):
    name = models.CharField(
        pgettext_lazy('Item choice value field', 'display name'),
        max_length=100)
    slug = models.SlugField()
    color = models.CharField(
        pgettext_lazy('Item choice value field', 'color'),
        max_length=7,
        validators=[RegexValidator('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')],
        blank=True)
    item = models.ForeignKey(Item, related_name='values')

    class Meta:
        unique_together = ('name', 'item')
        verbose_name = pgettext_lazy(
            'Item choice value model',
            'Item choices value')
        verbose_name_plural = pgettext_lazy(
            'Item choice value model',
            'Item choices values')

    def __str__(self):
        return self.name


