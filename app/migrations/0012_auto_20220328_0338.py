# Generated by Django 3.2.12 on 2022-03-28 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_auto_20220328_0259'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yelprestaurant',
            name='latitude',
            field=models.DecimalField(decimal_places=15, max_digits=30),
        ),
        migrations.AlterField(
            model_name='yelprestaurant',
            name='longitude',
            field=models.DecimalField(decimal_places=15, max_digits=30),
        ),
    ]
