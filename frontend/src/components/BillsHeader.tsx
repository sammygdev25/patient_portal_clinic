import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface BillsHeaderProps {
  totalUnpaid?: number;
}

export default function BillsHeader({ totalUnpaid }: BillsHeaderProps) {
  return (
    <PageHeader
      eyebrow="Billing"
      title="Your Bills"
      subtitle="Review charges from your visits and keep track of what you owe the clinic."
      actions={
        typeof totalUnpaid === 'number' && totalUnpaid > 0 ? (
          <div className="ds-cluster">
            <Icon name="dollar" size={18} />
            <span>{totalUnpaid} unpaid</span>
          </div>
        ) : undefined
      }
    />
  );
}