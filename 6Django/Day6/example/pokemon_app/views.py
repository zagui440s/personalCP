from .models import Pokemon
from .serializers import PokemonSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

# def all_pokemon(request):
#     pokemon = PokemonSerializer(Pokemon.objects.order_by('name'), many=True)
#     return JsonResponse({"pokemon": pokemon.data})

class All_pokemon(APIView):

    def get(self, request):
        pokemon = PokemonSerializer(Pokemon.objects.order_by('name'), many=True)
        return Response({"pokemon": pokemon.data})
    
class A_pokemon(APIView):
    
    def get(self, request, id_or_name):
        pokemon = None
        if id_or_name.isnumeric():
            pokemon = Pokemon.objects.get(id = id_or_name)
        else:
            pokemon = Pokemon.objects.get(name = id_or_name)
        return Response(PokemonSerializer(pokemon).data)