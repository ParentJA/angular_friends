__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Friendship


@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    pass
