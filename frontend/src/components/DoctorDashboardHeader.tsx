import PageHeader from '../components/ui';
import { Icon } from '../components/icons';
import { Button } from './ui/Button.tsx';

interface DoctorDashboardHeaderProps {
  doctorName?: string;
  onViewSchedule?: () => void;
}

export default function DoctorDashboardHeader({ doctorName, onViewSchedule }: DoctorDashboardHeaderProps) {
  return (
    <PageHeader
      eyebrow="Doctor Portal"
      title={doctorName ? `Welcome back, Dr. ${doctorName}` : 'Welcome back, Doctor'}
      subtitle="Here's an overview of your schedule, recent visits and patient activity for today."
      actions={
        <Button variant="primary" size="lg" onClick={onViewSchedule} to="/staff/doctor/schedule">
          <Icon name="calendar" size={18} />
          View Full Schedule
        </Button>
      }
    />
  );
}