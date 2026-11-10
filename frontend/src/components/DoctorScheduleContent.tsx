import React from 'react';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Stack } from './ui/Grid.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface DoctorScheduleContentProps {
  appointments: Appointment[];
  loading?: boolean;
  onComplete?: (id: number) => void;
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

function formatSlot(value: string): string {
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function DoctorScheduleContent({ appointments, loading, onComplete }: DoctorScheduleContentProps) {
  if (loading) {
    return <SkeletonCards count={4} />;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No appointments on your schedule"
        text="Once patients book time with you, their visits will appear here so you can prepare and check their reason for visit."
      />
    );
  }

  return (
    <Stack gap="md">
      {(Array.isArray(appointments) ? appointments : []).map((appt) => (
        <Card key={appt.id}>
          <CardBody>
            <div className="ds-between">
              <CardTitle>Patient #{appt.patient}</CardTitle>
              <Badge tone={statusTone(appt.status)}>{appt.status.replace('_', ' ')}</Badge>
            </div>
            <CardMeta>
              <Icon name="clock" size={14} /> {formatSlot(appt.scheduled_at)}
            </CardMeta>
            {appt.reason ? (
              <p className="ds-muted ds-small">{appt.reason}</p>
            ) : (
              <p className="ds-muted ds-small">No reason provided for this visit.</p>
            )}
            <CardFooter>
              {appt.status !== 'completed' && appt.status !== 'cancelled' && onComplete && (
                <Button variant="primary" size="md" onClick={() => onComplete(appt.id)}>
                  <Icon name="check" size={16} /> Mark Completed
                </Button>
              )}
            </CardFooter>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
}