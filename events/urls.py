from django.urls import path
from rest_framework.authtoken.views import ObtainAuthToken

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('events/', views.events_list),
    path('events/<int:id>/', views.event_detail),
    path('events/<int:id>/subscribers/', views.subscribers),
    path('users/', views.users_list),
    path('users/register/', views.create_user),
    path('users/<int:id>/', views.user_detail),
    path('login/', views.user_login),
    path('auth/current_user/', views.current_user),
    # path('api-token-auth/', ObtainAuthToken.as_view()),
    path('logout/', views.user_logout),
]