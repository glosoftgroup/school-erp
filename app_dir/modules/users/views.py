from django.contrib.auth.models import Group, Permission
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django.template.response import TemplateResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator, PageNotAnInteger, InvalidPage, EmptyPage
from ..decorators import permission_decorator, user_trail, staff_member_required

from .models import *
from structlog import get_logger

logger = get_logger(__name__)
# @staff_member_required
# @permission_decorator('users.view_user')
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
        user_trail(request.user.username, 'accessed users list page', 'view')
        logger.info('User: ' + str(request.user.username) + ' accessed the view users page')
        return TemplateResponse(request, 'users/list.html',
                                {'groups': groups, 'users': users, 'pn': paginator.num_pages})
    except TypeError as e:
        logger.error(e)
        return HttpResponse('error accessing users')


# @staff_member_required
# @permission_decorator('users.add_user')
def add_user(request):
    try:
        permissions = Permission.objects.all()
        groups = Group.objects.all()
        user_trail(request.user.username, 'accessed add users page', 'view')
        logger.info('User: ' + str(request.user.username) + ' accessed user create page')
        return TemplateResponse(request, 'users/add_user.html',
                                {'permissions': permissions, 'groups': groups})
    except TypeError as e:
        logger.error(e)
        return HttpResponse('error accessing add users page')


@staff_member_required
@csrf_protect
def user_process(request):
    user = User.objects.all()
    if request.method == 'POST':
        name = (request.POST.get('name')).lower()
        fullname = request.POST.get('fullname')
        email = request.POST.get('email')
        password = request.POST.get('password')
        encr_password = make_password(password)
        nid = request.POST.get('nid')
        mobile = request.POST.get('mobile').replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
        image = request.FILES.get('image')
        groups = request.POST.getlist('groups[]')
        job_title = request.POST.get('job_title')
        new_user = User(
            name=name,
            fullname=fullname,
            email=email,
            password=encr_password,
            nid=nid,
            mobile=mobile,
            image=image,
            job_title=job_title,
        )
        try:
            new_user.save()
        except IntegrityError:
            logger.info('Error when saving ')
            return HttpResponse('user exists with those details')
        except Exception as e:
            logger.error(e)

        last_id = User.objects.latest('id')
        if groups:
            permissions = Permission.objects.filter(group__name__in=groups)
            last_id.user_permissions.add(*permissions)
            gps = Group.objects.filter(name__in=groups)
            last_id.groups.add(*gps)
            last_id.save()
        user_trail(request.user.username, 'added user: ' + str(name), 'add')
        logger.info('User: ' + str(request.user.username) + ' created user:' + str(name))
        return HttpResponse(last_id.id)


@staff_member_required
@permission_decorator('userprofile.delete_user')
def user_delete(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == 'POST':
        user.delete()
        user_trail(request.user.username, 'deleted user: ' + str(user.username), 'delete')
        return HttpResponse('success')


@staff_member_required
@permission_decorator('userprofile.change_user')
def user_edit(request, pk):
    user = get_object_or_404(User, pk=pk)
    permissions = Permission.objects.all()
    groups = Group.objects.all()
    user_groups = user.groups.all()
    user_permissions = Permission.objects.filter(user=user)
    ctx = {'user': user, 'permissions': permissions, 'user_permissions': user_permissions, 'groups': groups,
           'user_groups': user_groups}
    user_trail(request.user.username, 'accessed edit page for user ' + str(user.username), 'view')
    logger.info('User: ' + str(request.user.name) + ' accessed edit page for user: ' + str(user.username))
    return TemplateResponse(request, 'users/edit_user.html', ctx)



@staff_member_required
@csrf_protect
def user_assign_permission(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        user = get_object_or_404(User, pk=user_id)
        user_has_permissions = Permission.objects.filter(user=user)
        login_status = request.POST.get('check_login')
        permission_list = request.POST.getlist('checklist[]')
        if login_status == 'inactive':
            user.is_staff = False
            user.is_active = False
            # user.user_permissions.remove(*user_has_permissions)
            user.save()
            user_trail(request.user.username, 'deactivated and removed all permissions for user: ' + str(user.name),
                       'delete')
            logger.info(
                'User: ' + str(request.user.username) + ' deactivated and removed all permissions for user: ' + str(
                    user.username))
            return HttpResponse('deactivated')
        else:
            if user_has_permissions in permission_list:
                not_in_user_permissions = list(set(permission_list) - set(user_has_permissions))
                user.is_staff = True
                user.is_active = True
                user.user_permissions.add(*not_in_user_permissions)
                user.save()
                user_trail(request.user.username, 'assigned permissions for user: ' + str(user.username), 'add')
                logger.info('User: ' + str(request.user) + ' assigned permissions for user: ' + str(user.name))
                return HttpResponse('permissions added')
            else:
                not_in_user_permissions = list(set(permission_list) - set(user_has_permissions))
                user.is_staff = True
                user.is_active = True
                user.user_permissions.remove(*user_has_permissions)
                user.user_permissions.add(*not_in_user_permissions)
                user.save()
                user_trail(request.user.username, 'assigned permissions for user: ' + str(user.username), 'add')
                logger.info(
                    'User: ' + str(request.user.username) + ' assigned permissions for user: ' + str(user.username))
                return HttpResponse('permissions updated')






