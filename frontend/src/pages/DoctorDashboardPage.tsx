import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentList } from '../api';
import type { Appointment } from '../types';
import DoctorDashboardHeader from '../components/DoctorDashboardHeader';
import DoctorDashboardStats from '../components/DoctorDashboardStats';
import DoctorDashboardRecent from '../components/DoctorDashboardRecent';
import DoctorDashboardActions from '../components/DoctorDashboardActions';
import { LoadingBlock } from '../components/ui/Loading.tsx';
import { useNavigate } from 'react-router-dom';

export default function DoctorDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const all = await getAppointmentList();
        const list = Array.isArray(all) ? all : [];
        const mine = user
          ? list.filter((a) => String(a.doctor) === String(user.id))
          : list;
        if (mounted) setAppointments(mine);
      } catch (err) {
        if (mounted) setAppointments([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  if (loading) {
    return <LoadingBlock label="Loading your schedule..." />;
  }

  return (
    <div className="ds-stack-lg">
      <DoctorDashboardHeader
        doctorName={user?.username}
        onViewSchedule={() => navigate('/staff/doctor/schedule')}
      />
      <DoctorDashboardStats appointments={appointments} />
      <DoctorDashboardRecent appointments={appointments} />
      <DoctorDashboardActions />
    </div>
  );
}