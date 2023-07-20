from django.urls import path, register_converter
from .converters import AllowedSubjects
from .views import Icon

register_converter(AllowedSubjects, 'subject')

urlpatterns = [
    path('<subject:subject>/', Icon.as_view(), name='api_view'),
]
