#import the modules
import requests
from decouple import config

#Define the API Key, Endpoint, and Header
API_KEY = config("API_KEY")
ENDPOINT = 'https://api.yelp.com/v3/businesses/search'
HEADERS = {'Authorization': 'bearer %s' % API_KEY}


def restaurants_in_radius(latitude,longitude,radius,limit,offset):
  #defines the parameters
  PARAMS = {'term': 'restaurants',
            'latitude': latitude,
            'longitude': longitude,
            'radius': radius,
            'limit': 50,
            'offset': offset}
  #makes a request to the YELP Api
  response = requests.get(url = ENDPOINT, params = PARAMS, headers = HEADERS)
  #Converts JSON string to a dictionary
  data = response.json()
  #prints the name of each restaurant
  for res in data['businesses']:
    print(res['name'])
  #print(data)
  #calls function again if the limit is not reached
  if(limit - offset != 50):
    restaurants_in_radius(latitude,longitude,radius,limit,offset+50)

#example function call using lat and long of Austin,TX    
restaurants_in_radius(30.267153,-97.743057,16093,200,0)
  
  