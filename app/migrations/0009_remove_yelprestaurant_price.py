# Generated by Django 3.2.12 on 2022-03-28 02:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20220327_2022'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='yelprestaurant',
            name='price',
        ),
    ]
