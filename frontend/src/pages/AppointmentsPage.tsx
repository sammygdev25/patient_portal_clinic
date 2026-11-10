import { useState, useEffect, useCallback } from 'react';
import PatientNavbar from '../components/PatientNavbar';
import AppointmentsHeader from '../components/AppointmentsHeader';
import AppointmentsContent from '../components/AppointmentsContent';
import AppointmentsDetails from '../components/AppointmentsDetails';
import RescheduleModal from '../components/RescheduleModal';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentList, updateAppointment, getPatientProfileList } from '../api';
import type { Appointment, PatientProfile } from '../types';

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rescheduling, setRescheduling] = useState<Appointment | null>(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAppointmentList();
      const list = Array.isArray(data) ? data : [];
      const mine = user
        ? list.filter((a: Appointment) => String(a.patient) === String(user.id))
        : list;
      setAppointments(mine);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const loadProfile = useCallback(async () => {
    try {
      const data = await getPatientProfileList();
      const list = Array.isArray(data) ? data : [];
      const mine = user ? list.find((p: PatientProfile) => String(p.user) === String(user.id)) : null;
      setProfile(mine || null);
    } catch {
      setProfile(null);
    }
  }, [user]);

  useEffect(() => {
    loadAppointments();
    loadProfile();
  }, [loadAppointments, loadProfile]);

  const handleCancel = async (id: number) => {
    try {
      await updateAppointment(id, { status: 'cancelled' });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
      );
    } catch {
      // no-op, surfaced via content list state
    }
  };

  const handleRescheduleConfirm = async (appointment: Appointment) => {
    try {
      const updated = await updateAppointment(appointment.id, {
        scheduled_at: appointment.scheduled_at,
      });
      setAppointments((prev) =>
        prev.map((a) => (a.id === appointment.id ? { ...a, ...updated } : a))
      );
    } finally {
      setRescheduling(null);
    }
  };

  const now = new Date();
  const upcomingCount = appointments.filter(
    (a) => new Date(a.scheduled_at) >= now && a.status !== 'cancelled'
  ).length;

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.username || user?.email || '';

  return (
    <>
      <PatientNavbar />
      <div className="ds-stack-lg">
        <AppointmentsHeader section="Page header" page="AppointmentsPage" />
        <AppointmentsContent
          appointments={appointments}
          onReschedule={(appointment) => setRescheduling(appointment)}
          onCancel={handleCancel}
          loading={loading}
        />
        <AppointmentsDetails
          patientName={displayName}
          email={user?.email || ''}
          phone={profile?.phone || ''}
          insuranceProvider={profile?.insurance_provider || ''}
          totalAppointments={appointments.length}
          upcomingCount={upcomingCount}
        />
      </div>
      {rescheduling && (
        <RescheduleModal
          appointment={rescheduling}
          onConfirm={handleRescheduleConfirm}
          onClose={() => setRescheduling(null)}
        />
      )}
    </>
  );
}