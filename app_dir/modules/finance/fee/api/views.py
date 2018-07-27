from rest_framework import generics
from django.db.models import Q, Sum
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import pagination
from rest_framework.response import Response
from .pagination import PostLimitOffsetPagination

from app_dir.modules.finance.fee.models import FeeStructure as Table
from app_dir.modules.term.models import Term
from app_dir.modules.finance.fee.models import FeeItem as Item
from .serializers import (
    CreateListSerializer,
    TableListSerializer,
    UpdateSerializer
     )

from structlog import get_logger

logger = get_logger(__name__)


class CreateAPIView(generics.CreateAPIView):
    queryset = Table.objects.all()
    serializer_class = CreateListSerializer


class DestroyView(generics.DestroyAPIView):
    queryset = Table.objects.all()


class ListFeeAPIView(APIView):
    def get(self, request, format=None):
        terms = []
        items = []
        term_query = Term.objects.all()
        year = '2017-2018'
        for term in term_query:
            terms.append({'name': term.name})

        for item in Item.objects.filter(fee__academic_year__name=year):
            t = []
            for term in term_query:
                amount = Item.objects.filter(fee__academic_year__name=year, fee__term=term, pk=item.pk)
                try:
                    amount = amount.first().amount
                except:
                    amount = 0
                t.append({'term': term.name, 'amount': amount})
            found = []
            name = item.name + '-' + item.choice.get('name')
            found = [items.remove(i) for i in filter(lambda found: found['name'] == name, items)]
            f = [i for i in filter(lambda found: found['name'] == name, items)]

            logger.info(type(found))
            logger.info(len(found))
            logger.info(found)
            logger.info('hurt you')
            if not len(found):
                items.append({
                    'name': item.name + '-' + item.choice.get('name'),
                    'terms': t
                })
        results = {
            'results': {'terms': terms, 'items': items}
        }

        return Response(results)


class ListAPIView(generics.ListAPIView):
    """
        list details
        GET /api/list/
    """
    serializer_class = TableListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = PostLimitOffsetPagination

    def get_serializer_context(self):
        if self.request.GET.get('date'):
            return {"date": self.request.GET.get('date'), 'request': self.request}
        return {"date": None, 'request': self.request}

    def get_queryset(self, *args, **kwargs):
        try:
            if self.kwargs['pk']:
                queryset_list = Table.objects.filter(customer__pk=self.kwargs['pk']).order_by('car').distinct('car').select_related()
            else:
                queryset_list = Table.objects.all.select_related()
        except Exception as e:
            queryset_list = Table.objects.all()

        page_size = 'page_size'
        if self.request.GET.get(page_size):
            pagination.PageNumberPagination.page_size = self.request.GET.get(page_size)
        else:
            pagination.PageNumberPagination.page_size = 10
        if self.request.GET.get('date'):
            queryset_list = queryset_list.filter(created__icontains=self.request.GET.get('date'))

        query = self.request.GET.get('q')
        if query:
            queryset_list = queryset_list.filter(
                Q(academic_year__name__icontains=query) |
                Q(course__name__icontains=query) |
                Q(term__name__icontains=query) |
                Q(name__icontains=query)
            )
        return queryset_list.order_by('-id')


class UpdateAPIView(generics.RetrieveUpdateAPIView):
    """
        update instance details
        @:param pk instance id
        @:method PUT

        PUT /api/update/
        payload Json: /payload/instance.json
        
    """
    queryset = Table.objects.all()
    serializer_class = UpdateSerializer
