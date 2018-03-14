from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers import (
    UsersListSerializer,
    UsersCreateSerializer,
     )

User = get_user_model()


class UserListAPIView(generics.ListAPIView):
    """
        list site settings details
        GET /api/setting/
    """
    serializer_class = UsersListSerializer
    pagination_class = None
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all()

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersCreateSerializer

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

class ListClassTeachersAPIView(generics.ListAPIView):
    """
        list details
        GET /api/setting/
    """
    serializer_class = UsersListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_serializer_context(self):
        if self.request.GET.get('date'):
            return {"date": self.request.GET.get('date'), 'request': self.request}
        return {"date": None, 'request': self.request}

    def get_queryset(self, *args, **kwargs):
        queryset_list = User.objects.all().filter(is_teacher=True)
        return queryset_list.order_by('-id')


