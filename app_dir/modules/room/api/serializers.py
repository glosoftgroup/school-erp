# site settings rest api serializers

from rest_framework import serializers
from ...room.models import Room as Table

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
                  'description',
                  'max_capacity',
                  'current_capacity'
                 )

    def create(self, validated_data):
        instance = Table()
        instance.name = validated_data.get('name')
        if instance.description:
            instance.description = validated_data.get('description')
        if instance.max_capacity:
            instance.max_capacity = validated_data.get('max_capacity')
        if instance.current_capacity:
            instance.current_capacity = validated_data.get('current_capacity')
        instance.save()

        return instance

