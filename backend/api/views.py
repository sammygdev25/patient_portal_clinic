"""Views aggregator — explicit imports from domain view files."""
from .views_auth import CustomAuthToken, LogoutAllView, LogoutView, ProfileView, RegisterView  # noqa: F401
from .views_public_site import ClinicHourViewSet, ServiceViewSet  # noqa: F401
from .views_records import BillViewSet, DocumentViewSet, PrescriptionViewSet, VisitNoteViewSet  # noqa: F401
from .views_scheduling import AppointmentViewSet, DoctorProfileViewSet, PatientProfileViewSet  # noqa: F401
