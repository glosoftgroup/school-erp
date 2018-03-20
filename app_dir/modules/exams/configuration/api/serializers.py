# site settings rest api serializers

from rest_framework import serializers
from ...configuration.models import ExamConfiguration as Table
from structlog import get_logger

logger = get_logger(__name__)


class TableListSerializer(serializers.ModelSerializer):
    detail_url = serializers.HyperlinkedIdentityField(view_name='exam_configuration:detail')
    update_url = serializers.HyperlinkedIdentityField(view_name='exam_configuration:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='exam_configuration:api-delete')
    subject    = serializers.SerializerMethodField()
    academicyear    = serializers.SerializerMethodField()
    academicclass    = serializers.SerializerMethodField()
    term    = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'academicyear',
                  'academicclass',
                  'term',
                  'percentage',
                  'detail_url',
                  'update_url',
                  'delete_url'
                 )
    def get_subject(self, obj):
        return obj.subject.name

    def get_academicyear(self, obj):
        return obj.academicyear.name

    def get_academicclass(self, obj):
        return obj.academicclass.name

    def get_term(self, obj):
        return obj.term.name


class CreateListSerializer(serializers.ModelSerializer):
    exams = serializers.JSONField(write_only=True)

    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'academicyear',
                  'academicclass',
                  'term',
                  'is_percentage',
                  'exams',
                 )

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('academicyear'):
            instance.academicyear = validated_data.get('academicyear')
        if validated_data.get('academicclass'):
            instance.academicclass = validated_data.get('academicclass')
        if validated_data.get('term'):
            instance.term = validated_data.get('term')
        if validated_data.get('is_percentage'):
            instance.is_percentage = validated_data.get('is_percentage')

        logger.info('details: ' + str(validated_data))
        for i in validated_data.get('custom'):
            logger.info(i)
        # instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'academicyear',
                  'academicclass',
                  'term',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('academicyear'):
            instance.academicyear = validated_data.get('academicyear')
        if validated_data.get('academicclass'):
            instance.academicclass = validated_data.get('academicclass')
        if validated_data.get('term'):
            instance.term = validated_data.get('term')
        if validated_data.get('percentage'):
            instance.percentage = validated_data.get('percentage')

        instance.save()
        return instance
