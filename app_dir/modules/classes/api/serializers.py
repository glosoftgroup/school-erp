# site settings rest api serializers

from rest_framework import serializers
from ...site.models import SiteSettings as Table

from django.contrib.auth import get_user_model
User = get_user_model()


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'username',
                 )


class TableListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'created'
                 )

