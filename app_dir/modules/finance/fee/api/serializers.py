# site settings rest api serializers

from rest_framework import serializers
from structlog import get_logger
from app_dir.modules.finance.fee.models import FeeStructure as Table

global fields, module
module = 'fee'
fields = ('id',
          'name',
          'academic_year',
          'course',
          'term',)
logger = get_logger(__name__)


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name=module+':api-update')
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
        if validated_data.get('academic_year'):
            instance.academic_year = validated_data.get('academic_year')
        if validated_data.get('term'):
            instance.term = validated_data.get('term')
        if validated_data.get('course'):
            instance.course = validated_data.get('course')
        instance.save()
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
