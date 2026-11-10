from django.contrib.auth import get_user_model
from rest_framework import serializers
from api.models import DoctorProfile, PatientProfile, Appointment
from api.picture_field import PictureField, StoredFileField

User = get_user_model()


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'role']
        read_only_fields = ['id', 'username', 'first_name', 'last_name', 'email', 'role']


class DoctorProfileSerializer(serializers.ModelSerializer):
    photo = PictureField(required=False)
    user = UserMiniSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = DoctorProfile
        fields = [
            'id', 'user', 'user_id', 'specialty', 'bio', 'photo',
            'years_experience', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PatientProfileSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = PatientProfile
        fields = [
            'id', 'user', 'user_id', 'date_of_birth', 'phone', 'address',
            'insurance_provider', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AppointmentSerializer(serializers.ModelSerializer):
    patient = UserMiniSerializer(read_only=True)
    doctor = UserMiniSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='patient'), source='patient', write_only=True
    )
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='doctor'), source='doctor', write_only=True
    )
    doctor_specialty = serializers.CharField(
        source='doctor.doctor_profile.specialty', read_only=True, default=''
    )

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'doctor', 'patient_id', 'doctor_id',
            'doctor_specialty', 'scheduled_at', 'status', 'reason',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']