from rest_framework import serializers
from .models import User, Event

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email','img_url', 'is_superuser', 'events_created', 'events_subscribed', 'password']
    #! I had to include password to enable the signup. I guess hashing or some security protocol must be applied.

    # def validate(self, data):
    #     if data['password'] != data['confirm_password']:
    #         return serializers.ValidationError('Passwords do not match')
    #     return data

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'location', 'img_url', 'status', 'creator', 'subscribers']
    # creator = UserSerializer() #to serialize all info as nested object

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'img_url']