# site settings rest api serializers

from rest_framework import serializers
from ...site.models import SiteSettings

from django.contrib.auth import get_user_model
User = get_user_model()


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ('id',
                  'name',
                  'email',
                  'image',
                 )

