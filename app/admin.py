# https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site -- used this link to get from .models and to register models 
# this code imports the models and then calls admin.site.register to register them

''' from django.contrib import admin
from .models import User, restUser

# Register your models here.
admin.site.register(User)    # for basic user 
admin.site.register(restUser)  # for restaurant owner and user  '''

'''
https://testdriven.io/blog/django-custom-user-model/      
https://github.com/testdrivenio/django-custom-user-model/blob/master/abstract-base-user-example/users/admin.py
'''

from django.contrib import admin 
from django.contrib.auth.admin import UserAdmin 

from .forms import CustomUserCreationForm, CustomUserChangeForm 
from .models import CustomUser 

class CustomerUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm 
    model = CustomUser

    list_display = ('email', 'is_owner', 'is_active') #replaced is_staff with is_owner ??
    list_filter = ('email', 'is_owner', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_owner', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_owner', 'is_active')}
        ),

    )
    search_fields = ('email',)
    ordering = ('emal',)

admin.site.register(CustomUser, CustomerUserAdmin)