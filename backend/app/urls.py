from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'api/allrestaurants', views.YelpRestaurantViewSet)
router.register(r'api/restaurantlist',views.RestaurantListViewSet, basename='RestaurantList')
router.register(r'api/solorestaurant',views.SoloRestaurantViewSet, basename='SoloRestaurant')
router.register(r'api/searchname',views.SearchNameViewSet, basename='SearchName')
#router.register(r'homeview',views.home_view, basename='HomeView')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('daily/add-restaurants/', views.add_all_restaurants_to_model, name='addrestaurants'),
    path('daily/delete-restaurants/', views.delete_all_restaurants_in_model, name='deleterestaurants'),
]