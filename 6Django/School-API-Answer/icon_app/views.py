from django.shortcuts import render
from django.http import Http404
from rest_framework.views import Response, APIView
from rest_framework.status import HTTP_404_NOT_FOUND
from requests_oauthlib import OAuth1
from dotenv import load_dotenv
import requests
import json
import os

load_dotenv()
# Create your views here.
class Icon(APIView):
    
    def get(self, request, subject):
        print('hello')
        try:
            auth = OAuth1(os.environ['API_KEY'], os.environ['API_SECRET_KEY'])
            endpoint = f"https://api.thenounproject.com/icon/{subject}"
            response = requests.get(endpoint, auth=auth)
            content = response.json()
            img_url = content.get('icon').get('preview_url')
            return Response(img_url)
        except Exception as e:
            print(e)
            return Response("Object does not exist", status=HTTP_404_NOT_FOUND)