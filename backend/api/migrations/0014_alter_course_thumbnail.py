# Generated by Django 5.1.1 on 2024-12-22 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_course_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='thumbnail',
            field=models.ImageField(blank=True, default='course_thumbnails/default_thumbnail.jpg', null=True, upload_to='course_thumbnails/', verbose_name='Thumbnail'),
        ),
    ]
