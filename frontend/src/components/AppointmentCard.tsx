import type { Appointment } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from './icons';
import { formatDate } from '../utils';

interface AppointmentCardProps {
  appointment: Appointment;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
}

const STATUS_TONE: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  requested: 'soft',
  confirmed: 'primary',
  checked_in: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

const STATUS_LABEL: Record<string, string> = {
  requested: 'Requested',
  confirmed: 'Confirmed',
  checked_in: 'Checked In',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function AppointmentCard({ appointment, onReschedule, onCancel }: AppointmentCardProps) {
  const doctorName = (appointment as any).doctor_name || (appointment as any).doctor_username || 'Doctor';
  const canModify = appointment.status === 'requested' || appointment.status === 'confirmed';
  const tone = STATUS_TONE[appointment.status] || 'neutral';
  const label = STATUS_LABEL[appointment.status] || appointment.status;

  return (
    <Card>
      <CardBody>
        <div className="ds-between">
          <CardTitle>Dr. {doctorName}</CardTitle>
          <Badge tone={tone}>{label}</Badge>
        </div>
        <CardMeta>
          <Icon name="calendar" size={16} /> {formatDate(appointment.scheduled_at)}
          {' '}&middot;{' '}
          <Icon name="clock" size={16} /> {formatTime(appointment.scheduled_at)}
        </CardMeta>
        {appointment.reason && (
          <p className="ds-muted ds-small">{appointment.reason}</p>
        )}
      </CardBody>
      {canModify && (
        <CardFooter>
          <Button
            variant="secondary"
            size="md"
            onClick={() => onReschedule(appointment)}
          >
            <Icon name="calendar" size={16} /> Reschedule
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => onCancel(appointment)}
          >
            <Icon name="close" size={16} /> Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}