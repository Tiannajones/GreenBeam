from rest_framework import serializers

from .models import SustainabilityRating, YelpRestaurant, YelpCategories

#Serializer for the YelpRestaurant model
class YelpRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpRestaurant
        fields = '__all__'

#Serializer for the YelpCategories model
class YelpCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelpCategories
        fields = '__all__'

#Serializer for the SusRatingSerializer
class SusRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SustainabilityRating
        fields = '__all__'

    
   