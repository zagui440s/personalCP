from django.urls import path, include
from .views import All_tasks, A_task

urlpatterns = [
    path("", All_tasks.as_view()),
    path("<int:task_id>/", A_task.as_view()),
    path("<int:task_id>/subtasks/", include("subtask_app.urls")),
]
