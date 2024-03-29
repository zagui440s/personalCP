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
from .serializers import TaskSerializer, Task

# Create your views here.


class All_tasks(PermissionView):

    def get(self, request):
        tasks = request.user.tasks.all()
        ser_tasks = TaskSerializer(tasks, many=True)
        return Response(ser_tasks.data)

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id
        task = TaskSerializer(data=data)
        if task.is_valid():
            task.save()
            return Response(task.data, status=HTTP_201_CREATED)
        else:
            print(task.errors)
            return Response("Request Body missing content", status=HTTP_400_BAD_REQUEST)


class A_task(PermissionView):
    def get_a_task(self,obj, id):
        task = get_object_or_404(obj, id=id)
        return task

    def get(self, request, task_id):
        ser_task = TaskSerializer(self.get_a_task(request.user.tasks, task_id))
        return Response(ser_task.data)

    def put(self, request, task_id):
        ser_task = TaskSerializer(self.get_a_task(request.user.tasks,task_id), data=request.data, partial=True)
        if ser_task.is_valid():
            ser_task.save()
            return Response(f"{ser_task.data['title']} has been updated", status=HTTP_200_OK)
        else:
            print(ser_task.errors)
            return Response(ser_task.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, task_id):
        task = self.get_a_task(request.user.tasks,task_id)
        task.delete()
        return Response(status=HTTP_204_NO_CONTENT)
