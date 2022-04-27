from dataclasses import dataclass
from .serializers import SusRatingSerializer, YelpCategoriesSerializer, YelpRestaurantSerializer
from .models import SustainabilityRating, YelpCategories, YelpRestaurant
from . import yelp

#https://datagy.io/python-list-contains-item/?msclkid=44bac639bb3911eca06ef00e75741a0d
known_category_aliases = ["acaibowls", "bagels", "bakeries", "beer_and_wine", "beverage_stores", "breweries", "brewpubs", "bubbletea", "butcher", "csa", "chimneycakes", "cideries", "coffee", "coffeeroasteries", "convenience", "cupcakes", "customcakes", "desserts", "distilleries", "diyfood", "donuts", "empanadas", "farmersmarket", "fooddeliveryservices", "foodtrucks", "gelato", "grocery", "honey", "icecream", "importedfood", "intlgrocery", "internetcafe", "juicebars", "kombucha", "meaderies", "organic_stores", "cakeshop", "piadina", "poke", "pretzels", "shavedice", "shavedsnow", "smokehouse", "gourmet", "candy", "cheese", "chocolate", "markets", "healthmarkets", "herbsandspices", "macarons", "meats", "oliveoil", "pastashops", "popcorn", "seafoodmarkets", "streetvendors", "tea", "waterstores", "wineries", "winetastingroom"]
isDataPopulated = False #variable that keeps track of table being populated or not

def populateData():
  global isDataPopulated
  if isDataPopulated==False: #makes sure table hasn't been populated to save calls to Yelp API
    counter = 0 #keeps track of restaurants added to table
    yelp_data = yelp.restaurants_in_radius(30.6333,-97.6780,16093,50,0) #calls Yelp API using lat, long, radius, limit, and offset
    #for each restaurant in the yelp data
    for res in yelp_data["businesses"]:
      res_id=res["id"]
      res_name=res["name"]
      res_rating=res["rating"]
      res_categories_list = res["categories"] #THIS IS A LIST OF DICTIONARIES FOR EACH CATEGORY: https://www.yelp.com/developers/documentation/v3/all_categories
      categories_alias_list = []
      categories_name_list = []

      for category_index in range(len(res_categories_list)): #loop through the list of category dictionaries provided for each resturaunt
        current_category = res_categories_list[category_index]
        #if current_category["alias"] in known_category_aliases: #if the current category's alias is in the list of aliases we know exist
        categories_alias_list.append(current_category["alias"]) #add that alias to the list of aliases we know this resturaunt has
        categories_name_list.append(current_category["title"])
          
      categories_alias_string = ', '.join(categories_alias_list)
      categories_name_string = ', '.join(categories_name_list)
      
      try:
        res_phone=int(res["phone"][2:]) #gets rid of '+1' and makes sure that there is a phone number for the restaurant
      except ValueError:
        res_phone=None #if no phone number then set it to None (needed for restaurant to be added to model)
      #res_price=res["price"] price was causing a "KeyError: 'price'"
      res_latitude=res["coordinates"]["latitude"]
      res_longitude=res["coordinates"]["longitude"]
      res_address=res["location"]["address1"]
      res_city=res["location"]["city"]
      res_state=res["location"]["state"]
      res_country=res["location"]["country"]
      res_zip=res["location"]["zip_code"]
      res_imgurl=res["image_url"]
      res_yelpurl=res["url"]
      res_category_alias = categories_alias_string
      res_category_name = categories_name_string
      #deserializes all the yelp_data
      # Come back and add the categories stuff
      serializer = YelpRestaurantSerializer(data={"business_id":res_id,"name":res_name,"yelp_rating":res_rating,"phone_number":res_phone,
                                                      "latitude":res_latitude,"longitude":res_longitude,"address":res_address,"city":res_city,
                                                      "state":res_state,"country":res_country,"zip_code":res_zip,"image_url":res_imgurl,
                                                      "yelp_url":res_yelpurl,"categories_alias":res_category_alias,"categories_title":res_category_name},context={'request': None})

      if len(categories_alias_list) == 0: #if this resturaunt didn't have any categories from the list provided by Yelp
        serializer_categories = YelpCategoriesSerializer(data={"business_id":res_id},context={'request': None}) #category table will hold "empty" entry for resturaunt
      elif len(categories_alias_list) > 0: #if this resturaunt has categories
        custom_category_data = {"business_id":res_id} #creating a custom data dictionary to populate the serializer
        for alias_index in range(len(categories_alias_list)): #loop through every alias we know a resturaunt has
          current_alias = categories_alias_list[alias_index] #getting the current alias 
          custom_category_data[current_alias] = True #updating the custom data dictionary to reflect presence of an alias

        serializer_categories = YelpCategoriesSerializer(data=custom_category_data,context={'request': None})


      print(res_name) #prints the name of restaurant
      print(res_id) #prints business id
      if serializer.is_valid(): #checks to see if the data is able to be added to the model
        #print(serializer.validated_data) #prints the data that has been cleared by the serializer
        counter = counter+1 #keeps track of how many restaurants have been added to the database
        print("Restaurant Is Valid!")
        serializer.save()#saves the restaurant to the database
      else:
        print(serializer)#prints the serializer info
        print(serializer.errors)#prints the errors
        print("Restaurant entry has errors")
      print('--------------')
      
      print(res_id)
      if serializer_categories.is_valid(): #checks to see if the data is able to be added to the model
        #print(serializer_categories.validated_data) #prints the data that has been cleared by the serializer
        print("Restaurant Has Valid Categories!")
        serializer_categories.save()#saves the restaurant's categories to the database
      else:
        print(serializer_categories)#prints the serializer info
        print(serializer_categories.errors)#prints the errors
        print("Categories entry has errors")
      print('--------------')
      
      
      ratingserializer = SusRatingSerializer(data={"business_id":res_id})
      if ratingserializer.is_valid():
        print("Rating added to table")
        ratingserializer.save()
      else:
        print(ratingserializer.errors)

    print("Number of restaurants added:",counter)
    isDataPopulated=True #changes isDataPopulated to True
    return isDataPopulated #needed for staying on the same page
  else:
    print("The data has already been populated today")
  print("isDataPopulated:",isDataPopulated)
    
#function that deletes all the data in YelpRestaurant model and sets isDataPopulated to False
def deleteData():
  YelpRestaurant.objects.all().delete()
  YelpCategories.objects.all().delete()
  SustainabilityRating.objects.all().delete() #just for testing
  global isDataPopulated
  isDataPopulated=False
  return isDataPopulated
  
