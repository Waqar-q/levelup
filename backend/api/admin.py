from django.contrib import admin
from .models import User, Course, CourseCategory, CourseSubcategory, CourseModule, Lecture, Document, Review
from import_export.admin import ImportExportModelAdmin

@admin.register(User)
class CourseCategoryAdmin(ImportExportModelAdmin):
    pass

@admin.register(Course)
class CourseAdmin(ImportExportModelAdmin):
    pass

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
