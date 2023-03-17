from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    thumbnail=serializers.CharField(source='get_thumbnail')

    class Meta:
        model=Category
        fields=[
            'id',
            'name',
            'thumbnail',
        ]