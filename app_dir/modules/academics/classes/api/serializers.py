# site settings rest api serializers

from rest_framework import serializers
from ...classes.models import Class as Table


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='classes:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='classes:api-delete')
    room = serializers.SerializerMethodField()
    academic_year = serializers.SerializerMethodField()
    stream = serializers.SerializerMethodField()
    class_teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'class_teacher',
                  'class_teacher_name',
                  'class_group',
                  'academic_year',
                  'room',
                  'no_of_students',
                  'stream',
                  'update_url',
                  'delete_url'
                 )
    def get_room(self, obj):
        return obj.room.name

    def get_academic_year(self, obj):
        return obj.academic_year.name

    def get_stream(self, obj):
        return obj.stream.name

    def get_class_teacher_name(self, obj):
        return obj.class_teacher.fullname


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'class_teacher',
                  'class_group',
                  'academic_year',
                  'room',
                  'no_of_students',
                  'stream',
                 )

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('name'):
            instance.name = validated_data.get('name', instance.name)
        if validated_data.get('class_teacher'):
            instance.class_teacher = validated_data.get('class_teacher')
        if validated_data.get('class_group'):
            instance.class_group = validated_data.get('class_group')
        if validated_data.get('academic_year'):
            instance.academic_year = validated_data.get('academic_year')
        if validated_data.get('room'):
            instance.room = validated_data.get('room')
        if validated_data.get('no_of_students'):
            instance.no_of_students = validated_data.get('no_of_students')
        if validated_data.get('stream'):
            instance.stream = validated_data.get('stream')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'class_teacher',
                  'class_group',
                  'academic_year',
                  'room',
                  'no_of_students',
                  'stream',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('name'):
            instance.name = validated_data.get('name', instance.name)
        if validated_data.get('class_teacher'):
            instance.class_teacher = validated_data.get('class_teacher')
        if validated_data.get('class_group'):
            instance.class_group = validated_data.get('class_group')
        if validated_data.get('academic_year'):
            instance.academic_year = validated_data.get('academic_year')
        if validated_data.get('room'):
            instance.room = validated_data.get('room')
        if validated_data.get('no_of_students'):
            instance.no_of_students = validated_data.get('no_of_students')
        if validated_data.get('stream'):
            instance.stream = validated_data.get('stream')

        instance.save()
        return instance
