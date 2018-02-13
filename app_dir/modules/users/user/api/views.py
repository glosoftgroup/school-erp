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


