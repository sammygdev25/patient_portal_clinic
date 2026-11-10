import React from 'react';
import { PageHeader } from '../components/ui';

interface PatientProfileHeaderProps {
  userName?: string;
}

export default function PatientProfileHeader({ userName }: PatientProfileHeaderProps) {
  return (
    <PageHeader
      eyebrow="Patient Portal"
      title="Your Profile"
      subtitle={
        userName
          ? `Manage the personal and insurance details we use to keep your care on track, ${userName}.`
          : 'Manage the personal and insurance details we use to keep your care on track.'
      }
    />
  );
}