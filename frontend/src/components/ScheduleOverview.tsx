import type { Appointment } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Stat } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Icon } from '../components/icons';

interface ScheduleOverviewProps {
  appointments: Appointment[];
}

const STATUS_TONE: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  requested: 'soft',
  confirmed: 'primary',
  checked_in: 'success',
  completed: 'neutral',
  cancelled: 'danger',
};

function formatTime(scheduledAt: string): string {
  const date = new Date(scheduledAt);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ScheduleOverview({ appointments }: ScheduleOverviewProps) {
  const list = Array.isArray(appointments) ? appointments : [];

  const counts = list.reduce(
    (acc, appt) => {
      acc[appt.status] = (acc[appt.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const upcoming = [...list]
    .filter((a) => a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())
    .slice(0, 8);

  if (list.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No appointments scheduled"
        text="Once patients book or doctors confirm visits, the clinic schedule will appear here."
      />
    );
  }

  return (
    <div className="ds-stack">
      <div className="ds-grid ds-grid-sm" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <Stat value={String(counts.requested || 0)} label="Requested" icon="clock" />
        <Stat value={String(counts.confirmed || 0)} label="Confirmed" icon="check" />
        <Stat value={String(counts.checked_in || 0)} label="Checked In" icon="users" />
        <Stat value={String(counts.completed || 0)} label="Completed" icon="shield" />
      </div>

      <Card>
        <CardBody>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardMeta>Next {upcoming.length} scheduled visits across all doctors</CardMeta>
          <div className="ds-stack" style={{ marginTop: 'var(--space-md)' }}>
            {upcoming.length === 0 ? (
              <EmptyState
                icon="calendar"
                title="Nothing upcoming"
                text="There are no active appointments scheduled right now."
              />
            ) : (
              upcoming.map((appt) => {
                const patientLabel =
                  (appt as any).patient_name || (appt as any).patient_username || `Patient #${appt.patient}`;
                const doctorLabel =
                  (appt as any).doctor_name || (appt as any).doctor_username || `Doctor #${appt.doctor}`;
                return (
                  <div key={appt.id} className="ds-between" style={{ padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--color-border)' }}>
                    <div className="ds-cluster" style={{ gap: 'var(--space-sm)' }}>
                      <Icon name="calendar" size={18} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{patientLabel}</div>
                        <div className="ds-small ds-muted">with {doctorLabel}</div>
                      </div>
                    </div>
                    <div className="ds-cluster" style={{ gap: 'var(--space-sm)' }}>
                      <span className="ds-small ds-muted">{formatTime(appt.scheduled_at)}</span>
                      <Badge tone={STATUS_TONE[appt.status] || 'neutral'}>{appt.status.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}