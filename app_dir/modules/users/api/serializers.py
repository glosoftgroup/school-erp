# site settings rest api serializers

from rest_framework.serializers import (
    ModelSerializer,
    ListField, CharField,
    SerializerMethodField
)
from django.contrib.auth.models import Group, Permission
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
User = get_user_model()


class UsersListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'username',
                  'email',
                  'image',
                  'job_title',
                  'nationalId',
                  'mobile'
                 )

class UsersCreateSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username',
                  'email',
                  'password',
                  'fullname',
                  'mobile',
                  'job_title',
                  'nationalId',
                  'image'
                 )

        def validate_groups(self, value):
            return value

        def create(self, validated_data):
            try:
                user = User.objects.create(fullname=validated_data.get('fullname'),
                                           username=validated_data.get('username'),
                                           mobile=validated_data.get('mobile'),
                                           nationalId=validated_data.get('nationalId'),
                                           email=validated_data.get('email'),
                                           password=validated_data.get('password'),
                                           job_title=validated_data.get('jobTitle'),
                                           image=validated_data.get('image'))
            except Exception as e:
                print(e)
            return user


