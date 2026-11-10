import React from 'react';
import { Section } from './ui/Section.tsx';
import { Cluster } from './ui/Grid.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface PatientDashboardActionsProps {
  section?: string;
  page?: string;
}

export default function PatientDashboardActions(props: PatientDashboardActionsProps) {
  return (
    <Section title="Quick actions" tight>
      <Cluster gap="sm" justify="start">
        <Button variant="primary" to="/patient/book">
          <Icon name="calendar" size={18} />
          Book appointment
        </Button>
        <Button variant="secondary" to="/patient/appointments">
          <Icon name="list" size={18} />
          My appointments
        </Button>
        <Button variant="secondary" to="/patient/prescriptions">
          <Icon name="book" size={18} />
          Prescriptions
        </Button>
        <Button variant="secondary" to="/patient/bills">
          <Icon name="credit-card" size={18} />
          View bills
        </Button>
        <Button variant="ghost" to="/patient/documents">
          <Icon name="upload" size={18} />
          My documents
        </Button>
      </Cluster>
    </Section>
  );
}