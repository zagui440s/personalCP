from django.shortcuts import render, get_object_or_404
from django.core.serializers import serialize
from rest_framework.views import APIView, Response
from .models import Student, Class
from grade_app.models import Grade
import json
# Create your views here.

def set_up_student_info(student):
    student_classes = Class.objects.filter(id__in= student['fields']['classes'])
    student['fields']['classes'] = json.loads(serialize('json', student_classes))
    for course in student['fields']['classes']:
        try:
            grade = Grade.objects.get(a_class = course['pk'], student = student['pk'])
            course['fields']['grade'] = grade.grade
        except:
            course['fields']['grade'] = 00.00


class Students_Info(APIView):
    def get(self, request):
        all_students = Student.objects.all()
        serialized_students = serialize('json', all_students)
        json_students = json.loads(serialized_students)
        for student in json_students:
            set_up_student_info(student)
        return Response(json_students)

class Student_Info(APIView):
    def get(self, request, id):
        a_student = get_object_or_404(Student, pk = id)
        json_student = json.loads(serialize('json', [a_student]))[0]
        set_up_student_info(json_student)
        return Response(json_student)
