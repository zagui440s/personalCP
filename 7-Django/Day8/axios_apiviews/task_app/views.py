from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import List
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from .serializers import Task, TaskSerializer


class All_tasks(APIView):
    def get(self, request, id):
        return Response(
            TaskSerializer(get_object_or_404(List, id=id).tasks.order_by("id"), many=True).data
        )
    
    def post(self, request, id):
        a_list = get_object_or_404(List, id=id)
        request.data['parent_list'] = a_list
        new_task = Task(**request.data)
        new_task.save()
        return Response(TaskSerializer(new_task).data, status=HTTP_201_CREATED)

class A_task(APIView):

    def get(self, request, id, task_id):
        a_list = get_object_or_404(List, id=id)
        task = a_list.tasks.get(id = task_id)
        return Response(TaskSerializer(task).data)
    
    def put(self, request, id, task_id):
        try:
            a_list = get_object_or_404(List, id=id)
            task = a_list.tasks.get(id = task_id)
            task.task_name = request.data.get("task_name", task.task_name)
            task.completed = request.data.get("completed", task.completed)
            task.save()
            if task.completed:
                subtasks = task.subtasks.all()
                for subtask in subtasks:
                    subtask.completed = True
                    subtask.save()
            return Response(status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response("something went wrong", status=HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id, task_id):
        a_list = get_object_or_404(List, id=id)
        task = a_list.tasks.get(id = task_id)
        task.delete()
        return Response(status=HTTP_204_NO_CONTENT)