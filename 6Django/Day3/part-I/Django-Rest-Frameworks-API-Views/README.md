# Django API Views with Django Rest Frameworks

## Lesson

So far we've created Pokemon and Moves utilizing Django-ORM with associations, validators, and tests. Although it's been great we still haven't talked about why we are utilizing Django-ORM to interact with our database. Django is a powerful Back-End framework that we will utilize to host our Application Programming Interface for our Full-Stack-Applications. Today we are going to begin creating `url paths` and `views` to allow other applications to interact with our database and grab the information they desire.

- [SLIDES](https://docs.google.com/presentation/d/1pCxg8WgqDT6UTjlUv0TQFb-XFHXVjkW6Uxwo5ZyCQss/edit?usp=sharing)

### TLO's (Testable Lesson Objectives)

- Utilize Django-Rest-Frameworks(DRF) to create class-based views
- Utilizing RESTful Url patterns

### ELO's (Elective Lesson Objectives)

- Utilizing Django Serializers to turn Querysets into JSON data
- Using Postman to test our API

## What are Views?

When it comes down to it, every Django view is a function. The biggest difference being this function takes an HTTP request object in JSON format and turns it into an HTTP response object in JSON format. Views in Django can do many things: render HTML templates, interact with the Database, redirect to a seperate url, handle errors etc. Pretty much almost any logic that you need to fulfill a users specific needs upon making their request.

## Why Django Rest Frameworks (DRF)

Today’s internet is much more than HTML-powered websites. Developers need to support web clients, native mobile apps, and business-to-business applications . Having tools that support easy creation of JSON, YAML, XML, and other formats is important. By design, a Representational State Transfer (REST) Application Programming Interface (API) exposes application data to other concerns.

- Key Points
  - DRF leans heavily on object-oriented design and is designed to be easily extensible.
  - DRF builds directly off of Django Class Based Views (CBV's). If you understand CBVs, DRF’s design feels like an understandable extension of Django.
  - It comes with a host of views for API generation like APIview and Response.
  - Wide community and very well adopted Framework

## Things to consider when creating our API Views

1. Using JSON format to send and receive data.
   - This is becuase most Frameworks now a days Front-End or Back-end have built in methods to be able to effectively utilize JSON data. JSON was specifically made to interact with JavaScript and is therefor easily interpreted by JavaScript. Python has a built in method like json.loads() to grab the JSON data in the body of a request and turn it into something Python can utilize.
2. Use Filtering and Sorting to Retrieve the Data Requested.
   - Databases can get very large and complicated so it's important to only grab the neccessary data from our database and sort it to create consistency in our API responses.

## Creating our first API views

> To create our API CBV's we will utilize [django-rest-frameworks](https://www.django-rest-framework.org/) to interact with our requests and deliver effective responses.
> Lets install [django-rest-frameworks](https://www.django-rest-framework.org/) and go into pokemon_app/views.py to create our API view.

```bash
    # Install Django Rest Frameworks
    pip install djangorestframework
    # add it to requirements.txt
    pip freeze > requirements.txt
```

> First lets create a CBV that will get all of our existing pokemon. Here's an example of what we would expect it to look:

```js
[
  {
    model: "pokemon_app.pokemon",
    pk: 3,
    fields: {
      name: "Blastoise",
      level: 37,
      date_encountered: "2008-01-01",
      date_captured: "2023-04-14T05:26:47Z",
      description:
        "A water type pokemon with two hydro cannons sticking out of it's shell",
      captured: false,
      moves: [
        {
          model: "move_app.move",
          pk: 3,
          fields: {
            name: "Water Pulse",
            accuracy: 70,
            maxPP: 20,
            pp: 20,
            power: 80,
          },
        },
        {
          model: "move_app.move",
          pk: 9,
          fields: {
            name: "Pound",
            accuracy: 70,
            maxPP: 20,
            pp: 20,
            power: 70,
          },
        },
        {
          model: "move_app.move",
          pk: 11,
          fields: {
            name: "Blizzard",
            accuracy: 60,
            maxPP: 10,
            pp: 7,
            power: 120,
          },
        },
      ],
    },
  },
  {
    model: "pokemon_app.pokemon",
    pk: 2,
    fields: {
      name: "Charizard",
      level: 25,
      date_encountered: "2007-04-07",
      date_captured: "2023-04-14T05:17:16Z",
      description:
        "A fire type pokemon with Dragon like features and capabilities.",
      captured: true,
      moves: [],
    },
  },
];
```

> Create the following CBV:

```python
# pokemon_app/views.py
# We will import the following to read and return JSON data more efficiently
from rest_framework.views import APIView, Response

# We want to bring in our model
from .models import Pokemon

# We will also want to get Move to ensure we can grab those instances from the db
from move_app.models import Move

# We will utilize serializer to turn our QuerySets into
# binary string
from django.core.serializers import serialize

# Json.loads will turn binary strings into JSON data
import json

# Create your views here.
class All_pokemon(APIView):
    # Establish the method that will trigger this behavior
    def get(self, request):
        # Grab all Pokemon existing within our database in a
        # specific order to keep consistency. In this case
        # we will order our data by name in aphabetical order
        pokemon = Pokemon.objects.order_by("name")
        # we can't send back query sets as a valid JSON response
        # so we will utilize Django's built in serialize function
        # to turn our query set into a binary string
        serialized_pokemon = serialize("json", pokemon)
        # Now we can use the python json.loads function to turn
        # our binary string into a workable json format
        json_pokemon = json.loads(serialized_pokemon)
        # currently moves is a list of ints but we want the actual pokemon instances
        for pokemon in json_pokemon:
            # query the database to grab a list of move instances
            move_data = Move.objects.filter(id__in=pokemon["fields"]["moves"])
            # assign it to the original pokemon moves as serialized data
            pokemon["fields"]["moves"] = json.loads(serialize("json", move_data))
        return Response(json_pokemon)
```

> Now we can move onto our urls and create our endpoints that will trigger the view we created.
> RESTful API design dictates a certain structure to follow for URL patterns, it specifies it's an API by including `api` in the url, it is then followed by the current version number of the API `v1`, and lastly followed by a pluralized noun.

```python
from django.contrib import admin
# import include to access different apps urls.py
from django.urls import path, include

# enpoints should be nouns and pluralized
urlpatterns = [
    path('admin/', admin.site.urls),
    # now we can interact with pokemon_app urls
    path('api/v1/pokemon/', include("pokemon_app.urls")),
]
```

> We are telling our project to include pokemon_app/urls.py but currently there is no urls.py file in our pokemon_app. Lets make one and add an empty url enpoint.

```python
# pokemon_app/urls.py

from django.urls import path
# Explicit imports
from .views import All_pokemon
# Remember all urls are prefaced by http://localhost:8000/api/v1/pokemon/
urlpatterns = [
    # Currently only takes GET requests
    path('', All_pokemon.as_view(), name='all_pokemon')
]
```

> Now that have a working `GET` method for all pokemon in our database let's replicate this behavior for pokemon moves.

```js
[
  {
    model: "move_app.move",
    pk: 1,
    fields: {
      name: "Psychic",
      accuracy: 70,
      maxPP: 20,
      pp: 20,
      power: 80,
    },
  },
];
```

> Create a CBV to grab all moves

```python
# pokemon_app/views.py l
from django.shortcuts import render
# We will import the following to read and return JSON data more efficiently
from rest_framework.views import APIView, Response
# We want to bring in our model
from .models import Move
# serialize will turn querysets into binary string
from django.core.serializers import serialize
# Json will turn binary string into JSON readable data
import json

# Create your views here.
class All_moves(APIView):
    # specify which request method should trigger this behavior
    def get(self, request):
        # grab a binary string of all Moves in the DB ordered by name
        moves = serialize('json', Move.objects.all().order_by('name'))
        # utilize json.loads to turn moves into JSON Data
        moves = json.loads(moves)
        return Response(moves)
```

> Then add move_app/urls.py to our projects urls

```python
from django.contrib import admin
# import include to access different apps urls.py
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/pokemon/', include("pokemon_app.urls")),
    # include move_app urls.py file
    path('api/v1/moves/', include("move_app.urls")),
]
```

> And finally lets link our move_app/urls.py with our CBV

```python
# students_app/urls.py

from django.urls import path
# Import All_
from .views import All_moves

# remember all urls are prefaced by http://localhost:8000/api/v1/moves/
urlpatterns = [
    path('', All_moves.as_view(), name='all_views')
]
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
