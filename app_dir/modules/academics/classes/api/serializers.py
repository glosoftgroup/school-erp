# site settings rest api serializers

from rest_framework import serializers
from ...classes.models import Class as Table


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='stream:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='stream:api-delete')

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
                  'name'
                 )

    def create(self, validated_data):
        instance = Table()
        print(validated_data.get('start_date'))
        print('*'*100)
        instance.name = validated_data.get('name')
        if validated_data.get('description'):
            instance.description = validated_data.get('description')
        if validated_data.get('start_date'):
            instance.start_date = validated_data.get('start_date')
        if validated_data.get('end_date'):
            instance.end_date = validated_data.get('end_date')
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
