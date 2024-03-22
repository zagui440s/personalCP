from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
)
from user_app.views import PermissionView
from .serializers import Subtask, SubtaskSerializer

# Create your views here.


class All_subtasks(PermissionView):

    def get(self, request, task_id):
        subtasks = request.user.tasks.get(id=task_id).subtasks.all()
        ser_subtasks = SubtaskSerializer(subtasks, many=True)
        return Response(ser_subtasks.data)

    def post(self, request, task_id):
        data = request.data.copy()
        data['task'] = request.user.tasks.get(id=task_id).id
        subtask = SubtaskSerializer(data=data)
        if subtask.is_valid():
            subtask.save()
            return Response(f"{subtask.data['title']} has been created", status=HTTP_201_CREATED)
        else:
            print(subtask.errors)
            return Response("Request Body missing content", status=HTTP_400_BAD_REQUEST)


class A_subtask(PermissionView):
    def get_a_task(self,obj, id):
        task = get_object_or_404(obj, id=id)
        return task

    def get(self, request, task_id, subtask_id):
        ser_task = SubtaskSerializer(self.get_a_task(request.user.tasks.get(id=task_id).subtasks, subtask_id))
        return Response(ser_task.data)

    def put(self, request, task_id, subtask_id):
        ser_task = SubtaskSerializer(self.get_a_task(request.user.tasks.get(id=task_id).subtasks,subtask_id), data=request.data, partial=True)
        if ser_task.is_valid():
            ser_task.save()
            return Response(f"{ser_task.data['title']} has been updated", status=HTTP_200_OK)
        else:
            print(ser_task.errors)
            return Response(ser_task.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, task_id, subtask_id):
        task = self.get_a_task(request.user.tasks.get(id=task_id).subtasks,subtask_id)
        task.delete()
        return Response(status=HTTP_204_NO_CONTENT)
