from django.urls import path
from .views import Students_Info, Student_Info

urlpatterns = [
    path('', Students_Info.as_view(), name='all_students'),
    path('<int:id>/', Student_Info.as_view(), name = 'a_student'),
]
