import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Icon } from '../components/icons';
import type { IconName } from '../components/icons';

interface PatientRecordFactsProps {
  patient?: {
    username?: string;
    email?: string;
    date_of_birth?: string;
    phone?: string;
    address?: string;
    insurance_provider?: string;
    created_at?: string;
  } | null;
}

export default function PatientRecordFacts({ patient }: PatientRecordFactsProps) {
  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: 'user', label: 'Username', value: patient?.username || '—' },
    { icon: 'mail', label: 'Email', value: patient?.email || '—' },
    { icon: 'calendar', label: 'Date of Birth', value: patient?.date_of_birth || '—' },
    { icon: 'phone', label: 'Phone', value: patient?.phone || '—' },
    { icon: 'shield', label: 'Insurance Provider', value: patient?.insurance_provider || 'Not on file' },
    {
      icon: 'clock',
      label: 'Patient Since',
      value: patient?.created_at ? new Date(patient.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—',
    },
  ];

  return (
    <Section eyebrow="Patient Record" title="Patient Details" tight>
      <Grid cols={2} size="sm">
        {(Array.isArray(facts) ? facts : []).map((fact) => (
          <div className="ds-card" key={fact.label}>
            <div className="ds-card-body">
              <div className="ds-cluster">
                <Icon name={fact.icon} size={18} />
                <span className="ds-label">{fact.label}</span>
              </div>
              <p className="ds-card-title">{fact.value}</p>
            </div>
          </div>
        ))}
      </Grid>
      {patient?.address ? (
        <div className="ds-card">
          <div className="ds-card-body">
            <div className="ds-cluster">
              <Icon name="map-pin" size={18} />
              <span className="ds-label">Address</span>
            </div>
            <p className="ds-lead">{patient.address}</p>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
