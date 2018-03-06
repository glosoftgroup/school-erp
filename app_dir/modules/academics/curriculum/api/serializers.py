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
                  'academicyear',
                  'topics',
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
                  'academicyear',
                  'topics',
                 )

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('academicyear'):
            instance.academicyear = validated_data.get('academicyear')
        if validated_data.get('topics'):
            instance.topics = validated_data.get('topics')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'academicyear',
                  'topics',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('academicyear'):
            instance.academicyear = validated_data.get('academicyear')
        if validated_data.get('topics'):
            instance.topics = validated_data.get('topics')

        instance.save()
        return instance
