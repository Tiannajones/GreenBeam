# Generated by Django 3.2.12 on 2022-04-24 19:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_sustainabilityrating_sus_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='yelprestaurant',
            name='sus_rating',
        ),
    ]
