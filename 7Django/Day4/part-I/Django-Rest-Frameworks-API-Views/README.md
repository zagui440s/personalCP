# Django API Views with Django Rest Frameworks

## Lesson

So far we've created Pokemon and Moves utilizing Django-ORM with associations, validators, and tests. Although it's been great, we still haven't talked about why we are utilizing Django-ORM to interact with our database. Django is a powerful Back-End framework that we will utilize to host our Application Programming Interface for our Full-Stack-Applications. Today we are going to begin creating `url paths` and `views` that will allow other applications to ping our API to gather information from our Database. These `views` are known as `Model View Controllers (MVC's)` meaning they are `views` that will interact with our `models` and `control` the format of data for applications.

- [SLIDES](https://docs.google.com/presentation/d/1Yc5R7Gng_Fk0dHeuMRkiU6xI92jj0paVo9SyyfX5bRw/edit?usp=drive_link)

### TLO's (Testable Lesson Objectives)

- Utilize Django-Rest-Frameworks(DRF) to create Class Based views
- Utilizing RESTful Url patterns

### ELO's (Elective Lesson Objectives)

- Utilizing Django Serializers to turn Querysets into JSON data
- Using Postman to test our API

## What are Views?

> When it comes down to it, every Django view is a function. The biggest difference is this function takes an HTTP request object in JSON format and returns an HTTP response object in JSON format. Views in Django can do many things: render HTML templates, interact with the Database, redirect to a separate url, handle errors, etc.

## Why Django Rest Frameworks (DRF)

> Today’s internet is much more than HTML-powered websites. Developers need to support web clients, native mobile apps, and business-to-business applications . Having tools that support easy creation of JSON, YAML, XML, and other formats is important. By design, a Representational State Transfer (REST) Application Programming Interface (API) exposes application data to other concerns.

- Key Points
  - DRF leans heavily on object-oriented design and is designed to be easily extensible.
  - DRF builds directly off of Django Class Based Views (CBV's). If you understand CBVs, DRF’s design feels like an understandable extension of Django.
  - It comes with a host of views for API generation like APIview and Response.
  - Wide community and very well adopted Framework

## Things to consider when creating our API Views

1. Using JSON format to send and receive data.
   - This is because most Frameworks now a days (Front-End or Back-end) have built in methods to be able to effectively utilize JSON data. JSON was specifically made to interact with JavaScript and is therefor easily interpreted by JavaScript. Python has a built in methods like `json.loads()` to grab the JSON data in the body of a request and turn it into something Python can utilize.
   - Luckily thanks to Django Rest Framework, we won't have to interact much with complicated methods and serializers. Instead we could just use the `serializers` we've created with `rest_framework` and allow DRF to handle any data formatting for JSON AND XML.
2. Use Filtering and Sorting to Retrieve the Data Requested.
   - Databases can get very large and complicated so it's important to only grab the necessary data from our database and sort it to create consistency in our API responses.

## Linking urlpatterns

> To create our API CBV's we will utilize [django-rest-frameworks](https://www.django-rest-framework.org/) to interact with our requests and deliver effective responses.

> Lets cover how to link our app urls onto our project urls. We already know interactions with the Django Web Server come through `urlpatterns` their `paths` and corresponding `views`. Yesterday we did a quick intro to the Django server but never actually linked our URL paths to our project.

> RESTful API design dictates a certain structure to follow for URL patterns. Each `url` in a `path` must specify it's an API endpoint by including `api/` immediately after the hosting IP address in the url. The `api/` url is then followed by the current version number of the API which in this case it will be `v1` since it's our first version. Lastly the url pattern is followed by a pluralized noun that describes the `Model` this paths `view` will interact with.

> Link `project.urls` to individual `app.urls` by using Django's `include()` and pass in the path in dot notation to the `urls.py` file of that app.

```python
from django.contrib import admin
# import include to access different apps urls.py
from django.urls import path, include

# enpoints should be nouns and pluralized
urlpatterns = [
    path('admin/', admin.site.urls),
    path('squares/<int:side>/', square_area_view, name='square'),
    path('circles/<int:side>/', circle_area_view, name='circle'),
    path('triangles/base/<int:base>/height/<int:height>/', triangle_area_view, name='triangle'),
    path('api/v1/pokemon/', include("pokemon_app.urls")),
]
```

> We are telling our project to include pokemon_app/urls.py but currently there is no urls.py file in our pokemon_app. Lets make one and add a `urlpattern` with an empty path.

```python
# pokemon_app/urls.py
from django.urls import path
# Explicit imports
from .views import all_pokemon
# Remember all urls are prefaced by http://localhost:8000/api/v1/pokemon/
urlpatterns = [
    # Currently only takes GET requests
    path('', all_pokemon, name='all_pokemon')
]
```

> Currently if we attempt to run the Django Server we will receive an error stating there's no `view` named `all_pokemon` in `pokemon_app.views`. Well let's fix that.

## Creating MVC's

> Go into pokemon_app/views.py to create our API view that will get all of our existing pokemon from the database and return them in the correct `JSON` format. Here's an example of what we would expect it to look:

```JSON
{
    "pokemon": [
        {
            "id": 3,
            "name": "Blastoise",
            "level": 37,
            "moves": []
        },
        {
            "id": 2,
            "name": "Charizard",
            "level": 25,
            "moves": []
        },
        {
            "id": 4,
            "name": "Eevee",
            "level": 25,
            "moves": [
                "Psychic"
            ]
        },
        {
            "id": 1,
            "name": "Pikachu",
            "level": 12,
            "moves": []
        }
    ]
}
```

> Create the following Functional View:

```python
#pokemon_app/views.py
from .models import Pokemon #imports the Pokemon model
from .serializers import PokemonSerializer #imports the PokemonSerializer
from django.http import JsonResponse # Our responses will now be returned in JSON so we should utilize a JsonResponse
# Create your views here.

def all_pokemon(request):
    pokemon = PokemonSerializer(Pokemon.objects.order_by('name'), many=True) # Utilize the serializer to serialize all of our Pokemon pulled from the Database
    return JsonResponse({"pokemon": pokemon.data}) # JSON could only be interpreted in dictionary format so we need to ensure our response is a dictionary itself.
```

> This Functional View works but as a function it's capabilities are limited and we can see that any type of request being sent to this url will receive the same response and we should only send this response to a `GET` request. Well we can utilize DRF's `APIView` to exchange our Functional View for a Class Based View and essentially `evolve` our views capabilities and limitations.

```python
# pokemon_app/views.py
from .models import Pokemon
from .serializers import PokemonSerializer
# Import both APIView and Response from DRF
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

# def all_pokemon(request):
#     pokemon = PokemonSerializer(Pokemon.objects.order_by('name'), many=True)
#     return JsonResponse({"pokemon": pokemon.data})

# We can create this class and pass in APIView as the Parent Class to allow DRF to handle permissions, authentications, and allowed methods.
class All_pokemon(APIView):
    # Just like we said before we only want this information available for GET requests therefore we have to place this logic under a GET method. DRF will recognize the `get` method and trigger that method every time a GET request is sent
    def get(self, request):
        pokemon = PokemonSerializer(Pokemon.objects.order_by('name'), many=True)
        # Under response we don't necessarily need to send information in JSON format instead DRF will format our response and make it acceptable for Front-End frameworks
        return Response({"pokemon": pokemon.data})
```

> We have a working `GET` method for all pokemon in our database let's replicate this behavior for pokemon moves by following these steps.

`project.urls => app.urls => app.views`

> Link app.urls with project.urls by utilizing the `include()` method.

```python
from django.contrib import admin
# import include to access different apps urls.py
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('squares/<int:side>/', square_area_view, name='square'),
    path('circles/<int:side>/', circle_area_view, name='circle'),
    path('triangles/base/<int:base>/height/<int:height>/', triangle_area_view, name='triangle'),
    path('api/v1/pokemon/', include("pokemon_app.urls")),
    path('api/v1/moves/', include("move_app.urls")),
]
```

> Link our move_app/urls.py with our CBV

```python
#move_app/urls.py
from django.urls import path
from .views import All_moves

urlpatterns = [
    path("", All_moves.as_view(), name='all_moves')
]
```

> We now get an error along the lines of `All_moves` does not exist in .views. Well lets make it.

```python
from .models import Move
from .serializers import MoveSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create a view that utilizes APIView to inherit DRF's built in functionality
class All_moves(APIView):
    # establish a get method that will be triggered by GET requests
    def get(self, request):
        # utilize your ModelSerializer to serialize your queryset and return a proper response with DRF's Response
        moves = MoveSerializer(Move.objects.all(), many=True)
        return Response({"moves":moves.data})
```

> This CBV should return the following example:

```JSON
{
    "moves": [
        {
            "id": 1,
            "power": 80,
            "accuracy": 70,
            "pokemon": [
                "Eevee"
            ]
        }
    ]
}
```

## Intro to Postman

> **What is Postman?** Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster
> We can utilize Postman to test our api and send `GET` request to the current urls we've established. First we must run the server to ensure our information is accessible through local host.

### **POSTMAN MUST BE INSTALLED LOCALLY IN ORDER TO PING YOUR LOCALHOST**

```bash
    python manage.py runserver
```

Now in Postman send GET requests to the following url paths:

```http
 http://127.0.0.1:8000/api/v1/pokemon/
 http://127.0.0.1:8000/api/v1/moves/
```

## Assignments

- [School API](https://classroom.github.com/a/vP_DvvOV)
