import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { Badge } from './ui/Badge.tsx';
import { Price } from './ui/Card.tsx';
import { Icon } from '../components/icons';
import type { Bill } from '../types';

interface BillsContentProps {
  bills: Bill[];
  loading?: boolean;
  error?: string | null;
}

export default function BillsContent({ bills, loading = false, error = null }: BillsContentProps) {
  if (loading) {
    return <SkeletonCards count={3} />;
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <div className="ds-alert">
            <Icon name="alert" size={18} />
            <span>{error}</span>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!bills || bills.length === 0) {
    return (
      <EmptyState
        icon="dollar"
        title="No bills yet"
        text="Charges for your visits and services will appear here once they're issued by the clinic."
      />
    );
  }

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Appointment</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(bills) ? bills : []).map((bill) => (
            <tr key={bill.id}>
              <td>{new Date(bill.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
              <td>
                {bill.appointment
                  ? `Appointment #${bill.appointment}`
                  : <span className="ds-muted">General charge</span>}
              </td>
              <td>
                <Price value={bill.amount} />
              </td>
              <td>
                <Badge tone={bill.status === 'paid' ? 'success' : 'danger'}>
                  {bill.status === 'paid' ? 'Paid' : 'Unpaid'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
