"""pokedex_proj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
import math

def square_area_view(request, side):
    area_of_a_square = side ** 2
    return HttpResponse(area_of_a_square)

def circle_area_view(request, side):
    area_of_a_circle = math.pi * (side ** 2)
    return HttpResponse(area_of_a_circle)

def triangle_area_view(request, base, height):
    print(request.headers)
    area_of_a_triangle = (base * height)/2
    return HttpResponse(area_of_a_triangle)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('squares/<int:side>/', square_area_view, name='square'),
    path('circles/<int:side>/', circle_area_view, name='circle'),
    path('triangles/base/<int:base>/height/<int:height>/', triangle_area_view, name='triangle'),
    path('api/v1/pokemon/', include("pokemon_app.urls")),
    path('api/v1/moves/', include("move_app.urls")),
    path('api/v1/noun/', include("api_app.urls")),
    path('api/v1/users/', include("trainer_app.urls")),
]
