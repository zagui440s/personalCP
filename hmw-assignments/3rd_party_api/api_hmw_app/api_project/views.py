from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from api_hmw_app.settings import env
import json


class Random_cats(APIView):
    
    def get(self, request):
        response = requests.get(f"https://api.thecatapi.com/v1/images/search?api_key=({env.get('CAT_API_KEY')}")
        
        response_json = response.json()
        
        print(response_json)
        return Response(response_json[0]['url'])
    

# curl --location 'https://api.ebird.org/v2/data/obs/KZ/recent' \
# --header 'X-eBirdApiToken: {{x-ebirdapitoken}}'

class Random_birds(APIView):

    def get(self, request):
        headers = {
            'X-eBirdApiToken': env.get("BIRD_API_KEY")
        }

        endpoint = f"https://api.ebird.org/v2/data/obs/US-TX-453/recent"
        response = requests.get(endpoint, headers=headers)

        response = response.json()

        print(response)
        return Response(response)
    