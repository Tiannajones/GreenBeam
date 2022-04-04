from django import forms
from django.contrib import admin
from .models import NewUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models

#https://www.youtube.com/watch?v=Ae7nc1EGv-A from this video

class UserAdminConfig(UserAdmin):
  model = NewUser
  search_fields = ('email', 'user_name','first_name',)
  list_filter = ('email','user_name','first_name','is_active','is_staff','is_owner')
  ordering = ('-start_date',)
  list_display = ('email', 'user_name','first_name','is_active','is_staff','is_owner')
  fieldsets = (
      (None, {"fields": ('email','user_name','first_name',)}),
      ('Permissions', {'fields': ('is_staff','is_active')}),
  )
  formfield_overrides = {
    models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
  }
  add_fieldsets = (
    (None, {
      'classes': ('wide',),
      'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active')
    })
  )
  

admin.site.register(NewUser, UserAdminConfig)

# Register your models here.
