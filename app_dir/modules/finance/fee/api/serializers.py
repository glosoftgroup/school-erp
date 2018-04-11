# site settings rest api serializers

from rest_framework import serializers
from app_dir.modules.finance.fee.models import FeeStructure as Table
from app_dir.modules.finance.fee.models import FeeItem as Item
from structlog import get_logger
import re

logger = get_logger(__name__)
global fields, module
module = 'fee'
fields = ('id',
          'name',
          'academic_year',
          'course',
          'term',
          'amount')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
                'id',
                'name',
                'amount',
                'choice')


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name=module+':api-update')
    delete_url = serializers.HyperlinkedIdentityField(view_name=module+':api-delete')
    fee_items = ItemSerializer(many=True)

    class Meta:
        model = Table
        fields = fields + ('update_url', 'delete_url', 'fee_items',)


class CreateListSerializer(serializers.ModelSerializer):
    fee_items = serializers.JSONField(write_only=True)

    class Meta:
        model = Table
        fields = fields + ('fee_items',)

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('academic_year'):
            instance.academic_year = validated_data.get('academic_year')
        if validated_data.get('term'):
            instance.term = validated_data.get('term')
        if validated_data.get('course'):
            instance.course = validated_data.get('course')
        try:
            fee_items = validated_data.pop('fee_items')
        except:
            raise serializers.ValidationError('Fee items field should not be empty')

        instance.save()

        for fee_item in fee_items:
            fee_item['id'] = None
            fee_item['name'] = re.sub(r'\d', '', fee_item['name']).replace('[.]','')

            fee_item['choice']['id'] = fee_item['_id']
            del fee_item['values']
            del fee_item['update_url']
            del fee_item['delete_url']
            del fee_item['_id']
            Item.objects.create(fee=instance, **fee_item)

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    values = serializers.JSONField(write_only=True)

    class Meta:
        model = Table
        fields = fields + ('values',)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.academic_year = validated_data.get('academic_year', instance.academic_year)
        instance.term = validated_data.get('term', instance.term)
        instance.course = validated_data.get('course', instance.course)

        instance.save()

        return instance
