__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Django imports...
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.shortcuts import render

# Local imports...
from .models import Friendship

User = get_user_model()


@login_required
def home_view(request):
    return render(request, 'users/home.html')


@login_required
def list_view(request):
    search = request.GET.get('search', '')

    query = Q(
        Q(username__icontains=search) |
        Q(email__icontains=search) |
        Q(first_name__icontains=search) |
        Q(last_name__icontains=search)
    )

    # Exclude users that share a friendship with the request user...
    friendships = Friendship.objects.get_friendships(request.user)
    friends = Friendship.user_list_friends(request.user, friendships)

    query &= ~Q(username__in=[f.username for f in friends])

    users = User.objects.exclude(username=request.user.username).filter(query)

    return render(request, 'users/list.html', {
        'users': users
    })


@login_required
def requests_view(request):
    friendships = Friendship.objects.pending_received(request.user)
    users = Friendship.user_list_friends(request.user, friendships)

    return render(request, 'users/requests.html', {
        'users': users
    })


@login_required
def friends_view(request):
    friendships = Friendship.objects.current(request.user)
    users = Friendship.user_list_friends(request.user, friendships)

    return render(request, 'users/friends.html', {
        'users': users
    })


@login_required
def add_view(request, user_id):
    friend = get_object_or_404(User, pk=user_id)

    Friendship.user_add_friend(request.user, friend)

    return redirect(reverse('users:home'))


@login_required
def accept_view(request, user_id):
    friend = get_object_or_404(User, pk=user_id)

    friendship = Friendship.objects.get_friendship(request.user, friend)
    friendship.accept()

    return redirect(reverse('users:home'))


@login_required
def reject_view(request, user_id):
    friend = get_object_or_404(User, pk=user_id)

    friendship = Friendship.objects.get_friendship(request.user, friend)
    friendship.reject()

    return redirect(reverse('users:home'))