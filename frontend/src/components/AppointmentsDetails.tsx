import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from './ui/Section.tsx';
import { Stack } from './ui/Grid.tsx';
import { Cluster } from './ui/Grid.tsx';
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface AppointmentsDetailsProps {
  patientName?: string;
  email?: string;
  phone?: string;
  insuranceProvider?: string;
  totalAppointments?: number;
  upcomingCount?: number;
}

export default function AppointmentsDetails({
  patientName = '',
  email = '',
  phone = '',
  insuranceProvider = '',
  totalAppointments = 0,
  upcomingCount = 0,
}: AppointmentsDetailsProps) {
  return (
    <Section
      narrow
      eyebrow="Account details"
      title="Your contact on file"
      subtitle="This is what your clinic team sees when they confirm or reschedule a visit."
    >
      <div className="ds-form">
        <div className="ds-field">
          <span className="ds-label">Patient</span>
          <p>{patientName || 'Not set yet'}</p>
        </div>
        <div className="ds-form-row">
          <div className="ds-field">
            <span className="ds-label">Email</span>
            <p>{email || 'Not set yet'}</p>
          </div>
          <div className="ds-field">
            <span className="ds-label">Phone</span>
            <p>{phone || 'Not set yet'}</p>
          </div>
        </div>
        <div className="ds-field">
          <span className="ds-label">Insurance provider</span>
          <p>{insuranceProvider || 'Not set yet'}</p>
        </div>
        <Cluster gap="sm" align="center">
          <Badge tone="soft">
            <Icon name="calendar" size={14} /> {totalAppointments} total visits
          </Badge>
          <Badge tone="primary">
            <Icon name="clock" size={14} /> {upcomingCount} upcoming
          </Badge>
        </Cluster>
        <div className="ds-form-actions">
          <Button variant="secondary" to="/patient/profile">
            <Icon name="edit" size={16} /> Update profile details
          </Button>
        </div>
      </div>
    </Section>
  );
}