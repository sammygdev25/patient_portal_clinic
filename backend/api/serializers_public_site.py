from rest_framework import serializers
from api.models import Service, ClinicHour, DoctorProfile
from api.picture_field import PictureField, StoredFileField


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'duration_minutes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ClinicHourSerializer(serializers.ModelSerializer):
    day_of_week_display = serializers.CharField(source='get_day_of_week_display', read_only=True)

    class Meta:
        model = ClinicHour
        fields = [
            'id', 'day_of_week', 'day_of_week_display', 'open_time', 'close_time',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class DoctorProfileSerializer(serializers.ModelSerializer):
    photo = PictureField(required=False)
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            'id', 'user', 'username', 'first_name', 'last_name', 'specialty', 'bio',
            'photo', 'years_experience', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'username', 'first_name', 'last_name', 'created_at', 'updated_at']