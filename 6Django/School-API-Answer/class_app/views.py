from django.shortcuts import render, get_object_or_404
from django.core.serializers import serialize
from rest_framework.views import APIView, Response
from .models import Class
from grade_app.models import Grade
import json

# Create your views here.

def set_up_class_info(a_class, a_class_queryset):
    class_grades = list(Grade.objects.filter(a_class = a_class['pk']).values())
    average_class_grade = sum([x['grade'] for x in class_grades])/len(class_grades) if len(class_grades) > 0 else 0
    a_class['fields']['grade_average']= average_class_grade
    a_class['fields']['students'] = json.loads(serialize('json', a_class_queryset.students.all()))

class Classes_info(APIView):
    def get(self, request):
        all_classes = Class.objects.all()
        json_classes = json.loads(serialize('json', all_classes))
        for current_class in range(len(json_classes)):
            set_up_class_info(json_classes[current_class], all_classes[current_class])
        return Response(json_classes)
    
class Class_info(APIView):
    def get(self, request, subject):
        a_class = get_object_or_404(Class, subject = subject.title())
        json_class = json.loads(serialize('json', [a_class]))[0]
        set_up_class_info(json_class, a_class)
        return Response(json_class)
