from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import ModelForm
from .models import CustomUser, YelpRestaurant

#All of this is from https://testdriven.io/blog/django-custom-user-model/

#form used in admin.py for creating user
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email',)

#form used in admin.py for changing user
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('email',)
        
class RestaurantForm(ModelForm):
    class Meta:
        model = YelpRestaurant
        fields = ('__all__')
        