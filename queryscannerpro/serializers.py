from rest_framework import serializers
from .models import QueryFile


class QueryScannerProSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryFile
        # fields = ('id', 'filename', 'content', 'user', 'date')
        fields = '__all__'
