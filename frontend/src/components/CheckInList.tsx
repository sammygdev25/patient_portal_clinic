import React from 'react';
import type { Appointment } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Icon } from '../components/icons';

interface CheckInListProps {
  appointments: Appointment[];
  onCheckIn: (id: number) => void;
}

function formatTime(scheduledAt: string): string {
  const date = new Date(scheduledAt);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'confirmed':
      return 'primary';
    case 'checked_in':
      return 'success';
    case 'completed':
      return 'soft';
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

export default function CheckInList({ appointments, onCheckIn }: CheckInListProps) {
  const list = Array.isArray(appointments) ? appointments : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No appointments to check in"
        text="Confirmed appointments scheduled for today will appear here as patients arrive."
      />
    );
  }

  return (
    <div className="ds-stack">
      {list.map((appt) => {
        const patientLabel =
          (appt as any).patient_username ||
          (appt as any).patient_name ||
          `Patient #${appt.patient}`;
        const doctorLabel =
          (appt as any).doctor_username ||
          (appt as any).doctor_name ||
          `Dr. #${appt.doctor}`;
        const canCheckIn = appt.status === 'confirmed';

        return (
          <Card key={appt.id}>
            <CardBody>
              <div className="ds-between">
                <div>
                  <CardTitle>{patientLabel}</CardTitle>
                  <CardMeta>
                    <Icon name="clock" size={14} /> {formatTime(appt.scheduled_at)} &middot; {doctorLabel}
                  </CardMeta>
                  {appt.reason && <CardMeta>{appt.reason}</CardMeta>}
                </div>
                <Badge tone={statusTone(appt.status)}>{statusLabel(appt.status)}</Badge>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                variant={canCheckIn ? 'primary' : 'secondary'}
                disabled={!canCheckIn}
                onClick={() => onCheckIn(appt.id)}
              >
                <Icon name="check" size={16} />
                {appt.status === 'checked_in' ? 'Checked In' : 'Check In'}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}