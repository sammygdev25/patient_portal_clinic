import React from 'react';
import { Section } from './ui/Section.tsx';
import { Cluster } from './ui/Grid.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface ReceptionistDashboardActionsProps {
  onNewAppointment?: () => void;
}

export default function ReceptionistDashboardActions({ onNewAppointment }: ReceptionistDashboardActionsProps) {
  return (
    <Section title="Quick actions" tight>
      <Cluster gap="sm" justify="start">
        <Button variant="primary" to="/staff/receptionist/checkin">
          <Icon name="check" size={16} />
          Check In Patient
        </Button>
        <Button variant="secondary" to="/staff/receptionist/schedule">
          <Icon name="calendar" size={16} />
          Manage Schedule
        </Button>
        <Button variant="secondary" to="/staff/receptionist/patients">
          <Icon name="users" size={16} />
          Patient Records
        </Button>
        <Button variant="ghost" onClick={onNewAppointment}>
          <Icon name="plus" size={16} />
          New Appointment
        </Button>
      </Cluster>
    </Section>
  );
}