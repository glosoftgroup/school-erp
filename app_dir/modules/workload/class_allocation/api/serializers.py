# site settings rest api serializers

from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from ...class_allocation.models import ClassAllocation as Table


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='class_allocation:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='class_allocation:api-delete')
    classTaught = serializers.SerializerMethodField()
    teacher = serializers.SerializerMethodField()
    subject = serializers.SerializerMethodField()
    academicYear = serializers.SerializerMethodField()
    term = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ('id',
                  'teacher',
                  'subject',
                  'classTaught',
                  'term',
                  'academicYear',
                  'hours',
                  'update_url',
                  'delete_url'
                 )

    def get_classTaught(self, obj):
        return (str(obj.classTaught.name) + " " + str(obj.classTaught.stream.name))
    def get_teacher(self, obj):
        return obj.teacher.fullname
    def get_subject(self, obj):
        return obj.subject.name
    def get_academicYear(self, obj):
        return obj.academicYear.name
    def get_term(self, obj):
        return obj.term.name


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'teacher',
                  'subject',
                  'classTaught',
                  'term',
                  'academicYear',
                  'hours',
                 )
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=model.objects.all(),
                fields=(
                  'subject',
                  'classTaught',
                  'term',
                  'academicYear'),
                message=_("Allocation Exists.")
            )
        ]

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('teacher'):
            instance.teacher = validated_data.get('teacher')
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('classTaught'):
            instance.classTaught = validated_data.get('classTaught')
        if validated_data.get('term'):
            instance.term = validated_data.get('term')
        if validated_data.get('academicYear'):
            instance.academicYear = validated_data.get('academicYear')
        if validated_data.get('hours'):
            instance.hours = validated_data.get('hours')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'teacher',
                  'subject',
                  'classTaught',
                  'term',
                  'academicYear',
                  'hours',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('teacher'):
            instance.teacher = validated_data.get('teacher')
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('classTaught'):
            instance.classTaught = validated_data.get('classTaught')
        if validated_data.get('term'):
            instance.term = validated_data.get('term')
        if validated_data.get('academicYear'):
            instance.academicYear = validated_data.get('academicYear')
        if validated_data.get('hours'):
            instance.hours = validated_data.get('hours')

        instance.save()
        return instance
