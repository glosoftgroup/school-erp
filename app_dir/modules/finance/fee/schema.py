# finance/fee/schema.py
import graphene

from graphene_django.types import DjangoObjectType

from .models import FeeItem as Item
from .models import FeeStructure as Table
from .models import Class, Term, AcademicYear


class FeeStructureType(DjangoObjectType):
    class Meta:
        model = Table


class ClassType(DjangoObjectType):
    class Meta:
        model = Class


class TermType(DjangoObjectType):
    class Meta:
        model = Term


class AcademicYearType(DjangoObjectType):
    class Meta:
        model = AcademicYear


class FeeItemType(DjangoObjectType):
    class Meta:
        model = Item


class Query(object):
    all_fee_structure = graphene.List(FeeStructureType)
    all_fee_item = graphene.List(FeeItemType)
    all_classes = graphene.List(FeeItemType)
    all_academic_year = graphene.List(FeeItemType)
    all_terms = graphene.List(FeeItemType)

    def resolve_all_fee_structure(self, info, **kwargs):
        return Table.objects.all()

    def resolve_all_terms(self, info, **kwargs):
        return Term.objects.all()

    def resolve_all_classes(self, info, **kwargs):
        return Class.objects.all()

    def resolve_all_classes(self, info, **kwargs):
        return AcademicYear.objects.all()

    def resolve_all_fee_item(self, info, **kwargs):
        # We can easily optimize query count in the resolve method
        return Item.objects.all()
