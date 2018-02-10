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

class GroupListSerializer(ModelSerializer):
    class Meta:
        model = Group
        field = ('id',
                 'name',
                 )

class UsersListSerializer(ModelSerializer):
    permissions = SerializerMethodField()
    class Meta:
        model = User
        fields = ('id',
                  'username',
                  'fullname',
                  'email',
                  'image',
                  'jobTitle',
                  'nationalId',
                  'mobile',
                  'permissions'
                 )
    def get_permissions(self, ob):
        userPermissions = Permission.objects.filter(user=ob)
        permissionNames = []
        for perm in userPermissions:
            permissionNames.append(perm.name)
        return permissionNames

class UsersCreateSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username',
                  'email',
                  'password',
                  'fullname',
                  'mobile',
                  'jobTitle',
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


