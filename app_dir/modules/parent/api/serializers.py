# site settings rest api serializers

from rest_framework import serializers
from ...parent.models import Parent as Table


class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='parent:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='parent:api-delete')
    name = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'relation',
                  'description',
                  'mobile',
                  'email',
                  'update_url',
                  'delete_url'
                 )

    def get_name(self, obj):
        return str(obj.first_name)+ ' '+ str(obj.middle_name) +' '+str(obj.last_name)


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'relation',
                  'description',
                  'mobile',
                  'email',)

    def create(self, validated_data):
        instance = Table()

        instance.first_name = validated_data.get('first_name')
        if validated_data.get('middle_name'):
            instance.middle_name = validated_data.get('middle_name')
        if validated_data.get('last_name'):
            instance.last_name = validated_data.get('last_name')
        if validated_data.get('mobile'):
            instance.mobile = validated_data.get('mobile')
        if validated_data.get('email'):
            instance.email = validated_data.get('email')
        if validated_data.get('relation'):
            instance.relation = validated_data.get('relation')
        if validated_data.get('description'):
            instance.description = validated_data.get('description')
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'relation',
                  'description',
                  'mobile',
                  'email',
                 )

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.middle_name = validated_data.get('middle_name', instance.middle_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.email = validated_data.get('email', instance.email)
        instance.description = validated_data.get('description', instance.description)
        instance.relation = validated_data.get('relation', instance.relation)

        instance.save()
        return instance
