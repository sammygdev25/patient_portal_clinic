import type { Appointment } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Icon } from './icons';

interface UpcomingAppointmentsListProps {
  appointments: Appointment[];
}

function formatScheduledAt(value: string): string {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
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

function statusLabel(status: string): string {
  switch (status) {
    case 'requested':
      return 'Requested';
    case 'confirmed':
      return 'Confirmed';
    case 'checked_in':
      return 'Checked In';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
}

export default function UpcomingAppointmentsList({ appointments }: UpcomingAppointmentsListProps) {
  const list = Array.isArray(appointments) ? appointments : [];
  const upcoming = list
    .filter((a) => a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());

  if (upcoming.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No upcoming appointments"
        text="Book a visit with one of our doctors to see it here."
      />
    );
  }

  return (
    <div className="ds-stack">
      {upcoming.map((appointment) => (
        <Card key={appointment.id}>
          <CardBody>
            <div className="ds-between">
              <div className="ds-cluster" style={{ gap: 'var(--space-sm)' }}>
                <Icon name="calendar" size={18} />
                <strong>{formatScheduledAt(appointment.scheduled_at)}</strong>
              </div>
              <Badge tone={statusTone(appointment.status)}>{statusLabel(appointment.status)}</Badge>
            </div>
            {appointment.reason && (
              <CardMeta>{appointment.reason}</CardMeta>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}