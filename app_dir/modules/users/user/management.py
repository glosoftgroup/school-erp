from django.db.models.signals import post_migrate
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission


def add_view_permissions(sender, **kwargs):
    """
    This syncdb hooks takes care of adding a view permission too all our 
    content types.
    """
    # for each of our content types
    for content_type in ContentType.objects.all():
        # build our permission slug
        codename = "view_%s" % content_type.model

        # if it doesn't exist..
        if not Permission.objects.filter(content_type=content_type, codename=codename):
            # add it
            Permission.objects.create(content_type=content_type,
                                      codename=codename,
                                      name="Can view %s" % content_type.name)
    
    """ Make a sale permission"""
    if not ContentType.objects.filter(model='unused') \
            and not Permission.objects.filter(codename='import_database') \
            and not Permission.objects.filter(codename='export_database'):
        url_content_type = ContentType.objects.create(app_label='sales', model='unused')
        Permission.objects.create(name='can import database', content_type=url_content_type, codename='import_database')
        Permission.objects.create(name='can export database', content_type=url_content_type, codename='export_database')

    view_unused = Permission.objects.filter(codename='view_unused')
    view_unused.delete()

    add_usertrail = Permission.objects.filter(codename='add_usertrail')
    delete_usertrail = Permission.objects.filter(codename='delete_usertrail')
    change_usertrail = Permission.objects.filter(codename='change_usertrail')
    add_usertrail.delete()
    delete_usertrail.delete()
    change_usertrail.delete()



# check for all our view permissions after a syncdb
post_migrate.connect(add_view_permissions)