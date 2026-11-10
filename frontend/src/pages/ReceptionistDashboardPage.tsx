import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ReceptionistNavbar from '../components/ReceptionistNavbar';
import ReceptionistDashboardHeader from '../components/ReceptionistDashboardHeader';
import ReceptionistDashboardStats from '../components/ReceptionistDashboardStats';
import ReceptionistDashboardRecent from '../components/ReceptionistDashboardRecent';
import ReceptionistDashboardActions from '../components/ReceptionistDashboardActions';
import { LoadingBlock } from '../components/ui/Loading.tsx';
import { getAppointmentList } from '../api';
import type { Appointment } from '../types';

export default function ReceptionistDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getAppointmentList();
        if (mounted) setAppointments(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setAppointments([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handlePrimaryAction = () => {
    navigate('/staff/receptionist/checkin');
  };

  const handleNewAppointment = () => {
    navigate('/staff/receptionist/schedule');
  };

  const firstName = typeof user?.first_name === 'string' ? user.first_name : undefined;
  const userName = user?.username || firstName || 'Receptionist';

  if (loading) {
    return (
      <>
        <ReceptionistNavbar />
        <LoadingBlock label="Loading dashboard..." />
      </>
    );
  }

  return (
    <>
      <ReceptionistNavbar />
      <div className="ds-stack-lg">
        <ReceptionistDashboardHeader userName={userName} onPrimaryAction={handlePrimaryAction} />
        <ReceptionistDashboardStats appointments={appointments} />
        <ReceptionistDashboardRecent appointments={appointments} />
        <ReceptionistDashboardActions onNewAppointment={handleNewAppointment} />
      </div>
    </>
  );
}
