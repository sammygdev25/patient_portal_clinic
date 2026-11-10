import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from './icons';
import type { Appointment } from '../types';

interface DoctorAppointmentListProps {
  appointments: Appointment[];
  onComplete: (id: number) => void;
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

function formatStatusLabel(status: string): string {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function DoctorAppointmentList({ appointments, onComplete }: DoctorAppointmentListProps) {
  const list = Array.isArray(appointments) ? appointments : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No appointments on your schedule"
        text="Appointments booked by patients will appear here once they are confirmed."
      />
    );
  }

  return (
    <div className="ds-stack">
      {list.map((appointment) => {
        const canComplete = appointment.status === 'checked_in' || appointment.status === 'confirmed';
        return (
          <Card key={appointment.id}>
            <CardBody>
              <div className="ds-between">
                <CardTitle>
                  {`Patient #${appointment.patient}`}
                </CardTitle>
                <Badge tone={statusTone(appointment.status)}>{formatStatusLabel(appointment.status)}</Badge>
              </div>
              <CardMeta>
                <Icon name="clock" size={16} /> {formatDateTime(appointment.scheduled_at)}
              </CardMeta>
              {appointment.reason && (
                <CardMeta>
                  <Icon name="info" size={16} /> {appointment.reason}
                </CardMeta>
              )}
              <CardFooter>
                <Button
                  variant="primary"
                  disabled={!canComplete}
                  onClick={() => onComplete(appointment.id)}
                >
                  <Icon name="check" size={16} /> Mark Completed
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
