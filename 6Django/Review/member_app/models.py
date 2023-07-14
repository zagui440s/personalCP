from django.db import models
from library_app.models import Library
from book_app.models import Book
from django.core import validators as v

# Create your models here.
class Member(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    age = models.PositiveIntegerField(default = 12, validators=[v.MinValueValidator(6), v.MaxValueValidator(120)])
    over_due_funds = models.BooleanField(default=False)
    library_id = models.ForeignKey(Library, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book, related_name="members")

    def checkout_a_book(self, book):
        if book.library_id == self.library_id:
            self.books.add(book.id)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"