import type { Appointment } from '../types';
import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { Icon } from '../components/icons';

interface PatientCheckInContentProps {
  appointments: Appointment[];
  onCheckIn: (id: number) => void;
  loading?: boolean;
}

function patientName(appointment: Appointment): string {
  const patient: any = (appointment as any).patient;
  if (patient && typeof patient === 'object') {
    return patient.username || patient.email || `Patient #${patient.id}`;
  }
  return `Patient #${patient}`;
}

function doctorName(appointment: Appointment): string {
  const doctor: any = (appointment as any).doctor;
  if (doctor && typeof doctor === 'object') {
    return doctor.username || doctor.email || `Dr. #${doctor.id}`;
  }
  return `Dr. #${doctor}`;
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'confirmed':
      return 'primary';
    case 'checked_in':
      return 'success';
    case 'completed':
      return 'soft';
    case 'cancelled':
      return 'danger';
    default:
      return 'neutral';
  }
}

export default function PatientCheckInContent({ appointments, onCheckIn, loading }: PatientCheckInContentProps) {
  if (loading) {
    return (
      <Section title="Today's arrivals" subtitle="Patients expected at the clinic today">
        <SkeletonCards count={4} />
      </Section>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Section title="Today's arrivals" subtitle="Patients expected at the clinic today">
        <EmptyState
          icon="users"
          title="No appointments to check in"
          text="Once patients are booked for today, they will appear here ready for front-desk check-in."
        />
      </Section>
    );
  }

  return (
    <Section title="Today's arrivals" subtitle="Confirm patients as they arrive for their visit">
      <Grid size="md" cols={3}>
        {(Array.isArray(appointments) ? appointments : []).map((appointment) => {
          const scheduled = new Date(appointment.scheduled_at);
          const canCheckIn = appointment.status === 'requested' || appointment.status === 'confirmed';
          return (
            <Card key={appointment.id}>
              <CardBody>
                <CardTitle>{patientName(appointment)}</CardTitle>
                <CardMeta>
                  <Icon name="calendar" size={16} /> {scheduled.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' · '}
                  <Icon name="clock" size={16} /> {scheduled.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </CardMeta>
                <CardMeta>
                  <Icon name="user" size={16} /> {doctorName(appointment)}
                </CardMeta>
                {appointment.reason ? (
                  <CardMeta>
                    <Icon name="info" size={16} /> {appointment.reason}
                  </CardMeta>
                ) : null}
                <div className="ds-cluster">
                  <Badge tone={statusTone(appointment.status)}>{appointment.status.replace('_', ' ')}</Badge>
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  variant="primary"
                  disabled={!canCheckIn}
                  onClick={() => onCheckIn(appointment.id)}
                >
                  <Icon name="check" size={16} />
                  {appointment.status === 'checked_in' ? 'Checked In' : 'Check In'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}