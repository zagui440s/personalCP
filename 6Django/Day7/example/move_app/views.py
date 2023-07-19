from .models import Move
from .serializers import MoveSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class All_moves(APIView):

    def get(self, request):
        moves = MoveSerializer(Move.objects.all(), many=True)
        return Response({"moves":moves.data})
    
class A_move(APIView):
    def get(self, request, name):
        move = Move.objects.get(name = name.title())
        return Response(MoveSerializer(move).data)