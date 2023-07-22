from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from list_app.models import List
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from .serializers import SubtaskSerializer, Sub_task
# Create your views here.

class All_subtasks(APIView):
    
    def get(self, request, id, task_id):
        a_list = get_object_or_404(List, id = id)
        subtasks = a_list.tasks.get(id = task_id).subtasks.order_by("id")
        return Response(SubtaskSerializer(subtasks, many = True).data)
    
    def post(self, request, id, task_id):
        a_list = get_object_or_404(List, id = id)
        task = a_list.tasks.get(id = task_id)
        request.data['parent_task'] = task
        new_subtask = Sub_task(**request.data)
        new_subtask.save()
        if task.completed:
            task.completed = not task.completed
            task.save()
        return Response(SubtaskSerializer(new_subtask).data, status=HTTP_201_CREATED)
    
class A_subtask(APIView):
    
    def get(self, request, id, task_id, subtask_id):
        a_list = get_object_or_404(List, id = id)
        subtask = a_list.tasks.get(id = task_id).subtasks.get(id = subtask_id)
        return Response(SubtaskSerializer(subtask).data)
    
    def put(self, request, id, task_id, subtask_id):
        try:
            a_list = get_object_or_404(List, id = id)
            task = a_list.tasks.get(id = task_id)
            subtask = task.subtasks.get(id = subtask_id)
            subtask.completed = request.data.get("completed", subtask.completed)
            subtask.sub_task_name = request.data.get("sub_task_name", subtask.sub_task_name)
            subtask.save()
            completed_task_count = 0
            for subtask in task.subtasks.all():
                if subtask.completed:
                    completed_task_count += 1
            if completed_task_count == len(task.subtasks.all()):
                task.completed = True
                task.save()
            return Response(status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response("something went wrong", status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id, task_id, subtask_id):
        a_list = get_object_or_404(List, id = id)
        subtask = a_list.tasks.get(id = task_id).subtasks.get(id = subtask_id)
        subtask.delete()
        return Response(status=HTTP_204_NO_CONTENT)

