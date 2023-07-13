from django.db import models
from django.core.exceptions import ValidationError
from .validators import validate_subject_format, validate_professor_format


# Create your models here.
class Class(models.Model):
    subject = models.CharField(max_length=255, unique=True, validators=[validate_subject_format])
    professor = models.CharField(max_length=255, validators=[validate_professor_format])

    def clean(self):
        if not 0 < len(self.students.all()) < 31:
            raise ValidationError("A class must have between 1 and 30 students")
        
    def __str__(self):
        return f"{self.subject} - {self.professor} - {len(self.students.all())}"
    
    def add_a_student(self, id):
        self.students.add(id)
        self.save()

    def drop_a_student(self, id):
        if id in self.students:
            self.students.get(id = id).delete()
        self.save()
        