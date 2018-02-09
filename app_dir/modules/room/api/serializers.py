# site settings rest api serializers

from rest_framework import serializers
from ...site.models import SiteSettings as Table
from ...site.models import SmsSettings as Sms


class TableListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'name',
                  'created'
                 )

