from django.urls import converters
from class_app.models import Class

class AllowedSubjects(converters.StringConverter):
    all_classes = Class.objects.all()
    allowed_subjects = [x.subject.title() for x in all_classes]
    def to_python(self, value):
        if value.title() not in self.allowed_subjects:
            print(self.allowed_subjects)
            print('prob')
            raise ValueError("Subject does not exist")
        return value.title()