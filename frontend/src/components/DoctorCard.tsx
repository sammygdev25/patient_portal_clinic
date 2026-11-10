import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Media } from './ui/Media.tsx';
import { Badge } from './ui/Badge.tsx';
import { Icon } from '../components/icons';
import type { DoctorProfile } from '../types';

interface DoctorCardProps {
  doctor: DoctorProfile;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const userInfo: any = (doctor as any).user;
  const displayName =
    typeof userInfo === 'object' && userInfo !== null
      ? [userInfo.first_name, userInfo.last_name].filter(Boolean).join(' ') ||
        userInfo.username ||
        userInfo.email ||
        'Doctor'
      : typeof userInfo === 'string'
      ? userInfo
      : 'Doctor';

  return (
    <Card className="doctor-card">
      <Media
        src={doctor.photo || ''}
        alt={displayName}
        ratio="portrait"
        badge={doctor.years_experience ? `${doctor.years_experience} yrs` : undefined}
      />
      <CardBody>
        <CardTitle>Dr. {displayName}</CardTitle>
        <CardMeta>
          <Badge tone="primary">{doctor.specialty}</Badge>
        </CardMeta>
        {doctor.bio && (
          <p className="ds-muted ds-small">
            <Icon name="info" size={14} /> {doctor.bio}
          </p>
        )}
      </CardBody>
    </Card>
  );
}