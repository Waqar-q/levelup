# Generated by Django 5.1.1 on 2024-11-15 03:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_coursesubcategory_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='subcategory',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='courses', to='api.coursesubcategory'),
        ),
    ]
