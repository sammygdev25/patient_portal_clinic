import React from 'react';
import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { Icon } from '../components/icons';

interface VisitNoteFormInfoProps {
  section?: string;
  page?: string;
}

export default function VisitNoteFormInfo(props: VisitNoteFormInfoProps) {
  return (
    <Section tight title="Good to know">
      <Grid size="sm">
        <Card>
          <CardBody>
            <CardTitle>
              <Icon name="clock" size={18} /> Save promptly
            </CardTitle>
            <p className="ds-muted ds-small">
              Visit notes should be completed right after the appointment
              while the details are fresh. Once saved, the note becomes part
              of the patient's permanent record and is visible to them in
              their portal.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>
              <Icon name="package" size={18} /> Add a prescription
            </CardTitle>
            <p className="ds-muted ds-small">
              If medication was prescribed during this visit, use the
              prescription form below to record the medication, dosage and
              instructions so the patient can see it under Prescriptions.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>
              <Icon name="check" size={18} /> What happens next
            </CardTitle>
            <p className="ds-muted ds-small">
              Saving this note marks the appointment as completed. The
              patient will be able to review the note and any prescriptions
              from their dashboard, and billing can proceed for this visit.
            </p>
          </CardBody>
        </Card>
      </Grid>
    </Section>
  );
}