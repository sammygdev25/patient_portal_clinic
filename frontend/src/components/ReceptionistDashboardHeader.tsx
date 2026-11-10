import React from 'react';
import { PageHeader } from '../components/ui';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface ReceptionistDashboardHeaderProps {
  userName: string;
  onPrimaryAction?: () => void;
}

export default function ReceptionistDashboardHeader({ userName, onPrimaryAction }: ReceptionistDashboardHeaderProps) {
  return (
    <PageHeader
      eyebrow="Front Desk"
      title="Receptionist Dashboard"
      subtitle={`Welcome back, ${userName || 'there'} — here's today's clinic activity at a glance.`}
      actions={
        <Button variant="primary" onClick={onPrimaryAction}>
          <Icon name="calendar" size={18} />
          Manage Schedule
        </Button>
      }
    />
  );
}