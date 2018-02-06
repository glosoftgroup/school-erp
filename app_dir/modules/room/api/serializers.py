from rest_framework import serializers

from ..models import Room as Table


class TableListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = ('id', 'name')