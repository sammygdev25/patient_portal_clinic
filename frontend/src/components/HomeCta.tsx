import React from 'react';
import { Section } from './ui/Section.tsx';
import { Stack } from './ui/Grid.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface HomeCtaProps {
  isAuthenticated?: boolean;
}

export default function HomeCta({ isAuthenticated }: HomeCtaProps) {
  return (
    <Section tight>
      <div className="ds-card ds-card-body ds-between">
        <Stack gap="xs">
          <h2 className="ds-card-title">Ready to see a doctor?</h2>
          <p className="ds-lead">
            Browse our services and book an appointment with one of our doctors in just a few minutes.
          </p>
        </Stack>
        <Button
          variant="primary"
          size="lg"
          to={isAuthenticated ? '/patient/book' : '/register'}
        >
          <Icon name="calendar" size={18} />
          {isAuthenticated ? 'Book an Appointment' : 'Sign Up to Book'}
        </Button>
      </div>
    </Section>
  );
}