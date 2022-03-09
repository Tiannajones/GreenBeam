
from django.http import HttpResponse


from rest_framework import viewsets
from .serializers import YelpRestaurantSerializer
from .models import YelpRestaurant


#ModelViewSet handles GET and POST requests
class YelpRestaurantViewSet(viewsets.ModelViewSet):
    queryset = YelpRestaurant.objects.all().order_by('business_id')
    serializer_class = YelpRestaurantSerializer


# Create your views here.

def index(request):
  return HttpResponse("GreenBeam says Hello")