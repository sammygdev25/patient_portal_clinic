import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { Media } from './ui/Media.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Icon } from '../components/icons';
import type { DoctorProfile } from '../types';

interface HomeFeaturedProps {
  doctors: DoctorProfile[];
  loading?: boolean;
}

export default function HomeFeatured({ doctors, loading }: HomeFeaturedProps) {
  if (loading) {
    return (
      <Section
        eyebrow="Our Team"
        title="Meet Our Doctors"
        subtitle="Experienced physicians dedicated to your health and wellbeing"
      >
        <SkeletonCards count={6} />
      </Section>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <Section
        eyebrow="Our Team"
        title="Meet Our Doctors"
        subtitle="Experienced physicians dedicated to your health and wellbeing"
      >
        <EmptyState
          icon="users"
          title="No doctors listed yet"
          text="Our care team profiles will appear here once they are added."
        />
      </Section>
    );
  }

  return (
    <Section
      eyebrow="Our Team"
      title="Meet Our Doctors"
      subtitle="Experienced physicians dedicated to your health and wellbeing"
    >
      <Grid size="md" cols={4}>
        {doctors.slice(0, 8).map((doctor) => {
          const fullName =
            (doctor.user as any)?.first_name || (doctor.user as any)?.last_name
              ? `Dr. ${(doctor.user as any)?.first_name || ''} ${(doctor.user as any)?.last_name || ''}`.trim()
              : `Dr. ${(doctor.user as any)?.username || 'Unknown'}`;

          return (
            <Card key={doctor.id}>
              <Media
                src={(doctor as any).photo || ''}
                alt={fullName}
                ratio="square"
                badge={doctor.specialty}
              />
              <CardBody>
                <CardTitle>{fullName}</CardTitle>
                <CardMeta>
                  <Icon name="award" size={14} /> {doctor.specialty}
                </CardMeta>
                {doctor.bio && (
                  <CardMeta>{doctor.bio}</CardMeta>
                )}
                <Badge tone="soft">
                  {doctor.years_experience} {doctor.years_experience === 1 ? 'year' : 'years'} experience
                </Badge>
              </CardBody>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}