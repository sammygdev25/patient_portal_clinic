import type { User } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Section } from './ui/Section.tsx';
import { Icon } from '../components/icons';

interface PatientManagementContentProps {
  patients: User[];
  loading: boolean;
  selectedPatientId: number | null;
  onSelect: (patientId: number) => void;
}

export default function PatientManagementContent({
  patients,
  loading,
  selectedPatientId,
  onSelect,
}: PatientManagementContentProps) {
  if (loading) {
    return (
      <Section title="Patient records" tight>
        <SkeletonCards count={6} />
      </Section>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <Section title="Patient records" tight>
        <EmptyState
          icon="users"
          title="No patients on file yet"
          text="Patients will appear here once they register and book their first appointment with the clinic."
        />
      </Section>
    );
  }

  return (
    <Section title="Patient records" subtitle="Select a patient to view or update their profile" tight>
      <div className="ds-grid ds-grid-sm">
        {(Array.isArray(patients) ? patients : []).map((patient) => {
          const isSelected = selectedPatientId === patient.id;
          return (
            <Card
              key={patient.id}
              onClick={() => onSelect(patient.id)}
              className={isSelected ? 'ds-card-selected' : undefined}
            >
              <CardBody>
                <div className="ds-cluster">
                  <Icon name="user" size={18} />
                  <CardTitle>Patient #{patient.id}</CardTitle>
                  {isSelected && <Badge tone="primary">Selected</Badge>}
                </div>
                <CardMeta>
                  <Icon name="mail" size={14} /> {patient.role === 'patient' ? 'Patient' : patient.role}
                </CardMeta>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
