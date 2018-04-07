from django.conf.urls import url, include
from django.contrib import admin

from app_dir.core.views import test_celery
from app_dir.core.views import index, home
from app_dir.core.urls import urlpatterns as core_urls
from app_dir.modules.academics.academic_year.urls import urlpatterns as academic_year_urls
from app_dir.modules.academics.classes.urls import urlpatterns as class_urls
from app_dir.modules.exams.marks_allocation.urls import urlpatterns as marks_allocations_urls
from app_dir.modules.academics.curriculum.urls import urlpatterns as curriculum_urls
from app_dir.modules.academics.subject.urls import urlpatterns as subject_urls
from app_dir.modules.academics.stream.urls import urlpatterns as stream_urls
from app_dir.modules.attendance.urls import urlpatterns as attendance_urls
from app_dir.modules.exams.configuration.urls import urlpatterns as configuration_urls
from app_dir.modules.finance.item.urls import urlpatterns as finance_item_urls
from app_dir.modules.finance.fee.urls import urlpatterns as finance_fee_urls
from app_dir.modules.house.urls import urlpatterns as house_urls
from app_dir.modules.room.urls import urlpatterns as room_urls
from app_dir.modules.parent.urls import urlpatterns as parent_urls
from app_dir.modules.site.urls import urlpatterns as site_urls
from app_dir.modules.student.urls import urlpatterns as student_urls
from app_dir.modules.term.urls import urlpatterns as term_urls
from app_dir.modules.users.user.urls import urlpatterns as users_urls
from app_dir.modules.workload.class_allocation.urls import urlpatterns as class_allocation_urls

urlpatterns = [
    url(r'^', include(core_urls, namespace='core')),
    url(r'^admin/', admin.site.urls),
    url(r'^academic_year/', include(academic_year_urls, namespace='academic_year')),
    url(r'^attendance/', include(attendance_urls, namespace='attendance')),
    url(r'^class/', include(class_urls, namespace='classes')),
    url(r'^curriculum/', include(curriculum_urls, namespace='curriculum')),
    url(r'^class/allocation/', include(class_allocation_urls, namespace='class_allocation')),
    url(r'^exams/configuration/', include(configuration_urls, namespace='exam_configuration')),
    url(r'^exams/marks/allocation/', include(marks_allocations_urls, namespace='marks_allocation')),
    url(r'^finance/item/', include(finance_item_urls, namespace="finance_item")),
    url(r'^finance/fee/', include(finance_fee_urls, namespace="fee")),
    url(r'^house/', include(house_urls, namespace='house')),
    url(r'^parent/', include(parent_urls, namespace='parent')),
    url(r'^room/', include(room_urls, namespace='room')),
    url(r'^site/', include(site_urls, namespace='site')),
    url(r'^stream/', include(stream_urls, namespace='stream')),
    url(r'^subject/', include(subject_urls, namespace='subject')),
    url(r'^student/', include(student_urls, namespace='student')),
    url(r'^term/', include(term_urls, namespace='term')),
    url(r'^test_celery', test_celery, name='test_celery'),
    url(r'^users/', include(users_urls, namespace='users')),
]
