import type { Appointment } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Stack } from './ui/Grid.tsx';

interface TodayScheduleListProps {
  appointments: Appointment[];
}

const statusTone: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  requested: 'neutral',
  confirmed: 'primary',
  checked_in: 'soft',
  completed: 'success',
  cancelled: 'danger',
};

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function TodayScheduleList({ appointments }: TodayScheduleListProps) {
  const list = Array.isArray(appointments) ? appointments : [];
  const todays = list
    .filter((a) => isToday(a.scheduled_at))
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());

  if (todays.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No appointments today"
        text="Your schedule is clear for today. Check back later or review upcoming appointments."
      />
    );
  }

  return (
    <Stack gap="sm">
      {todays.map((appt) => (
        <Card key={appt.id}>
          <CardBody>
            <Stack gap="xs" justify="between" align="center">
              <div>
                <CardTitle>{formatTime(appt.scheduled_at)}</CardTitle>
                <CardMeta>
                  {appt.reason ? appt.reason : 'General consultation'}
                </CardMeta>
              </div>
              <Badge tone={statusTone[appt.status] || 'neutral'}>
                {appt.status.replace('_', ' ')}
              </Badge>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
}