# Generated by Django 3.2.12 on 2022-04-24 22:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20220424_2033'),
    ]

    operations = [
        migrations.AddField(
            model_name='yelprestaurant',
            name='sus_rating',
            field=models.ForeignKey(default='NR', on_delete=django.db.models.deletion.CASCADE, to='app.sustainabilityrating'),
        ),
    ]
