import React from 'react';
import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Icon } from '../components/icons';

interface AppointmentBookingInfoProps {
  section?: string;
  page?: string;
}

export default function AppointmentBookingInfo(props: AppointmentBookingInfoProps) {
  return (
    <Section tight title="Good to know" eyebrow="Before you book">
      <Grid size="sm" cols={3}>
        <Card>
          <CardBody>
            <Icon name="clock" size={20} />
            <CardTitle>Clinic hours</CardTitle>
            <CardMeta>
              Monday to Friday, 8:00 AM to 6:00 PM. Saturday, 9:00 AM to 1:00 PM.
              Closed Sundays and public holidays.
            </CardMeta>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Icon name="info" size={20} />
            <CardTitle>How it works</CardTitle>
            <CardMeta>
              Pick a doctor, choose a date and time, and tell us the reason for
              your visit. Your request is sent as "requested" until the clinic
              confirms it.
            </CardMeta>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Icon name="bell" size={20} />
            <CardTitle>What happens next</CardTitle>
            <CardMeta>
              You'll see the status update on your Appointments page once the
              doctor confirms. Arrive 10 minutes early to check in with
              reception.
            </CardMeta>
          </CardBody>
        </Card>
      </Grid>
    </Section>
  );
}