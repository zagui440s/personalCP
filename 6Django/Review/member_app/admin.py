from django.contrib import admin
from .models import Member, Book, Library
# Register your models here.
admin.site.register([Member, Book, Library])