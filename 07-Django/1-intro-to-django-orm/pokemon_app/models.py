from django.db import models

# Create your models here.
class Pokemon(models.Model):
    name = models.CharField(max_length=255)
    level = models.IntegerField(default=1)
    date_encountered = models.DateField(default='2024-11-13')
    captured = models.BooleanField(default=False)