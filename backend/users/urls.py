from django.urls import path
from .views import CustomUserCreate

#https://www.youtube.com/watch?v=AfYfvjP1hK8 from this video

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user")
]