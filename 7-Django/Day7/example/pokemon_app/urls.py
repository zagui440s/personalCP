from django.urls import path, register_converter
from .views import All_pokemon, A_pokemon
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path("", All_pokemon.as_view(), name='all_pokemon'),
    path("<int_or_str:id_or_name>/", A_pokemon.as_view(), name="a_pokemon"),
]
