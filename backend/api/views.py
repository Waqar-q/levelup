from datetime import timedelta
from urllib import response
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .authentication import JWTAuthentication
from .models import User, Course, CourseCategory, CourseSubcategory, CourseModule, Lecture, Document, Review, View
from .serializers import UserSerializer, CourseSerializer, CourseCategorySerializer, CourseSubcategorySerializer, CourseModuleSerializer, LectureSerializer, DocumentSerializer, ReviewSerializer, ViewSerializer
from .utilities import LimitPagination, PagePagination
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import requests 
from backend.settings import GOOGLE_OAUTH2_CLIENT_ID, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, SECRET_KEY

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['GET'], url_path='enroll')
    def enroll(self, request):
        print("request User", request.user)
        user = User.objects.get(id=request.user.id)
        
        course_id = request.query_params.get('id')
        new_course = Course.objects.get(id=course_id)
        user.courses.add(new_course)
        try:
            user.save()
            print(user.courses.all())
            return Response({"message": "Successful"})
        except Exception as e:
            print(e)
            return Response({"message": e})

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
        refresh = RefreshToken.for_user(user)
        refresh.access_token.set_exp(lifetime=timedelta(hours=1))
        access_token = str(refresh.access_token)
        
        response = Response({
            'message':"Successful", 
            'firstName': user.first_name, 
            'lastName': user.last_name, 
            'user_id': user.id, 
            'email': user.email,
            'age' : user.age,
            'gender': user.gender,
            'phone': user.phone,
            })
        response.set_cookie(
        key='jwt', 
        value=access_token, 
        httponly=True,  
        secure=True,    
        samesite='Lax'  
    )
        return response
    else :
        return Response({'message':"User does not exists", "redirect":"signup"})

@api_view(["POST"])  
def signup(request):
    email = request.data.get('email').lower().strip()
    password = request.data.get('password')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')

    try:
        created_user = User.objects.create(email=email, first_name=first_name, last_name=last_name)
        created_user.set_password(password)
        created_user.save()
        user = authenticate(email=email, password=password)
    except:
        raise Exception("Can't Create/Authenticate User")


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
        return Response({'message':"User does not exists"})

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

@csrf_exempt
def user_logout(request):
    response = JsonResponse({'message':'Logged out Successfully!'})
    response.delete_cookie('jwt')
    return response

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = PagePagination

    @action(detail=False, methods=['GET'], url_path='free')
    def free(self, request):
        free_courses = Course.objects.filter(price=0)
        page = self.paginate_queryset(free_courses)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(free_courses, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], url_path='trending')
    def trending(self, request):
        trending_courses = Course.objects.order_by('-views')
        page = self.paginate_queryset(trending_courses)
        serializer = self.get_serializer(page, many=True)
        response = self.get_paginated_response(serializer.data)
        return response

    @action(detail=False, methods=['GET'], url_path='related')
    def related(self, request):
        category= CourseCategory.objects.get(id=request.query_params.get('category'))
        related_courses = Course.objects.filter(category=category).order_by("-views")
        page = self.paginate_queryset(related_courses)
        serializer = self.get_serializer(page, many=True)
        response = self.get_paginated_response(serializer.data)
        return response

class CourseCategoryViewSet(viewsets.ModelViewSet):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    pagination_class = LimitPagination

class CourseSubcategoryViewSet(viewsets.ModelViewSet):
    queryset = CourseSubcategory.objects.all()
    serializer_class = CourseSubcategorySerializer
    pagination_class = LimitPagination

    @action(detail=False, methods=['GET'])
    def get_subcategories_by_category(self, request):
        category = request.query_params.get('category')
        subcategories= CourseSubcategory.objects.filter(category = category)
        serializer = self.get_serializer(subcategories, many=True)
        response = Response({"Subcategories":serializer.data})
        return response

class CourseModuleViewSet(viewsets.ModelViewSet):
    queryset = CourseModule.objects.all()
    serializer_class = CourseModuleSerializer
    pagination_class = LimitPagination

    @action(detail=False, methods=['GET'], url_path='by-course')
    def get_modules_by_course(self, request):
        course_id = request.query_params.get('course_id')
        modules= CourseModule.objects.filter(course = course_id)
        serializer = self.get_serializer(modules, many=True)
        response = Response({"Modules":serializer.data})
        return response

class LectureViewSet(viewsets.ModelViewSet):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    pagination_class = LimitPagination

    @action(detail=False, methods=['GET'], url_path='by-module')
    def get_lectures_by_modules(self, request):
        module_id = request.query_params.get('module_id')
        lectures= Lecture.objects.filter(module = module_id)
        serializer = self.get_serializer(lectures, many=True)
        print("Module and it's Lectures:",module_id , serializer.data)
        response = Response({"Lectures":serializer.data})
        return response

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    pagination_class = LimitPagination

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = LimitPagination

class ViewViewSet(viewsets.ModelViewSet):
    queryset = View.objects.all()
    serializer_class = ViewSerializer
    pagination_class = LimitPagination

