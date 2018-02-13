from django.template.response import TemplateResponse
from django.http import HttpResponse, HttpRequest
from django.shortcuts import redirect
from django.contrib.auth import authenticate
from ..modules.decorators import staff_member_required, user_trail

from django.conf import settings
from django.contrib import messages, auth
from django.contrib.auth import views as django_views
from django.contrib.auth.decorators import login_required
from django.utils.translation import ugettext_lazy as _
import datetime
from .forms import SignupForm, SetPasswordForm
from django.views.decorators.csrf import csrf_protect


from app_dir.core import tasks
from structlog import get_logger


logger = get_logger(__name__)


def index(request):
    return TemplateResponse(request, 'index.html',
                            {})


def test_celery(request):
    result = tasks.longtime_add(2, 3)
    logger.info(result)
    return HttpResponse(result)


def home(request):
	if request.user.is_authenticated():
		referer = request.META.get('HTTP_REFERER')
		print(referer)
		return redirect('core:index')
	else:
		return TemplateResponse(request, 'dashboard/login.html')

def lock(request):
	return TemplateResponse(request, 'dashboard/lock.html')

def lock_process(request):
	email = request.POST['email']
	password = request.POST['password']
	next_url = request.POST["next"]
	user = authenticate(username=email, password=password)
	if user is not None:
		if user.is_active:
			# auth.login(request, user)
			# user_trail(request.user,"signed in ", "login")
			# if next_url:
			#     t = HttpResponse(next_url)
			# else:
			#     t = HttpResponse(settings.LOGIN_REDIRECT_URL)
			return HttpResponse(next_url)
		else:
			return HttpResponse('error login')
	else:
		return HttpResponse('wrong credentials')


@staff_member_required
def styleguide(request):
	return TemplateResponse(request, 'styleguide.html')

def not_found(request):
	return TemplateResponse(request, '404.html')

@csrf_protect
def login(request):
	username = request.POST.get('email')
	password = request.POST.get('password')

	user = authenticate(username=username, password=password)
	if user is not None:
		if user.is_active:
			auth.login(request, user)
			user_trail(request.user,"logged in ", "login")
			logger.info(str(request.user)+' logged in at '+str(datetime.datetime.now()))
			return HttpResponse('success')
		else:
			return HttpResponse('cannot login')
	else:
		return HttpResponse('wrong credentials')


@login_required
def logout(request):
	user_trail(request.user.username, 'logged out','logout')
	logger.info(str(request.user) + ' logged out at ' + str(datetime.datetime.now()))
	auth.logout(request)
	messages.success(request, _('You have been successfully logged out.'))
	return redirect('core:home')


def password_reset(request):
	template_name = 'account/password_reset.html'
	post_reset_redirect = 'core:account_reset_password_done'
	email_template_name = 'account/email/password_reset_message.txt'
	subject_template_name = 'account/email/password_reset_subject.txt'
	return django_views.password_reset(request, template_name=template_name,
		post_reset_redirect=post_reset_redirect,email_template_name=email_template_name,
		subject_template_name=subject_template_name)


def password_reset_confirm(request, uidb64=None, token=None):
	template_name = 'account/password_reset_from_key.html'
	post_reset_redirect = 'core:account_reset_password_complete'
	set_password_form = SetPasswordForm
	return django_views.password_reset_confirm(
		request, uidb64=uidb64, token=token, template_name=template_name,
		post_reset_redirect=post_reset_redirect,
		set_password_form=set_password_form)

