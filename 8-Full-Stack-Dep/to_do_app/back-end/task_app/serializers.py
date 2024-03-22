from subtask_app.serializers import SubtaskSerializer, ModelSerializer
from .models import Task

class TaskSerializer(ModelSerializer):
    subtasks = SubtaskSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
