from rest_framework.serializers import ModelSerializer
from .models import List
from task_app.serializers import TaskSerializer, TaskOnlySerializer

class ListSerializer(ModelSerializer):
    tasks = TaskOnlySerializer(many= True)
    class Meta:
        model = List
        fields = ['id', 'list_name', 'tasks']