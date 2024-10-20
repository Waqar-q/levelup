from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def homepage(request):
    return render(request, 'index.html')

@api_view(['POST'])
def login_check(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = authenticate(request, username=email, password=password)
    except:
        raise Exception("Can't Authenticate User")


    if (user is not None):
        return Response({'message':"Successfull"})
    else :
        return Response({'message':"Not Successfull"})
        
