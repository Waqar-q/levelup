from rest_framework import routers
from .views import UserViewSet, login_check, google_login_check, facebook_login_check
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns =[
    path('', include(router.urls)),
    path('auth/login/', login_check, name='login'),
    path('auth/google-login/', google_login_check, name='google-login'),
    path('auth/facebook-login/', facebook_login_check, name='facebook-login'),


]