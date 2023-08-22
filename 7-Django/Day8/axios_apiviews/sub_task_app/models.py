from django.db import models
from task_app.models import Task

# Create your models here.
class Sub_task(models.Model):
    sub_task_name = models.CharField()
    completed = models.BooleanField()
    parent_task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='subtasks')

    def __str__(self):
        return f"Name: {self.sub_task_name} | Completed: {self.completed}"