from rest_framework import serializers
from users.models import NewUser

#https://www.youtube.com/watch?v=AfYfvjP1hK8 from this video 

#serializer to register users
class RegisterUserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = NewUser
    fields = ('email','user_name','password')
    extra_kwargs = {'password': {'write_only': True}} #makes sure that the password is kept secure
    
  def create(self, validated_data):
    password = validated_data.pop('password',None)
    instance = self.Meta.model(**validated_data)
    if password is not None:
      instance.set_password(password)
    instance.save()
    return instance