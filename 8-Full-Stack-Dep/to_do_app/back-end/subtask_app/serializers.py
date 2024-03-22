from rest_framework.serializers import ModelSerializer
from .models import Subtask

class SubtaskSerializer(ModelSerializer):
    class Meta:
        model = Subtask
        fields = '__all__'