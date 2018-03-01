# site settings rest api serializers

from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer
from ...student.models import Student as Table
from ...student.models import StudentOfficialDetails as OfficialDetail


# student details
class TableListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:update')
    delete_url = serializers.HyperlinkedIdentityField(view_name='student:api-delete')
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
                  'first_name',
                  'middle_name',
                  'last_name',
                  'nationality',
                  'dob',
                  'pob',
                  'gender',
                  'religion',
                  'image',
                  'update_url',
                  'delete_url'
                 )


class CreateListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:update')

    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'nationality',
                  'dob',
                  'pob',
                  'gender',
                  'religion',
                  'image',
                  'update_url'
                 )

    def create(self, validated_data):
        instance = Table()

        instance.first_name = validated_data.get('first_name')
        instance.middle_name = validated_data.get('middle_name')
        instance.last_name = validated_data.get('last_name')
        #
        # def set_adm_no():
        #     # auto generate admission no
        #     try:
        #         adm_no = Table.objects.latest('id').pk
        #         adm_no += 1
        #     except Exception as e:
        #         adm_no = 2
        #         print(e)
        #     instance.adm_no = adm_no
        # if str(validated_data.get('adm_no')) != 'null':
        #     instance.adm_no = validated_data.get('adm_no')
        # elif not validated_data.get('adm_no'):
        #     set_adm_no()
        # else:
        #     set_adm_no()

        if validated_data.get('nationality'):
            instance.nationality = validated_data.get('nationality')
        if validated_data.get('dob'):
            instance.dob = validated_data.get('dob')
        if validated_data.get('gender'):
            instance.gender = validated_data.get('gender')
        if validated_data.get('pob'):
            instance.pob = validated_data.get('pob')
        if validated_data.get('religion'):
            instance.religion = validated_data.get('religion')
        if validated_data.get('image'):
            instance.image = validated_data.get('image', instance.image)
        instance.save()

        return instance


class UpdateSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:update')

    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'nationality',
                  'dob',
                  'pob',
                  'gender',
                  'religion',
                  'image',
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
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance


# official details
class CreateOfficialDetailListSerializer(serializers.ModelSerializer):
    update_url = serializers.HyperlinkedIdentityField(view_name='student:update')

    class Meta:
        model = Table
        fields = ('id',
                  'first_name',
                  'middle_name',
                  'last_name',
                  'nationality',
                  'dob',
                  'pob',
                  'gender',
                  'religion',
                  'image',
                  'update_url'
                 )

    def create(self, validated_data):
        instance = Table()

        instance.first_name = validated_data.get('first_name')
        instance.middle_name = validated_data.get('middle_name')
        instance.last_name = validated_data.get('last_name')
        #
        # def set_adm_no():
        #     # auto generate admission no
        #     try:
        #         adm_no = Table.objects.latest('id').pk
        #         adm_no += 1
        #     except Exception as e:
        #         adm_no = 2
        #         print(e)
        #     instance.adm_no = adm_no
        # if str(validated_data.get('adm_no')) != 'null':
        #     instance.adm_no = validated_data.get('adm_no')
        # elif not validated_data.get('adm_no'):
        #     set_adm_no()
        # else:
        #     set_adm_no()

        if validated_data.get('nationality'):
            instance.nationality = validated_data.get('nationality')
        if validated_data.get('dob'):
            instance.dob = validated_data.get('dob')
        if validated_data.get('gender'):
            instance.gender = validated_data.get('gender')
        if validated_data.get('pob'):
            instance.pob = validated_data.get('pob')
        if validated_data.get('religion'):
            instance.religion = validated_data.get('religion')
        if validated_data.get('image'):
            instance.image = validated_data.get('image', instance.image)
        instance.save()

        return instance
