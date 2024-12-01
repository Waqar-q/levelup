from import_export import resources
from .models import Course

class CourseResource(resources.ModelResource):
   class Meta:
       model = Course
       import_id_fields = ['id']
       exclude = ('date_of_creation',)