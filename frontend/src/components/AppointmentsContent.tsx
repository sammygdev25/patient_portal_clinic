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
import { Icon } from '../components/icons';

interface AppointmentsContentProps {
  appointments: Appointment[];
  onReschedule: (appointment: Appointment) => void;
  onCancel: (id: number) => void;
  loading?: boolean;
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'confirmed':
      return 'primary';
    case 'checked_in':
      return 'soft';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'neutral';
  }
}

function formatWhen(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AppointmentsContent({ appointments, onReschedule, onCancel, loading }: AppointmentsContentProps) {
  if (loading) {
    return (
      <Section title="Your appointments" tight>
        <div className="ds-empty">Loading your appointments...</div>
      </Section>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Section title="Your appointments" tight>
        <EmptyState
          icon="calendar"
          title="No appointments yet"
          text="You haven't booked a visit with us. Find a doctor and pick a time that works for you."
          action={<Button variant="primary" to="/patient/book">Book an appointment</Button>}
        />
      </Section>
    );
  }

  const canAct = (status: string) => status === 'requested' || status === 'confirmed';

  return (
    <Section title="Your appointments" subtitle="Upcoming and past visits at the clinic" tight>
      <Grid size="md" cols={2}>
        {(Array.isArray(appointments) ? appointments : []).map((appointment) => {
          const id = (appointment as any).id;
          const status = (appointment as any).status as string;
          const scheduledAt = (appointment as any).scheduled_at as string;
          const reason = (appointment as any).reason as string;
          const doctorLabel = (appointment as any).doctor_name
            || (appointment as any).doctor?.username
            || `Doctor #${(appointment as any).doctor}`;

          return (
            <Card key={id} to={`/patient/appointments`}>
              <CardBody>
                <div className="ds-between">
                  <CardTitle>{doctorLabel}</CardTitle>
                  <Badge tone={statusTone(status)}>{status.replace('_', ' ')}</Badge>
                </div>
                <CardMeta>
                  <Icon name="calendar" size={14} /> {formatWhen(scheduledAt)}
                </CardMeta>
                {reason ? <p className="ds-small ds-muted">{reason}</p> : null}
                {canAct(status) ? (
                  <CardFooter>
                    <Button variant="secondary" size="md" onClick={() => onReschedule(appointment)}>
                      <Icon name="clock" size={14} /> Reschedule
                    </Button>
                    <Button variant="danger" size="md" onClick={() => onCancel(id)}>
                      <Icon name="close" size={14} /> Cancel
                    </Button>
                  </CardFooter>
                ) : null}
              </CardBody>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}