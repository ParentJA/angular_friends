__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Django imports...
from django.conf import settings
from django.conf.urls import url

# Local imports...
from .apis import FeedView
from accounts.apis import UserViewSet

urlpatterns = [
    url(r'^$', UserViewSet.as_view(settings.REST_METHODS)),
    url(r'^(?P<pk>\d+)/$', UserViewSet.as_view(settings.REST_METHODS_PK)),
    url(r'^feed/$', FeedView.as_view(), name='feed')
]
