import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Media } from './ui/Media.tsx';
import { Icon } from '../components/icons';
import type { DoctorProfile } from '../types';

interface PatientRecordRelatedProps {
  doctors: DoctorProfile[];
}

export default function PatientRecordRelated({ doctors }: PatientRecordRelatedProps) {
  if (!doctors || doctors.length === 0) {
    return null;
  }

  const related = doctors.slice(0, 6);

  return (
    <Section
      eyebrow="Care team"
      title="Other doctors at this clinic"
      subtitle="Specialists this patient may also want to see"
      tight
    >
      <Grid size="sm">
        {(Array.isArray(related) ? related : []).map((doctor) => (
          <Card key={doctor.id}>
            <Media
              src={doctor.photo}
              alt={doctor.user ? String(doctor.user) : 'Doctor'}
              ratio="square"
            />
            <CardBody>
              <CardTitle>
                <Icon name="user" size={16} /> {doctor.user ? String(doctor.user) : 'Doctor'}
              </CardTitle>
              <CardMeta>{doctor.specialty}</CardMeta>
              <CardMeta>
                <Icon name="award" size={14} /> {doctor.years_experience} years experience
              </CardMeta>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}