
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