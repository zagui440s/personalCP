from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import List, Task, SubTask
from .serializers import ListSerializer, TaskSerializer, SubTaskSerializer

# Create your views here.
class ListView(APIView):
    def get(self, request):
        lists = List.objects.all()  # Fetch all Lists
        serializer = ListSerializer(lists, many=True)
        return Response(serializer.data)

# Task View - GET all Tasks
class TaskView(APIView):
    def get(self, request):
        tasks = Task.objects.all()  # Fetch all Tasks
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

# SubTask View - GET all SubTasks
class SubTaskView(APIView):
    def get(self, request):
        subtasks = SubTask.objects.all()  # Fetch all SubTasks
        serializer = SubTaskSerializer(subtasks, many=True)
        return Response(serializer.data)