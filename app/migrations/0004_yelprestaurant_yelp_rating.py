# Generated by Django 3.2.12 on 2022-03-08 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_rename_yelpowned_yelprestaurant'),
    ]

    operations = [
        migrations.AddField(
            model_name='yelprestaurant',
            name='yelp_rating',
            field=models.DecimalField(decimal_places=1, max_digits=2, null=True),
        ),
    ]