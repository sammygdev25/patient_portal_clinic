import React from 'react';
import { PageHeader } from '../components/ui';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface ScheduleManagementHeaderProps {
  onAddAppointment?: () => void;
}

export default function ScheduleManagementHeader({ onAddAppointment }: ScheduleManagementHeaderProps) {
  return (
    <PageHeader
      eyebrow="Receptionist Tools"
      title="Schedule Management"
      subtitle="Review, filter and adjust appointments across all doctors to keep the clinic running smoothly."
      actions={
        onAddAppointment ? (
          <Button variant="primary" onClick={onAddAppointment}>
            <Icon name="plus" size={16} />
            New Appointment
          </Button>
        ) : undefined
      }
    />
  );
}