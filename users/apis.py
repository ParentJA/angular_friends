__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
import operator

# Third-party imports...
from rest_framework import permissions, views
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

# Django imports...
from django.contrib.auth import get_user_model

# Local imports...
from .models import Friendship
from .serializers import FriendshipSerializer

User = get_user_model()


class FriendshipAction(object):
    ADD = 'add'
    REMOVE = 'remove'
    ACCEPT = 'accept'
    REJECT = 'reject'


class FeedView(views.APIView):
    def get(self, request):
        events = []

        friendships = Friendship.objects.select_related('sender', 'receiver').get_friendships(user=request.user)

        for friendship in friendships:
            events.append({
                'heading': '%s added %s as a friend' % (
                    friendship.sender.first_name,
                    friendship.receiver.first_name
                ),
                'updated': friendship.updated,
                'friendship': FriendshipSerializer(friendship).data
            })

            if friendship.updated != friendship.created and friendship.status != 'P':
                events.append({
                    'heading': '%s %s %s\'s friendship' % (
                        friendship.receiver.first_name,
                        friendship.get_status_display(),
                        friendship.sender.first_name
                    ),
                    'updated': friendship.updated,
                    'friendship': FriendshipSerializer(friendship).data
                })

        return Response(data=sorted(events, key=operator.itemgetter('updated')))


@api_view(['POST'])
def friends(request):
    user_id = request.data.get('user_id')

    # Retrieve user...
    user = get_object_or_404(User, pk=user_id)

    # Choose an action based on the given parameter...
    action = request.data.get('action')

    if action == FriendshipAction.ADD:
        friendship = Friendship.user_add_friend(request.user, user)

    elif action == FriendshipAction.REMOVE:
        friendship = Friendship.user_remove_friend(request.user, user)

    elif action == FriendshipAction.ACCEPT:
        friendship = Friendship.objects.get_friendship(request.user, user)
        friendship.accept()

    elif action == FriendshipAction.REJECT:
        friendship = Friendship.objects.get_friendship(request.user, user)
        friendship.reject()

    return Response(FriendshipSerializer(friendship).data)
