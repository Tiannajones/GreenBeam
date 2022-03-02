from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User, Group
from rest_framework import viewsets



# Create your views here.

def index(request):
  return HttpResponse("GreenBeam says Hello")