# BACK-END 3rd Party API's

## Lesson

In this lesson you will learn how to interact with 3rd Party API's, manipulate API data, and how to hide secret keys through environment variables.

- [SLIDES](https://docs.google.com/presentation/d/1zZ9CNmXdtCCYQWiiqNUnwcnqhIUGetn9HrDHZDhz31Q/edit?usp=drive_link)

## TLO's (Testable Learning Objectives)

- Utilize `requests` to manage API requests in python
- Utilize `OAuth1` to manage authentication
- Integrate 3rd Party API's with your project

## ELO's (Elective Lerning Objectives)

- Manage Secret Keys
- Interact with `.env` files
- Utilize `python-dotenv`
- Write Unit Test Mocking 3rd Party API requests.

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

## Formatting and Manipulating response data

> There's a lot of content here! In the browser, it was easier to dig into large data structures, but it's not quite as easy to read large data structures in python due to how they print in the terminal. Lets use a built-in python module, pprint (pretty print) that'll help us read the responses from the API.

```python
import pprint

# only go 2 levels deep, so we get a general idea of the response without having to look at the whole thing
pp = pprint.PrettyPrinter(indent=2, depth=2)

response = requests.get(endpoint, auth=auth)
responseJSON = response.json()
pp.pprint(responseJSON)
```

> Now we can visualize our response data and work to return the icon_url in our methods `Response`

```python
return Response(responseJSON['icon']['icon_url'])
```

> The last thing we need to do is update our `url` and CBV to accept a `str` parameter of `item` that we can utilize with interpolated string and allow `users` to look for a specific `noun icon_url`.

```python
#api_app.urls
from django.urls import path
from .views import Noun_Project

urlpatterns = [
    path('<str:item>/', Noun_Project.as_view(), name="noun_project"),
]

# api_app.views
class Noun_Project(APIView):

    def get(self, request, item):
        auth = OAuth1("your-api-key", "your-api-secret") 
        endpoint = f"http://api.thenounproject.com/icon/{item}"
        response = requests.get(endpoint, auth=auth)
        responseJSON = response.json() 
        pp.pprint(responseJSON)
        return Response(responseJSON['icon']['icon_url'])

```

> Now that we can get the `icon_url` from our `requests`, we can return this to our Front-End or client and allow them to utilize this information to display an image on the screen.

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

## Testing Requests

- Testing works a bit different with API's since we don't want to actually make the API call every time we run our test. So instead unit tests have the ability to mock API calls.

```python
import json
from unittest.mock import patch
from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse

class NounProjectTest(TestCase):
    def setUp(self):
        self.client = APIClient()
```

- The `import` statements include the necessary modules for the test case: `json` for JSON-related operations, `patch` from `unittest.mock` to mock the `requests.get` function, `TestCase` from `django.test` for creating test cases, `APIClient` from `rest_framework.test` to simulate API requests, and `reverse` from `django.urls` for resolving URL paths.

- The `NounProjectTest` class is a subclass of Django's `TestCase`, indicating that this is a test case for the Noun Project functionality.

- The `setUp` method is a special method that runs before each test method in the test case. Here, we create an instance of the `APIClient` to make API requests.

```python
@patch('requests.get')
def test_pokeball_img_api_view(self, mock_get):
    ball = 'pokeball'
    preview_url = "https://example.com/image.png"
    mock_response = type('MockResponse', (), {'json': lambda self: {'icon': {'icon_url': preview_url}}})
    mock_get.return_value = mock_response()
    response = self.client.get(reverse('noun_project', args=[ball]))
```

- The `@patch('requests.get')` decorator patches the `requests.get` function, allowing us to intercept and control the API call made by `requests.get` during the test. This prevents the actual API request from being made and replaces it with a mocked response.

- In the `test_pokeball_img_api_view` method, we define the test for the API view that retrieves the image URL for a given ball. Here, we're assuming that the view is registered with the name `noun_project` in the Django URL configuration.

- The `ball` variable holds the ball name to be passed as an argument to the view.

- The `preview_url` variable represents the URL of the image that we expect to receive in the response.

- The `mock_response` line creates a mock response object with a `json` method that returns a dictionary with the expected JSON structure of the response. In this case, it simulates the structure returned by the API.

- `mock_get.return_value = mock_response()` assigns the mock response object to the patched `requests.get` function, making it return the mock response instead of performing an actual API call.

- `response = self.client.get(reverse('noun_project', args=[ball]))` makes a GET request to the `noun_project` URL, passing the `ball` argument as a URL parameter. This triggers the view and allows us to test its behavior.

```python
with self.subTest():
    self.assertEqual(response.status_code, 200)
self.assertEquals(json.loads(response.content), preview_url)
```

- `with self.subTest():` creates a sub-test block, allowing multiple assertions within a single test method. This helps isolate and identify individual assertions if one of them fails.

- `self.assertEqual(response.status_code, 200)` asserts that the response status code is `200`, indicating a successful API request.

- `self.assertEquals(json.loads(response.content), preview_url)` asserts that the JSON response content, once loaded, is equal to the expected `preview_url`.

By utilizing the `@patch` decorator and `unittest.mock` library, we can intercept and control the behavior of the `requests.get` function during testing. This allows us to simulate different API responses and test the behavior of our Django views without actually making real API calls.

## Assignments

- [School API](https://classroom.github.com/a/vP_DvvOV)
- [Django & API's](https://classroom.github.com/a/V4_OubHX)
