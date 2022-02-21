from django.db import models

# Create your models here.
#https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Models -- using this site to help 


## typical class defining a model, deirved from the Model class
class User(models.Model):
    
    #fields 
    # models.CharField means this field will contain strings of alphanumeric chars. 
    # help_text provides a text label to display help users know what value to rpovide when this value is to be entered by a user via HTML form
    my_field_name = models.CharField(max_length=20, help_text='Enter field documentation') 

    # declare model-level metadata for your model, useful feature is to control the default ordering of records returned when you query the model type 
    class Meta: 
        ordering = ['my_field_name'] #this will be sorted alphabetically 