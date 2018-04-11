from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic.edit import UpdateView
from django.contrib.auth.decorators import (
    login_required,
    permission_required,
    user_passes_test
)

from .api.views import *
from .models import House as Table

urlpatterns = [
    url(r'^$',
        permission_required('house.view_house', login_url='core:not_found')
        (TemplateView.as_view(template_name="house/list.html")), name="index"),
    url(r'^api/create/$',
        permission_required('house.add_house', login_url='core:not_found')
        (CreateAPIView.as_view()), name='api-create-house'),
    url(r'^api/delete/(?P<pk>[0-9]+)/$',
        permission_required('house.delete_house', login_url='core:not_found')
        (DestroyView.as_view()), name='api-delete'),
    url(r'^api/list/$',
        permission_required('house.view_house', login_url='core:not_found')
        (ListAPIView.as_view()), name='api-list-houses'),
    url(r'^api/update/(?P<pk>[0-9]+)/$',
        permission_required('house.change_house', login_url='core:not_found')
        (UpdateAPIView.as_view()), name='api-update'),
    url(r'^add/$',
        permission_required('house.add_house', login_url='core:not_found')
        (TemplateView.as_view(template_name="house/crud_form.html")), name='add-house'),
    url(r'^update/(?P<pk>[0-9]+)/$',
        permission_required('house.change_house', login_url='core:not_found')
        (UpdateView.as_view(template_name="house/crud_form.html", model=Table, fields=['id', 'name'])),
        name='update-house'),
]

