from rest_framework import serializers
from .models import Move
from pokemon_app.serializers import PokemonSerializer

class MoveSerializer(serializers.ModelSerializer):
    pokemon = serializers.SerializerMethodField()

    class Meta:
        model = Move
        fields = ['id', 'power', 'accuracy', 'pokemon']

    def get_pokemon(self, obj):
        pokemon = obj.pokemon.all()
        pokemon = [x.name for x in pokemon]
        return pokemon