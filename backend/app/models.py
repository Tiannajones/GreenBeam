
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models import Q

from django.core.validators import MaxValueValidator

from django.db.models.functions import Radians, Power, Sin, Cos, ATan2, Sqrt, Radians
from django.db.models import F, FloatField
    
class RestaurantQuerySet(models.QuerySet):
    #used in views.py for filtering restaurants to ones nearby user
    #uses the Haversine equation found here https://stackoverflow.com/questions/17682201/how-to-filter-a-django-model-with-latitude-and-longitude-coordinates-that-fall-w
    def locations_near_x_within_y_km(self, current_lat, current_long, y_km):
        dlat = Radians(F('latitude') - current_lat, output_field=FloatField())
        dlong = Radians(F('longitude') - current_long, output_field=FloatField())
        a = (Power(Sin(dlat/2.0,output_field=FloatField()), 2.0,output_field=FloatField()) + Cos(Radians(current_lat,output_field=FloatField()),output_field=FloatField()) 
            * Cos(Radians(F('latitude'),output_field=FloatField()),output_field=FloatField()) * Power(Sin(dlong/2.0,output_field=FloatField()), 2.0,output_field=FloatField())
            )
        c = 2.0 * ATan2(Sqrt(a), Sqrt(1.0-a))
        d = 6371.0 * c #in km
        d = d * 0.62137 #in miles
        self.update(distance=d) #updates distance field to display the calculated distance
        return self.order_by('distance').filter(distance__lt=y_km) #orders the restaurants by distance and only displays the distances less than the y_km parameter
    
    #used in views.py for retriving information about a specific restaurant
    def get_restaurant(self,b_id):
        return self.filter(business_id=b_id).distinct()
    
    #used in views.py for searching the name of a restaurant, the category alias, or the category title
    def general_search(self,search):
        nearby = self.locations_near_x_within_y_km(30.6367,-97.6626,10) #all restaurants within a specific distance of the user
        return nearby.filter(Q(name__contains=search) | Q(categories_title__contains=search) | Q(categories_alias__contains=search)) # Q allows for multiple queries at once and | acts like or
    
    #used in views.py for searching all restaurants the contain a category
    def category_restaurants(self,categorysearch):
        return self.filter(Q(categories_title__contains=categorysearch) | Q(categories_alias__contains=categorysearch))
    
#table that keeps track of sustainability rating, is not deleted with YelpRestaurants every day
class SustainabilityRating(models.Model):
    business_id = models.CharField(primary_key=True,max_length=22)
    all_question_results = models.TextField(max_length=77, default=2222222222222222222222222222222222222222222222222222222222222222222222222222222222)
    sus_rating = models.CharField(max_length=10,default='NR')

        
    def __str__(self):
        return self.business_id

#Create table for the restaurant data or name Restuarants
class YelpRestaurant(models.Model):
    business_id = models.CharField(primary_key=True,max_length=22)
    name = models.TextField(max_length=50, default='')
    yelp_rating = models.DecimalField(max_digits=2,decimal_places=1,null=True)
    # yelp_categories = models.AutoField()
    phone_number = models.PositiveIntegerField(validators=[MaxValueValidator(9999999999)],null=True)
    #price = models.CharField(max_length=5, default='')
    latitude = models.DecimalField(max_digits=30, decimal_places=15) #https://stackoverflow.com/questions/30706799/which-model-field-to-use-in-django-to-store-longitude-and-latitude-values
    longitude = models.DecimalField(max_digits=30, decimal_places=15)
    address = models.TextField(max_length=50, default='')
    city = models.CharField(max_length=50,default='')
    state = models.CharField(max_length=3,default='')
    country = models.CharField(max_length=3,default='')
    zip_code = models.PositiveIntegerField(validators=[MaxValueValidator(99999)])
    image_url = models.TextField(max_length=200,default='')
    yelp_url = models.TextField(max_length=500,default='')
    distance = models.DecimalField(max_digits=30, decimal_places=2,default=0.00)
    
    categories_alias = models.TextField(max_length=200, default='',blank=True)
    categories_title = models.TextField(max_length=200, default='',blank=True)
    
    #sus_rating = models.ForeignKey(SustainabilityRating,on_delete=models.PROTECT,default="NR")
    
    objects = RestaurantQuerySet.as_manager() #used for filtering 
    

    
#Create table for the categories 
class YelpCategories(models.Model):
    # BID = ForeignKey(YelpRestaurant)
    business_id = models.CharField(primary_key=True,max_length=22)
    acai_bowls  = models.BooleanField(default=False)
    backshop = models.BooleanField(default=False)
    bagels = models.BooleanField(default=False)
    bakeries = models.BooleanField(default=False)
    beer_wine_and_spirits = models.BooleanField(default=False)
    bento = models.BooleanField(default=False)
    beverage_store = models.BooleanField(default=False)
    breweries = models.BooleanField(default=False)
    brewpubs = models.BooleanField(default=False)
    bubble_tea = models.BooleanField(default=False)
    butcher = models.BooleanField(default=False)
    csa = models.BooleanField(default=False)
    chimney_cake = models.BooleanField(default=False)
    churros = models.BooleanField(default=False)
    cideries = models.BooleanField(default=False)
    coffee_and_tea = models.BooleanField(default=False)
    coffee_and_tea_supplies = models.BooleanField(default=False)
    coffee_roastaries = models.BooleanField(default=False)
    convenience_store = models.BooleanField(default=False)
    cupcakes = models.BooleanField(default=False)
    custom_cakes = models.BooleanField(default=False)
    delicatessen = models.BooleanField(default=False)
    desserts = models.BooleanField(default=False)
    distilliries = models.BooleanField(default=False)
    do_it_yourself_food = models.BooleanField(default=False)
    donairs = models.BooleanField(default=False)
    donuts = models.BooleanField(default=False)
    empandas = models.BooleanField(default=False)
    ethical_grocery = models.BooleanField(default=False)
    farmers_market = models.BooleanField(default=False)
    fishmonger = models.BooleanField(default=False)
    food_delivery_services = models.BooleanField(default=False)
    food_trucks = models.BooleanField(default=False)
    fritirie = models.BooleanField(default=False)
    gelato = models.BooleanField(default=False)
    grocery = models.BooleanField(default=False)
    hawker_centre = models.BooleanField(default=False)
    honey = models.BooleanField(default=False)
    ice_cream_and_frozen_yogurt = models.BooleanField(default=False)
    imported_food = models.BooleanField(default=False)
    international_grocery = models.BooleanField(default=False)
    internet_cafes = models.BooleanField(default=False)
    japanese_sweets = models.BooleanField(default=False)
    taiyaki = models.BooleanField(default=False)
    juice_bars_and_smoothies = models.BooleanField(default=False)
    kiosk = models.BooleanField(default=False)
    kombucha = models.BooleanField(default=False)
    meaderies = models.BooleanField(default=False)
    milkshake_bars = models.BooleanField(default=False)
    mulled_wine = models.BooleanField(default=False)
    nasi_lemak = models.BooleanField(default=False)
    organic_stores = models.BooleanField(default=False)
    panzerotti = models.BooleanField(default=False)
    parent_cafes = models.BooleanField(default=False)
    patisserie_cake_shop = models.BooleanField(default=False)
    piadina = models.BooleanField(default=False)
    poke = models.BooleanField(default=False)
    pretzels = models.BooleanField(default=False)
    salumerie = models.BooleanField(default=False)
    shaved_ice = models.BooleanField(default=False)
    shaved_snow = models.BooleanField(default=False)
    smokehouse = models.BooleanField(default=False)
    specialty_food = models.BooleanField(default=False)
    candy_stores = models.BooleanField(default=False)
    cheese_shops = models.BooleanField(default=False)
    chocolatiers_and_shops = models.BooleanField(default=False)
    dagashi = models.BooleanField(default=False)
    dried_fruit = models.BooleanField(default=False)
    frozen_food = models.BooleanField(default=False)
    fruits_and_veggies = models.BooleanField(default=False)
    health_markets = models.BooleanField(default=False)
    herbs_and_spices = models.BooleanField(default=False)
    macarons = models.BooleanField(default=False)
    meat_shops = models.BooleanField(default=False)
    olive_oil = models.BooleanField(default=False)
    pasta_shops = models.BooleanField(default=False)
    popcorn_shops = models.BooleanField(default=False)
    seafood_markets = models.BooleanField(default=False)
    tofu_shops = models.BooleanField(default=False)
    street_vendors = models.BooleanField(default=False)
    sugar_shacks = models.BooleanField(default=False)
    tea_rooms = models.BooleanField(default=False)
    torshi = models.BooleanField(default=False)
    tortillas = models.BooleanField(default=False)
    water_stores = models.BooleanField(default=False)
    wineries = models.BooleanField(default=False)
    wine_tasting_room = models.BooleanField(default=False)
    zapiekanka = models.BooleanField(default=False)
    
