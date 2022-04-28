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
    
#returns the restaurants in a certain radius of the user, currently has no limit but does order them by distance (closest first)
class RestaurantListViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
      longitude = self.request.query_params.get('longitude') #gets longitude parameter passed in the request
      latitude= self.request.query_params.get('latitude') #gets latitude parameter passed in the request
      radius = self.request.query_params.get('radius')#kilometers lol
      queryset = YelpRestaurant.objects.locations_near_x_within_y_km(30.6367,-97.6626,3) #uses the query called locations_near_x_within_y_km defined in models.py
      return queryset
    
#returns information on a singular restaurant, done by providing business id
class SoloRestaurantViewSet(viewsets.ModelViewSet):
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
        businessid = self.request.query_params.get('bid') #gets bid parameter passed in the request
        queryset = YelpRestaurant.objects.get_restaurant(businessid) #uses the query called get_restaurant defined in models.py
        return queryset
 
#returns restaurants that match the name searched     
class SearchNameViewSet(viewsets.ModelViewSet):
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
        generalsearch = self.request.query_params.get('search') #gets search parameter passed in the request
        queryset = YelpRestaurant.objects.general_search(generalsearch) #uses the query called general_search defined in models.py and uses generalsearch as an argument
        return queryset
      
#returns restaurants that match the name searched     
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = YelpRestaurantSerializer
    def get_queryset(self):
        categorysearch = self.request.query_params.get('search') #gets search parameter passed in the request
        queryset = YelpRestaurant.objects.category_restaurants(categorysearch) #uses the query called category_restaurants defined in models.py and uses categorysearch as an argument
        return queryset
      
      
#view that adds all the restaurants in Austin at the beginning of the day to the models
@api_view()
@permission_classes([AllowAny])
def add_all_restaurants_to_model(request):
  if request.method == 'GET':
    daily.populateData() #calls the populateData method from daily.py
    return Response({'message':'we received your request'})
  
#view that deletes all the content in the YelpRestaurant Model, currently not scheduled on its own (TO DO)
#make sure that it is an admin user (need to do)
@api_view()
@permission_classes([AllowAny])
def delete_all_restaurants_in_model(request):
  daily.deleteData() #calls the deleteData method from daily.py
  return Response({'message':'we received your request'})
 

#view that will allow restaurant owner to PUT/POST info over sustainability

#add functionality for changing user password and verifying that the user is the business owner


  