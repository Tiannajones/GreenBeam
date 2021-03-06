from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer
from rest_framework.permissions import AllowAny

#https://www.youtube.com/watch?v=AfYfvjP1hK8 from this video
#view that allows user to register
class CustomUserCreate(APIView):
  permission_classes = [AllowAny]
  
  def post(self,request):
    reg_serializer = RegisterUserSerializer(data=request.data)
    if reg_serializer.is_valid():
      newuser = reg_serializer.save()
      if newuser:
        return Response(status=status.HTTP_201_CREATED)
    return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
