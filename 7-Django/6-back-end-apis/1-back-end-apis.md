# BACK-END 3rd Party API's

## Lesson

In this lesson you will learn how to interact with 3rd Party API's, manipulate API data, and how to hide secret keys through environment variables.

- [SLIDES](https://docs.google.com/presentation/d/1zZ9CNmXdtCCYQWiiqNUnwcnqhIUGetn9HrDHZDhz31Q/edit?usp=drive_link)

## Why 3rd Party API's from Back-End?

Handling API requests through a back-end framework like Django offers several advantages:

1. Security: By making API requests from the back-end, you can keep sensitive information like API keys, tokens, and credentials hidden from the client-side code. This helps prevent exposing sensitive data to potential malicious actors.

2. Authorization and Authentication: Back-end frameworks provide robust mechanisms for handling user authentication and authorization. By integrating API requests within the back-end, you can ensure that only authenticated users with the proper permissions can access and consume the API endpoints.

3. Business Logic: Back-end frameworks allow you to incorporate business logic and data processing before responding to API requests. This flexibility enables you to validate, transform, or aggregate data from the 3rd party API responses, enhancing the functionality and usability of your application.

4. CORS and Security Policies: Cross-Origin Resource Sharing (CORS) policies enforced by web browsers can limit direct API requests made from client-side JavaScript. By making API requests from the back-end, you can avoid CORS-related issues and enforce security policies consistently.

5. Abstraction and Reusability: By encapsulating API requests within your back-end framework, you can create reusable modules or services that handle the interaction with the 3rd party APIs. This abstraction makes it easier to maintain and modify the API integration logic across your application.

> Another reason is because some APIs are inaccessible from the front end, due to the Same Origin Policy (SOP) and lack of Cross Origin Resource Sharing (CORS). This is intended to be a security feature, but it can sometimes be frustrating to work around. By default, when you send an AJAX request, browsers will only use responses from servers in the same origin

> example origin, including protocol (https), subdomain, and tld [here](https://developer.mozilla.org/)

> A server that is expecting to receive cross-origin requests can set headers on the response (`access-control-allow-origin: *`), meaning that any client is allowed to use the response

## Getting to know your API

> The process for acquiring and using an API key may be different for different APIs, so be sure to read the documentation. The API Key is a unique key associated with your developer account for billing/usage purposes. You will often have public and/or private API keys - the public key can be used on the front end, since it's not sensitive or private. The private key must be stored securely on the server (using env variables, not in a git repo). If you are getting charged money for using an API, make sure you protect your private key. If anyone gets a hold of your private key, they can impersonate you and you can get charged boatloads of money. Public keys are public - don't worry about protecting these.

> Today, we'll be using the noun project API, but every API is different. [Read the documentation](http://api.thenounproject.com/getting_started.html) in order to know how you're supposed to authenticate and send requests.

> After reading the docs, I want to get an API key. After creating an account, we need to create an 'app', and then we can create a set of keys associated with that app. Before we write any code, we can test our keys in the [api explorer](https://api.thenounproject.com/explorer)

## Set Up

> Let's create an app that will handle these API interactions. We want to try and consolidate any 3rd Party API behavior and/or interaction within a Django app so let's create an `api_app` where we will write all of our logic within the `api_app.views` file.

```bash
python manage.py startapp api_app
```

> Make sure to add the `api_app` under the `INSTALLED_APPS` section in the `pokedex_proj.settings`` file

> Link our project.urls to our app.urls utilizing the `include()` method within the projects `urlpatterns`.

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('squares/<int:side>/', square_area_view, name='square'),
    path('circles/<int:side>/', circle_area_view, name='circle'),
    path('triangles/base/<int:base>/height/<int:height>/', triangle_area_view, name='triangle'),
    path('api/v1/pokemon/', include("pokemon_app.urls")),
    path('api/v1/moves/', include("move_app.urls")),
    path('api/v1/noun/', include("api_app.urls")),
]
```

> Now inside our `api_app.urls` we can create some url patterns and link them to the appropriate CBV

```python
from django.urls import path
from .views import Noun_Project

urlpatterns = [
    path('', Noun_Project.as_view(), name="noun_project"),
]
```

## Interacting With 3rd Party API's

> Now that we have some idea how the API works, let's build a django CBV that uses it. The first new thing we'll need for this CBV is a library that will help us send requests, called `requests`. It's similar to axios, except it's used on the back end with python.

```bash
  pip install requests
  pip install requests_oauthlib
  pip freeze > requirements.txt
```

```python
from rest_framework.views import APIView
from rest_framework.response import Response
import requests # <== import requests so we can utilize it within our CBV to make API calls
from requests_oauthlib import OAuth1 #<== import OAuth1 which will essentially authenticate our keys when we send a request


class Noun_Project(APIView):
    # In our CBV lets create a method to interact with the NounAPI
    def get(self, request):
        # let's grab this body from the `get started` documentation from the NounAPI 
        auth = OAuth1("your-api-key", "your-api-secret") #<== for now place your corresponding keys here
        endpoint = "http://api.thenounproject.com/icon/1"

        response = requests.get(endpoint, auth=auth) # notice with axios we had to wait for the promise to be completed, with requests it know to pause the program and wait until it receives a response
        # print(response.content) # we can see that the content within this response comes back as a binary string lets fix that
        responseJSON = response.json() # by calling the .json() method we are turning this request into a Python Dictionary that we can manipulate
        print(responseJSON)
        return Response(True)
```

## Handling Secret Keys

> There's one last problem we need to solve before I commit this to my local git or push it to github. Currently, my private key is visible in the code, so if I pushed it up to github, other people might steal my credentials. We need to use environment variables, which are not committed in git, to supply credentials to our project and apps. We could use actual env variables in BASH, but it's common practice to use a .env file, which looks a little like this:

```bash
# my .env file
DJANGO_KEY=****** #comes from pokedex_proj/settings.py
apikey=****** #comes from api_app/views.py
secretkey=***** #comes from api_app/views.py
```

> Create a `.env` file at the root level of your project directory and fill in the appropriate variables with their correct values.

> Now our keys are hidden from other people, but they're also hidden from my Django Project. To help my django project read the `.env` variables, we'll use a python package called `python-dotenv`.

```bash
pip install python-dotenv
pip freeze > requirements.txt
```

> We will use `python-dotenv's` `dotenv_values` method, in both `api_app.views` and `pokedex_proj.settings`, to turn the contents of our `.env` file into a python OrderedDictionary and use the `.get()` method to grab the values corresponding to each key.

```python
from dotenv import dotenv_values

env = dotenv_values(".env") # sets the value of `env` to an OrderedDictionary
env.get("apikey") # returns the apikey value from the `.env`
```

## gitignore

> Django is now able to read variables from dotenv our `.env` file and function properly, but `git` is still tracking this `.env` file. Let's create a `.gitignore` file that will tell our local `git` to disregard a series of files and directories that we don't want pushed up to github or to be tracked by `git`.

```bash
#.gitignore
.venv #<-- python venv if it lives in your project directories
__pycache__ # <--- python stashed changes 
.env # <--- .env file holding secret elements
```
