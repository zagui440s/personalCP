from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from .models import Book
from django.core.serializers import serialize
import json

# Create your views here.

# def hello_django(request):
#     return JsonResponse({"greet":"HELLO DJANGO"})


class All_Books(APIView):

    def say_hello(self):
        return Response("I'm gonna say hello")

    def get(self, request):
        query_all_books = Book.objects.all()
        formatted_all_books = json.loads(serialize("json", query_all_books))
        for idx, book in enumerate(query_all_books):
            formatted_all_books[idx]["fields"]["members"] = json.loads(
                serialize("json", book.members.all())
            )
            for jdx, member in enumerate(book.members.all()):
                formatted_all_books[idx]["fields"]["members"][jdx]["fields"][
                    "books"
                ] = json.loads(serialize("json", member.books.all()))
        return Response(formatted_all_books)
    
    def put(self, request):
        return self.say_hello()
