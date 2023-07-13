from django.urls import path
from .views import Classes_info, Class_info

urlpatterns = [
    path('', Classes_info.as_view(), name='all_classes'),
    path('<str:subject>/', Class_info.as_view(), name='a_class'),
]
