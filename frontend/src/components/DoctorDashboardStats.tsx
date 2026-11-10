import { Grid } from './ui/Grid.tsx';
import { Stat } from './ui/Badge.tsx';
import type { Appointment } from '../types';

interface DoctorDashboardStatsProps {
  appointments: Appointment[];
}

export default function DoctorDashboardStats({ appointments }: DoctorDashboardStatsProps) {
  const list = Array.isArray(appointments) ? appointments : [];

  const todayStr = new Date().toDateString();
  const todayCount = list.filter(
    (a) => new Date(a.scheduled_at).toDateString() === todayStr
  ).length;

  const confirmedCount = list.filter((a) => a.status === 'confirmed').length;
  const completedCount = list.filter((a) => a.status === 'completed').length;

  const uniquePatients = new Set(
    list.map((a) => (typeof a.patient === 'object' ? (a.patient as { id: number }).id : a.patient))
  ).size;

  return (
    <Grid size="sm">
      <Stat
        value={String(todayCount)}
        label="Appointments Today"
        icon="calendar"
      />
      <Stat
        value={String(confirmedCount)}
        label="Confirmed Visits"
        icon="check"
      />
      <Stat
        value={String(completedCount)}
        label="Completed Consultations"
        icon="award"
      />
      <Stat
        value={String(uniquePatients)}
        label="Patients Under Care"
        icon="users"
      />
    </Grid>
  );
}
