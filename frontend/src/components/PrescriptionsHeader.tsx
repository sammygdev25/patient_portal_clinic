import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface PrescriptionsHeaderProps {
  prescriptionCount?: number;
}

export default function PrescriptionsHeader({ prescriptionCount }: PrescriptionsHeaderProps) {
  const subtitle =
    typeof prescriptionCount === 'number'
      ? `${prescriptionCount} prescription${prescriptionCount === 1 ? '' : 's'} on file from your doctors`
      : 'Medications and dosage instructions prescribed by your doctors at your visits';

  return (
    <PageHeader
      eyebrow="Patient Portal"
      title="My Prescriptions"
      subtitle={subtitle}
      actions={
        <div className="ds-cluster">
          <Icon name="package" size={20} title="Prescriptions" />
        </div>
      }
    />
  );
}