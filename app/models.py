from audioop import reverse
from ipaddress import ip_address
from django.db import models
from django.core.exceptions import ValidationError   #https://stackoverflow.com/questions/3217682/checking-validity-of-email-in-django-python
from django.core.validators import validate_email
from django.utils.deconstruct import deconstructible
from django.utils.functional import SimpleLazyObject
from django.utils.translation import gettext_lazy as _, ngettext_lazy 
import re 
from django.utils.encoding import punycode
from django.utils.ipv6 import is_valid_ipv6_address
import ipaddress





def _lazy_re_compile(regex, flags=0):
    #lazy compile a regex with flags 
    def _compile():
        #compile the regex if it was not passed precompile 
        if isinstance(regex,str):
            return re.compile(regex,flags)
        else:
            assert not flags, "flags must be empty if regex is passed pre-compiled"
            return regex
    return SimpleLazyObject(_compile) 


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
    def _init_(self, message=None, code=None, allowlist = None):
        if message is not None:
            self.message = message
        if code is not None:
            self.code = code
        if allowlist is not None:
            self.domain_allowlist = allowlist 
        
    def _call_(self, value):
        if not value or '@' not in value:
            raise ValidationError(self.message, code=self.code)

        user_part, domain_part = value.rsplit('@',1) 

        if not self.user_regex.match(user_part): 
            raise ValidationError

        if (domain_part not in self.domain_allowlist and not self.validate_domain_part(domain_part)):
          # Try for possible IDN domain-part
            try:
                domain_part = punycode(domain_part)
            except UnicodeError:
                pass
            else:
                if self.validate_domain_part(domain_part):
                    return
            raise ValidationError(self.message, code=self.code)  
        
    def validate_ipv4_address(value):
        try:
            ipaddress.IPv4Address(value)
        except ValueError:
            raise ValidationError(_('Enter a valid IPv4 address.'), code='invalid')
    
    def validate_ipv6_address(value):
        if not is_valid_ipv6_address(value):
            raise ValidationError(_('Enter a valid IPv6 address.'), code='invalid')
    
    def validate_ipv46_address(value):
        try:
            validate_ipv4_address(value)
        except ValidationError:
            try:
                validate_ipv6_address(value)
            except ValidationError:
                raise ValidationError(_('Enter a valid IPv4 or IPv6 address.'), code= 'invalid')
    
    ip_address_validator_map = {
    'both': ([validate_ipv46_address], _('Enter a valid IPv4 or IPv6 address.')),
    'ipv4': ([validate_ipv4_address], _('Enter a valid IPv4 address.')),
    'ipv6': ([validate_ipv6_address], _('Enter a valid IPv6 address.')),

    }
    def validate_domain_part(self,domain_part):
        if self.domain_regex.match(domain_part):
            return True 

        literal_match = self.literal_regex.match(domain_part)

        if literal_match:
            ip_address = literal_match.group(1)
            try:
                validate_ipv46_address(ip_address)
                return True
            except ValidationError:
                pass 
            return False
    

    


    