# site settings rest api serializers

from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from ...configuration.models import ExamConfiguration as Table
from ...configuration.models import Exam, Cat, Assignment
from structlog import get_logger

logger = get_logger(__name__)


class TableListSerializer(serializers.ModelSerializer):
    detail_url = serializers.HyperlinkedIdentityField(view_name='exam_configuration:detail')
    update_url = serializers.HyperlinkedIdentityField(view_name='exam_configuration:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='exam_configuration:api-delete')
    subject    = serializers.SerializerMethodField()
    academicyear    = serializers.SerializerMethodField()
    academicclass    = serializers.SerializerMethodField()
    term    = serializers.SerializerMethodField()
    assignments    = serializers.SerializerMethodField()
    cats    = serializers.SerializerMethodField()
    exams    = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'academicyear',
                  'academicclass',
                  'term',
                  'pass_marks',
                  'total_marks',
                  'is_percentage',
                  'assignments',
                  'cats',
                  'exams',
                  'detail_url',
                  'update_url',
                  'delete_url'
                 )
    def get_subject(self, obj):
        return obj.subject.name

    def get_academicyear(self, obj):
        return obj.academicyear.name

    def get_academicclass(self, obj):
        return "Class "+str(obj.academicclass)

    def get_term(self, obj):
        return obj.term.name

    def get_cats(self, obj):
        return obj.cat.count()

    def get_assignments(self, obj):
        return obj.assignment.count()

    def get_exams(self, obj):
        return obj.exam.count()


class CreateListSerializer(serializers.ModelSerializer):
    exams = serializers.JSONField(write_only=True)

    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'academicyear',
                  'academicclass',
                  'term',
                  'is_percentage',
                  'pass_marks',
                  'total_marks',
                  'exams',
                 )
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Table.objects.all(),
                fields=('subject', 'academicyear', 'academicclass', 'term'),
                message=_("Exam Setting Already Exists.")
            )
        ]

    def create(self, validated_data):
        instance = Table()
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('academicyear'):
            instance.academicyear = validated_data.get('academicyear')
        if validated_data.get('academicclass'):
            instance.academicclass = validated_data.get('academicclass')
        if validated_data.get('term'):
            instance.term = validated_data.get('term')
        if validated_data.get('is_percentage'):
            instance.is_percentage = validated_data.get('is_percentage')
        if validated_data.get('pass_marks'):
            instance.pass_marks = validated_data.get('pass_marks')
        if validated_data.get('total_marks'):
            instance.total_marks = validated_data.get('total_marks')

        instance.save()

        for i in validated_data.get('exams'):
            if 'assignment' in str(i['name']):
                logger.info(" assignment name-"+str(i['name'])+": value-"+str(i['value']))
                assignment = Assignment()
                assignment.examId = instance
                assignment.name = i['name']
                assignment.marks = i['value']
                assignment.save()
                continue
            elif 'cat' in str(i['name']):
                logger.info(" cat name-" + str(i['name']) + ": value-" + str(i['value']))
                cat = Cat()
                cat.examId = instance
                cat.name = i['name']
                cat.marks = i['value']
                cat.save()
                continue
            elif 'exam' in str(i['name']):
                logger.info(" exam name-" + str(i['name']) + ": value-" + str(i['value']))
                exam = Exam()
                exam.examId = instance
                exam.name = i['name']
                exam.marks = i['value']
                exam.save()
                continue


        return instance


class UpdateSerializer(serializers.ModelSerializer):
    subject = serializers.SerializerMethodField()
    academicyear = serializers.SerializerMethodField()
    academicclass = serializers.SerializerMethodField()
    term = serializers.SerializerMethodField()
    exam_settings = serializers.SerializerMethodField()
    exams = serializers.SerializerMethodField()
    exam_types = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = ('id',
                  'subject',
                  'academicyear',
                  'academicclass',
                  'term',
                  'exam_settings',
                  'exams',
                  'exam_types'
                 )

    def get_subject(self, obj):
        return {"id": obj.subject.pk, "name": obj.subject.name}

    def get_academicyear(self, obj):
        return {"id": obj.academicyear.pk, "name": obj.academicyear.name}

    def get_academicclass(self, obj):
        return {"id": obj.academicclass, "name": "class "+str(obj.academicclass)}

    def get_term(self, obj):
        return {"id": obj.term.pk, "name": obj.term.name}

    def get_exam_settings(self, obj):
        try:
            assignments = str(Assignment.objects.filter(examId=obj.pk).count())
        except:
            assignments = "0"

        try:
            cats = str(Cat.objects.filter(examId=obj.pk).count())
        except:
            cats = "0"

        try:
            exams = str(Exam.objects.filter(examId=obj.pk).count())
        except:
            exams = "0"
        return {"assignments": assignments, "cats": cats, "exams":exams}

    def get_exams(self, obj):
        try:
            assignments_query = Assignment.objects.filter(examId=obj.pk)
            assignments = [{"id": i.pk, "name":i.name, "marks": i.marks} for i in assignments_query]
        except:
            assignments = None

        try:
            cats_query = Cat.objects.filter(examId=obj.pk)
            cats = [{"id": i.pk, "name": i.name, "marks": i.marks} for i in cats_query]
        except:
            cats = None

        try:
            exams_query = Exam.objects.filter(examId=obj.pk)
            exams = [{"id": i.pk, "name": i.name, "marks": i.marks} for i in exams_query]
        except:
            exams = None
        return {"assignments": assignments, "cats": cats, "exams":exams}

    def get_exam_types(self, obj):
        return []

    def update(self, instance, validated_data):
        if validated_data.get('subject'):
            instance.subject = validated_data.get('subject')
        if validated_data.get('academicyear'):
            instance.academicyear = validated_data.get('academicyear')
        if validated_data.get('academicclass'):
            instance.academicclass = validated_data.get('academicclass')
        if validated_data.get('term'):
            instance.term = validated_data.get('term')
        if validated_data.get('percentage'):
            instance.percentage = validated_data.get('percentage')
        print ('******************')
        print (validated_data)
        print ('******************')

        instance.save()
        return instance
