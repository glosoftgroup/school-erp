# student module rest api serializers

from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer
from ...student.models import Student as Table
from ...student.models import StudentOfficialDetails as OfficialDetail
from app_dir.modules.parent.models import Parent

# student details
class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='student:api-delete')
    adm_no = serializers.SerializerMethodField()
    image = VersatileImageFieldSerializer(
        sizes=[
            ('full_size', 'url'),
            ('thumbnail', 'thumbnail__100x100'),
            ('medium_square_crop', 'crop__400x400'),
            ('small_square_crop', 'crop__50x50')
        ]
    )

    class Meta:
        model = Table
        fields = ('id',
                  'adm_no',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'nationality',
                  'dob',
                  'pob',
                  'gender',
                  'religion',
                  'parents',
                  'image',
                  'update_url',
                  'delete_url'
                 )

    def get_adm_no(self, obj):
        try:
            return obj.student_official.first().adm_no
        except:
            return ''


class ParentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parent
        fields = ('first_name', 'middle_name', 'last_name')


class CreateListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:api-update')
    parents = ParentsSerializer(read_only=True, many=True)

    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'nationality',
                  'dob',
                  'pob',
                  # por (place of residence)
                  'por',
                  'gender',
                  'religion',
                  'image',
                  'parents',
                  'update_url'
                 )

    def get_parents(self, obj):
        return obj.parents

    def create(self, validated_data):
        instance = Table()

        instance.first_name = validated_data.get('first_name')
        instance.middle_name = validated_data.get('middle_name')
        instance.last_name = validated_data.get('last_name')

        if validated_data.get('nationality'):
            instance.nationality = validated_data.get('nationality')
        if validated_data.get('dob'):
            instance.dob = validated_data.get('dob')
        if validated_data.get('gender'):
            instance.gender = validated_data.get('gender')
        if validated_data.get('pob'):
            instance.pob = validated_data.get('pob')
        if validated_data.get('por'):
            instance.por = validated_data.get('por')
        if validated_data.get('religion'):
            instance.religion = validated_data.get('religion')
        if validated_data.get('image'):
            instance.image = validated_data.get('image', instance.image)
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:api-update')
    parents = ParentsSerializer(read_only=True, many=True)
    
    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'nationality',
                  'dob',
                  'por',
                  'pob',
                  'gender',
                  'religion',
                  'image',
                  'parents',
                  'update_url'
                 )

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.middle_name = validated_data.get('middle_name', instance.middle_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.religion = validated_data.get('religion', instance.religion)
        instance.nationality = validated_data.get('nationality', instance.nationality)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.pob = validated_data.get('pob', instance.pob)
        instance.por = validated_data.get('por', instance.por)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance


# official details
class OfficialDetailsListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:api-update-official')
    academic_name = serializers.SerializerMethodField()

    class Meta:
        model = OfficialDetail
        fields = ('id',
                  'student',
                  'adm_no',
                  'academic_year',
                  'academic_name',
                  'stream',
                  'course',
                  'house',
                  'join_date',
                  'update_url'
                  )

    def get_academic_name(self, obj):
        return obj.academic_year.name


class CreateOfficialDetailListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:api-update-official')

    class Meta:
        model = OfficialDetail
        fields = ('id',
                  'student',
                  'adm_no',
                  'academic_year',
                  'stream',
                  'course',
                  'house',
                  'join_date',
                  'update_url'
                 )

    def create(self, validated_data):
        instance = OfficialDetail()
        instance.student = validated_data.get('student')

        def set_adm_no():
            # auto generate admission no
            try:
                adm_no = OfficialDetail.objects.latest('id').pk
                adm_no += 1
            except Exception as e:
                adm_no = 2
                print(e)
            instance.adm_no = adm_no
        if validated_data.get('adm_no'):
            instance.adm_no = validated_data.get('adm_no')
        else:
            set_adm_no()

        if validated_data.get('academic_year'):
            instance.academic_year = validated_data.get('academic_year')
        if validated_data.get('stream'):
            instance.stream = validated_data.get('stream')
        if validated_data.get('course'):
            instance.course = validated_data.get('course')
        if validated_data.get('house'):
            instance.house = validated_data.get('house')
        if validated_data.get('join_date'):
            instance.join_date = validated_data.get('join_date')
        instance.save()

        return instance


class UpdateOfficialDetailListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:api-update-official')

    class Meta:
        model = OfficialDetail
        fields = ('id',
                  'student',
                  'adm_no',
                  'academic_year',
                  'stream',
                  'course',
                  'house',
                  'join_date',
                  'update_url'
                 )

    def update(self, instance, validated_data):
        instance.student = validated_data.get('student', instance.student)
        instance.adm_no = validated_data.get('adm_no', instance.adm_no)
        instance.academic_year = validated_data.get('academic_year', instance.academic_year)
        instance.stream = validated_data.get('stream', instance.stream)
        instance.course = validated_data.get('course', instance.course)
        instance.house = validated_data.get('house', instance.house)
        instance.join_date = validated_data.get('join_date', instance.join_date)

        instance.save()
        return instance
