__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Standard library imports...
import operator

# Third-party imports...
from rest_framework import permissions, views
from rest_framework.response import Response

# Local imports...
from .models import Friendship
from .serializers import FriendshipSerializer


class FeedView(views.APIView):
    def get(self, request, format=None):
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
