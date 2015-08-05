__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Django imports...
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView

# Local imports...
from accounts.apis import LogInView, LogOutView

admin.autodiscover()

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^api/v1/auth/login/$', LogInView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogOutView.as_view(), name='logout'),
    url(r'^api/v1/accounts/', include('accounts.urls')),
    url(r'^api/v1/users/', include('users.urls')),
    url(r'^profile/$', 'accounts.views.profile_view', name='profile'),
    url(r'^profile/edit/$', 'accounts.views.profile_edit_view', name='profile_edit'),
    # url(r'^accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^users/', include('users.urls', namespace='users')),
    url(r'^admin/', include(admin.site.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serves media files in development environment...
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
