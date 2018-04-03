# site settings rest api serializers

from rest_framework import serializers
from app_dir.modules.finance.item.models import Item as Table

global fields, module
module = 'item'
fields = ('id',
          'name',)


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name=module+':update')
    delete_url = serializers.HyperlinkedIdentityField(view_name=module+':api-delete')

    class Meta:
        model = Table
        fields = fields + ('update_url', 'delete_url',)


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = fields

    def create(self, validated_data):
        instance = Table()
        instance.student = validated_data.get('name')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = fields

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)     

        instance.save()
        return instance
