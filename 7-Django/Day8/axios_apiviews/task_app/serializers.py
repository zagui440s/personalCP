from rest_framework.serializers import ModelSerializer
from .models import Task
from sub_task_app.serializers import SubtaskSerializer

class TaskSerializer(ModelSerializer):
    subtasks = SubtaskSerializer(many=True)
    
    class Meta:
        model = Task
        fields = ['id', 'task_name', 'completed', 'subtasks']

class TaskOnlySerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task_name', 'completed']