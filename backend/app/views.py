from rest_framework import viewsets
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import YelpCategoriesSerializer, YelpRestaurantSerializer
from .models import YelpCategories, YelpRestaurant
from . import daily #imports all functions from yelp.py


#ModelViewSet handles GET and POST requests
class YelpRestaurantViewSet(viewsets.ModelViewSet):
    queryset = YelpRestaurant.objects.all().order_by('name')
    print("Amount of restaurants in model:",queryset.count())
    serializer_class = YelpRestaurantSerializer
    
#returns the restaurants in a certain radius of the user, currently has no limit but does order them by distance (closest first)
class RestaurantListViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
      longitude = self.request.query_params.get('longitude')
      latitude= self.request.query_params.get('latitude')
      radius = self.request.query_params.get('radius')#kilometers lol
      queryset = YelpRestaurant.objects.locations_near_x_within_y_km(30.6367,-97.6626,3)
      return queryset
    
#returns information on a singular restaurant, done by providing business id
class SoloRestaurantViewSet(viewsets.ModelViewSet):
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
        businessid = self.request.query_params.get('bid')
        queryset = YelpRestaurant.objects.get_restaurant(businessid)
        return queryset
 
#returns restaurants that match the name searched     
class SearchNameViewSet(viewsets.ModelViewSet):
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
        generalsearch = self.request.query_params.get('search')
        queryset = YelpRestaurant.objects.general_search(generalsearch)
        return queryset
#returns restaurants that match the name searched     
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
        categorysearch = self.request.query_params.get('search')
        queryset = YelpRestaurant.objects.category_restaurants(categorysearch)
        return queryset
      
      
#view that adds all the restaurants in Austin at the beginning of the day to the models
@api_view()
@permission_classes([AllowAny])
def add_all_restaurants_to_model(request):
  if request.method == 'GET':
    daily.populateData()
    return Response({'message':'we received your request'})
  
#view that deletes all the content in the YelpRestaurant Model, currently not scheduled on its own (TO DO)
#make sure that it is an admin user (need to do)
@api_view()
@permission_classes([AllowAny])
def delete_all_restaurants_in_model(request):
  daily.deleteData()
  return Response({'message':'we received your request'})
 
#view that will allow restaurant owner to PUT/POST info over sustainability

#view that will allow user to filter the restaurants displayed to it using categories

#add functionality for changing user password and verifying that the user is the business owner


  