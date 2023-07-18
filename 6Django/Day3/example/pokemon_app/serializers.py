from rest_framework import serializers
from move_app.serializers import MoveSerializer
from .models import Pokemon

class PokemonSerializer(serializers.ModelSerializer):
    moves = MoveSerializer()
    
    class Meta:
        model = Pokemon
        fields = ['id', 'name', 'level', 'moves']