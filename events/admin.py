from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from . import models
# Register your models here.

@admin.register(models.User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2", "email", "first_name", "last_name"),
            },
        ),
    )

@admin.register(models.Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location', 'status', 'creator']
    list_editable = ['status']
    list_per_page = 25
    list_filter = ['status', 'date']
    ordering = ['date']
    search_fields = ['title__icontains', 'location__icontains']


# admin.site.register(models.Event)