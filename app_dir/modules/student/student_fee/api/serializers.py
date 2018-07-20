# site settings rest api serializers

from rest_framework import serializers
from app_dir.modules.student.student_fee.models import Fee as Table
from app_dir.modules.student.student_fee.models import Item as Item
from structlog import get_logger
import re

logger = get_logger(__name__)
global fields, module
module = 'student_fee'
fields = ('id',
          'name',
          'academic_year',
          'course',
          'term',
          'compulsory_amount',
          'amount')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
                'id',
                'name',
                'amount',
                'compulsory',
                'choice')


class TableListSerializer(serializers.ModelSerializer):
    academic_name = serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()
    term_name = serializers.SerializerMethodField()
    update_url = serializers.HyperlinkedIdentityField(view_name=module+':update')
    delete_url = serializers.HyperlinkedIdentityField(view_name=module+':api-delete')
    fee_items = ItemSerializer(many=True)

    class Meta:
        model = Table
        fields = fields + ('course_name', 'term_name', 'academic_name', 'update_url', 'delete_url', 'fee_items',)

    def get_academic_name(self, obj):
        try:
            return obj.academic_year.name
        except:
            return ''

    def get_course_name(self, obj):
        try:
            return obj.course.name
        except:
            return ''

    def get_term_name(self, obj):
        try:
            return obj.term.name
        except:
            return ''


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
        if validated_data.get('amount'):
            instance.amount = validated_data.get('amount')
        try:
            fee_items = validated_data.pop('fee_items')
        except:
            raise serializers.ValidationError('Fee items field should not be empty')

        instance.save()

        for fee_item in fee_items:
            fee_item['id'] = None
            fee_item['name'] = re.sub(r'\d', '', fee_item['name']).replace('[.]','')
            try:
                fee_item['choice']['id'] = fee_item['_id']
            except:
                pass
            del fee_item['values']
            del fee_item['update_url']
            del fee_item['update_view_url']
            del fee_item['delete_url']
            del fee_item['_id']
            logger.info(fee_item)
            Item.objects.create(fee=instance, **fee_item)

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    values = serializers.JSONField(write_only=True)
    fee_items = ItemSerializer(many=True, required=False)

    class Meta:
        model = Table
        fields = fields + ('fee_items', 'values')

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.academic_year = validated_data.get('academic_year', instance.academic_year)
        instance.term = validated_data.get('term', instance.term)
        instance.course = validated_data.get('course', instance.course)
        instance.amount = validated_data.get('amount', instance.amount)

        try:
            fee_items = validated_data.pop('values')
        except:
            raise serializers.ValidationError('Fee items field should not be empty')

        instance.save()
        instance.fee_items.all().delete()
        for fee_item in fee_items:
            fee_item['id'] = None
            logger.info(fee_item.get('compulsory'))
            fee_item['name'] = re.sub(r'\d', '', fee_item['name']).replace('[.]','')
            try:
                del fee_item['update_url']
                del fee_item['delete_url']
                del fee_item['update_view_url']
                del fee_item['_id']
                del fee_item['values']
                del fee_item['value']
                fee_item['choice']['id'] = fee_item['_id']
            except:
                pass

            try:
                fee_item['choice']['id'] = int(fee_item['choice']['id'])
            except:
                pass

            logger.info(fee_item)
            Item.objects.create(fee=instance, **fee_item)

        return instance
