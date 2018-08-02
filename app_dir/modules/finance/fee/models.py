from __future__ import unicode_literals

from decimal import Decimal
from django.db import models
from django.contrib.postgres.fields import HStoreField
from django.contrib.postgres.fields import JSONField
from django.utils.translation import pgettext_lazy
from app_dir.modules.academics.academic_year.models import AcademicYear
from app_dir.modules.academics.classes.models import Class
from app_dir.modules.term.models import Term
from django.contrib.auth.models import (BaseUserManager)
from structlog import get_logger

logger = get_logger(__name__)

class FeeStructureManager(BaseUserManager):
    def get_fee_summary(self, year=None):
        year = '2017-2018'
        term_query, terms, items = Term.objects.all(), [], []
        [terms.append({'name': term.name}) for term in term_query]

        for item in self.fee_items.filter(fee__academic_year__name=year):
            name, t = item.name + '-' + item.choice.get('name'), []
            for term in term_query:
                amount = self.fee_items.filter(fee__academic_year__name=year, fee__term=term, pk=item.pk)
                try:
                    amount = amount.first().amount
                except:
                    amount = 0
                t.append({'term': term.name, 'amount': amount})
            # get other terms pricing
            f = [i for i in filter(lambda found: found['name'] == name, items)]
            # remove duplicates
            [items.remove(i) for i in filter(lambda found: found['name'] == name, items)]

            if not len(f):
                items.append({'name': name, 'terms': t})
            else:
                dynamic = []
                for i in range(len(terms)):
                    first = f[0].get('terms')
                    try:
                        dynamic.append({
                            'term': first[i].get('term'),
                            'amount': eval(str(first[i].get('amount'))) + eval(str(t[i].get('amount')))
                        })
                    except Exception as e:
                        logger.info(e)
                        pass
                items.append({'name': name, 'terms': dynamic})

        results = {
            'results': {'terms': terms, 'items': items}
        }

        return results

class FeeStructure(models.Model):
    academic_year = models.ForeignKey(
        AcademicYear, related_name='fee_year', blank=True, null=True,
        verbose_name=pgettext_lazy('FeeStructure field', 'academic year'))
    course = models.ForeignKey(
        Class, related_name='fee_class', blank=True, null=True,
        verbose_name=pgettext_lazy('FeeStructure field', 'class'))
    term = models.ForeignKey(
        Term, related_name='fee_term', blank=True, null=True,
        verbose_name=pgettext_lazy('FeeStructure field', 'term'))
    amount = models.DecimalField(max_digits=125, decimal_places=2, default=Decimal(0),
                                 verbose_name=pgettext_lazy('FeeStructure field', 'amount')
                                 )
    compulsory_amount = models.DecimalField(max_digits=125, decimal_places=2, default=Decimal(0),
                                 verbose_name=pgettext_lazy('FeeStructure field', 'amount')
                                 )
    name = models.CharField(max_length=100, blank=True)
    attributes = HStoreField(default={}, blank=True, null=True)
    objects = FeeStructureManager()

    class Meta:
        app_label = 'fee'
        unique_together = ("academic_year", "course", "term")

    def save(self, *args, **kwargs):
        self.name = self.academic_year.name +' Term:'+ self.term.name +' Class:'+ self.course.name
        super().save(*args, **kwargs)
    def __str__(self):
        return self.name


class FeeItemManager(BaseUserManager):
    def get_fee_summary(self, year=None, course=None):
        term_query, terms, items = Term.objects.all(), [], []
        # [terms.append({'name': term.name}) for term in term_query]
        for tm in term_query:
            total = 0
            for single in tm.fee_term.filter(academic_year__pk=year, course__pk=course):
                total += sum([one.amount for one in single.fee_items.all()])

            terms.append({'name': tm.name, 'amount': total})

        for item in self.filter(fee__academic_year__pk=year, fee__course__pk=course):
            name, t = item.name + '-' + item.choice.get('name'), []
            if item.compulsory:
                name += '*'
            for term in term_query:
                amount = self.filter(fee__academic_year__pk=year, fee__term=term, fee__course__pk=course, pk=item.pk)
                try:
                    amount = amount.first().amount
                except:
                    amount = 0
                t.append({'term': term.name, 'amount': amount,})
            # get other terms pricing
            f = [i for i in filter(lambda found: found['name'] == name, items)]
            # remove duplicates
            [items.remove(i) for i in filter(lambda found: found['name'] == name, items)]

            if not len(f):
                items.append({'name': name, 'compulsory': item.compulsory, 'terms': t})
            else:
                dynamic = []
                for i in range(len(terms)):
                    first = f[0].get('terms')
                    try:
                        dynamic.append({
                            'term': first[i].get('term'),
                            'amount': eval(str(first[i].get('amount'))) + eval(str(t[i].get('amount')))
                        })
                    except Exception as e:
                        logger.info(e)
                        pass
                items.append({'name': name, 'compulsory': item.compulsory, 'terms': dynamic})

        results = {
            'results': {'terms': terms, 'items': items}
        }

        return results

class FeeItem(models.Model):
    fee = models.ForeignKey(FeeStructure, related_name='fee_items', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    choice = JSONField(default={})
    compulsory = models.BooleanField(default=True)
    amount = models.DecimalField(
        pgettext_lazy('FeeItem field', 'total cost'), default=Decimal(0), max_digits=100, decimal_places=2)
    objects = FeeItemManager()

    class Meta:
        app_label = 'fee'

    def save(self, *args, **kwargs):
        total = sum([ n.amount for n in self.fee.fee_items.filter(compulsory=True) ])
        # self.name = total + Decimal(self.amount)
        self.fee.compulsory_amount = total
        self.fee.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
