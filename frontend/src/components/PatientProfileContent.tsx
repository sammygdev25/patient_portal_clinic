import { Link } from 'react-router-dom';
import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface PatientProfileContentProps {
  appointments: Appointment[];
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

function formatStatus(status: string): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formatDateTime(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function PatientProfileContent({ appointments }: PatientProfileContentProps) {
  const records = Array.isArray(appointments) ? appointments : [];

  if (records.length === 0) {
    return (
      <Section eyebrow="Your records" title="Appointment history">
        <EmptyState
          icon="calendar"
          title="No appointments yet"
          text="Once you book a visit with one of our doctors, it will show up here along with its status."
          action={
            <Button variant="primary" to="/patient/book">
              Book an appointment
            </Button>
          }
        />
      </Section>
    );
  }

  return (
    <Section
      eyebrow="Your records"
      title="Appointment history"
      subtitle="A record of every visit you've booked with the clinic, past and upcoming."
    >
      <Grid size="md" cols={3}>
        {records.map((appt) => (
          <Card key={appt.id}>
            <CardBody>
              <CardTitle>
                {appt.doctor ? `Dr. #${appt.doctor}` : `Appointment #${appt.id}`}
              </CardTitle>
              <CardMeta>
                <Icon name="calendar" size={16} /> {formatDateTime(appt.scheduled_at)}
              </CardMeta>
              {appt.reason ? (
                <CardMeta>
                  <Icon name="info" size={16} /> {appt.reason}
                </CardMeta>
              ) : null}
              <Badge tone={statusTone(appt.status)}>{formatStatus(appt.status)}</Badge>
            </CardBody>
            <CardFooter>
              <Link to="/patient/appointments" className="ds-btn-ghost">
                View details <Icon name="arrow-right" size={16} />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
