from rest_framework import serializers
from .models import Move

class MoveSerializer(serializers.Serializer):
    class Meta:
        model = Move
        fields = ['id', 'power', 'accuracy']