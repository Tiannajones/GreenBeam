# Generated by Django 3.2.12 on 2022-04-24 22:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_auto_20220424_2236'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='yelprestaurant',
            name='sus_rating',
        ),
    ]