__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
