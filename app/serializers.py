from rest_framework import serializers

from .models import YelpRestaurant

class YelpRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpRestaurant
        fields = '__all__'
    
   