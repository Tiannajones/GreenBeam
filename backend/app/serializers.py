from rest_framework import serializers

from .models import SustainabilityRating, YelpRestaurant, YelpCategories

class YelpRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpRestaurant
        fields = '__all__'

class YelpCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpCategories
        fields = '__all__'
        
class SusRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SustainabilityRating
        fields = '__all__'

    
   