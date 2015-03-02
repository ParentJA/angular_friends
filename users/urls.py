__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Django imports...
from django.conf.urls import patterns
from django.conf.urls import url

urlpatterns = patterns('users.views',
    url(r'^$', 'home_view', name='home'),
    url(r'^list/$', 'list_view', name='list'),
)