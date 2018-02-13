from django.contrib.auth.models import Group, Permission
from django.template.response import TemplateResponse
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.template.loader import render_to_string
from django.db.models import Q
from django.db import IntegrityError
import simplejson
from ..decorators import permission_decorator, user_trail, staff_member_required
from django.core.paginator import Paginator
from ..utils import image64

from .models import User
from ..decorators import permission_decorator, user_trail
from structlog import get_logger

logger = get_logger(__name__)

# @staff_member_required
# @permission_decorator('auth.view_group')
def groups(request):
	users = User.objects.all().order_by('id')
	permissions = Permission.objects.all()
	groups = Group.objects.all().order_by('-id')
	page = request.GET.get('page', 1)
	paginator = Paginator(groups, 5)
	try:
		groups = paginator.page(page)
	except PageNotAnInteger:
		groups = paginator.page(1)
	except EmptyPage:
		groups = paginator.page(paginator.num_pages)
	except InvalidPage:
		groups = paginator.page(1)
	user_trail(request.user.username, 'accessed groups list page', 'view')
	logger.info('User: '+str(request.user.username)+' accessed the view groups page')
	if request.GET.get('initial'):
		return HttpResponse(paginator.num_pages)
	else:
		try:
			first_group = Group.objects.filter()[:1].get()
			users_in_group = User.objects.filter(groups__id=first_group.id)
			return TemplateResponse(request, 'users/groups/group_list.html', 
			{'users':users, 'permissions':permissions, 'groups':groups, 'users_in_group':users_in_group})
		except: ObjectDoesNotExist
		return TemplateResponse(request, 'users/groups/group_list.html', 
			{'users':users, 'permissions':permissions, 'groups':groups})

@staff_member_required
def group_paginate(request):
	groups = Group.objects.all().order_by('-id')
	page = int(request.GET.get('page', 1))
	list_sz = request.GET.get('size')
	p2_sz = request.GET.get('psize')
	select_sz = request.GET.get('select_size')
	if list_sz:
		paginator = Paginator(groups, int(list_sz))
		groups = paginator.page(page)
		return TemplateResponse(request,'users/groups/p2.html',{'groups':groups, 'pn':paginator.num_pages,'sz':list_sz})
	else:
		paginator = Paginator(groups, 5)
	if p2_sz:
		paginator = Paginator(groups, int(p2_sz))
		groups = paginator.page(page)
		return TemplateResponse(request,'users/groups/paginate.html',{'groups':groups})

	try:
		groups = paginator.page(page)
	except PageNotAnInteger:
		groups = paginator.page(1)
	except InvalidPage:
		groups = paginator.page(1)
	except EmptyPage:
		groups = paginator.page(paginator.num_pages)
	return TemplateResponse(request,'users/groups/paginate.html',{'groups':groups})

@staff_member_required
def group_search( request ):

	if request.is_ajax():
		page = request.GET.get('page', 1)
		list_sz = request.GET.get('size',10)
		p2_sz = request.GET.get('psize')
		q = request.GET.get( 'q' )
		if list_sz is None:
			sz = 5
		else:
			sz = list_sz

		if q is not None:            
			groups = Group.objects.filter( 
				Q( name__icontains = q ) ).order_by( '-id' )
			paginator = Paginator(groups, 5)
			try:
				groups = paginator.page(page)
			except PageNotAnInteger:
				groups = paginator.page(1)
			except InvalidPage:
				groups = paginator.page(1)
			except EmptyPage:
				groups = paginator.page(paginator.num_pages)
			if p2_sz:
				groups = paginator.page(page)
				return TemplateResponse(request,'users/groups/paginate.html',{'groups':groups})

			return TemplateResponse(request, 'users/groups/search.html', {'groups':groups, 'pn':paginator.num_pages,'sz':sz,'q':q})

@staff_member_required
def perms(request):
	users = User.objects.all().order_by('-id')
	permissions = Permission.objects.all()
	groups = Group.objects.all().order_by('-id')
	try:
		first_group = Group.objects.filter()[:1].get()
		users_in_group = User.objects.filter(groups__id=first_group.id)
		return TemplateResponse(request, 'users/groups/list.html', 
		{'users':users, 'permissions':permissions, 'groups':groups, 'users_in_group':users_in_group})
	except ObjectDoesNotExist:
		return TemplateResponse(request, 'users/groups/list.html',
		{'users':users, 'permissions':permissions, 'groups':groups})

@staff_member_required
@permission_decorator('auth.add_group')
@csrf_protect
def create_group(request):
	if request.method == 'POST':
		group_name = request.POST.get('group_name')
		users = request.POST.getlist('users[]')
		try:
			group = Group.objects.get(name=group_name)
			try:
				group.exists()
			except Exception as e:
				logger.error(e)
				return HttpResponse('error')
		except ObjectDoesNotExist:
			group = Group.objects.create(name=group_name)
			if users is not None:
				group.user_set.add(*users)
			group.save()
			last_id_group = Group.objects.latest('id')
			user_trail(request.user.username, 'added group '+group_name, 'add')
			return JsonResponse({"id":last_id_group.id, "name":last_id_group.name})

@staff_member_required
@permission_decorator('auth.add_group')
@csrf_protect
def group_assign_permission(request):
	if request.method == 'POST':
		group_id = request.POST.get('group_id')
		group = Group.objects.get(id=group_id)
		group_has_permissions = group.permissions.all()
		login_status = request.POST.get('check_login')
		permission_list = request.POST.getlist('checklist[]')
		users_in_group = User.objects.filter(groups__name=group.name)
		if login_status == 'inactive':   
			users_loop(False, users_in_group)
			return HttpResponse('deactivated')
		else:
			if group_has_permissions in permission_list:
				try:
					not_in_group_permissions = list(set(permission_list) - set(group_has_permissions))
					group.permissions.add(*not_in_group_permissions)
					group.save()
					refine_users_permissions(users_in_group, permission_list)
					users_loop(True, users_in_group)
					return HttpResponse('permissions added')
				except Exception as e:
					logger.error(e)
					return HttpResponse('custom is - '+str(e))

			else:
				try:
					not_in_group_permissions = list(set(permission_list) - set(group_has_permissions))
					group.permissions.remove(*group_has_permissions)
					group.permissions.add(*not_in_group_permissions)
					group.save()
					for user in users_in_group:
						user.user_permissions.remove(*group_has_permissions)
						user.user_permissions.add(*not_in_group_permissions)
						user.save()
					users_loop(True, users_in_group)
					return HttpResponse('permissions updated')
				except Exception as e:
					logger.error(e)
					return HttpResponse('custom is - '+str(e))

def refine_users_permissions(users_in_group, permission_list):
	for user in users_in_group:
		user_has_permissions = Permission.objects.filter(user=user)
		if user_has_permissions in permission_list:
			not_in_user_permissions = list(set(permission_list) - set(user_has_permissions))
			user.is_staff = True
			user.is_active = True
			user.user_permissions.add(*not_in_user_permissions)
			user.save()
		else:
			not_in_user_permissions = list(set(permission_list) - set(user_has_permissions))
			user.is_staff = True
			user.is_active = True
			user.user_permissions.remove(*user_has_permissions)
			user.user_permissions.add(*not_in_user_permissions)
			user.save()


@staff_member_required
@csrf_protect
def get_search_users(request):
	if request.is_ajax() and request.method == 'POST': 
		group_id = request.POST.get('id')
		users = User.objects.filter(groups__id=group_id)
		html = render_to_string('users/groups/group_users.html', {'users':users})
		return HttpResponse(html)

@staff_member_required
@permission_decorator('auth.change_group')
@csrf_protect
def group_edit(request):
	group_id = request.POST.get('id')
	group = Group.objects.get(id=group_id)
	permissions = Permission.objects.all()
	group_permissions = Permission.objects.filter(group=group)
	ctx = {'group': group,'permissions':permissions, 'group_permissions':group_permissions}
	html = render_to_string('users/groups/group_permissions.html', ctx)
	user_trail(request.user.username, 'updated group '+group.name, 'update')
	return HttpResponse(html)

@staff_member_required
@permission_decorator('auth.view_group')
def group_detail(request, pk):
	group = Group.objects.get(id=pk)
	group_permissions = Permission.objects.filter(group=group)
	try:
		users_in_group = User.objects.filter(groups__name=group.name)
		ctx = {"users":users_in_group, "group":group.name}
		html = render_to_string('users/groups/group_detail.html', ctx)
		return HttpResponse(html)
	except Exception as e:
		logger.error(e)
		ctx = { "group": group.name}
		html = render_to_string('users/groups/group_detail.html', ctx)
		return HttpResponse(html)

@staff_member_required
@permission_decorator('auth.delete_group')
def group_delete(request, pk):
	group = Group.objects.get(id=pk)
	group_permissions = Permission.objects.filter(group=group)
	users_in_group = User.objects.filter(groups__name=group.name)
	if request.method == 'POST':
		group.permissions.remove(*group_permissions)
		for user in users_in_group:
			group.user_set.remove(user)
			user.user_permissions.remove(*group_permissions)
		group.delete()
		user_trail(request.user.username, 'deleted group '+group.name, 'delete')
		return HttpResponse('success')
	else:
		return HttpResponse('error deleting')

@staff_member_required
def group_manage(request):
	group_id = request.POST.get('id')
	group = Group.objects.get(id=group_id)
	permissions = Permission.objects.all()
	group_permissions = Permission.objects.filter(group=group)
	users_in_group = User.objects.filter(groups__name=group.name)
	ctx = {'group': group,'permissions':permissions, 'group_permissions':group_permissions,'users':users_in_group}
	html = render_to_string('users/groups/edit_group_permissions.html', ctx)
	return HttpResponse(html)

@staff_member_required
def get_group_users(request):
	group_id = request.POST.get('id')
	group = Group.objects.get(id=group_id)
	try:
		users = User.objects.filter(groups__name=group.name)

		to_json = []
		for user in users:
			user_dict = {}
			user_dict['id'] = user.id
			if user.name:
				user_dict['name'] = user.fullname
			else:
				user_dict['name'] = user.email
			if user.image:
				user_dict['image'] = str(user.image.url)
			else:
				user_dict['image'] = image64()
			to_json.append(user_dict)
		response_data = simplejson.dumps(to_json)
		return HttpResponse(response_data, content_type='application/json')
	except Exception as e:
		return HttpResponse('none')

@staff_member_required
@permission_decorator('auth.change_group')
def group_update(request):
	if request.method == 'POST':
		group_id = request.POST.get('id')
		group_name = request.POST.get('group_name')
		group = Group.objects.get(id=group_id)
		group_has_permissions = group.permissions.all()
		login_status = request.POST.get('check_login')
		permission_list = request.POST.getlist('checklist[]')
		# users = request.POST.getlist('users[]')
		# users = User.objects.filter(groups__name=group.name)
		group_has_users = User.objects.filter(groups__name=group.name)

		group.name = group_name
		if login_status == 'inactive':   
			users_loop(False, group_has_users)
			return HttpResponse(' group inactive')
		else:
			users_loop(True, group_has_users)
			if group_has_permissions in permission_list:
				try:
					not_in_group_permissions = list(set(permission_list) - set(group_has_permissions))
					group.permissions.add(*not_in_group_permissions)
					group.save()
					# user_manage(users, group_has_users, group)
					#** refine update users permissions
					refine_users_permissions(group_users_set_2, permission_list)
					user_trail(request.user.username, 'added permissions to group: '+ group.name, 'add')
					logger.info(request.user.username, 'added permissions to group: '+ group.name)
					return HttpResponse('permissions added')
				except IntegrityError as e:
					logger.debug(e)
					logger.error(e)
					return HttpResponse(str(e)+"That group already exists")
			else:
				try:
					not_in_group_permissions = list(set(permission_list) - set(group_has_permissions))
					print ('not in group permissions'+ str(not_in_group_permissions))
					group.permissions.remove(*group_has_permissions)
					group.permissions.add(*not_in_group_permissions)
					group.save()
					# user_manage(users, group_has_users, group)
					users2 = User.objects.filter(groups__name=group.name)
					for user in users2:
						user.user_permissions.remove(*group_has_permissions)
						user.user_permissions.add(*not_in_group_permissions)
						user.save()
					user_trail(request.user.username, 'updated permissions to group: '+ group.name,'update')
					logger.info(request.user.username + 'updated permissions to group: '+ group.name)
					return HttpResponse('permissions updated')
				except IntegrityError as e:
					logger.debug(e)
					logger.error(e)
					return HttpResponse(str(e)+"That group already exists")

def users_loop(status, users):
	for user in users:
		user.is_staff = status
		user.is_active = status
		user.save()

#** filter and save users in order
def user_manage(users, group_has_users, group):
	if group_has_users in users:
		not_in_group_users = list(set(users) - set(group_has_users))
		group.user_set.add(*not_in_group_users)
		group.save()

	else:
		not_in_group_users = list(set(users) - set(group_has_users))
		group.user_set.remove(*group_has_users)
		group.user_set.add(*not_in_group_users)
		group.save()

def group_update_users(request):
	if request.method == 'POST':
		group_id = request.POST.get('id')
		group_name = request.POST.get('group_name')
		group = Group.objects.get(id=group_id)
		users = request.POST.getlist('users[]')
		group_has_users = User.objects.filter(groups__name=group.name)
		try:
			user_manage(users, group_has_users, group)
			return HttpResponse('Update wass successful')
		except Exception as e:
			return HttpResponse(e)
