from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email address is required.')
        
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser',True)

        return self.create_user(email,password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField('Id', primary_key=True)
    email = models.EmailField('Email',max_length=50, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    age = models.IntegerField('Age')
    gender = models.CharField('Gender',max_length=1,choices=[('O', 'Other'), ('M','Male'), ('F', 'Female')], default='M')
    phone = models.PositiveIntegerField("Phone", null=True, blank=True, unique=True)
    role = models.CharField('Role', max_length=20, choices=(('student','Student'),('instructor', 'Instructor')), default='student')
    profile_picture = models.ImageField('Profile Picture',upload_to='profile pics/', blank=True, null=True)
    date_joined = models.DateTimeField('Date Joined', auto_now_add=True)
    is_active = models.BooleanField('Active Status', default=True)
    is_staff = models.BooleanField('Staff Status', default=False)

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']

    def __str__(self):
        return self.email

    