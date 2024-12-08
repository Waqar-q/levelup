from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import User, Course, CourseCategory, CourseSubcategory, CourseModule, Lecture, Document, Review, View
from .resources import CourseResource

@admin.register(User)
class CourseCategoryAdmin(ImportExportModelAdmin):
    pass

@admin.register(Course)
class CourseAdmin(ImportExportModelAdmin):
    resource_class = CourseResource

@admin.register(CourseCategory)
class CourseCategoryAdmin(ImportExportModelAdmin):
    pass

@admin.register(CourseSubcategory)
class CourseSubcategoryAdmin(ImportExportModelAdmin):
    pass

@admin.register(CourseModule)
class CourseModuleAdmin(ImportExportModelAdmin):
    pass

@admin.register(Lecture)
class LectureAdmin(ImportExportModelAdmin):
    pass

@admin.register(Document)
class DocumentAdmin(ImportExportModelAdmin):
    pass

@admin.register(Review)
class ReviewAdmin(ImportExportModelAdmin):
    pass

@admin.register(View)
class ViewAdmin(ImportExportModelAdmin):
    pass
