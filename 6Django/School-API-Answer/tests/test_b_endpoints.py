from django.test import TestCase, Client
from django.urls import reverse
from tests.answers import all_classes, all_students
import json

class Test_endpoints(TestCase):

    fixtures = [
        'tests/fixtures/classes.json',
        'tests/fixtures/students.json',
        'tests/fixtures/grades.json'
    ]

    def setUp(self):
        client = Client()

    def test_all_classes(self):
        response = self.client.get(reverse('all_classes'))
        with self.subTest():
            self.assert_(response.status_code == 200)
        content = json.loads(response.content)
        self.assertEquals(content, all_classes)

    def test_all_students(self):
        response = self.client.get(reverse('all_students'))
        with self.subTest():
            self.assert_(response.status_code == 200)
        content = json.loads(response.content)
        self.assertEquals(content, all_students)

    
        


        
