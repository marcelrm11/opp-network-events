from django.contrib import admin
from . import models
# Register your models here.

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'super_user', 'email']
    # list_editable = ['super_user']
    list_per_page = 25
    list_filter = ['super_user']
    odering = ['last_name', 'first_name']
    search_fields = ['first_name__istartswith', 'last_name__istartswith']

@admin.register(models.Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'status', 'creator']
    list_editable = ['status']
    list_per_page = 25
    list_filter = ['status']
    ordering = ['date']
    search_fields = ['title__icontains']


# admin.site.register(models.Event)