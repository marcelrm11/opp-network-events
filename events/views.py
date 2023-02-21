import datetime
from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from events.models import User, Event
from .serializers import UserSerializer, EventSerializer


def index(request):
    try:
        events_set = Event.objects.filter(date__year='2022')
    except ObjectDoesNotExist:
        pass
    return render(request, 'events.html', {'name': 'Marcel', 'events': list(events_set)})

# EVENTS (READ, CREATE) =======

@api_view(['GET', 'POST'])
def events_list(request):

    # view list of events:
    if request.method == 'GET':
        queryset = Event.objects.select_related('creator').prefetch_related('subscribers').all()

        # to include past events, pass past_events=True:
        past_events = request.query_params.get('past_events', None)
        if not past_events:
            queryset = queryset.filter(date__gt=datetime.datetime.now())

        # filter by status:
        event_status = request.query_params.get('status', None)
        if event_status is not None:
            queryset = queryset.filter(status=event_status)

        # filter by date range:
        else:
            after_date = request.query_params.get('after_date', None)
            if after_date is not None:
                queryset = queryset.filter(date__gt=after_date)
            before_date = request.query_params.get('before_date', None)
            if before_date is not None:
                queryset = queryset.filter(date__lt=before_date)

        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    # create new event:    
    elif request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# EVENTS (DETAIL, UPDATE, DELETE) =======

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def event_detail(request, id):

    # search specific event in database:
    event = get_object_or_404(Event, pk=id)

    # get event details:
    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)

    # update event details:
    elif request.method in ['PUT', 'PATCH']:
        serializer = EventSerializer(event, data=request.data, partial=request.method == 'PATCH')
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    # delete event:
    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# USERS (READ, CREATE) =======

@api_view(['GET', 'POST'])
def users_list(request):

    #view list of users:
    if request.method == 'GET':
        queryset = User.objects.prefetch_related('events_created', 'events_subscribed').all()

        # filter by super_user:
        super_user = request.query_params.get('super_user', None)
        if super_user is not None:
            queryset = queryset.filter(super_user=super_user)

        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    # create new user:
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# USERS (DETAIL, UPDATE, DELETE) =======

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def user_detail(request, id):

    # search specific user in database:
    user = get_object_or_404(User, pk=id)

    # get user details:
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # update user details:
    elif request.method in ['PUT', 'PATCH']:
        serializer = UserSerializer(user, data=request.data, partial=request.method == 'PATCH')
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    # delete user:
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
