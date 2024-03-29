from django.db import models
from task_app.models import Task


# Create your models here.
class Subtask(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="subtasks")
