# site settings rest api serializers

from rest_framework import serializers
from ...curriculum.models import Curriculum as Table


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='curriculum:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='curriculum:api-delete')
    subject    = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'topic',
                  'subtopic',
                  'period',
                  'objective',
                  'competencies',
                  'values',
                  'update_url',
                  'delete_url'
                 )
    def get_subject(self, obj):
        return obj.subject.name


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'topic',
                  'subtopic',
                  'period',
                  'objective',
                  'competencies',
                  'values',
                 )

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('topic'):
            instance.topic = validated_data.get('topic')
        if validated_data.get('subtopic'):
            instance.subtopic = validated_data.get('subtopic')
        if validated_data.get('period'):
            instance.period = validated_data.get('period')
        if validated_data.get('objective'):
            instance.objective = validated_data.get('objective')
        if validated_data.get('competencies'):
            instance.competencies = validated_data.get('competencies')
        if validated_data.get('values'):
            instance.values = validated_data.get('values')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'topic',
                  'subtopic',
                  'period',
                  'objective',
                  'competencies',
                  'values',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject', instance.subject)
        if validated_data.get('topic'):
            instance.topic = validated_data.get('topic')
        if validated_data.get('subtopic'):
            instance.subtopic = validated_data.get('subtopic')
        if validated_data.get('period'):
            instance.period = validated_data.get('period')
        if validated_data.get('objective'):
            instance.objective = validated_data.get('objective')
        if validated_data.get('competencies'):
            instance.competencies = validated_data.get('competencies')
        if validated_data.get('values'):
            instance.values = validated_data.get('values')

        instance.save()
        return instance
