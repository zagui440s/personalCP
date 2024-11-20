from django.db import models

# Create your models here.
class List(models.Model):
    id = models.BigAutoField(primary_key=True)  # Using BigInt for ID
    list_name = models.CharField(max_length=255)

    def __str__(self):
        return self.list_name


class Task(models.Model):
    id = models.BigAutoField(primary_key=True)
    task_name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    parent_list = models.ForeignKey(List, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.task_name


class SubTask(models.Model):
    id = models.BigAutoField(primary_key=True)
    sub_task_name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    parent_task = models.ForeignKey(Task, related_name='subtasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.sub_task_name