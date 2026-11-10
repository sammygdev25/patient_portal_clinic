import type { Service } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Icon } from '../components/icons';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="service-card">
      <CardBody>
        <Stack gap="sm">
          <Badge tone="primary">
            <Icon name="clock" size={14} /> {service.duration_minutes} min
          </Badge>
          <CardTitle>{service.name}</CardTitle>
          {service.description ? (
            <CardMeta>{service.description}</CardMeta>
          ) : (
            <CardMeta className="ds-muted">
              Details about this service will be shared during your visit.
            </CardMeta>
          )}
        </Stack>
      </CardBody>
      <CardFooter>
        <span className="ds-small ds-muted">Available at our clinic</span>
      </CardFooter>
    </Card>
  );
}

function Stack({ gap, children, className }: { gap?: string; children: React.ReactNode; className?: string }) {
  return <div className={`ds-stack ds-stack-${gap || 'md'} ${className || ''}`}>{children}</div>;
}