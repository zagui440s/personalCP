from django.shortcuts import render
from django.core.serializers import serialize
from rest_framework.views import APIView, Response
from .models import Class
from grade_app.models import Grade
import json

# Create your views here.
class Classes_info(APIView):
    def get(self, request):
        all_classes = Class.objects.all()
        json_classes = json.loads(serialize('json', all_classes))
        for current_class in range(len(json_classes)):
            class_grades = list(Grade.objects.filter(a_class = json_classes[current_class]['pk']).values())
            average_class_grade = sum([x['grade'] for x in class_grades])/len(class_grades) if len(class_grades) > 0 else 0
            json_classes[current_class]['fields']['grade_average']= average_class_grade
            json_classes[current_class]['fields']['students'] = json.loads(serialize('json', all_classes[current_class].students.all()))
        return Response(json_classes)