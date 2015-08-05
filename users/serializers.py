__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import Friendship
from accounts.serializers import UserSerializer


class FriendshipSerializer(serializers.ModelSerializer):
    friendship_sender = UserSerializer(source='sender')
    friendship_receiver = UserSerializer(source='receiver')

    class Meta:
        model = Friendship
        fields = ('id', 'friendship_sender', 'friendship_receiver', 'created', 'updated', 'status')
