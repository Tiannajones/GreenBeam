# Generated by Django 3.2.12 on 2022-03-27 20:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_alter_yelprestaurant_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='yelprestaurant',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='yelprestaurant',
            name='yelp_url',
        ),
    ]