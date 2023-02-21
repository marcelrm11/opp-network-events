from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('events/', views.events_list),
    path('events/<int:id>/', views.event_detail),
    path('events/<int:id>/subscribers/', views.subscribers),
    path('users/', views.users_list),
    path('users/register', views.create_user),
    path('users/<int:id>/', views.user_detail),
    path('login/', views.user_login),
    path('logout/', views.user_logout),

]