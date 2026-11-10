import { Section } from './ui/Section.tsx';
import { Split } from './ui/Grid.tsx';
import { Stack } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { Icon } from '../components/icons';
import type { IconName } from '../components/icons';

interface ValuePoint {
  icon: IconName;
  title: string;
  text: string;
}

interface HomeAboutProps {
  title?: string;
  eyebrow?: string;
}

const VALUE_POINTS: ValuePoint[] = [
  {
    icon: 'clock',
    title: 'Fast, easy booking',
    text: 'Schedule an appointment with your preferred doctor in minutes, from any device, day or night.',
  },
  {
    icon: 'shield',
    title: 'Your records, secured',
    text: 'Visit notes, prescriptions, bills and documents are all kept in one private place you control.',
  },
  {
    icon: 'users',
    title: 'Care built around you',
    text: 'Patients, doctors and front-desk staff all work from the same portal, so nothing falls through the cracks.',
  },
];

export default function HomeAbout({
  title = 'About our patient portal',
  eyebrow = 'Why patients trust us',
}: HomeAboutProps) {
  return (
    <Section eyebrow={eyebrow} title={title}>
      <Split>
        <Stack gap="md">
          <p className="ds-lead">
            Our clinic patient portal brings every part of your care into a single, simple place.
            Book appointments with the right doctor, review visit notes after each check-up, keep
            track of prescriptions, pay bills, and store your documents securely — all without
            picking up the phone.
          </p>
          <p className="ds-muted">
            Behind the scenes, our doctors and receptionists use the same portal to manage
            schedules, check patients in, and keep records up to date, so your experience from
            booking to follow-up stays consistent and well coordinated.
          </p>
        </Stack>
        <Stack gap="sm">
          {VALUE_POINTS.map((point) => (
            <Card key={point.title}>
              <CardBody>
                <Stack gap="xs">
                  <Icon name={point.icon} size={24} title={point.title} />
                  <h3 className="ds-card-title">{point.title}</h3>
                  <p className="ds-small ds-muted">{point.text}</p>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Split>
    </Section>
  );
}