from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from .serializers import ListSerializer, List
# Create your views here.
class All_lists(APIView):
    
    def get(self, request):
        lists = ListSerializer(List.objects.order_by('id'), many = True)
        return Response(lists.data)

    def post(self, request):
        new_list = List(**request.data)
        new_list.save()
        a_list = ListSerializer(new_list)
        return Response(a_list.data, status=HTTP_201_CREATED)

class A_list(APIView):

    def get(self, request, id):
        a_list = ListSerializer(get_object_or_404(List, id = id))
        return Response(a_list.data)
    
    def put(self, request, id):
        try:
            a_list = get_object_or_404(List, id = id)
            a_list.list_name = request.data.get("list_name")
            a_list.save()
            return Response(status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response("Something went wrong",status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        a_list = ListSerializer(get_object_or_404(List, id = id))
        a_list.delete()
        return Response(status=HTTP_204_NO_CONTENT)


