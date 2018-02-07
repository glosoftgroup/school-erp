from django.conf.urls import url
from django.contrib.auth.decorators import permission_required
from . import views


urlpatterns = [
    # url(r'^$', permission_required('users.view_user', login_url='/')
    #             (users), name='users'),
    url(r'^$', views.users, name='view-users'),
]

