# site settings rest api serializers

from rest_framework import serializers
from app_dir.modules.finance.item.models import Item as Table
from app_dir.modules.finance.item.models import ItemChoiceValue as Value
from structlog import get_logger

logger = get_logger(__name__)
global fields, module
module = 'finance_item'
fields = ('id',
          'name',)


class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = ('id', 'name')


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name=module+':api-update')
    update_view_url = serializers.HyperlinkedIdentityField(view_name=module+':update')
    delete_url = serializers.HyperlinkedIdentityField(view_name=module+':api-delete')
    values = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = fields + ('values', 'update_view_url', 'update_url', 'delete_url',)

    def get_values(self, obj):
        try:
            value = []
            for item in obj.values.all():
                # return value.name
                value.append({'id': item.id, 'text': item.name, 'name': item.name})
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
        except Exception as e:
            logger.info(e)
            raise serializers.ValidationError('Values field should not be empty')

        instance.save()

        for value in values:
            logger.info(value)
            logger.info(type(value))
            item = Value()
            item.item = instance
            item.name = str(value.get('value'))
            item.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    vals = serializers.JSONField(write_only=True)
    values = ValueSerializer(many=True)

    class Meta:
        model = Table
        fields = ('id', 'name', 'values', 'vals')

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        # try:
        values = validated_data.pop('vals')
        instance.values.all().delete()
        for value in values:
            item = Value()
            item.item = instance
            item.name = str(value.get('value'))
            item.save()
        # except Exception as e:
        #     pass
        return instance
