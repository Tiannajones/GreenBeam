from rest_framework import viewsets, generics, status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import YelpRestaurantSerializer
from .models import YelpRestaurant
from . import daily #imports all functions from yelp.py
from geopy.geocoders import Nominatim #for getCoordinatesFromAddress
from rest_framework_gis.filterset import GeoFilterSet

#ModelViewSet handles GET and POST requests
class YelpRestaurantViewSet(viewsets.ModelViewSet):
    queryset = YelpRestaurant.objects.all().order_by('name')
    print("Amount of restaurants in model:",queryset.count())
    serializer_class = YelpRestaurantSerializer

#view that will be used when the user logs into the app and searches for restaurants
@api_view()
@permission_classes([AllowAny])
def home_view(request):
  if request.method == 'GET':
    latitude_user = request.query_params['latitude']
    longitude_user = request.query_params['longitude']
    radius = 15
    
    #find min and max 
  #latitude_user = request.query_params['latitude']
  #longitude_user = request.query_params['longitude']
  #radius_user = request.query_params['radius']
  #yelp_data = yelp.restaurants_in_radius(latitude_user,longitude_user,radius_user,100,0)
  #serializer = YelpRestaurantSerializer(data=yelp_data) #to see if the data can be deserialized to be saved to the database
  #print(serializer.is_valid)
  
  #Currently does nothing
  return Response({'message':'we received your request'})

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
 
#takes in an address and returns its latitude and longitude
class GetCoordinatesFromAddress(generics.ListAPIView, GeoFilterSet):
    def get(self, *args, **kwargs):
        # We can check on the server side the location of the users, using request
        # point = self.request.user.coordinates
        # ?address=QUERY_ADDRESS
        # QUERY_ADDRESS is the information user passes to the query
        QUERY_ADDRESS = self.request.query_params.get('address', None)

        if QUERY_ADDRESS not in [None, '']:
            # here we can use the geopy library:
            geolocator = Nominatim(user_agent="mysuperapp")
            location = geolocator.geocode(QUERY_ADDRESS)
            return Response({'coordinates': [location.latitude ,location.longitude]}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No address was passed in the query'}, status=status.HTTP_400_BAD_REQUEST)
 
 
#view that will allow restaurant owner to PUT/POST info over sustainability

#view that will allow user to filter the restaurants displayed to it using various things

#view that will return all info of one restaurant (when user clicks on a specific restaurant)

#will need to add functionality that deletes all data from database every day except for
#business id and sustainablity data

#add functionality for changing user password and verifying that the user is the business owner


  