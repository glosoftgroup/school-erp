# site settings rest api serializers

from rest_framework import serializers
from ...site.models import SiteSettings as Table
from ...site.models import SmsSettings as Sms


class UpdateSiteSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'email',
                  'mobile',
                  'image',
                  'code',
                  'postal_code',
                  'city',
                  'address'
                  )

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.code = validated_data.get('code', instance.code)
        instance.postal_code = validated_data.get('postal_code', instance.postal_code)
        instance.city = validated_data.get('city', instance.city)
        if validated_data.get('image'):
            instance.image = validated_data.get('image', instance.image)
        instance.address = validated_data.get('address', instance.address)
        instance.save()
        return instance


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'email',
                  'mobile',
                  'code',
                  'postal_code',
                  'image',
                  'city',
                  'address'
                 )


# sms settings serializers
class SmsSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sms
        fields = ('id',
                  'username',
                  'api_key'
                  )


class UpdateSmsSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sms
        fields = ('id',
                  'username',
                  'api_key'
                  )

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.api_key = validated_data.get('api_key', instance.api_key)
        instance.save()
        return instance
