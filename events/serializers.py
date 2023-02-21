from rest_framework import serializers
from .models import User, Event

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'super_user', 'events_created', 'events_subscribed']

    # def validate(self, data):
    #     if data['password'] != data['confirm_password']:
    #         return serializers.ValidationError('Passwords do not match')
    #     return data

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'location', 'status', 'creator', 'subscribers']
    # creator = UserSerializer() to serialize all info as nested object