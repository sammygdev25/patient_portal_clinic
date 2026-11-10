import React from 'react';
import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface PatientManagementHeaderProps {
  patientCount?: number;
}

export default function PatientManagementHeader({ patientCount }: PatientManagementHeaderProps) {
  return (
    <PageHeader
      eyebrow="Front Desk"
      title="Patient Management"
      subtitle={
        typeof patientCount === 'number'
          ? `${patientCount} registered patients — review profiles, update contact details and insurance information.`
          : 'Review patient profiles, update contact details and insurance information for the clinic roster.'
      }
      actions={
        <span className="ds-cluster">
          <Icon name="users" size={18} />
        </span>
      }
    />
  );
}