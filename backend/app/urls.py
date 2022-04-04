from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'yelprestaurant', views.YelpRestaurantViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('app/home-view/', views.home_view, name='homeview'),
    path('daily/add-restaurants/', views.add_all_restaurants_to_model, name='addrestaurants'),
    path('daily/delete-restaurants/', views.delete_all_restaurants_in_model, name='deleterestaurants')
    
]