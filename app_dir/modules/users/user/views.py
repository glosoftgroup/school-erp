from django.contrib.auth.models import Group, Permission
from django.db import IntegrityError
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.template.response import TemplateResponse
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator, PageNotAnInteger, InvalidPage, EmptyPage
from ...decorators import permission_decorator, user_trail, staff_member_required
import csv
import random
from django.utils.encoding import smart_str

from .models import *
from structlog import get_logger

logger = get_logger(__name__)
# @staff_member_required
# @permission_decorator('user.view_user')
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
        return TemplateResponse(request, 'users/users.html',
                                {'groups': groups, 'users': users, 'pn': paginator.num_pages})
    except TypeError as e:
        logger.error(e)
        return HttpResponse('error accessing users')


# @staff_member_required
# @permission_decorator('user.add_user')
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


# @staff_member_required
@csrf_protect
def user_process(request):
    if request.method == 'POST':
        password = request.POST.get('password')
        encr_password = make_password(password)
        mobile = request.POST.get('mobile').replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
        groups = request.POST.getlist('groups[]')
        is_teacher = False
        if (request.POST.get('staff-radio')).lower() == 'true':
            is_teacher = True
        new_user = User(
            username=(request.POST.get('name')).lower(),
            fullname=request.POST.get('fullname'),
            email=request.POST.get('email'),
            password=encr_password,
            nationalId=request.POST.get('nid'),
            mobile=mobile,
            image=request.FILES.get('image'),
            jobTitle=request.POST.get('job_title'),
            is_teacher=is_teacher
        )
        try:
            new_user.save()
        except IntegrityError as e:
            logger.info(e)
            return JsonResponse({
                'message': 'user exists with those details',
                'status': 400,
                'value': None})
        except Exception as e:
            logger.error(e)
            return JsonResponse({
                'message': 'user exists with those details',
                'status': 400,
                'value': None})

        last_id = User.objects.latest('id')
        if groups:
            permissions = Permission.objects.filter(group__name__in=groups)
            last_id.user_permissions.add(*permissions)
            gps = Group.objects.filter(name__in=groups)
            last_id.groups.add(*gps)
            last_id.save()
        user_trail(request.user.username, 'added user: ' +
                   str((request.POST.get('name')).lower()), 'add')
        logger.info('User: ' + str(request.user.username) +
                    ' created user:' + str((request.POST.get('name')).lower()))
        return JsonResponse({
            'message': 'user created successfully',
            'status': 200,
            'value': last_id.id
        })


# @staff_member_required
# @permission_decorator('user.delete_user')
def user_delete(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == 'POST':
        user.delete()
        user_trail(request.user.username, 'deleted user: ' + str(user.username), 'delete')
        return HttpResponse('success')


# @staff_member_required
# @permission_decorator('user.change_user')
def user_edit(request, pk):
    user = get_object_or_404(User, pk=pk)
    permissions = Permission.objects.all()
    groups = Group.objects.all()
    user_groups = user.groups.all()
    user_permissions = Permission.objects.filter(user=user)
    ctx = {'user': user, 'permissions': permissions, 'user_permissions': user_permissions, 'groups': groups,
           'user_groups': user_groups}
    user_trail(request.user.username, 'accessed edit page for user ' + str(user.username), 'view')
    logger.info('User: ' + str(request.user.username) + ' accessed edit page for user: ' + str(user.username))
    return TemplateResponse(request, 'users/edit_user.html', ctx)



# @staff_member_required
# @csrf_protect
def user_assign_permission(request):
    if request.method == 'POST':
        try:
            user = get_object_or_404(User, pk=request.POST.get('user_id'))
        except Exception as e:
            return JsonResponse({
                'message': 'No user selected to assign permissions',
                'status': 400
            })
        user_has_permissions = Permission.objects.filter(user=user)
        login_status = request.POST.get('check_login')
        permission_list = request.POST.getlist('checklist[]')
        if login_status == 'inactive':
            user.is_staff = False
            user.is_active = False
            # user.user_permissions.remove(*user_has_permissions)
            user.save()
            user_trail(request.user.username, 'deactivated and removed all permissions for user: ' + str(user.username),
                       'delete')
            logger.info(
                'User: ' + str(request.user.username) + ' deactivated and removed all permissions for user: ' + str(
                    user.username))
            return JsonResponse({
                'message': 'permissions assigned successfully \n Note: user will not be able to login',
                'status': 200
            })
        else:
            not_in_user_permissions = list(set(permission_list) - set(user_has_permissions))
            user.is_staff = True
            user.is_active = True
            if user_has_permissions in permission_list:
                user.user_permissions.add(*not_in_user_permissions)
                user.save()
            else:
                user.user_permissions.remove(*user_has_permissions)
                user.user_permissions.add(*not_in_user_permissions)
                user.save()
            user_trail(request.user.username, 'assigned permissions for user: ' + str(user.username), 'add')
            logger.info(
                'User: ' + str(request.user.username) + ' assigned permissions for user: ' + str(user.username))
            return JsonResponse({
                'message': 'permissions assigned successfully',
                'status': 200
            })


# @staff_member_required
# @permission_decorator('user.change_user')
def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    user_permissions = Permission.objects.filter(user=user)
    groups = user.groups.all()
    permissions = Permission.objects.filter(group__in=[group for group in groups]).distinct()
    all_permissions = list(set(user_permissions).union(set(permissions)))
    if request.user == user:
        user_trail(request.user.username, 'viewed self profile ','view')
        logger.info('User: '+str(request.user.username)+' viewed self profile')
    else:
        user_trail(request.user.username, 'viewed '+str(user.username)+ '`s profile','view')
        logger.info('User: '+str(request.user.username)+' viewed '+str(user.username)+'`s profile')
    return TemplateResponse(request, 'users/detail.html', {'user':user,'all_permissions':all_permissions,'groups':groups})


# @staff_member_required
# @csrf_protect
def user_update(request, pk):
    user = get_object_or_404(User, pk=pk)
    user_permissions = Permission.objects.filter(user=user)
    user_groups = user.groups.all()
    permissions_in_user_groups = Permission.objects.filter(group__in=[group for group in user_groups])

    if request.method == 'POST':
        name = (request.POST.get('user_name')).lower()
        fullname = request.POST.get('user_fullname')
        email = request.POST.get('user_email')
        password = request.POST.get('user_password')
        nid = request.POST.get('user_nid')
        mobile = request.POST.get('user_mobile').replace(' ','').replace('(','').replace(')','').replace('-','')
        image= request.FILES.get('image')
        job_title = request.POST.get('job_title')
        groups = request.POST.getlist('groups[]')
        is_teacher = False
        if (request.POST.get('is_teacher')).lower() == 'true':
            is_teacher = True

        if password == user.password:
            encr_password = user.password
        else:
            encr_password = make_password(password)
        if image :
            user.username = name
            user.fullname = fullname
            user.email = email
            user.password = encr_password
            user.nationalId = nid
            user.mobile = mobile
            user.jobTitle = job_title
            user.image = image
            user.is_teacher = is_teacher
            user.save()
            user_trail(request.user.username, 'updated user: '+ str(user.username),'update')
            logger.info('User: '+str(request.user.username)+' updated user: '+str(user.username))

            if groups:
                th_groups2 = Group.objects.filter(name__in=[group for group in groups])
                if set(user_groups).difference(set(th_groups2)) or set(th_groups2).difference(set(user_groups)):
                    group_permissions = Permission.objects.filter(group__name__in=[group for group in th_groups2])
                    user.groups.remove(*user_groups)
                    user.groups.add(*th_groups2)
                    user.user_permissions.remove(*permissions_in_user_groups)
                    user.user_permissions.add(*group_permissions)
            else:
                '''remove all groups'''
                if user_groups:
                    user.groups.remove(*user_groups)
                    return HttpResponse("groups removed")
            return HttpResponse("success with image")
        else:
            user.fullname = fullname
            user.username = name
            user.email = email
            user.password = encr_password
            user.nationalId = nid
            user.mobile = mobile
            user.jobTitle = job_title
            user.is_teacher = is_teacher
            user.save()
            user_trail(request.user.username, 'updated user: '+ str(user.username), 'update')
            logger.info('User: '+str(request.user.username)+' updated user: '+str(user.username))


            if groups:
                th_groups2 = Group.objects.filter(name__in=[group for group in groups])
                if set(user_groups).difference(set(th_groups2)) or set(th_groups2).difference(set(user_groups)):
                    group_permissions = Permission.objects.filter(group__name__in=[group for group in th_groups2])
                    user.groups.remove(*user_groups)
                    user.groups.add(*th_groups2)
                    user.user_permissions.remove(*permissions_in_user_groups)
                    user.user_permissions.add(*group_permissions)
            else:
                '''remove all groups'''
                if user_groups:
                    user.groups.remove(*user_groups)
                    return HttpResponse("groups removed")
            return HttpResponse("success without image")


def user_trails(request):
    try:
        users = UserTrail.objects.all().order_by('-now')
        paginator = Paginator(users, 10)
        page = request.GET.get('page', 1)
        user_trail(request.user.username, 'accessed user trail page', 'view')
        logger.info('User: '+str(request.user.username)+' accessed the user trail page')

        try:
            users = paginator.page(page)
        except PageNotAnInteger:
            users = paginator.page(1)
        except InvalidPage:
            users = paginator.page(1)
        except EmptyPage:
            users = paginator.page(paginator.num_pages)

        return TemplateResponse(request, 'users/trail.html', {'users':users, 'pn':paginator.num_pages})
    except TypeError as e:
        logger.error(e)
        return HttpResponse('error accessing users')

# @staff_member_required
def usertrail_paginate(request):
    page = int(request.GET.get('page', 1))
    list_sz = request.GET.get('size')
    date = request.GET.get('date')
    action = request.GET.get('action')
    p2_sz = request.GET.get('psize')
    select_sz = request.GET.get('select_size')
    gid = request.GET.get('gid')
    users = UserTrail.objects.all().order_by('-now')
    if request.GET.get('sth'):

        if date:
            try:
                users = UserTrail.objects.filter(date=date).order_by('-now')
                if p2_sz and gid:
                    paginator = Paginator(users, int(p2_sz))
                    users = paginator.page(page)
                    return TemplateResponse(request,'users/trail/paginate.html',{'users':users, 'gid':date})

                paginator = Paginator(users, 10)
                users = paginator.page(page)
                return TemplateResponse(request,'users/trail/p2.html',{'users':users, 'pn':paginator.num_pages,'sz':10,'gid':date})

            except ValueError as e:
                return HttpResponse(e)

        if action:
            try:
                users = UserTrail.objects.filter(crud=action).order_by('-now')
                if p2_sz and gid:
                    paginator = Paginator(users, int(p2_sz))
                    users = paginator.page(page)
                    return TemplateResponse(request,'users/trail/paginate.html',{'users':users, 'gid':action})

                paginator = Paginator(users, 10)
                users = paginator.page(page)
                return TemplateResponse(request,'users/trail/p2.html',{'users':users, 'pn':paginator.num_pages,'sz':10,'gid':action})

            except ValueError as e:
                return HttpResponse(e)
    else:

        if list_sz:
            paginator = Paginator(users, int(list_sz))
            users = paginator.page(page)
            return TemplateResponse(request,'users/trail/p2.html',{'users':users, 'pn':paginator.num_pages,'sz':list_sz, 'gid':0})
        else:
            paginator = Paginator(users, 10)
        if p2_sz:
            paginator = Paginator(users, int(p2_sz))
            users = paginator.page(page)
            return TemplateResponse(request,'users/trail/paginate.html',{'users':users})

        if date:
            try:
                users = UserTrail.objects.filter(date=date).order_by('-now')
                if p2_sz:
                    paginator = Paginator(users, int(p2_sz))
                    users = paginator.page(page)
                    return TemplateResponse(request,'users/trail/paginate.html',{'users':users, 'gid':date})

                paginator = Paginator(users, 10)
                users = paginator.page(page)
                return TemplateResponse(request,'users/trail/p2.html',{'users':users, 'pn':paginator.num_pages,'sz':10,'gid':date})

            except ValueError as e:
                return HttpResponse(e)

        if action:
            try:
                users = UserTrail.objects.filter(crud=action).order_by('-now')
                if p2_sz:
                    paginator = Paginator(users, int(p2_sz))
                    users = paginator.page(page)
                    return TemplateResponse(request,'users/trail/paginate.html',{'users':users, 'gid':action})

                paginator = Paginator(users, 10)
                users = paginator.page(page)
                return TemplateResponse(request,'users/trail/p2.html',{'users':users, 'pn':paginator.num_pages,'sz':10,'gid':action})

            except ValueError as e:
                return HttpResponse(e)


        try:
            users = paginator.page(page)
        except PageNotAnInteger:
            users = paginator.page(1)
        except InvalidPage:
            groups = paginator.page(1)
        except EmptyPage:
            users = paginator.page(paginator.num_pages)
        return TemplateResponse(request,'users/trail/paginate.html',{'users':users})


# @staff_member_required
def user_paginate(request):
    page = int(request.GET.get('page', 1))
    list_sz = request.GET.get('size')
    p2_sz = request.GET.get('psize')
    select_sz = request.GET.get('select_size')

    if request.GET.get('gid'):
        users = User.objects.filter(groups__id=request.GET.get('gid'))
        if p2_sz:
            paginator = Paginator(users, int(p2_sz))
            users = paginator.page(page)
            return TemplateResponse(request,'users/paginate.html',{'users':users})

        if list_sz:
            paginator = Paginator(users, int(list_sz))
            users = paginator.page(page)
            return TemplateResponse(request,'users/p2.html',{'users':users, 'pn':paginator.num_pages,'sz':list_sz, 'gid':request.GET.get('gid')})

        paginator = Paginator(users, 10)
        users = paginator.page(page)
        return TemplateResponse(request,'users/p2.html',{'users':users, 'pn':paginator.num_pages,'sz':10,'gid':request.GET.get('gid')})

    else:
        users = User.objects.all().order_by('-id')
        if list_sz:
            paginator = Paginator(users, int(list_sz))
            users = paginator.page(page)
            return TemplateResponse(request,'users/p2.html',{'users':users, 'pn':paginator.num_pages,'sz':list_sz, 'gid':0})
        else:
            paginator = Paginator(users, 10)
        if p2_sz:
            paginator = Paginator(users, int(p2_sz))
            users = paginator.page(page)
            return TemplateResponse(request,'users/paginate.html',{'users':users})

        try:
            users = paginator.page(page)
        except PageNotAnInteger:
            users = paginator.page(1)
        except InvalidPage:
            groups = paginator.page(1)
        except EmptyPage:
            users = paginator.page(paginator.num_pages)
        return TemplateResponse(request,'users/paginate.html',{'users':users})

@staff_member_required
def user_search( request ):

    if request.is_ajax():
        page = request.GET.get('page', 1)
        list_sz = request.GET.get('size')
        p2_sz = request.GET.get('psize')
        q = request.GET.get( 'q' )
        if list_sz == 0 or list_sz is None:
            sz = 10
        else:
            sz = list_sz


        if q is not None:
            users = User.objects.filter(
                Q( username__icontains = q ) |
                Q( fullname__icontains = q ) |
                Q( email__icontains = q ) | Q( mobile__icontains = q ) ).order_by('-id' )

            if request.GET.get('gid'):
                users = users.filter(groups__id=request.GET.get('gid'))
                if p2_sz:
                    paginator = Paginator(users, int(p2_sz))
                    users = paginator.page(page)
                    return TemplateResponse(request, 'users/paginate.html', {'users': users})

                if list_sz:
                    paginator = Paginator(users, int(list_sz))
                    users = paginator.page(page)
                    return TemplateResponse(request, 'users/search.html',
                                            {'users': users, 'pn': paginator.num_pages, 'sz': list_sz, 'gid':request.GET.get('gid'),'q':q})

                paginator = Paginator(users, 10)
                users = paginator.page(page)
                return TemplateResponse(request, 'users/search.html',
                                        {'users': users, 'pn': paginator.num_pages, 'sz': sz,
                                         'gid': request.GET.get('gid')})

            else:
                if list_sz:
                    paginator = Paginator(users, int(list_sz))
                    users = paginator.page(page)
                    return TemplateResponse(request, 'users/search.html',
                                            {'users': users, 'pn': paginator.num_pages, 'sz': list_sz, 'gid': 0,'q':q})

                if p2_sz:
                    paginator = Paginator(users, int(p2_sz))
                    users = paginator.page(page)
                    return TemplateResponse(request, 'users/paginate.html', {'users': users})

                paginator = Paginator(users, 10)
                try:
                    users = paginator.page(page)
                except PageNotAnInteger:
                    users = paginator.page(1)
                except InvalidPage:
                    users = paginator.page(1)
                except EmptyPage:
                    users = paginator.page(paginator.num_pages)
                return TemplateResponse(request, 'users/search.html', {'users':users, 'pn':paginator.num_pages,'sz':sz,'q':q})

@staff_member_required
def usertrail_search( request ):

    if request.is_ajax():
        page = request.GET.get('page', 1)
        list_sz = request.GET.get('size',10)
        p2_sz = request.GET.get('psize')
        q = request.GET.get( 'q' )
        if list_sz is None:
            sz = 10
        else:
            sz = list_sz

        if q is not None:
            users = UserTrail.objects.filter(
                Q( name__icontains = q ) |
                Q( action__icontains = q ) | Q( date__icontains = q ) ).order_by( '-now' )
            paginator = Paginator(users, 10)
            try:
                users = paginator.page(page)
            except PageNotAnInteger:
                users = paginator.page(1)
            except InvalidPage:
                users = paginator.page(1)
            except EmptyPage:
                users = paginator.page(paginator.num_pages)
            if p2_sz:
                users = paginator.page(page)
                return TemplateResponse(request,'users/trail/paginate.html',{'users':users})

            return TemplateResponse(request, 'users/trail/search.html', {'users':users, 'pn':paginator.num_pages,'sz':sz,'q':q})



@staff_member_required
def users_export_csv(request):
    pdfname = 'users'+str(random.random())
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="'+pdfname+'.csv"'
    qs = User.objects.all()
    writer = csv.writer(response, csv.excel)
    response.write(u'\ufeff'.encode('utf8')) # BOM (optional...Excel needs it to open UTF-8 file properly)
    writer.writerow([
        smart_str(u"ID"),
        smart_str(u"Name"),
        smart_str(u"Email"),
        smart_str(u"Job Title"),
    ])
    for obj in qs:
        writer.writerow([
            smart_str(obj.pk),
            smart_str(obj.username),
            smart_str(obj.email),
            smart_str(obj.jobTitle),
        ])
    return response