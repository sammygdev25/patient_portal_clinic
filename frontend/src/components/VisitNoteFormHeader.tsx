import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface VisitNoteFormHeaderProps {
  patientName?: string;
  scheduledAt?: string;
}

export default function VisitNoteFormHeader({ patientName, scheduledAt }: VisitNoteFormHeaderProps) {
  const subtitle = patientName
    ? `Record the clinical note and any prescriptions for ${patientName}'s visit${scheduledAt ? ` on ${new Date(scheduledAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}` : ''}.`
    : 'Record the clinical note and any prescriptions for this appointment.';

  return (
    <PageHeader
      eyebrow="Doctor"
      title="Visit Note"
      subtitle={subtitle}
      actions={<Icon name="edit" size={24} title="Visit note" />}
    />
  );
}