from django.shortcuts import get_object_or_404
from .models import Pokemon
from .serializers import PokemonSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED
# Create your views here.

# def all_pokemon(request):
#     pokemon = PokemonSerializer(Pokemon.objects.order_by('name'), many=True)
#     return JsonResponse({"pokemon": pokemon.data})

class All_pokemon(APIView):

    def get(self, request):
        pokemon = PokemonSerializer(Pokemon.objects.order_by('name'), many=True)
        return Response({"pokemon": pokemon.data})
    
    def post(self, request):
        # We could create a pokemon by specifying each individual field but that's obviously not optimal
        # new_pokemon = Pokemon(name = request.data['name'], level = request.data['level'], description = request.data['description'])
        # instead we can use the kwargs method and pass in request.data (a dict) into the create argument
        new_pokemon = Pokemon(**request.data)
        new_pokemon.full_clean()
        new_pokemon.save()
        new_pokemon = PokemonSerializer(new_pokemon)
        return Response(new_pokemon.data, status=HTTP_201_CREATED)
    
class A_pokemon(APIView):

    def get_a_pokemon(self, pokemon_identifier):
        pokemon = None
        if pokemon_identifier.isnumeric():
            pokemon = get_object_or_404(Pokemon, id = pokemon_identifier)
        else:
            pokemon = get_object_or_404(Pokemon, name = pokemon_identifier.title())
        return pokemon
    
    def get(self, request, id_or_name):
        pokemon = self.get_a_pokemon(id_or_name)
        return Response(PokemonSerializer(pokemon).data)
    
    def put(self, request, id_or_name):
        pokemon = self.get_a_pokemon(id_or_name)
        if 'level_up' in request.data and request.data['level_up']:
            pokemon.level_up()
        if 'captured' in request.data and request.data['captured']:
            pokemon.change_caught_status()
        if "moves" in request.data:
            pokemon.moves.add(request.data.get("moves"))
        if "description" in request.data:
            pokemon.description = request.data.get("description")
        pokemon.full_clean()
        pokemon.save()
        return Response(status=HTTP_204_NO_CONTENT)
    
    def delete(self, request, id_or_name):
        # get a pokemon from our database
        pokemon = self.get_a_pokemon(id_or_name)
        # delete instance and database entry
        pokemon.delete()
        # return the name of the pokemon deleted
        return Response(status=HTTP_204_NO_CONTENT)