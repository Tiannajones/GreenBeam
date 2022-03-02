from audioop import reverse
from django.db import models
from django.core.exceptions import ValidationError   #https://stackoverflow.com/questions/3217682/checking-validity-of-email-in-django-python
from django.core.validators import validate_email
from django.utils.deconstruct import deconstructible
from django.utils.functional import SimpleLazyObject
from django.utils.translation import gettext_lazy as _, ngettext_lazy 
import re 


# Create your models here.
#https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Models -- using this site to help 


## typical class defining a model, deirved from the Model class
class User(models.Model):
    
    #Fields 
    # models.CharField means this field will contain strings of alphanumeric chars. 
    # help_text provides a text label to display to help users know what value to rpovide when this value is to be entered by a user via HTML form
    my_field_name = models.CharField(max_length=20, help_text='Enter field documentation') 

    # declare model-level metadata for your model, useful feature is to control the default ordering of records returned when you query the model type 
    class Meta: 
        ordering = ['my_field_name'] #this will be sorted alphabetically 


    # get_absolute_url returns a URL for displaying indiv. model records on the website (if you define this method then Django will automatically add a 
    # "View on Site" button to the model's record editing screens in the Admin site)
    # reverse() function is able to reverse your url mapper (model-detail-view) in order to create a url of the right format
    def get_absolute_url(self):
        return reverse('model-detail-view', args= [str(self.id)]) 
    

    # string for representing the User object in admin site 
    # returns a human readable string for each object 
    # the srting is used to represent individual records in the admin site
    def _str_(self):
        return self.my_field_name

# parameters: message - if not None, overrides message 
# code - if not None, overrides code 
# allowlist - if not None, overrides allowlist 
class EmailValidator(message=None, code=None,allowlist=None):
    message = ('Enter a valid email!')
    code = 'Invalid'
    user_regex = _lazy_re_compile(r"(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*\Z"  # dot-atom
        r'|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-\011\013\014\016-\177])*"\Z)',  # quoted-string
        re.IGNORECASE)
    domain_regex = _lazy_re_compile( # max length for domain name labels is 63 characters per RFC 1034
        r'((?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+)(?:[A-Z0-9-]{2,63}(?<!-))\Z',
        re.IGNORECASE)
    literal_regex = _lazy_re_compile( # literal form, ipv4 or ipv6 address (SMTP 4.1.3)
        r'\[([A-f0-9:\.]+)\]\Z',
        re.IGNORECASE)
    domain_allowlist = ['localhost']

    # https://docs.djangoproject.com/en/3.0/_modules/django/core/validators/
    def _init_(self, message=None, code=None, inverse_match=None, flags=None):
        if message is not None:
            self.message = message
        if code is not None:
            self.code = code
        if inverse_match is not None:
            self.inverse_match = inverse_match 
        if flags is not None:
            self.flags = flags

    
