# site settings rest api serializers

from rest_framework import serializers
from app_dir.modules.attendance.models import Attendance as Table


global fields
fields = ('id',
          'student',
          'academic_year',
          'description',
          'date',)


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='attendance:update-attendance')
    delete_url = serializers.HyperlinkedIdentityField(view_name='attendance:api-delete')

    class Meta:
        model = Table
        fields = fields + ('update_url', 'delete_url',)


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = fields

    def create(self, validated_data):
        instance = Table()
        instance.student = validated_data.get('student')
        if validated_data.get('description'):
            instance.description = validated_data.get('description')
        if validated_data.get('academic_year'):
            instance.academic_year = validated_data.get('academic_year')
        if validated_data.get('date'):
            instance.date = validated_data.get('date')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = fields

    def update(self, instance, validated_data):
        instance.name = validated_data.get('student', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.academic_year = validated_data.get('academic_year', instance.academic_year)
        instance.date = validated_data.get('date', instance.date)

        instance.save()
        return instance
