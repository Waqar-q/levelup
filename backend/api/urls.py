from rest_framework import routers
from .views import UserViewSet, CourseViewSet, CourseCategoryViewSet, CourseSubcategoryViewSet, CourseModuleViewSet, LectureViewSet, DocumentViewSet, ReviewViewSet, login_check, google_login_check, facebook_login_check
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'course-categories', CourseCategoryViewSet)
router.register(r'course-subcategories', CourseSubcategoryViewSet)
router.register(r'course-modules', CourseModuleViewSet)
router.register(r'lectures', LectureViewSet)
router.register(r'documents', DocumentViewSet)
router.register(r'reviews', ReviewViewSet)


urlpatterns =[
    path('', include(router.urls)),
    path('auth/login/', login_check, name='login'),
    path('auth/google-login/', google_login_check, name='google-login'),
    path('auth/facebook-login/', facebook_login_check, name='facebook-login'),


]