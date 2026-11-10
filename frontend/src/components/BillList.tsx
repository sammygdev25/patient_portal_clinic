import type { Bill } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Price } from './ui/Card.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Grid } from './ui/Grid.tsx';
import { Icon } from './icons';
import { formatDate } from '../utils';

interface BillListProps {
  bills: Bill[];
}

export default function BillList({ bills }: BillListProps) {
  const items = Array.isArray(bills) ? bills : [];

  if (items.length === 0) {
    return (
      <EmptyState
        icon="dollar"
        title="No bills yet"
        text="Your billing statements will appear here after your visits."
      />
    );
  }

  return (
    <Grid size="md" cols={2}>
      {items.map((bill) => (
        <Card key={bill.id}>
          <CardBody>
            <div className="ds-between">
              <CardTitle>Bill #{bill.id}</CardTitle>
              <Badge tone={bill.status === 'paid' ? 'success' : 'danger'}>
                {bill.status === 'paid' ? 'Paid' : 'Unpaid'}
              </Badge>
            </div>
            <CardMeta>
              <Icon name="calendar" size={16} />
              {formatDate(bill.created_at)}
            </CardMeta>
            <CardFooter>
              <Price value={bill.amount} />
              {bill.appointment ? (
                <span className="ds-small ds-muted">
                  Linked to appointment #{bill.appointment}
                </span>
              ) : (
                <span className="ds-small ds-muted">No linked appointment</span>
              )}
            </CardFooter>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}