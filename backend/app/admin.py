from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import SustainabilityRating, YelpCategories, YelpRestaurant

admin.site.register(YelpRestaurant)
admin.site.register(YelpCategories)
admin.site.register(SustainabilityRating)