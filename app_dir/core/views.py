from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.shortcuts import redirect

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
        return redirect('index')
    else:
        return TemplateResponse(request, 'index.html')
