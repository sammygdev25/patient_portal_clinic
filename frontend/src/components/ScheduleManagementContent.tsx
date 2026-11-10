import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface ScheduleManagementContentProps {
  appointments: Appointment[];
  loading?: boolean;
  onUpdateStatus: (id: number, status: string) => void;
}

const STATUS_TONE: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  requested: 'neutral',
  confirmed: 'primary',
  checked_in: 'soft',
  completed: 'success',
  cancelled: 'danger',
};

function formatWhen(value: string): string {
  const d = new Date(value);
  return d.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ScheduleManagementContent({ appointments, loading, onUpdateStatus }: ScheduleManagementContentProps) {
  if (loading) {
    return <SkeletonCards count={4} />;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No appointments on the books"
        text="Appointments booked by patients will appear here so you can confirm, reschedule or cancel them."
      />
    );
  }

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Scheduled</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(appointments) ? appointments : []).map((appt: any) => (
            <tr key={appt.id}>
              <td>{appt.patient_name || appt.patient?.username || `Patient #${appt.patient}`}</td>
              <td>{appt.doctor_name || appt.doctor?.username || `Dr. #${appt.doctor}`}</td>
              <td>{formatWhen(appt.scheduled_at)}</td>
              <td className="ds-muted ds-small">{appt.reason || 'No reason provided'}</td>
              <td>
                <Badge tone={STATUS_TONE[appt.status] || 'neutral'}>{appt.status.replace('_', ' ')}</Badge>
              </td>
              <td>
                <div className="ds-cluster">
                  {appt.status === 'requested' && (
                    <Button variant="secondary" size="md" onClick={() => onUpdateStatus(appt.id, 'confirmed')}>
                      <Icon name="check" size={16} /> Confirm
                    </Button>
                  )}
                  {(appt.status === 'confirmed' || appt.status === 'requested') && (
                    <Button variant="secondary" size="md" onClick={() => onUpdateStatus(appt.id, 'checked_in')}>
                      <Icon name="user" size={16} /> Check in
                    </Button>
                  )}
                  {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                    <Button variant="danger" size="md" onClick={() => onUpdateStatus(appt.id, 'cancelled')}>
                      <Icon name="close" size={16} /> Cancel
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}