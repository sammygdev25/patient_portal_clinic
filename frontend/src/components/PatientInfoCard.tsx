import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Icon } from '../components/icons';

interface PatientInfoCardPatient {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  date_of_birth?: string;
  phone?: string;
  address?: string;
  insurance_provider?: string;
  created_at?: string;
}

interface PatientInfoCardProps {
  patient: PatientInfoCardPatient;
}

function PatientInfoCard({ patient }: PatientInfoCardProps) {
  if (!patient) {
    return null;
  }

  const displayName =
    patient.first_name || patient.last_name
      ? `${patient.first_name ?? ''} ${patient.last_name ?? ''}`.trim()
      : patient.username ?? 'Patient';

  return (
    <Card>
      <CardBody>
        <div className="ds-cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <CardTitle>{displayName}</CardTitle>
            <CardMeta>
              <Icon name="user" size={14} /> {patient.email ?? 'No email on file'}
            </CardMeta>
          </div>
          <Badge tone="primary">Patient</Badge>
        </div>

        <div className="ds-stack" style={{ marginTop: 'var(--space-md)', gap: 'var(--space-xs)' }}>
          <div className="ds-cluster">
            <Icon name="calendar" size={14} />
            <span className="ds-small">
              Date of birth: {patient.date_of_birth ?? 'Not provided'}
            </span>
          </div>
          <div className="ds-cluster">
            <Icon name="phone" size={14} />
            <span className="ds-small">{patient.phone ?? 'No phone on file'}</span>
          </div>
          <div className="ds-cluster">
            <Icon name="map-pin" size={14} />
            <span className="ds-small">{patient.address ?? 'No address on file'}</span>
          </div>
          <div className="ds-cluster">
            <Icon name="shield" size={14} />
            <span className="ds-small">
              Insurance: {patient.insurance_provider ?? 'Not provided'}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PatientInfoCard;