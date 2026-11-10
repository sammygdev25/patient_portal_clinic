import { Section } from './ui/Section.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface DoctorDashboardRecentProps {
  appointments: Appointment[];
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    case 'checked_in':
      return 'primary';
    case 'confirmed':
      return 'soft';
    default:
      return 'neutral';
  }
}

export default function DoctorDashboardRecent({ appointments }: DoctorDashboardRecentProps) {
  const recent = (Array.isArray(appointments) ? appointments : [])
    .slice()
    .sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime())
    .slice(0, 6);

  return (
    <Section eyebrow="Recent activity" title="Recent patient visits">
      {recent.length === 0 ? (
        <EmptyState
          icon="clock"
          title="No recent visits yet"
          text="Completed and recent appointments with your patients will appear here."
        />
      ) : (
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Scheduled</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((appt) => (
                <tr key={appt.id}>
                  <td>{`Patient #${appt.patient}`}</td>
                  <td>{new Date(appt.scheduled_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</td>
                  <td>{appt.reason || 'General consultation'}</td>
                  <td>
                    <Badge tone={statusTone(appt.status)}>{appt.status.replace('_', ' ')}</Badge>
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
