from django.contrib import admin
from .models import Task, Sub_task
# Register your models here.
admin.site.register([Task, Sub_task])