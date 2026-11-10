import { PageHeader } from '../components/ui';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface PatientDashboardHeaderProps {
  userName: string;
  onBookAppointment: () => void;
}

export default function PatientDashboardHeader({ userName, onBookAppointment }: PatientDashboardHeaderProps) {
  return (
    <PageHeader
      eyebrow="Patient Portal"
      title={`Welcome back, ${userName}`}
      subtitle="Here's an overview of your upcoming care, visit notes, prescriptions and bills."
      actions={
        <Button variant="primary" size="lg" onClick={onBookAppointment}>
          <Icon name="calendar" size={18} />
          Book an appointment
        </Button>
      }
    />
  );
}