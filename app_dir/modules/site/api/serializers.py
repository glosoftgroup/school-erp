from rest_framework import serializers

from ..models import SiteSettings as Table


class TableListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = ('id', 'name')