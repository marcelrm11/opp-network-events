from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from events.models import User, Event
from .serializers import UserSerializer, EventSerializer


def index(request):
    try:
        events_set = Event.objects.filter(date__year='2022')
    except ObjectDoesNotExist:
        pass
    return render(request, 'events.html', {'name': 'Marcel', 'events': list(events_set)})

@api_view()
def events_list(request):
    queryset = Event.objects.select_related('creator', 'subscribers').all()
    serializer = EventSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view()
def event_detail(request, id):
    event = get_object_or_404(Event, pk=id)
    serializer = EventSerializer(event)
    return Response(serializer.data)

@api_view()
def user_detail(request, id):
    user = get_object_or_404(User, pk=id)
    serializer = UserSerializer(user)
    return Response(serializer.data)