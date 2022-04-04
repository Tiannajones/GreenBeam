from django.db import models
from django.utils.translation import gettext_lazy as _

from django.core.validators import MaxValueValidator

#All of this is from https://testdriven.io/blog/django-custom-user-model/
    
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
    


    def __str__(self):
        return self.business_id
    
    
    