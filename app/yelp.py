#import the modules
import requests
from decouple import config

#Define a business ID
#business_id

#Define the API Key, Endpoint, and Header
API_KEY = config("API_KEY")
ENDPOINT = 'https://api.yelp.com/v3/businesses/search'
HEADERS = {'Authorization': 'bearer %s' % API_KEY}

#Define the parameters
PARAMETERS = {'term':'coffee',
              'limit': 50,
              'radius': 40000,
              'location':'1000 McKenzie Dr, Georgetown, TX 78626'}

#Make a request to the yelp API
response = requests.get(url = ENDPOINT, params= PARAMETERS, headers = HEADERS)

#Convert JSON string to a Dictionary
business_data = response.json()

for biz in business_data['businesses']:
  print(biz['name'])

