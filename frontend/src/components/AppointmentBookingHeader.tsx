import React from 'react';
import { PageHeader } from '../components/ui';

interface AppointmentBookingHeaderProps {
  section?: string;
  page?: string;
}

export default function AppointmentBookingHeader(props: AppointmentBookingHeaderProps) {
  return (
    <PageHeader
      eyebrow="Book an appointment"
      title="Schedule your visit"
      subtitle="Pick a doctor, choose a date and time, and tell us why you're coming in so we can prepare for your visit."
    />
  );
}