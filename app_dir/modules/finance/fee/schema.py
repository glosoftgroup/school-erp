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
    structure = graphene.JSONString()

    class Meta:
        model = Item

    def resolve_structure(self, info):
        return {'name': 'paul'}


class Person(graphene.ObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    full_name = graphene.String()
    structure = graphene.JSONString()

    def resolve_full_name(self, info):
        return '{} {}'.format(self.first_name, self.last_name)

    def resolve_structure(self, info):
        return Item.objects.get_fee_summary(year='1', course='2')


class Query(object):
    all_fee_structure = graphene.List(
        FeeStructureType, year=graphene.String(),)
    all_fee_item = graphene.List(FeeItemType)
    all_classes = graphene.List(ClassType)
    all_academic_year = graphene.List(AcademicYearType)
    all_terms = graphene.List(TermType, year=graphene.String())
    all_persons = graphene.List(Person)

    def resolve_all_persons(self, info):
        data = Person(first_name='Peter', last_name='Griffin')
        return {data}

    def resolve_all_fee_structure(self, info, year=None, **kwargs):
        if year:
            return Table.objects.filter(academic_year__name=year)
        return Table.objects.all()

    def resolve_all_terms(self, info, year=None, **kwargs):
        if year:
            return Term.objects.filter(fee_term__academic_year__name=year)
        return Term.objects.all()

    def resolve_all_classes(self, info, **kwargs):
        return Class.objects.all()

    def resolve_all_academic_year(self, info, **kwargs):
        return AcademicYear.objects.all()

    def resolve_all_fee_item(self, info, **kwargs):
        # We can easily optimize query count in the resolve method
        return Item.objects.all()
