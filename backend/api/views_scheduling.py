from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model

from api.models import DoctorProfile, PatientProfile, Appointment
from api.serializers_scheduling import (
    DoctorProfileSerializer,
    PatientProfileSerializer,
    AppointmentSerializer,
)

User = get_user_model()


class DoctorProfileViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all().order_by('specialty')
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['user', 'specialty']
    search_fields = ['specialty', 'bio', 'user__username', 'user__first_name', 'user__last_name']
    ordering_fields = ['specialty', 'years_experience', 'created_at']

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated and not DoctorProfile.objects.filter(user=user).exists():
            serializer.save(user=user)
        else:
            serializer.save()


class PatientProfileViewSet(viewsets.ModelViewSet):
    queryset = PatientProfile.objects.all().order_by('-created_at')
    serializer_class = PatientProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['user', 'insurance_provider']
    search_fields = ['phone', 'insurance_provider', 'user__username', 'user__first_name', 'user__last_name']
    ordering_fields = ['created_at', 'date_of_birth']

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated and not PatientProfile.objects.filter(user=user).exists():
            serializer.save(user=user)
        else:
            serializer.save()


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all().order_by('-scheduled_at')
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['patient', 'doctor', 'status']
    search_fields = ['reason', 'patient__username', 'doctor__username']
    ordering_fields = ['scheduled_at', 'created_at', 'status']

    def get_queryset(self):
        queryset = Appointment.objects.all().order_by('-scheduled_at')
        user = self.request.user
        if user.is_authenticated:
            role = getattr(user, 'role', None)
            if role == 'patient':
                queryset = queryset.filter(patient=user)
            elif role == 'doctor':
                queryset = queryset.filter(doctor=user)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated and getattr(user, 'role', None) == 'patient':
            serializer.save(patient=user)
        else:
            serializer.save()