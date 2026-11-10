import React, { useEffect, useState, useCallback } from 'react';
import ReceptionistNavbar from '../components/ReceptionistNavbar';
import PatientCheckInHeader from '../components/PatientCheckInHeader';
import PatientCheckInContent from '../components/PatientCheckInContent';
import { getAppointmentList, updateAppointment } from '../api';
import type { Appointment } from '../types';

export default function PatientCheckInPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAppointmentList();
      const list = Array.isArray(data) ? data : [];
      const todayStr = new Date().toDateString();
      const todays = list.filter((a) => {
        const scheduled = new Date(a.scheduled_at).toDateString();
        return scheduled === todayStr && (a.status === 'confirmed' || a.status === 'checked_in' || a.status === 'requested');
      });
      setAppointments(todays);
    } catch (err) {
      setError('Unable to load today\'s appointments right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleCheckIn = useCallback(async (id: number) => {
    try {
      await updateAppointment(id, { status: 'checked_in' });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'checked_in' } : a))
      );
    } catch (err) {
      setError('Could not check in that patient. Please try again.');
    }
  }, []);

  const checkedInCount = appointments.filter((a) => a.status === 'checked_in').length;
  const totalCount = appointments.length;

  return (
    <>
      <ReceptionistNavbar />
      <div className="ds-stack-lg">
        <PatientCheckInHeader checkedInCount={checkedInCount} totalCount={totalCount} />
        {error && (
          <div className="ds-container">
            <p className="ds-alert">{error}</p>
          </div>
        )}
        <PatientCheckInContent
          appointments={appointments}
          onCheckIn={handleCheckIn}
          loading={loading}
        />
      </div>
    </>
  );
}