from rest_framework import serializers

from .models import YelpRestaurant, YelpCategories

class YelpRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpRestaurant
        fields = '__all__'

class YelpCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpCategories
        fields = '__all__'

    
   