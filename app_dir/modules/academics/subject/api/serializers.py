# site settings rest api serializers

from rest_framework import serializers
from ...subject.models import Subject as Table


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='subject:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='subject:api-delete')

    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'update_url',
                  'delete_url'
                 )


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                 )

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('name'):
            instance.name = validated_data.get('name', instance.name)
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('name'):
            instance.name = validated_data.get('name', instance.name)

        instance.save()
        return instance
