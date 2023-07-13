from django.urls import path
from .views import Students_Info

urlpatterns = [
    path('', Students_Info.as_view(), name='all_students'),
]
