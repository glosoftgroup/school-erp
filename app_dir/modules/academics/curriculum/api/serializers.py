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
                  'subtopics',
                  'period',
                  'objectives',
                  'expectations',
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
                  'subtopics',
                  'period',
                  'objectives',
                  'expectations',
                  'values',
                 )

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('topic'):
            instance.topic = validated_data.get('topic')
        if validated_data.get('subtopics'):
            instance.subtopics = validated_data.get('subtopics')
        if validated_data.get('period'):
            instance.period = validated_data.get('period')
        if validated_data.get('objectives'):
            instance.objectives = validated_data.get('objectives')
        if validated_data.get('expectations'):
            instance.expectations = validated_data.get('expectations')
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
                  'subtopics',
                  'period',
                  'objectives',
                  'expectations',
                  'values',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject', instance.subject)
        if validated_data.get('topic'):
            instance.topic = validated_data.get('topic')
        if validated_data.get('subtopics'):
            instance.subtopics = validated_data.get('subtopics')
        if validated_data.get('period'):
            instance.period = validated_data.get('period')
        if validated_data.get('objectives'):
            instance.objectives = validated_data.get('objectives')
        if validated_data.get('expectations'):
            instance.expectations = validated_data.get('expectations')
        if validated_data.get('values'):
            instance.values = validated_data.get('values')

        instance.save()
        return instance
