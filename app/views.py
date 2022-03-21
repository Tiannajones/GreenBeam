from rest_framework import viewsets
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import YelpRestaurantSerializer
from .models import YelpRestaurant
from . import yelp #imports all functions from yelp.py


#ModelViewSet handles GET and POST requests
class YelpRestaurantViewSet(viewsets.ModelViewSet):
    queryset = YelpRestaurant.objects.all().order_by('business_id')
    serializer_class = YelpRestaurantSerializer




#view that will be used when the user logs into the app and searches for restaurants
#needs to be able to use YELP API to add restaurants as well
#
@api_view()
@permission_classes([AllowAny])
def home_view(request):
  latitude_user = request.query_params['latitude']
  print(latitude_user)
  longitude_user = request.query_params['longitude']
  print(longitude_user)
  radius_user = request.query_params['radius']
  print(radius_user)
  yelp_data = yelp.restaurants_in_radius(latitude_user,longitude_user,radius_user,100,0)
  #print(yelp_data)
  
  serializer = YelpRestaurantSerializer(data=yelp_data) #to see if the data can be deserialized to be saved to the database
  print(serializer.is_valid)
  return Response({'message':'we received your request'})
 
#view that will allow restaurant owner to PUT/POST info over sustainability

#view that will allow user to filter the restaurants displayed to it using various things

#view that will return all info of one restaurant (when user clicks on a specific restaurant)

#will need to add functionality that deletes all data from database every day except for
#business id and sustainablity data

#add functionality for changing user password and verifying that the user is the business owner


  