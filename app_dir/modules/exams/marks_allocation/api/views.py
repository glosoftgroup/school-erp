from rest_framework import generics
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import pagination
from rest_framework.mixins import ListModelMixin
from .pagination import PostLimitOffsetPagination

from ...configuration.models import ExamConfiguration
from ..models import MarksAllocation as Table
from ..models import ExamStatus
from app_dir.modules.student.models import StudentOfficialDetails
from app_dir.modules.academics.academic_year.models import AcademicYear
from app_dir.modules.workload.class_allocation.models import ClassAllocation
from app_dir.modules.term.models import Term
from app_dir.modules.academics.classes.models import Class
from .serializers import (
    CreateListSerializer,
    TableListSerializer,
    UpdateSerializer,
    ClassAllocationSerializer,
    TeacherListSerializer,
    SubjectListSerializer,
    ExamListSerializer,
    StudentListSerializer
     )

User = get_user_model()


class CreateAPIView(generics.CreateAPIView):
    queryset = Table.objects.all()
    serializer_class = CreateListSerializer


class DestroyView(generics.DestroyAPIView):
    queryset = Table.objects.all()


class ListAPIView(generics.ListAPIView):
    """
        list details
        GET /api/setting/
    """
    serializer_class = TableListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = PostLimitOffsetPagination

    def get_serializer_context(self):
        if self.request.GET.get('date'):
            return {"date": self.request.GET.get('date'), 'request': self.request}
        return {"date": None, 'request': self.request}

    def get_queryset(self, *args, **kwargs):
        queryset_list = Table.objects.all()

        page_size = 'page_size'
        if self.request.GET.get(page_size):
            pagination.PageNumberPagination.page_size = self.request.GET.get(page_size)
        else:
            pagination.PageNumberPagination.page_size = 10
        if self.request.GET.get('date'):
            queryset_list = queryset_list.filter(created__icontains=self.request.GET.get('date'))

        query = self.request.GET.get('q')
        if query:
            queryset_list = queryset_list.filter(
                Q(subject__name__icontains=query))
        return queryset_list.order_by('-id')


class UpdateAPIView(generics.RetrieveUpdateAPIView):
    """
        update instance details
        @:param pk ExamConfiguration id
        @:method PUT

        PUT /api/room/update/
        payload Json: /payload/update.json
    """
    queryset = Table.objects.all()
    serializer_class = UpdateSerializer


class TeacherDetailView(generics.ListAPIView):
    """
        list teacher details (include academic years &
              terms)
    """
    serializer_class = ClassAllocationSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = ClassAllocation.objects.all().distinct('academicYear', 'teacher')

        query = self.request.GET.get('tr')
        year = self.request.GET.get('year')
        if year:
            queryset_list = queryset_list.filter(
                Q(academicYear__pk=year))
        if query:
            queryset_list = queryset_list.filter(
                Q(teacher__pk=query))
        return queryset_list

class TeacherListView(generics.ListAPIView):
    """
        list teachers only
    """
    serializer_class = TeacherListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = User.objects.all().filter(is_teacher=True)
        return queryset_list.order_by('id')

class SubjectListView(generics.ListAPIView):
    """
        list subjects only
    """
    serializer_class = SubjectListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = ClassAllocation.objects.all()

        teacher = self.request.GET.get('tr')
        year = self.request.GET.get('yr')
        term = self.request.GET.get('trm')
        classTaught = self.request.GET.get('cls')

        if teacher and year and term and classTaught:
            queryset_list = queryset_list.filter(
                Q(academicYear__pk=year, teacher=teacher, term=term, classTaught=classTaught))

        return queryset_list.order_by('id')

class ExamListView(generics.ListAPIView):
    """
        list exams only
    """
    serializer_class = ExamListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = ExamConfiguration.objects.all()

        year = self.request.GET.get('yr')
        subject = self.request.GET.get('sbj')
        term = self.request.GET.get('trm')

        if year and subject and term:
            queryset_list = queryset_list.filter(
                Q(subject__pk=subject, academicyear__pk=year, term__pk=term))

        return queryset_list

class StudentListView(generics.ListAPIView, ListModelMixin):
    """
        list students only
    """
    serializer_class = StudentListSerializer

    def list(self, request, *args, **kwargs):
        response = super(StudentListView, self).list(request, args, kwargs)
        year = self.request.GET.get('yr')
        classTaught = self.request.GET.get('cls')
        className= self.request.GET.get('clsName')
        trmId = self.request.GET.get('trmId')
        exam = self.request.GET.get('exam')
        subject = self.request.GET.get('sbj')
        # status = False

        if year and classTaught and exam and trmId and subject:

            clsTaught = Class.objects.get(pk=classTaught).name
            academicYear = AcademicYear.objects.get(pk=year)
            term = Term.objects.get(pk=trmId)
            try:
                statusObject = ExamStatus.objects.get(
                    academicyear=academicYear,
                    academicclass=className,
                    term=term,
                    exam=exam,
                    subject=subject)
                status = statusObject.is_committed
            except Exception as e:
                statusObject = ExamStatus()
                statusObject.academicclass = className
                statusObject.academicyear = academicYear
                statusObject.term = term
                statusObject.is_committed = False
                statusObject.exam = exam
                statusObject.subject = subject
                statusObject.save()
                status = statusObject.is_committed

            response.data['is_committed'] = status
        return response

    def get_serializer_context(self):
        context = super(StudentListView, self).get_serializer_context()
        context.update({
            "yr": self.request.GET.get('yr'),
            "cls": self.request.GET.get('cls'),
            "exam": self.request.GET.get('exam'),
            "trmId": self.request.GET.get('trmId'),
        })
        return context

    def get_queryset(self, *args, **kwargs):
        queryset_list = StudentOfficialDetails.objects.all()

        year = self.request.GET.get('yr')
        classTaught = self.request.GET.get('cls')

        if year and classTaught:
            queryset_list = queryset_list.filter(
                Q(course=classTaught, academic_year=year))

        return queryset_list.order_by('adm_no')

