from rest_framework import serializers
from .models import List, Task, SubTask

class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ['id', 'sub_task_name', 'completed', 'parent_task_id']

class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubTaskSerializer(many=True, read_only=True)  # Nested SubTask

    class Meta:
        model = Task
        fields = ['id', 'task_name', 'completed', 'parent_list_id', 'subtasks']

class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)  # Nested Task

    class Meta:
        model = List
        fields = ['id', 'list_name', 'tasks']
