# Django Server

## Lesson

In this lesson we are going to step away from the `Pokedex` exercise for a second and concentrate on the Django Server. The Django server is a development server that allows you to run your Django web application locally for testing and development purposes. It provides a convenient way to preview your application and debug any issues before deploying it to a production environment. This guide covers several important topics related to the Django server:

## Testable Learning Objectives (TLO's)

- Build `urlpatterns` and `path's`
- Pass parameters through `url path's`

## Elective Learning Objectives (ELO's)

- Understand the Django Server
- Understand Requests

1. [What does `python manage.py runserver` do?](#what-does-python-managepy-runserver-do)
2. [How do urlpatterns and paths work?](#how-do-urlpatterns-and-paths-work)
3. [How do URL paths link to Django views?](#how-do-url-paths-link-to-django-views)
4. [What is a request?](#what-is-a-request)
5. [How to pass parameters through URL patterns?](#how-to-pass-parameters-through-url-patterns)

## What does `python manage.py runserver` do?

> The `python manage.py runserver` command is used to start the Django development server. It launches a lightweight web server that listens for incoming requests and serves your Django application locally. By running this command in your project's root directory, you can access your application via a local URL (typically `http://127.0.0.1:8000/`) in your web browser.

## How do urlpatterns and paths work?

> In Django, the `urlpatterns` variable is a list of URL patterns defined in your project's `urls.py` module. Each URL pattern consists of a `path()` function call, which maps a URL pattern to a specific view function or view class.

> The `path()` function takes two required arguments: `route` and `view`. The `route` argument specifies the URL pattern, while the `view` argument identifies the view function or class that handles the request.

```python
from django.urls import path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('squares/', square_area_view, name='square'),
    path('circles/', circle_area_view, name='circle'),
    path('triangles/', triangle_area_view, name='triangle'),
]
```

> In the example above, three URL patterns are defined. The first pattern maps the URL `/squares/` to the `square_area_view` function, and the second pattern maps the URL `/circles/` to the `circle_area_view` function and so on.

> It's important to note that each one of these URL paths are prefaced by `http://127.0.0.1:8000/`, this means that if we wanted to send a request to the `squares/` path we would have to send a request to `http://127.0.0.1:8000/squares/`

## How do URL paths link to Django views?

> URL paths in Django are associated with view functions or view classes, we will learn about Class Based Views later on in the course. When a request is made to a specific URL, Django's URL resolver determines the corresponding view function or class based on the defined URL patterns.

> For example, if a user requests the URL `/squares/`, Django's URL resolver matches it to the `square_area_view` function specified in the `urlpatterns` list.

```python
def square_area_view(request):
    area_of_a_square = 2 ** 2
    return HttpResponse(area_of_a_square)
```

> The `square_area_view` function is responsible for processing the request and generating an appropriate response. It can interact with models, perform calculations, and render templates to construct the response.

## What is a request?

> In Django, a request represents an HTTP request made by a client (e.g., a web browser) to the Django server. The request contains information such as the URL, HTTP method (e.g., GET, POST), headers, and any submitted data.

> When a request is received by the Django server, it is passed to the appropriate view function or class based on the URL pattern. The view then processes the request and returns an HTTP response, which is sent back to the client.

```python
def circle_area_view(request):
    area_of_a_circle = math.pi * (2 ** 2)
    return HttpResponse(area_of_a_circle)
```

> In the example above, the `circle_area_view` function is responsible for handling requests to the `/circles/` URL. It currently returns the `area` of a circle but a `view` could potentially return just about anything.

## How to pass parameters through URL patterns?

> URL patterns in Django can include parameters that are captured and passed to the corresponding view function or class. Parameters are specified within angle brackets `< >` in the URL pattern definition.

```python
path('squares/<int:side>/', square_area_view, name='square'),
```

> In the example above, the URL pattern `squares/<int:side>/` captures an integer parameter (`side`) and passes it to the `square_area_view` function.

```python
def square_area_view(request, side):
    area_of_a_square = side ** 2
    return HttpResponse(area_of_a_square)
```

> The `square_area_view` function can access the captured parameter (`side`) as an argument and use it to retrieve and display the details of a squares specific area.

## Conclusion

> The Django server is a crucial tool for local development and testing of Django applications. By using `python manage.py runserver`, you can start the development server and access your application through a local URL. Understanding the concepts of urlpatterns, paths, views, requests, and parameter passing allows you to define the URL structure, link it to appropriate views, process requests, and create dynamic and interactive web applications with Django.
