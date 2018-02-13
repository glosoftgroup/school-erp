# site settings rest api serializers

from rest_framework import serializers
from ...term.models import Term as Table


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='term:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='term:api-delete')

    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'description',
                  'update_url',
                  'delete_url'
                 )


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'description',
                 )

    def create(self, validated_data):
        instance = Table()
        instance.name = validated_data.get('name')
        if validated_data.get('description'):
            instance.description = validated_data.get('description')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'description',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('name'):
            instance.name = validated_data.get('name', instance.name)
        if validated_data.get('description'):
            instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance
