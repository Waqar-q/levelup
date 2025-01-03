# Generated by Django 5.1.1 on 2024-12-01 11:44

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_course_date_of_creation'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='views',
            field=models.IntegerField(default=0, verbose_name='Views'),
        ),
        migrations.CreateModel(
            name='View',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='View ID')),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='course', to='api.course')),
                ('viewer', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='viewer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
