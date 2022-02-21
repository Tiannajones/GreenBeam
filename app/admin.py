# https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site -- used this link to get from .models and to register models 
# this code imports the models and then calls admin.site.register to register them

from django.contrib import admin
from .models import User, restUser

# Register your models here.
admin.site.register(User)    # for basic user 
admin.site.register(restUser)  # for restaurant owner and user 