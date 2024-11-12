from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid


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
    id = models.UUIDField("User ID", default=uuid.uuid4, primary_key=True, editable=False)
    email = models.EmailField('Email',max_length=50, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    age = models.IntegerField('Age', default=12)
    gender = models.CharField('Gender',max_length=1,choices=[('N','Not disclose'), ('M','Male'), ('F', 'Female')], default='N')
    phone = models.PositiveIntegerField("Phone", null=True, blank=True, unique=True)
    role = models.CharField('Role', max_length=20, choices=(('student','Student'),('instructor', 'Instructor')), default='student')
    profile_picture = models.ImageField('Profile Picture',upload_to='profile pics/', blank=True, null=True)
    date_joined = models.DateTimeField('Date Joined', auto_now_add=True)
    is_active = models.BooleanField('Active Status', default=True)
    is_staff = models.BooleanField('Staff Status', default=False)
    courses = models.ManyToManyField(to='Course',related_name='enrolled_students')

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']

    def __str__(self):
        return self.email

    
class Course(models.Model):
    id = models.UUIDField("Course ID",primary_key=True, default=uuid.uuid4, editable=False)
    course_name = models.CharField("Course Name", blank=False, max_length=200)
    tag_line = models.TextField("Tag Line", blank=False, max_length=200)
    description = models.TextField("Description", max_length=2000)
    requirements = models.TextField("Requirements", max_length=1000)
    duration = models.DecimalField("Duration in Hrs", decimal_places=1, max_digits=4)
    date_of_creation = models.DateField("Creation Date", auto_now_add=True)
    thumbnail = models.ImageField("Thumbnail",upload_to="course_thumbnails/", blank=True, null=True)
    price = models.IntegerField("Price", blank=False, null=False)

    class LanguageChoices(models.TextChoices):
            ENGLISH = 'EN', 'English'
            HINDI = 'HI', 'Hindi'
            ARABIC = 'AR', 'Arabic'
            MARATHI = 'MR', 'Marathi'
            FRENCH = 'FR', 'French'
            SPANISH = 'ES', 'Spanish'
            GERMAN = 'DE', 'German'
            CHINESE = 'ZH', 'Chinese'
            JAPANESE = 'JA', 'Japanese'
            KOREAN = 'KO', 'Korean'
            PORTUGUESE = 'PT', 'Portuguese'
            ITALIAN = 'IT', 'Italian'
            RUSSIAN = 'RU', 'Russian'
            TURKISH = 'TR', 'Turkish'
            PERSIAN = 'FA', 'Persian'
            URDU = 'UR', 'Urdu'
            BENGALI = 'BN', 'Bengali'
            PUNJABI = 'PA', 'Punjabi'
            TAMIL = 'TA', 'Tamil'
            TELUGU = 'TE', 'Telugu'
            MALAYALAM = 'ML', 'Malayalam'
            THAI = 'TH', 'Thai'
            VIETNAMESE = 'VI', 'Vietnamese'
            INDONESIAN = 'ID', 'Indonesian'
            GREEK = 'EL', 'Greek'
            SWEDISH = 'SV', 'Swedish'
            DUTCH = 'NL', 'Dutch'
            HUNGARIAN = 'HU', 'Hungarian'
            POLISH = 'PL', 'Polish'
            HEBREW = 'HE', 'Hebrew'
            CZECH = 'CS', 'Czech'
            ROMANIAN = 'RO', 'Romanian'
            FINNISH = 'FI', 'Finnish'
            NORWEGIAN = 'NO', 'Norwegian'
            UKRAINIAN = 'UK', 'Ukrainian'
            FILIPINO = 'TL', 'Filipino'
            MALAY = 'MS', 'Malay'
            SWAHILI = 'SW', 'Swahili'

    language = models.CharField("Language",max_length=2, choices = LanguageChoices.choices)
    category = models.ForeignKey(to="CourseCategory", on_delete=models.SET_NULL, related_name='courses', null=True)

class CourseCategory(models.Model):
    id = models.AutoField("Course Category ID", primary_key=True)
    category_name = models.CharField("Course Category Name", blank=False, max_length=50)
    description = models.TextField("Category Description", max_length=500)
    image = models.ImageField("Category Image", upload_to="category_images/", null=False)

    def __str__(self):
        return self.category_name

class CourseSubcategory(models.Model):
    id = models.AutoField("Course Subcategory ID", primary_key=True)
    subcategory_name = models.CharField("Course Subcategory Name", blank=False, max_length=50)
    description = models.TextField("Category Description", max_length=500)
    image = models.ImageField("Subcategory Image", upload_to="subcategory_images/", null=False)
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.subcategory_name

class CourseModule(models.Model):
    id = models.UUIDField("Course Module ID",primary_key=True, default=uuid.uuid4, editable=False)
    module_name = models.CharField("Course Module Name", blank=False, max_length=200)
    description = models.TextField("Module Description", max_length=500)
    course = models.ForeignKey(to=Course, on_delete=models.CASCADE, related_name='modules')

    def __str__(self):
        return self.module_name

class Lecture(models.Model):
    id = models.UUIDField("Lecture ID",primary_key=True, default=uuid.uuid4, editable=False)
    lecture_name = models.CharField("Lecture Name", blank=False, max_length=100)
    module = models.ForeignKey(to=CourseModule,on_delete=models.CASCADE, related_name='lectures')
    video_link = models.URLField("Lecture Video Link", blank=True)
    lecture_length = models.DurationField("Length of Lecture", null=False)

    def __str__(self):
        return self.lecture_name

class Document(models.Model):
    id = models.UUIDField("Document ID",primary_key=True, default=uuid.uuid4, editable=False)
    document_name = models.CharField("Document Name", blank=False, max_length=100)
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='documents')
    document_url = models.URLField("Document URL", null=False, blank=False)

    def __str__(self):
        return self.document_name

class Review(models.Model):
    id = models.UUIDField("Review ID",primary_key=True, default=uuid.uuid4, editable=False)
    reviewer_name = models.ForeignKey(to="User", null=False, on_delete=models.DO_NOTHING, related_name='reviews')
    review_description = models.TextField("Review Description", blank=True, null=True)
    class RatingChoices(models.IntegerChoices):
        ONE = 1, "1 Star"
        TWO = 2, "2 Stars"
        THREE = 3, "3 Stars"
        FOUR = 4, "4 Stars"
        FIVE = 5, "5 Stars"
    given_rating = models.IntegerField("Star Rating", choices=RatingChoices.choices, default=RatingChoices.FIVE)
    course = models.ForeignKey(to=Course, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.reviewer_name