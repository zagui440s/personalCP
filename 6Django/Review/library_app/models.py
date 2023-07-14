from django.db import models

# Create your models here.
class Library(models.Model):
    name = models.CharField()
    address = models.TextField()

    def __str__(self):
        return self.name