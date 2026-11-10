import React, { useState } from 'react';
import type { DoctorProfile } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Media } from './ui/Media.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';

interface DoctorSelectorProps {
  doctors: DoctorProfile[];
  onSelect: (doctorId: number) => void;
}

function getDoctorName(doctor: DoctorProfile): string {
  const user = (doctor as any).user;
  if (user && typeof user === 'object') {
    const first = user.first_name || '';
    const last = user.last_name || '';
    const full = `${first} ${last}`.trim();
    return full || user.username || 'Doctor';
  }
  return typeof user === 'string' ? user : 'Doctor';
}

export default function DoctorSelector({ doctors, onSelect }: DoctorSelectorProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (doctor: DoctorProfile) => {
    setSelectedId(doctor.id);
    onSelect(doctor.id);
  };

  if (!doctors || doctors.length === 0) {
    return (
      <EmptyState
        icon="users"
        title="No doctors available"
        text="There are no doctors on staff right now. Please check back soon."
      />
    );
  }

  return (
    <div className="ds-grid ds-grid-sm" role="radiogroup" aria-label="Select a doctor">
      {(Array.isArray(doctors) ? doctors : []).map((doctor) => {
        const isSelected = selectedId === doctor.id;
        const name = getDoctorName(doctor);
        const photo = typeof (doctor as any).photo === 'string' ? (doctor as any).photo : '';

        return (
          <Card
            key={doctor.id}
            onClick={() => handleSelect(doctor)}
            className={isSelected ? 'ds-card-selected' : ''}
          >
            <Media src={photo} alt={`Dr. ${name}`} ratio="square" />
            <CardBody>
              <CardTitle>Dr. {name}</CardTitle>
              <CardMeta>{doctor.specialty}</CardMeta>
              <div className="ds-cluster">
                <Badge tone={isSelected ? 'primary' : 'neutral'}>
                  {doctor.years_experience} {doctor.years_experience === 1 ? 'year' : 'years'} experience
                </Badge>
                {isSelected && <Badge tone="success">Selected</Badge>}
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}