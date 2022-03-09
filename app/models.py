from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager
from django.core.validators import MaxValueValidator

#All of this is from https://testdriven.io/blog/django-custom-user-model/


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
#Create table for the restaurant data or name Restuarants
class YelpRestaurant(models.Model):
    business_id = models.PositiveBigIntegerField(primary_key=True)
    #name = models.TextField(max_length=50)
    yelp_rating = models.DecimalField(max_digits=2,decimal_places=1,null=True)
    phone_number = models.PositiveIntegerField(validators=[MaxValueValidator(9999999999)])
    price = models.PositiveIntegerField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6) #https://stackoverflow.com/questions/30706799/which-model-field-to-use-in-django-to-store-longitude-and-latitude-values
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    #address = models.TextField
    zip_code = models.PositiveIntegerField(validators=[MaxValueValidator(99999)])
    image_url = models.URLField(max_length=200)
    yelp_url = models.URLField(max_length=200)
    
    def __str__(self):
        return self.business_id
    
    
    