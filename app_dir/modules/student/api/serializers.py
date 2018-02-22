# site settings rest api serializers

from rest_framework import serializers
from ...student.models import Student as Table


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='student:api-delete')

    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'last_name',
                  'join_date',
                  'leave_date',
                  'update_url',
                  'delete_url'
                 )


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'last_name',
                  'join_date',
                  'leave_date',
                  'update_url',
                  'delete_url'
                 )

    def create(self, validated_data):
        instance = Table()
        instance.first_name = validated_data.get('first_name')
        instance.last_name = validated_data.get('last_name')
        if validated_data.get('description'):
            instance.description = validated_data.get('description')
        if validated_data.get('join_date'):
            instance.start_date = validated_data.get('join_date')
        if validated_data.get('leave_date'):
            instance.end_date = validated_data.get('leave_date')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'last_name',
                  'join_date',
                  'leave_date',
                 )

    def update(self, instance, validated_data):
        if validated_data.get('first_name'):
            instance.name = validated_data.get('first_name', instance.first_name)
        if validated_data.get('description'):
            instance.description = validated_data.get('description', instance.description)
        if validated_data.get('start_date'):
            instance.start_date = validated_data.get('start_date', instance.start_date)
        if validated_data.get('end_date'):
            instance.end_date = validated_data.get('end_date', instance.end_date)

        instance.save()
        return instance
