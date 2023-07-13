from django.shortcuts import render
from django.core.serializers import serialize
from rest_framework.views import APIView, Response
from .models import Student, Class
from grade_app.models import Grade
import json
# Create your views here.

class Students_Info(APIView):
    def get(self, request):
        all_students = Student.objects.all()
        serialized_students = serialize('json', all_students)
        json_students = json.loads(serialized_students)
        for student in json_students: # select * from class where id in [ 1, 3, 4, 5];
            student_classes = Class.objects.filter(id__in= student['fields']['classes'])
            student['fields']['classes'] = json.loads(serialize('json', student_classes))
            for course in student['fields']['classes']:
                try:
                    grade = Grade.objects.get(a_class = course['pk'], student = student['pk'])
                    course['fields']['grade'] = grade.grade
                except:
                    course['fields']['grade'] = 00.00
        return Response(json_students)
