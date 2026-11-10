import React from 'react';
import { PageHeader } from '../components/ui';

interface PatientCheckInHeaderProps {
  checkedInCount?: number;
  totalCount?: number;
}

export default function PatientCheckInHeader({ checkedInCount, totalCount }: PatientCheckInHeaderProps) {
  const subtitle =
    typeof checkedInCount === 'number' && typeof totalCount === 'number'
      ? `${checkedInCount} of ${totalCount} patients checked in today`
      : "Confirm arrivals and move patients into the queue for today's appointments";

  return (
    <PageHeader
      eyebrow="Front Desk"
      title="Patient Check-In"
      subtitle={subtitle}
    />
  );
}