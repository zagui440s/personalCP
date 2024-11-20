from django.urls import path, register_converter
from .views import ListView, TaskView, SubTaskView

urlpatterns = [
    path('api/lists/', ListView.as_view(), name='list_view'),
    path('api/tasks/', TaskView.as_view(), name='task_view'),
    path('api/subtasks/', SubTaskView.as_view(), name='subtask_view'),
]
