import React from 'react';
import { Section } from './ui/Section.tsx';
import { Split } from './ui/Grid.tsx';
import { Media } from './ui/Media.tsx';
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Icon } from '../components/icons';

interface PatientRecordMediaPatient {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  insurance_provider?: string;
  date_of_birth?: string;
  photo?: string;
}

interface PatientRecordMediaProps {
  patient: PatientRecordMediaPatient;
  appointmentCount?: number;
  onNewVisitNote?: () => void;
}

export default function PatientRecordMedia({ patient, appointmentCount = 0, onNewVisitNote }: PatientRecordMediaProps) {
  const fullName = `${patient.first_name || ''} ${patient.last_name || ''}`.trim() || patient.username;

  return (
    <Section eyebrow="Patient Record" title={fullName}>
      <Split>
        <Media
          src={patient.photo}
          alt={fullName}
          ratio="square"
          badge={patient.insurance_provider ? 'Insured' : undefined}
        />
        <div className="ds-stack">
          <span className="ds-eyebrow">Clinic Chart</span>
          <h1 className="ds-card-title">{fullName}</h1>
          <CardMeta>
            <Icon name="mail" size={16} /> {patient.email || 'No email on file'}
          </CardMeta>
          <CardMeta>
            <Icon name="phone" size={16} /> {patient.phone || 'No phone on file'}
          </CardMeta>
          <CardMeta>
            <Icon name="calendar" size={16} />
            {patient.date_of_birth ? `DOB ${patient.date_of_birth}` : 'Date of birth not recorded'}
          </CardMeta>
          <div className="ds-cluster">
            <Badge tone={appointmentCount > 0 ? 'primary' : 'neutral'}>
              {appointmentCount} {appointmentCount === 1 ? 'visit' : 'visits'} on record
            </Badge>
            {patient.insurance_provider && (
              <Badge tone="soft">{patient.insurance_provider}</Badge>
            )}
          </div>
          <Button variant="primary" size="lg" onClick={onNewVisitNote}>
            <Icon name="edit" size={16} /> Write Visit Note
          </Button>
        </div>
      </Split>
    </Section>
  );
}