# site settings rest api serializers

from rest_framework import serializers
from ...configuration.models import ExamConfiguration
from ...configuration.models import Exam, Cat, Assignment
from ..models import MarksAllocation as Table
from ..models import ExamStatus
from app_dir.modules.workload.class_allocation.models import ClassAllocation
from app_dir.modules.student.models import StudentOfficialDetails, Student
from django.contrib.auth import get_user_model
from structlog import get_logger

logger = get_logger(__name__)
User = get_user_model()

class TableListSerializer(serializers.ModelSerializer):
    detail_url = serializers.HyperlinkedIdentityField(view_name='marks_allocation:detail')
    update_url = serializers.HyperlinkedIdentityField(view_name='marks_allocation:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='marks_allocation:api-delete')

    class Meta:
        model = Table
        fields = ('id',
                  'student',
                  'subject',
                  'academicclass',
                  'academicyear',
                  'term',
                  'exam',
                  'exam_marks',
                  'student_marks',
                  'is_committed',
                  'updated_at',
                  'created',
                  'detail_url',
                  'update_url',
                  'delete_url'
                 )


class CreateListSerializer(serializers.ModelSerializer):
    students = serializers.JSONField(write_only=True)

    class Meta:
        model = Table
        fields = ('id',
                  'student',
                  'subject',
                  'academicclass',
                  'academicyear',
                  'term',
                  'exam',
                  'exam_marks',
                  'student_marks',
                  'is_committed',
                  'students'
                 )

    def create(self, validated_data):

        for i in validated_data.get('students'):
            try:
                logger.info(" student id-"+str(i['student'])+": marks-"+str(i['student_marks']))
                try:
                    findStudent = Table.objects.get(
                                student=i['student'],
                                academicyear=validated_data.get('academicyear'),
                                academicclass=validated_data.get('academicclass'),
                                exam=validated_data.get('exam'),
                                exam_marks=validated_data.get('exam_marks'),
                                term=validated_data.get('term'))
                    findStudent.student_marks = i['student_marks']
                    findStudent.is_committed = validated_data.get('is_committed')
                    findStudent.save()
                except Exception as e:
                    instance = Table()
                    student = Student.objects.get(pk=int(i['student']))
                    instance.student = student
                    instance.subject = validated_data.get('subject')
                    instance.academicyear = validated_data.get('academicyear')
                    instance.academicclass = validated_data.get('academicclass')
                    instance.term = validated_data.get('term')
                    instance.exam = validated_data.get('exam')
                    instance.exam_marks = validated_data.get('exam_marks')
                    instance.student_marks = i['student_marks']
                    instance.is_committed = validated_data.get('is_committed')
                    instance.save()

            except Exception as e:
                logger.info(" student id-" + str(i['student']) + ": marks-" + str(i['student_marks']))
                raise serializers.ValidationError({'message':'Error allocating marks to students','status':'400'})

        try:
            statusObject = ExamStatus.objects.get(
                academicyear=validated_data.get('academicyear'),
                academicclass=validated_data.get('academicclass'),
                term=validated_data.get('term'),
                subject=validated_data.get('subject'),
                exam=validated_data.get('exam'))

            statusObject.is_committed = validated_data.get('is_committed')
            statusObject.save()

        except Exception as e:
            raise serializers.ValidationError({'message':'Error status in the Final Commit','status':'400'})

        return Table.objects.last()


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id',
                  'student',
                  'subject',
                  'academicclass',
                  'academicyear',
                  'term',
                  'exam',
                  'exam_marks',
                  'student_marks',
                  'is_committed'
                 )

    def update(self, instance, validated_data):
        instance.student = validated_data.get('student')
        instance.subject = validated_data.get('subject')
        instance.academicyear = validated_data.get('academicyear')
        instance.academicclass = validated_data.get('academicclass')
        instance.term = validated_data.get('term')
        instance.exam = validated_data.get('exam')
        instance.exam_marks = validated_data.get('exam_marks')
        instance.student_marks = validated_data.get('student_marks')
        instance.is_committed = validated_data.get('is_committed')

        instance.save()
        return instance

class ClassAllocationSerializer(serializers.ModelSerializer):
    teacher = serializers.SerializerMethodField()
    year = serializers.SerializerMethodField()
    terms = serializers.SerializerMethodField()

    class Meta:
        model = ClassAllocation
        fields = ('id',
                  'teacher',
                  'academicYear',
                  'terms',
                  'year'
                 )

    def get_terms(self, obj):
        query = ClassAllocation.objects.filter(teacher=obj.teacher, academicYear=obj.academicYear)
        terms = []
        for i in query:
            q = query.filter(term=i.term.id)
            classes = []

            for j in q:
                k = {"id":j.classTaught.id, "name":j.classTaught.name+' '+j.classTaught.stream.name}
                if k not in classes:
                    classes.append(k)
                    continue
            terms.append({"id":i.term.id, "name":i.term.name, "classes":classes})

        terms = [i for n, i in enumerate(terms) if i not in terms[n + 1:]]
        return terms

    def get_teacher(self, obj):
        return {"id": obj.teacher.id, "name": obj.teacher.fullname}

    def get_year(self, obj):
        return {"id":obj.academicYear.id, "name":obj.academicYear.name}


class TeacherListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id',
                  'name',
                 )

    def get_name(self, obj):
        return obj.fullname

class SubjectListSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    term = serializers.SerializerMethodField()
    year = serializers.SerializerMethodField()
    teacher = serializers.SerializerMethodField()
    classTaught = serializers.SerializerMethodField()
    class Meta:
        model = ClassAllocation
        fields = (
            'id',
            'name',
            'term',
            'year',
            'teacher',
            'classTaught'
        )

    def get_id(self, obj):
        return obj.subject.id

    def get_name(self, obj):
        return obj.subject.name

    def get_teacher(self, obj):
        return obj.teacher.fullname

    def get_term(self, obj):
        return obj.term.name

    def get_year(self, obj):
        return obj.academicYear.name

    def get_classTaught(self, obj):
        return obj.classTaught.name+' '+obj.classTaught.stream.name

class ExamListSerializer(serializers.ModelSerializer):
    subject = serializers.SerializerMethodField()
    classGroup = serializers.SerializerMethodField()
    exams = serializers.SerializerMethodField()
    term = serializers.SerializerMethodField()
    year = serializers.SerializerMethodField()
    class Meta:
        model = ExamConfiguration
        fields = (
            'id',
            'subject',
            'classGroup',
            'term',
            'year',
            'exams'
        )

    def get_subject(self, obj):
        return obj.subject.name

    def get_term(self, obj):
        return obj.term.name

    def get_year(self, obj):
        return obj.academicyear.name

    def get_classGroup(self, obj):
        return "Class "+str(obj.academicclass)

    def get_exams(self, obj):
        exams = Exam.objects.filter(examId=obj.pk).order_by('id')
        assignments = Assignment.objects.filter(examId=obj.pk).order_by('id')
        cats = Cat.objects.filter(examId=obj.pk).order_by('id')

        all = []

        for i in assignments:
            all.append({"id": i.id, "name": "Assignment "+ str(i.id), "totalmarks": i.marks})

        for i in cats:
            all.append({"id": i.id, "name": "CAT "+ str(i.id), "totalmarks": i.marks})

        for i in exams:
            all.append({"id": i.id, "name": "Exam "+ str(i.id), "totalmarks": i.marks})

        return all

class StudentListSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    academic_year = serializers.SerializerMethodField()
    classTaught = serializers.SerializerMethodField()
    house = serializers.SerializerMethodField()
    exams = serializers.SerializerMethodField()

    class Meta:
        model = StudentOfficialDetails
        fields = (
            'id',
            'name',
            'adm_no',
            'classTaught',
            'academic_year',
            'house',
            'exams'
        )

    def get_id(self, obj):
        return obj.student.pk

    def get_name(self, obj):
        return obj.student.first_name + " " + obj.student.middle_name + " " + obj.student.last_name

    def get_classTaught(self, obj):
        return { "id" : obj.course.id, "name" : obj.course.name+" "+obj.course.stream.name }

    def get_academic_year(self, obj):
        return { "id" : obj.academic_year.id, "name" : obj.academic_year.name }

    def get_house(self, obj):
        return { "id" : obj.house.id, "name" : obj.house.name }

    def get_exams(self, obj):
        yr = self.context.get("yr", None)
        cls = self.context.get("cls", None)
        exam = self.context.get("exam", None)
        trmId = self.context.get("trmId", None)

        exams = []
        try:
            mks = Table.objects.get(
                    student=obj.student.pk,
                    academicyear=yr,
                    exam=exam,
                    term=trmId)
            exams = {"subject": mks.subject , "name":mks.exam, "marks":mks.student_marks, "term":mks.term.name}

            logger.info({"error": "None", "expected": "fetch one filtered exam details for student"})
        except Exception as e:
            mks = Table.objects.filter(
                student=obj.student.pk,
                academicyear=obj.academic_year.id).order_by('-id')
            for i in mks:
                v = {"subject": i.subject , "name":i.exam, "marks":i.student_marks, "term":i.term.name}
                exams.append(v)

            logger.info({"error":str(e), "expected":"fetch all the exams of the student"})
        return exams