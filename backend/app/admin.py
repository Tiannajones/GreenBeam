from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import SustainabilityRating, YelpCategories, YelpRestaurant

admin.site.register(YelpRestaurant) #adds YelpRestaurant model to admin page
admin.site.register(YelpCategories) #adds YelpCategories model to admin page
admin.site.register(SustainabilityRating) #adds Sustianability model to admin page