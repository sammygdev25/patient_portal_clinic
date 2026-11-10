from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.models import Service, ClinicHour
from api.serializers_public_site import ServiceSerializer, ClinicHourSerializer
from api.permissions import IsStaffOrReadOnly  # Shikshya's permissions


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('name')
    serializer_class = ServiceSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = []
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'duration_minutes', 'created_at']


class ClinicHourViewSet(viewsets.ModelViewSet):
    queryset = ClinicHour.objects.all().order_by('id')
    serializer_class = ClinicHourSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ['day_of_week']
    search_fields = ['day_of_week']
    ordering_fields = ['id', 'day_of_week', 'open_time', 'close_time']