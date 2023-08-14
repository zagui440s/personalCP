from rest_framework.views import APIView
from rest_framework.response import Response
import requests # <== import requests so we can utilize it within our CBV to make API calls
from requests_oauthlib import OAuth1 #<== import OAuth1 which will essentially authenticate our keys when we send a request
from dotenv import dotenv_values
import pprint
pp = pprint.PrettyPrinter(indent=2, depth=2)
env = dotenv_values(".env")

class Noun_Project(APIView):
    def get(self, request, item):
        auth = OAuth1(env.get("apikey"),env.get("secretkey") ) 
        endpoint = f"http://api.thenounproject.com/icon/{item}"
        response = requests.get(endpoint, auth=auth)
        responseJSON = response.json() 
        # pp.pprint(responseJSON)
        return Response(responseJSON['icon']['icon_url'])