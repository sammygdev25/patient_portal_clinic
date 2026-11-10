import React from 'react';
import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Icon } from '../components/icons';
import type { IconName } from '../components/icons';

interface HowItWorksStep {
  icon: IconName;
  title: string;
  text: string;
}

interface HomeCategoriesProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: HowItWorksStep[];
}

const DEFAULT_STEPS: HowItWorksStep[] = [
  {
    icon: 'calendar',
    title: 'Book an appointment',
    text: 'Choose a service and a doctor, pick a time that works for you, and confirm your visit in minutes.',
  },
  {
    icon: 'user',
    title: 'See your doctor',
    text: 'Attend your visit in person. Your doctor records notes, diagnoses and next steps right in your chart.',
  },
  {
    icon: 'file-text' as IconName,
    title: 'Access records online',
    text: 'Review visit notes, prescriptions, bills and documents anytime from your secure patient portal.',
  },
];

export default function HomeCategories({
  eyebrow = 'How it works',
  title = 'Your care, simplified',
  subtitle = 'From booking to follow-up, manage every step of your visit in one place.',
  steps = DEFAULT_STEPS,
}: HomeCategoriesProps) {
  return (
    <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
      <Grid size="sm" cols={3}>
        {(Array.isArray(steps) ? steps : []).map((step, idx) => (
          <Card key={step.title}>
            <CardBody>
              <Icon name={step.icon} size={28} title={step.title} />
              <CardMeta>{`Step ${idx + 1}`}</CardMeta>
              <CardTitle>{step.title}</CardTitle>
              <p className="ds-muted">{step.text}</p>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}