from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic.edit import UpdateView
from django.contrib.auth.decorators import (
    login_required,
    permission_required,
    user_passes_test
)


from .api.views import *
from .models import Student as Table


urlpatterns = [
    url(r'^$', permission_required('student.view_student', login_url='core:not_found')
        (TemplateView.as_view(template_name="student/list.html")), name="index"),
    url(r'^add/$', permission_required('student.add_student', login_url='core:not_found')
        (TemplateView.as_view(template_name="student/form.html")), name='add'),
    url(r'^api/create/$', CreateAPIView.as_view(), name='api-create'),
    url(r'^api/create/official/$', permission_required('student.add_studentofficialdetails', login_url='core:not_found')
        (CreateOfficialDetailsAPIView.as_view()), name='api-create-official'),
    url(r'^api/delete/(?P<pk>[0-9]+)/$', permission_required('student.delete_student', login_url='core:not_found')
        (DestroyView.as_view()), name='api-delete'),
    url(r'^api/list/$', permission_required('student.view_student', login_url='core:not_found')
        (ListAPIView.as_view()), name='api-list'),
    url(r'^api/list/(?P<pk>[0-9]+)/official/$',
        permission_required('student.view_studentofficialdetails', login_url='core:not_found')
        (OfficialDetailsListAPIView.as_view()), name='api-list-official'),
    url(r'^api/update/(?P<pk>[0-9]+)/$', permission_required('student.change_student', login_url='core:not_found')
        (UpdateAPIView.as_view()), name='api-update'),
    url(r'^api/update/official/(?P<pk>[0-9]+)/$',
        permission_required('student.change_studentofficialdetails', login_url='core:not_found')
        (UpdateOfficialDetailsAPIView.as_view()), name='api-update-official'),
    url(r'^update/(?P<pk>[0-9]+)/$',
        permission_required('student.change_student', login_url='core:not_found')
        (UpdateView.as_view(template_name="student/form.html", model=Table, fields=['id', 'first_name', 'last_name'])),
        name='update'),
]

