from rest_framework.serializers import ModelSerializer
from .models import Sub_task

class SubtaskSerializer(ModelSerializer):
    
    class Meta:
        model = Sub_task
        fields = ['id', 'sub_task_name', 'completed']