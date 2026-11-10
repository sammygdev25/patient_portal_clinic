from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from api.models import VisitNote, Prescription, Bill, Document
from api.serializers_records import (
    VisitNoteSerializer,
    PrescriptionSerializer,
    BillSerializer,
    DocumentSerializer,
)


class VisitNoteViewSet(viewsets.ModelViewSet):
    queryset = VisitNote.objects.all().order_by('-created_at')
    serializer_class = VisitNoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['appointment', 'doctor', 'patient']
    search_fields = ['notes', 'patient__username', 'doctor__username']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        qs = VisitNote.objects.all().order_by('-created_at')
        user = self.request.user
        if not user.is_authenticated:
            return qs.none()
        if user.role == 'patient':
            return qs.filter(patient=user)
        if user.role == 'doctor':
            return qs.filter(doctor=user)
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated and user.role == 'doctor':
            serializer.save(doctor=user)
        else:
            serializer.save()


class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all().order_by('-created_at')
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['appointment', 'doctor', 'patient']
    search_fields = ['medication', 'dosage', 'instructions']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        qs = Prescription.objects.all().order_by('-created_at')
        user = self.request.user
        if not user.is_authenticated:
            return qs.none()
        if user.role == 'patient':
            return qs.filter(patient=user)
        if user.role == 'doctor':
            return qs.filter(doctor=user)
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated and user.role == 'doctor':
            serializer.save(doctor=user)
        else:
            serializer.save()


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all().order_by('-created_at')
    serializer_class = BillSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['patient', 'appointment', 'status']
    search_fields = ['patient__username']
    ordering_fields = ['created_at', 'amount', 'updated_at']

    def get_queryset(self):
        qs = Bill.objects.all().order_by('-created_at')
        user = self.request.user
        if not user.is_authenticated:
            return qs.none()
        if user.role == 'patient':
            return qs.filter(patient=user)
        if user.role == 'doctor':
            return qs.filter(appointment__doctor=user)
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated and user.role == 'patient':
            serializer.save(patient=user)
        else:
            serializer.save()


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ['patient', 'document_type']
    search_fields = ['document_type']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        qs = Document.objects.all().order_by('-created_at')
        user = self.request.user
        if not user.is_authenticated:
            return qs.none()
        if user.role == 'patient':
            return qs.filter(patient=user)
        if user.role == 'doctor':
            return qs.filter(patient__patient_appointments__doctor=user).distinct()
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated and user.role == 'patient':
            serializer.save(patient=user)
        else:
            serializer.save()