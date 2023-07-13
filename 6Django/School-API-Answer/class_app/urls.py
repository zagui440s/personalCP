from django.urls import path
from .views import Classes_info

urlpatterns = [
    path('', Classes_info.as_view(), name='all_classes'),
]
