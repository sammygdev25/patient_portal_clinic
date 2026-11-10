import React from 'react';
import { Section } from './ui/Section.tsx';
import { Cluster } from './ui/Grid.tsx';
import { Button } from './ui/Button.tsx';

interface DoctorDashboardActionsProps {
  section?: string;
  page?: string;
}

export default function DoctorDashboardActions(props: DoctorDashboardActionsProps) {
  return (
    <Section tight title="Quick actions">
      <Cluster gap="sm">
        <Button variant="primary" to="/staff/doctor/schedule">
          View Schedule
        </Button>
        <Button variant="secondary" to="/staff/doctor/profile">
          Edit Profile
        </Button>
        <Button
          variant="secondary"
          to="/staff/doctor/appointments/1/note"
        >
          Write Visit Note
        </Button>
        <Button variant="ghost" to="/staff/doctor/schedule">
          Today's Patients
        </Button>
      </Cluster>
    </Section>
  );
}