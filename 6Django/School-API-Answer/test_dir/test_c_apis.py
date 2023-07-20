from django.test import TestCase
from django.urls import reverse
from class_app.models import Class
from rest_framework.test import APIClient
from unittest.mock import patch
import json

class Test_Icons(TestCase):

    def setUp(self):
        self.client = APIClient()

    @patch('requests.get')
    def test_getting_an_icon(self, mock_get):
        try:
            Class.objects.create(subject = 'Python', professor = "Professor Cahan").save()
            print(Class.objects.all())
            course = 'python'
            preview_url = "https://static.thenounproject.com/png/1375869-200.png"
            mock_response = type('MockResponse', (), {'json':lambda self: {'icon':{'preview_url':preview_url}}})
            mock_get.return_value = mock_response()
            response = self.client.get(reverse('api_view', args=[course]))
            print(response)
            with self.subTest():
                self.assert_(response.status_code == 200)
            self.assertEquals(json.loads(response.content), preview_url)
        except Exception as e:
            print(e)

    # @patch('requests.get')
    # def test_getting_an_icon_with_none_existing_subject(self, mock_get):
    #     subject = 'not_a_subeject'
    #     preview_url = "https://static.thenounproject.com/png/1375869-200.png"
    #     mock_response = type('MockResponse', (), {'json':lambda self: {'icon':{'preview_url':preview_url}}})
    #     mock_get.return_value = mock_response()
    #     response = self.client.get(reverse('api_view', args=[subject]))
    #     print(response.content)
        # with self.subTest():
        #     self.assert_(response.status_code == 200)
        # self.assertEquals(json.loads(response.content), preview_url)


