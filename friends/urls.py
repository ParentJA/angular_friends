__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Django imports...
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView

admin.autodiscover()

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    # url(r'^$', 'accounts.views.home_view', name='home'),
    url(r'^sign_up/$', 'accounts.views.sign_up_view', name='sign_up'),
    url(r'^log_in/$', 'accounts.views.log_in_view', name='log_in'),
    url(r'^log_out/$', 'accounts.views.log_out_view', name='log_out'),
    url(r'^profile/$', 'accounts.views.profile_view', name='profile'),
    url(r'^profile/edit/$', 'accounts.views.profile_edit_view', name='profile_edit'),
    # url(r'^accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^users/', include('users.urls', namespace='users')),
    url(r'^admin/', include(admin.site.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serves media files in development environment...
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
