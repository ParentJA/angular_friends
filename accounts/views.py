__author__ = 'jason.parent@carneylabs.com (Jason Parent)'

# Django imports...
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.shortcuts import redirect
from django.shortcuts import render

# Local imports...
from .forms import ProfileForm


@login_required
def profile_view(request):
    return render(request, 'accounts/profile.html')


@login_required
def profile_edit_view(request):
    form = ProfileForm(instance=request.user)

    if request.method == 'POST':
        form = ProfileForm(instance=request.user, data=request.POST, files=request.FILES)

        if form.is_valid():
            form.save()

            return redirect(reverse('profile'))

    return render(request, 'accounts/profile_edit.html', {
        'form': form
    })