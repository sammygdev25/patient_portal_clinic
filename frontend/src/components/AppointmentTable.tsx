import type { Appointment } from '../types';
import { Badge } from './ui/Badge.tsx';
import { Icon } from '../components/icons';
import type { IconName } from '../components/icons';

interface AppointmentTableProps {
  appointments: Appointment[];
  onUpdateStatus: (id: number, status: string) => void;
}

function getPersonLabel(value: any): string {
  if (value == null) return 'Unknown';
  if (typeof value === 'object') {
    return value.username || value.first_name || value.email || `#${value.id}`;
  }
  return `#${value}`;
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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function nextActions(status: string): { label: string; status: string; icon: IconName }[] {
  switch (status) {
    case 'requested':
      return [
        { label: 'Confirm', status: 'confirmed', icon: 'check' },
        { label: 'Cancel', status: 'cancelled', icon: 'close' },
      ];
    case 'confirmed':
      return [
        { label: 'Check In', status: 'checked_in', icon: 'check' },
        { label: 'Cancel', status: 'cancelled', icon: 'close' },
      ];
    case 'checked_in':
      return [{ label: 'Complete', status: 'completed', icon: 'check' }];
    default:
      return [];
  }
}

export default function AppointmentTable({ appointments, onUpdateStatus }: AppointmentTableProps) {
  if (!Array.isArray(appointments) || appointments.length === 0) {
    return (
      <div className="ds-empty">
        <Icon name="calendar" size={28} />
        <h3>No appointments scheduled</h3>
        <p className="ds-muted">Appointments booked by patients will appear here for review.</p>
      </div>
    );
  }

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date &amp; Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt: any) => (
            <tr key={appt.id}>
              <td>{getPersonLabel(appt.patient)}</td>
              <td>{getPersonLabel(appt.doctor)}</td>
              <td>{formatWhen(appt.scheduled_at)}</td>
              <td>{appt.reason ? appt.reason : <span className="ds-muted">No reason given</span>}</td>
              <td>
                <Badge tone={statusTone(appt.status)}>{appt.status.replace('_', ' ')}</Badge>
              </td>
              <td>
                <div className="ds-cluster">
                  {nextActions(appt.status).map((action) => (
                    <button
                      key={action.status}
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => onUpdateStatus(appt.id, action.status)}
                    >
                      <Icon name={action.icon} size={14} />
                      {action.label}
                    </button>
                  ))}
                  {nextActions(appt.status).length === 0 && (
                    <span className="ds-small ds-muted">No actions</span>
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
