from .serializers import YelpRestaurantSerializer
from .models import YelpRestaurant
from . import yelp

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
      try:
        res_phone=int(res["phone"][2:]) #gets rid of '+1' and makes sure that there is a phone number for the restaurant
      except ValueError:
        res_phone=None #if no phone number then set it to None (needed for restaurant to be added to model)
      #res_price=res["price"] price was causing a "KeyError: 'price'"
      res_latitude=res["coordinates"]["latitude"]
      res_longitude=res["coordinates"]["latitude"]
      res_address=res["location"]["address1"]
      res_city=res["location"]["city"]
      res_state=res["location"]["state"]
      res_country=res["location"]["country"]
      res_zip=res["location"]["zip_code"]
      res_imgurl=res["image_url"]
      res_yelpurl=res["url"]
      #deserializes all the yelp_data
      serializer = YelpRestaurantSerializer(data={"business_id":res_id,"name":res_name,"yelp_rating":res_rating,"phone_number":res_phone,
                                                      "latitude":res_latitude,"longitude":res_longitude,"address":res_address,"city":res_city,
                                                      "state":res_state,"country":res_country,"zip_code":res_zip,"image_url":res_imgurl,
                                                      "yelp_url":res_yelpurl},context={'request': None})
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
        print("Restaurant has errors")
      print('--------------')
    print("Number of restaurants added:",counter)
    isDataPopulated=True #changes isDataPopulated to True
    return isDataPopulated #needed for staying on the same page
  else:
    print("The data has already been populated today")
  print("isDataPopulated:",isDataPopulated)
    
#function that deletes all the data in YelpRestaurant model and sets isDataPopulated to False
def deleteData():
  YelpRestaurant.objects.all().delete()
  global isDataPopulated
  isDataPopulated=False
  return isDataPopulated
  
