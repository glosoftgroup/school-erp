# site settings rest api serializers

from rest_framework import serializers
from app_dir.modules.finance.item.models import Item as Table
from app_dir.modules.finance.item.models import ItemChoiceValue as Value
from structlog import get_logger

global fields, module
module = 'finance_item'
fields = ('id',
          'name',)
logger = get_logger(__name__)


class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = 'name'


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name=module+':update')
    delete_url = serializers.HyperlinkedIdentityField(view_name=module+':api-delete')
    values = serializers.SerializerMethodField() # ValueSerializer(many=True)

    class Meta:
        model = Table
        fields = fields + ('values', 'update_url', 'delete_url',)

    def get_values(self, obj):
        try:
            value = []
            for item in obj.values.all():
                # return value.name
                value.append({'name': item.name})
            return value

        except:
            return []


class CreateListSerializer(serializers.ModelSerializer):
    values = serializers.JSONField(write_only=True)

    class Meta:
        model = Table
        fields = fields + ('values',)

    def create(self, validated_data):
        instance = Table()
        instance.name = validated_data.get('name')

        try:
            values = validated_data.pop('values')
            logger.info(type(values))
            logger.info('length of values '+str(len(values)))
            for value in values:
                logger.info('value loop')

        except Exception as e:
            logger.info(e)
            raise serializers.ValidationError('Values field should not be empty')

        instance.save()

        for value in values:
            logger.info(value)
            logger.info(type(value))
            item = Value()
            item.item = instance
            item.name = str(value)
            item.save()
            # value = Value.objects.create(item=instance, **value)
        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = fields

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)     

        instance.save()
        return instance
