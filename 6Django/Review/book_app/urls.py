from django.urls import path
from .views import All_Books

urlpatterns = [
    path('', All_Books.as_view(), name="all_books")
]
