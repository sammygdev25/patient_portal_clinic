import React from 'react';
import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';

interface AppointmentsHeaderProps {
  section?: string;
  page?: string;
}

export default function AppointmentsHeader(props: AppointmentsHeaderProps) {
  const { user } = useAuth();
  const displayName = user?.username || user?.email || 'Patient';

  return (
    <PageHeader
      eyebrow="Your care schedule"
      title="Appointments"
      subtitle={`Signed in as ${displayName} — review upcoming visits, reschedule or cancel as needed.`}
      actions={
        <span className="ds-badge ds-cluster" style={{ gap: 'var(--space-xs)' }}>
          <Icon name="calendar" size={18} />
          {displayName}
        </span>
      }
    />
  );
}