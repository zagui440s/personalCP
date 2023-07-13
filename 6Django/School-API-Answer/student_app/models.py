from django.db import models
from django.core import validators as v
from django.core.exceptions import ValidationError
from .validators import (
    validate_name_format,
    validate_school_email,
    validate_combination_format,
)
from class_app.models import Class



# Create your models here.
class Student(models.Model):
    name = models.CharField(
        max_length=255, blank=False, null=False, validators=[validate_name_format]
    )
    student_email = models.EmailField(
        max_length=255,
        blank=False,
        null=False,
        unique=True,
        validators=[validate_school_email],
    )
    personal_email = models.EmailField(
        max_length=255, blank=True, null=True, unique=True
    )
    locker_number = models.PositiveIntegerField(
        unique=True,
        default=110,
        validators=[v.MinValueValidator(1), v.MaxValueValidator(200)],
    )
    locker_combination = models.CharField(
        max_length=255, default="12-12-12", validators=[validate_combination_format]
    )
    good_student = models.BooleanField(default=True)
    classes = models.ManyToManyField(Class, related_name='students')

    def __str__(self):
        return f"{self.name} - {self.student_email} - {self.locker_number}"

    def locker_reassignment(self, locker_num):
        self.locker_number = locker_num
        self.save()

    def student_status(self, stat):
        self.good_student = stat
        self.save()

    def clean(self):
        if not 0 < self.classes.count() < 8:
            raise ValidationError('A student must be enrolled in between 1 and 7 classes.')
