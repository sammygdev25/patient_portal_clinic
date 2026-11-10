import React from 'react';
import type { User } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Grid } from './ui/Grid.tsx';
import { Icon } from './icons';

interface PatientListProps {
  patients: User[];
  onSelect: (patient: User) => void;
}

export default function PatientList({ patients, onSelect }: PatientListProps) {
  const list = Array.isArray(patients) ? patients : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="users"
        title="No patients found"
        text="Patients who have booked an appointment at the clinic will appear here."
      />
    );
  }

  return (
    <Grid size="sm" cols={3}>
      {list.map((patient) => {
        const fullName = `Patient #${patient.id}`;

        return (
          <Card key={patient.id} onClick={() => onSelect(patient)}>
            <CardBody>
              <CardTitle>{fullName}</CardTitle>
              <CardMeta>
                <Icon name="user" size={14} /> {patient.role}
              </CardMeta>
              <Badge tone="soft">Patient</Badge>
            </CardBody>
          </Card>
        );
      })}
    </Grid>
  );
}
