from django.contrib.auth.models import Group
from django.template.response import TemplateResponse
from django.http import HttpResponse
from django.core.paginator import Paginator, PageNotAnInteger, InvalidPage, EmptyPage
from .models import *
from structlog import get_logger

logger = get_logger(__name__)



def users(request):
    try:
        users = User.objects.all().order_by('-id')
        groups = Group.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(users, 10)
        try:
            users = paginator.page(page)
        except PageNotAnInteger:
            users = paginator.page(1)
        except InvalidPage:
            users = paginator.page(1)
        except EmptyPage:
            users = paginator.page(paginator.num_pages)
        logger.info('User: '+str(request.user.username)+' accessed the view users page')
        return TemplateResponse(request, 'users/list.html',
                                {'groups':groups,'users':users,
                                 'pn': paginator.num_pages})
    except TypeError as e:
        logger.error(e)
        return HttpResponse('No users are available.')