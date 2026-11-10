import type { Appointment } from '../types';
import { Grid } from './ui/Grid.tsx';
import { Stat } from './ui/Badge.tsx';

interface ReceptionistDashboardStatsProps {
  appointments: Appointment[];
}

export default function ReceptionistDashboardStats({ appointments }: ReceptionistDashboardStatsProps) {
  const list = Array.isArray(appointments) ? appointments : [];

  const isToday = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const todayCount = list.filter((a) => isToday(a.scheduled_at)).length;
  const checkedInCount = list.filter((a) => a.status === 'checked_in').length;
  const requestedCount = list.filter((a) => a.status === 'requested').length;
  const confirmedCount = list.filter((a) => a.status === 'confirmed').length;

  return (
    <Grid size="sm">
      <Stat
        value={String(todayCount)}
        label="Appointments today"
        icon="calendar"
      />
      <Stat
        value={String(checkedInCount)}
        label="Checked in"
        icon="check"
      />
      <Stat
        value={String(requestedCount)}
        label="Pending requests"
        icon="clock"
      />
      <Stat
        value={String(confirmedCount)}
        label="Confirmed visits"
        icon="users"
      />
    </Grid>
  );
}
