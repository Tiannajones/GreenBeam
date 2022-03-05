from django.urls import path
from . import views


#I believe that this file has to do with dynamic url links
urlpatterns = [
  path('hello/',views.index,name='index'),
  
]