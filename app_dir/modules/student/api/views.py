from rest_framework import generics
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import pagination
from .pagination import PostLimitOffsetPagination
from rest_framework.parsers import MultiPartParser, FormParser
from ...student.models import Student as Table
from ...student.models import StudentOfficialDetails as OfficialDetail
from .serializers import (
    CreateListSerializer,
    CreateOfficialDetailListSerializer,
    TableListSerializer,
    OfficialDetailsListSerializer,
    UpdateSerializer,
    UpdateOfficialDetailListSerializer,
     )

User = get_user_model()


# personal details
class CreateAPIView(generics.CreateAPIView):
    parser_classes = (MultiPartParser, FormParser,)  # Used to parse the Request.
    queryset = Table.objects.all()
    serializer_class = CreateListSerializer


class DestroyView(generics.DestroyAPIView):
    queryset = Table.objects.all()


class ListAPIView(generics.ListAPIView):
    """
        list details
        GET /api/setting/
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
                Q(first_name__icontains=query) |
                Q(last_name__icontains=query) |
                Q(middle_name__icontains=query) |
                Q(student_official__adm_no__icontains=query)
            )
        return queryset_list.order_by('-id')


class UpdateAPIView(generics.RetrieveUpdateAPIView):
    """
        update instance details
        @:param pk instance id
        @:method PUT

        PUT /api/student/update/
        payload Json: /payload/update.json
    """
    queryset = Table.objects.all()
    serializer_class = UpdateSerializer


# official detail
class CreateOfficialDetailsAPIView(generics.CreateAPIView):
    """
        create student official details
        @:param pk instance id
        @:method POST

        PUT /api/student/official/update/
        payload Json: /payload/update.json
    """
    # parser_classes = (MultiPartParser, FormParser,)  # Used to parse the Request.
    queryset = OfficialDetail.objects.all()
    serializer_class = CreateOfficialDetailListSerializer


class OfficialDetailsListAPIView(generics.ListAPIView):
    """
        list details
        GET /api/
    """
    serializer_class = OfficialDetailsListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = PostLimitOffsetPagination

    def get_serializer_context(self):
        if self.request.GET.get('date'):
            return {"date": self.request.GET.get('date'), 'request': self.request}
        return {"date": None, 'request': self.request}

    def get_queryset(self, *args, **kwargs):
        try:
            if self.kwargs['pk']:
                queryset_list = OfficialDetail.objects.filter(student__pk=int(self.kwargs['pk'])).select_related()
            else:
                queryset_list = OfficialDetail.objects.all.select_related()
        except Exception as e:
            queryset_list = OfficialDetail.objects.all()

        return queryset_list


class UpdateOfficialDetailsAPIView(generics.RetrieveUpdateAPIView):
    """
        update instance details
        @:param pk instance id
        @:method PUT

        PUT /api/student/official/update/
        payload Json: /payload/update.json
    """
    queryset = OfficialDetail.objects.all()
    serializer_class = UpdateOfficialDetailListSerializer
