from django.db import models
from list_app.models import List
# Create your models here.
class Task(models.Model):
    task_name = models.CharField()
    completed = models.BooleanField(default=False)
    parent_list = models.ForeignKey(List, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self):
        return f"Name: {self.task_name} | Completed: {self.completed}"