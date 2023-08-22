from django.urls import path
from .views import All_subtasks, A_subtask

urlpatterns = [
    path("", All_subtasks.as_view()),
    path('<int:subtask_id>/', A_subtask.as_view()),
]
