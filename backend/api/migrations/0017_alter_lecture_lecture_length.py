# Generated by Django 5.1.1 on 2024-12-28 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_lecture_lecture_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lecture',
            name='lecture_length',
            field=models.DurationField(default='45:20:00', null=True, verbose_name='Length of Lecture'),
        ),
    ]
