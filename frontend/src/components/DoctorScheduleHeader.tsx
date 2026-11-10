import React from 'react';
import { PageHeader } from '../components/ui';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface DoctorScheduleHeaderProps {
  date?: string;
  onToday?: () => void;
}

export default function DoctorScheduleHeader({ date, onToday }: DoctorScheduleHeaderProps) {
  return (
    <PageHeader
      eyebrow="Doctor Schedule"
      title="Your Appointment Schedule"
      subtitle={
        date
          ? `Reviewing appointments for ${date}. Keep track of confirmations, check-ins and completed visits.`
          : 'Review your upcoming appointments, confirm visits and mark consultations as complete.'
      }
      actions={
        onToday ? (
          <Button variant="secondary" onClick={onToday}>
            <Icon name="calendar" size={16} />
            Jump to Today
          </Button>
        ) : undefined
      }
    />
  );
}