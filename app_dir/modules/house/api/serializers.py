# site settings rest api serializers

from rest_framework import serializers
from ...house.models import House as Table

from django.contrib.auth import get_user_model
User = get_user_model()


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'username',
                 )


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='house:update-house')
    delete_url = serializers.HyperlinkedIdentityField(view_name='house:api-delete')

    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'description',
                  'max_capacity',
                  'current_capacity',
                  'update_url',
                  'delete_url'
                 )


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'description',
                  'max_capacity',
                  'current_capacity'
                 )

    def create(self, validated_data):
        instance = Table()
        instance.name = validated_data.get('name')
        if validated_data.get('description'):
            instance.description = validated_data.get('description')
        if validated_data.get('max_capacity'):
            instance.max_capacity = validated_data.get('max_capacity')
        if validated_data.get('current_capacity'):
            instance.current_capacity = validated_data.get('current_capacity')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'description',
                  'max_capacity',
                  'current_capacity',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('name'):
            instance.name = validated_data.get('name', instance.name)
        if validated_data.get('description'):
            instance.description = validated_data.get('description', instance.description)
        if validated_data.get('max_capacity'):
            instance.max_capacity = validated_data.get('max_capacity', instance.max_capacity)
        if validated_data.get('current_capacity'):
            instance.current_capacity = validated_data.get('current_capacity', instance.current_capacity)

        instance.save()
        return instance
