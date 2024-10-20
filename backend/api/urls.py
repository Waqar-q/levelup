from rest_framework import routers
from .views import UserViewSet, login_check
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns =[
    path('', include(router.urls)),
    path('api-auth/login/', login_check, name='login'),
    
    


]