from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from events.models import User, Event


def index(request):
    try:
        events_set = Event.objects.filter(date__year='2022')
    except ObjectDoesNotExist:
        pass

    return render(request, 'events.html', {'name': 'Marcel', 'events': list(events_set)})