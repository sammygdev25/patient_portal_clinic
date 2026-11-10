import { Link } from 'react-router-dom';
import { Section } from './ui/Section.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Badge } from './ui/Badge.tsx';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface PatientDashboardRecentProps {
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

function formatWhen(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function PatientDashboardRecent({ appointments }: PatientDashboardRecentProps) {
  const recent = [...(appointments || [])]
    .sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime())
    .slice(0, 6);

  return (
    <Section eyebrow="Recent activity" title="Your latest appointments">
      {recent.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No appointments yet"
          text="Once you book a visit with one of our doctors, it will show up here."
          action={
            <Link to="/patient/book" className="btn btn-primary">
              Book an appointment
            </Link>
          }
        />
      ) : (
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date &amp; time</th>
                <th>Reason</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(recent) ? recent : []).map((appt) => (
                <tr key={appt.id}>
                  <td>Dr. {appt.doctor}</td>
                  <td>{formatWhen(appt.scheduled_at)}</td>
                  <td>{appt.reason ? appt.reason : <span className="ds-muted">No reason given</span>}</td>
                  <td>
                    <Badge tone={statusTone(appt.status)}>{appt.status.replace('_', ' ')}</Badge>
                  </td>
                  <td>
                    <Link to="/patient/appointments" className="ds-btn-ghost">
                      <Icon name="arrow-right" size={16} title="View appointment" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
