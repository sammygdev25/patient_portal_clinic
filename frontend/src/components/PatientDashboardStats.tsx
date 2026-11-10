import { Grid } from './ui/Grid.tsx';
import { Stat } from './ui/Badge.tsx';
import type { Appointment, Prescription, Bill, Document as ClinicDocument } from '../types';

interface PatientDashboardStatsProps {
  appointments: Appointment[];
  prescriptions: Prescription[];
  bills: Bill[];
  documents: ClinicDocument[];
}

export default function PatientDashboardStats({
  appointments,
  prescriptions,
  bills,
  documents,
}: PatientDashboardStatsProps) {
  const upcomingCount = (Array.isArray(appointments) ? appointments : []).filter(
    (a) => a.status === 'requested' || a.status === 'confirmed'
  ).length;

  const activePrescriptionsCount = prescriptions.length;

  const unpaidBillsCount = (Array.isArray(bills) ? bills : []).filter((b) => b.status !== 'paid').length;

  const documentsCount = documents.length;

  return (
    <Grid size="sm">
      <Stat
        value={upcomingCount}
        label="Upcoming visits"
        icon="calendar"
      />
      <Stat
        value={activePrescriptionsCount}
        label="Active prescriptions"
        icon="package"
      />
      <Stat
        value={unpaidBillsCount}
        label="Unpaid bills"
        icon="credit-card"
      />
      <Stat
        value={documentsCount}
        label="Saved documents"
        icon="book"
      />
    </Grid>
  );
}
