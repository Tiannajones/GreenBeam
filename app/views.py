#from django.shortcuts import render

#https://github.com/testdrivenio/django-custom-user-model/blob/master/abstract-base-user-example/users/views.py

from django.urls import reverse_lazy
from django.views import generic
from .forms import CustomUserCreationForm 


class SignUp(generic.CreateView):
    form_class = CustomUserCreationForm 
    success_url = reverse_lazy('login')
    template_name = 'signup.html'

