from django.db import models
from class_app.models import Class
from student_app.models import Student
from django.core import validators as v
# Create your models here.
class Grade(models.Model):
    grade = models.DecimalField(max_digits=5, decimal_places=2, validators=[v.MaxValueValidator(100.00)])
    a_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)