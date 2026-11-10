import React, { useCallback, useEffect, useState } from 'react';
import DoctorScheduleHeader from '../components/DoctorScheduleHeader';
import DoctorScheduleContent from '../components/DoctorScheduleContent';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentList, updateAppointment } from '../api';
import type { Appointment } from '../types';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DoctorSchedulePage() {
  const { user } = useAuth();
  const [date, setDate] = useState<string>(todayStr());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const all = await getAppointmentList();
      const doctorId = user?.id;
      const filtered = (Array.isArray(all) ? all : []).filter((a: Appointment) => {
        const matchesDoctor = doctorId != null && Number(a.doctor) === Number(doctorId);
        const matchesDate = typeof a.scheduled_at === 'string' && a.scheduled_at.startsWith(date);
        return matchesDoctor && matchesDate;
      });
      setAppointments(filtered);
    } catch (err) {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [date, user]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleToday = () => {
    setDate(todayStr());
  };

  const handleComplete = async (id: number) => {
    try {
      await updateAppointment(id, { status: 'completed' });
      fetchAppointments();
    } catch (err) {
      // feedback handled within list component via refetch
    }
  };

  return (
    <div className="ds-stack-lg">
      <DoctorScheduleHeader date={date} onToday={handleToday} />
      <DoctorScheduleContent
        appointments={appointments}
        loading={loading}
        onComplete={handleComplete}
      />
    </div>
  );
}