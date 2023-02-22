import datetime
from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Event
from .serializers import SubscriberSerializer, UserSerializer, EventSerializer


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

        # Depending on User and Status:
        # -----------------------------
        
        # superuser has no filters
        if not request.user.is_superuser:

            # If not logged in -> only see Public events:
            if not request.user.is_authenticated:
                queryset = queryset.filter(status='PU')

            # Draft events -> only shown to creator:
            print(request.user.id)
            queryset = queryset.exclude(Q(status='DR') & ~Q(creator=request.user.id))


        # Search and Filters:
        # -------------------

        # to include past events, pass past_events=True:
        past_events = request.query_params.get('past_events', None)
        if not past_events:
            queryset = queryset.filter(date__gt=datetime.datetime.now())

        # filter by status:
        event_status = request.query_params.get('status', None)
        if event_status is not None:
            queryset = queryset.filter(status=event_status)

        # filter by date range (format YYYY-MM-DD or YYYY-MM-DD_hh:mm:ss)
        # can use one or both (after_date, before_date):
        after_date = request.query_params.get('after_date', None)
        if after_date is not None:
            queryset = queryset.filter(date__gt=after_date)
        before_date = request.query_params.get('before_date', None)
        if before_date is not None:
            queryset = queryset.filter(date__lt=before_date)

        # search by text in title (search_query):
        search_query = request.query_params.get('search_query', None)
        if search_query is not None:
            queryset = queryset.filter(title__icontains=search_query)

        # search by text in location (location):
        location = request.query_params.get('location', None)
        if location is not None:
            queryset = queryset.filter(location__icontains=location)

        # response
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    # create new event:    
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        request.data['creator'] = request.user.id
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

        # superuser has no filters
        if not request.user.is_superuser:

            # anonymous users can only see public events:
            if (not request.user.is_authenticated) and (not event.status=='PU'):
                return Response(status=status.HTTP_401_UNAUTHORIZED)

            # draft events only shown to creator if logged in:
            if (request.user.is_authenticated) and (event.status=='DR') and (request.user.id != event.creator):
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = EventSerializer(event)
        return Response(serializer.data)

    # update event details:
    elif request.method in ['PUT', 'PATCH']:

        # can edit event only if user is authenticated and is the creator of the event OR is a superuser
        if ((not request.user.is_authenticated) and (request.user.id != event.creator.id)) or (not request.user.is_superuser) :
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # validate data and update db record
        serializer = EventSerializer(event, data=request.data, partial=request.method == 'PATCH')
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    # delete event:
    elif request.method == 'DELETE':

        # can delete event only if user is authenticated and is the creator of the event OR is a superuser
        if ((not request.user.is_authenticated) and (request.user.id != event.creator.id)) or (not request.user.is_superuser) :
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# SUBSCRIBERS TO AN EVENT (READ, ADD) =======

@api_view(['GET', 'POST'])
def subscribers(request, id):

    # search specific event in database:
    event = get_object_or_404(Event, pk=id)

    # view list of subscribers:
    if request.method == 'GET':

        # anonymous users can only see public events:
        if (not request.user.is_authenticated) and (not event.status=='PU'):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # draft events only shown to creator if logged in:
        if (request.user.is_authenticated) and (event.status=='DR') and (request.user.id != event.creator):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = SubscriberSerializer(event.subscribers.all(), many=True)
        return Response(serializer.data)

    # subscribe user to the event:
    elif request.method == 'POST':

        # only logged in users should subscribe to an event
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # subscribe logged in user to the event
        event.subscribers.add(request.user)
        event.save()
        return Response(status=status.HTTP_200_OK)


# USERS (READ) =======

@api_view(['GET'])
def users_list(request):

    #view list of users:
    queryset = User.objects.prefetch_related('events_created', 'events_subscribed').all()

    # filter by is_superuser (boolean):
    is_superuser = request.query_params.get('is_superuser', None)
    if is_superuser is not None:
        queryset = queryset.filter(is_superuser=is_superuser)

    # search by first or last name (search_query):
    search_query = request.query_params.get('search_query', None)
    if search_query is not None:
        queryset = queryset.filter(Q(first_name__istartswith=search_query) | Q(last_name__istartswith=search_query))

    # return list of users:
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)


# USERS (CREATE/register) =======

@api_view(['GET', 'POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    
    # custom username checks
    # ----------------------
    username = request.data.get('username', None)

    # if no username was provided:
    if not username:
        return Response({'msg': 'username is required'}, status=status.HTTP_400_BAD_REQUEST)

    # if username already used in database:
    existing_user = User.objects.filter(username=username).exists()
    if existing_user:
        return Response({'msg': 'username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # validate form data and create user:
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


# AUTHENTICATION =======

@api_view(['GET', 'POST'])
def user_login(request):
    username = request.data.get('username', None)
    password = request.data.get('password', None)
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'msg': 'login successful'}, status=status.HTTP_202_ACCEPTED)
    else:
        return Response({'msg': 'login failed'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view()
def user_logout(request):
    logout(request)
    return Response({'msg': 'user was logged out'}, status=status.HTTP_200_OK)

