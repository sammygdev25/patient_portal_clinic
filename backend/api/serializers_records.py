from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models import User, VisitNote, Prescription, Bill, Document, Appointment
from api.picture_field import PictureField, StoredFileField


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'role']
        read_only_fields = ['id', 'username', 'first_name', 'last_name', 'role']


class VisitNoteSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.get_full_name', read_only=True)
    patient_name = serializers.CharField(source='patient.get_full_name', read_only=True)

    class Meta:
        model = VisitNote
        fields = [
            'id', 'appointment', 'doctor', 'patient', 'notes',
            'doctor_name', 'patient_name', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'doctor_name', 'patient_name', 'created_at', 'updated_at']


class PrescriptionSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.get_full_name', read_only=True)
    patient_name = serializers.CharField(source='patient.get_full_name', read_only=True)

    class Meta:
        model = Prescription
        fields = [
            'id', 'appointment', 'doctor', 'patient', 'medication', 'dosage',
            'instructions', 'doctor_name', 'patient_name', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'doctor_name', 'patient_name', 'created_at', 'updated_at']


class BillSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.get_full_name', read_only=True)

    class Meta:
        model = Bill
        fields = [
            'id', 'patient', 'appointment', 'amount', 'status',
            'patient_name', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'patient_name', 'created_at', 'updated_at']


class DocumentSerializer(serializers.ModelSerializer):
    file = StoredFileField(required=False)
    patient_name = serializers.CharField(source='patient.get_full_name', read_only=True)

    class Meta:
        model = Document
        fields = [
            'id', 'patient', 'document_type', 'file',
            'patient_name', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'patient_name', 'created_at', 'updated_at']