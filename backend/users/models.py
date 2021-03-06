from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

#https://www.youtube.com/watch?v=Ae7nc1EGv-A from this video

class CustomAccountManager(BaseUserManager):
  
  #creates a superuser
  def create_superuser(self, email, user_name, first_name, password, **other_fields):
    other_fields.setdefault('is_staff', True)
    other_fields.setdefault('is_superuser', True)
    other_fields.setdefault('is_active', True)
    
    if other_fields.get('is_staff') is not True:
      raise ValueError('Superuser must be assigned to is_staff=True.')
    if other_fields.get('is_superuser') is not True:
      raise ValueError('Superuser must be assigned to is_superuser=True.')
    
    return self.create_user(email,user_name, first_name, password, **other_fields)
    
  #creates a regular user (requires email, user_name, and first_name)
  def create_user(self, email, user_name, first_name, password, **other_fields):
    if not email:
      raise ValueError('YOu must provide an email address.')
    email = self.normalize_email(email)
    user = self.model(email=email,user_name=user_name,first_name=first_name, **other_fields)
    user.set_password(password)
    user.save()
    return user
  
#creates a new user model
class NewUser(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(_('email address'), unique=True)
  user_name = models.CharField(max_length=150, unique=True)
  first_name = models.CharField(max_length=150, unique=False)
  start_date = models.DateTimeField(default=timezone.now)
  is_staff = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True) #if we wanted to verify email then would wait for them to verify it to set this to True
  is_owner = models.BooleanField(default=False) #keeps track if this user is a restaurant owner/manager
  owner_bid = models.CharField(max_length=22,default='') #keeps track of the restaurant id that the owner is connected to
  
  objects = CustomAccountManager()
  
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['user_name','first_name']
  
  def __str__(self):
    return self.user_name