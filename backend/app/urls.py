from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'api/allrestaurants', views.YelpRestaurantViewSet) #displays the YelpRestaurantViewSet
router.register(r'api/restaurantlist',views.RestaurantListViewSet, basename='RestaurantList') #displays the RestaurantListViewSet
router.register(r'api/solorestaurant',views.SoloRestaurantViewSet, basename='SoloRestaurant') #displays the SoloRestaurantViewSet
router.register(r'api/searchname',views.SearchNameViewSet, basename='SearchName') #displays the SearchNameViewSet
router.register(r'api/searchcategory',views.CategoryViewSet, basename='SearchCategory') #displays the CategoryViewSet

urlpatterns = [
    path('', include(router.urls)),#connects all the urls registered in router
    path('admin/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('daily/add-restaurants/', views.add_all_restaurants_to_model, name='addrestaurants'), #route to add all restaurants to the model
    path('daily/delete-restaurants/', views.delete_all_restaurants_in_model, name='deleterestaurants'), #route to delete all restaurants in model
]