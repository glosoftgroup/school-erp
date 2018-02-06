from rest_framework import generics

from .pagination import PostLimitOffsetPagination
from .serializers import (
    TableListSerializer,
     )
from ..models import SiteSettings as Table


class SettingsListAPIView(generics.ListAPIView):
    serializer_class = TableListSerializer
    pagination_class = PostLimitOffsetPagination
    queryset = Table.objects.all()
