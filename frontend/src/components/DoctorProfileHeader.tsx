import React from 'react';
import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';
import type { AuthUser } from '../contexts/AuthContext.tsx';

interface DoctorProfileHeaderProps {
  user: AuthUser | null;
}

export default function DoctorProfileHeader({ user }: DoctorProfileHeaderProps) {
  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.username || user?.email || 'Doctor';

  return (
    <PageHeader
      eyebrow="Doctor Profile"
      title="Your clinical profile"
      subtitle={`Signed in as ${displayName} · Manage the specialty, bio and photo patients see when booking with you.`}
      actions={
        <span className="ds-cluster">
          <Icon name="user" size={20} title="Doctor profile" />
        </span>
      }
    />
  );
}