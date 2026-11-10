import React from 'react';
import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Icon } from '../components/icons';
import type { Prescription } from '../types';

interface PrescriptionsContentProps {
  prescriptions: Prescription[];
  loading: boolean;
}

export default function PrescriptionsContent({ prescriptions, loading }: PrescriptionsContentProps) {
  if (loading) {
    return (
      <Section title="Your prescriptions">
        <SkeletonCards count={4} />
      </Section>
    );
  }

  if (!prescriptions || prescriptions.length === 0) {
    return (
      <Section title="Your prescriptions">
        <EmptyState
          icon="package"
          title="No prescriptions yet"
          text="Medications prescribed by your doctor during a visit will show up here."
        />
      </Section>
    );
  }

  return (
    <Section title="Your prescriptions" subtitle="Dosage and instructions from your care team">
      <Grid size="md" cols={3}>
        {(Array.isArray(prescriptions) ? prescriptions : []).map((prescription) => (
          <Card key={prescription.id}>
            <CardBody>
              <div className="ds-between">
                <CardTitle>{prescription.medication}</CardTitle>
                <Badge tone="primary">{prescription.dosage}</Badge>
              </div>
              <CardMeta>
                <Icon name="calendar" size={14} />
                {' '}
                {new Date(prescription.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </CardMeta>
              {prescription.instructions ? (
                <p className="ds-muted ds-small">{prescription.instructions}</p>
              ) : (
                <p className="ds-muted ds-small">No additional instructions provided.</p>
              )}
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}