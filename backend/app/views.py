from rest_framework import viewsets
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import YelpRestaurantSerializer
from .models import YelpRestaurant
from . import daily #imports all functions from yelp.py


#ModelViewSet handles GET and POST requests
class YelpRestaurantViewSet(viewsets.ModelViewSet):
    queryset = YelpRestaurant.objects.all().order_by('name')
    print("Amount of restaurants in model:",queryset.count())
    serializer_class = YelpRestaurantSerializer
    
class HomeViewSet(viewsets.ModelViewSet):
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
      longitude = self.request.query_params.get('longitude')
      latitude= self.request.query_params.get('latitude')
      radius = self.request.query_params.get('radius')
      
      #queryset = YelpRestaurant.objects.filter(latitude__gte=28.054, latitude__lte=32.086)
      queryset = YelpRestaurant.objects.locations_near_x_within_y_km(30.6367,-97.6626,10)
      return queryset
      
#view that will be used when the user logs into the app and searches for restaurants
@api_view()
@permission_classes([AllowAny])
def home_view(request):
  #latitude_user = request.query_params['latitude']
  #longitude_user = request.query_params['longitude']
  #radius_user = request.query_params['radius']
  #yelp_data = yelp.restaurants_in_radius(latitude_user,longitude_user,radius_user,100,0)
  #serializer = YelpRestaurantSerializer(data=yelp_data) #to see if the data can be deserialized to be saved to the database
  #print(serializer.is_valid)
  if request.method == 'GET':
    #restaurants = YelpRestaurant.objects
    #LocationsNearMe = YelpRestaurant.objects.locations_near_x_within_y_km(30.636,97.6626,10)
    #print(YelpRestaurantSerializer(LocationsNearMe))
    LocationsNearMe = YelpRestaurant.objects.filter(latitude__gte=28.054, latitude__lte=32.086)
    return YelpRestaurantSerializer(LocationsNearMe)
  #Currently does nothing

#view that adds all the restaurants in Austin at the beginning of the day to the models
@api_view()
@permission_classes([AllowAny])
def add_all_restaurants_to_model(request):
  if request.method == 'GET':
    daily.populateData()
    return Response({'message':'we received your request'})
  
#view that deletes all the content in the YelpRestaurant Model
#make sure that it is an admin user (need to do)
@api_view()
@permission_classes([AllowAny])
def delete_all_restaurants_in_model(request):
  daily.deleteData()
  return Response({'message':'we received your request'})
 
#view that will allow restaurant owner to PUT/POST info over sustainability

#view that will allow user to filter the restaurants displayed to it using various things

#view that will return all info of one restaurant (when user clicks on a specific restaurant)

#will need to add functionality that deletes all data from database every day except for
#business id and sustainablity data

#add functionality for changing user password and verifying that the user is the business owner


  