import type { Prescription } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Badge } from './ui/Badge.tsx';

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function PrescriptionList({ prescriptions }: PrescriptionListProps) {
  const list = Array.isArray(prescriptions) ? prescriptions : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No prescriptions yet"
        text="Your doctor will add prescriptions here after your appointments."
      />
    );
  }

  return (
    <div className="ds-stack">
      {list.map((prescription) => (
        <Card key={prescription.id}>
          <CardBody>
            <div className="ds-between">
              <CardTitle>{prescription.medication}</CardTitle>
              <Badge tone="primary">{prescription.dosage}</Badge>
            </div>
            <CardMeta>Prescribed on {formatDate(prescription.created_at)}</CardMeta>
            {prescription.instructions && (
              <p className="ds-muted">{prescription.instructions}</p>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}