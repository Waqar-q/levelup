# Generated by Django 5.1.1 on 2024-11-10 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='age',
            field=models.IntegerField(default=12, verbose_name='Age'),
        ),
    ]