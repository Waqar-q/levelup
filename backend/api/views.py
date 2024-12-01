from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from django.contrib.auth import authenticate
from .models import User, Course, CourseCategory, CourseSubcategory, CourseModule, Lecture, Document, Review
from .serializers import UserSerializer, CourseSerializer, CourseCategorySerializer, CourseSubcategorySerializer, CourseModuleSerializer, LectureSerializer, DocumentSerializer, ReviewSerializer
from .utilities import LimitPagination, PagePagination
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import requests 
from backend.settings import GOOGLE_OAUTH2_CLIENT_ID, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def homepage(request):
    return render(request, 'index.html')

@api_view(['POST'])
def login_check(request):
    email = request.data.get('email').lower().strip()
    password = request.data.get('password')

    try:
        user = authenticate(request, username=email, password=password)
    except:
        raise Exception("Can't Authenticate User")


    if (user is not None):
        return Response({
            'message':"Successful", 
            'firstName': user.first_name, 
            'lastName': user.last_name, 
            'user_id': user.id, 
            'email': user.email,
            'age' : user.age,
            'gender': user.gender,
            'phone': user.phone,
            })
    else :
        return Response({'message':"Not Successful"})

@api_view(['POST'])    
def google_login_check(request):
    token = request.data.get('token')
    
    try:
        idinfo = id_token.verify_oauth2_token(token,google_requests.Request(),GOOGLE_OAUTH2_CLIENT_ID)

        user_email = idinfo['email']
        user_name = idinfo['name']
        first_name = user_name.split(' ')[0]
        last_name = user_name.split(' ')[-1]


        user, created = User.objects.get_or_create(email = user_email, defaults={'name':user_name})
        
        return Response({
            'message': "Login Successful",
            'login status': "true",
            'user_id': user.id,
            'firstName': first_name,
            'lastName': last_name,
            'email': user_email,
            'gender': user.gender,
            'age': user.age,
            'phone': user.phone,
        })
        
    except ValueError:
        return Response({
            'message':"Invalid Token",
            'login status': 'false',
        }, status=400)

@api_view(['POST'])   
def facebook_login_check(request):
    inputToken = request.data.get('fb-token')
    print("token:",inputToken)
    
    if not inputToken:
        return JsonResponse({"error": "Token is missing"}, status=400)

    try:
        user_info_url = f"https://graph.facebook.com/v21.0/me?fields=id,name,email,picture&access_token={inputToken}"
        user_info_response_json = requests.get(user_info_url, timeout=1).json()
    except:
        return JsonResponse({'error': 'User info not recieved'})
    
    user_email = user_info_response_json['email']
    user_name = user_info_response_json['name']
    picture_url = user_info_response_json['picture']['data']['url']
    
    user = User.objects.get_or_create(email = user_email, defaults={'name':user_name})

    
    return Response({'email': user_email, 'name': user_name, 'picture':picture_url})

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = PagePagination


class CourseCategoryViewSet(viewsets.ModelViewSet):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    pagination_class = LimitPagination

class CourseSubcategoryViewSet(viewsets.ModelViewSet):
    queryset = CourseSubcategory.objects.all()
    serializer_class = CourseSubcategorySerializer
    pagination_class = LimitPagination

class CourseModuleViewSet(viewsets.ModelViewSet):
    queryset = CourseModule.objects.all()
    serializer_class = CourseModuleSerializer
    pagination_class = LimitPagination

class LectureViewSet(viewsets.ModelViewSet):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    pagination_class = LimitPagination

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    pagination_class = LimitPagination

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = LimitPagination

