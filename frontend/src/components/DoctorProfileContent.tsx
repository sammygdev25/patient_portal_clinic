import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from './ui/Section.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';
import type { Appointment, DoctorProfile } from '../types';

interface DoctorProfileContentProps {
  profile: DoctorProfile | null;
  appointments: Appointment[];
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'confirmed':
      return 'primary';
    case 'checked_in':
      return 'soft';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'neutral';
  }
}

function formatWhen(value: string): string {
  const d = new Date(value);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function DoctorProfileContent({ profile, appointments }: DoctorProfileContentProps) {
  const list = Array.isArray(appointments) ? appointments : [];

  return (
    <Section
      eyebrow="Practice"
      title="Your appointments"
      subtitle={profile ? `${profile.specialty} · ${profile.years_experience} years of experience` : 'Manage the visits on your calendar'}
    >
      {list.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No appointments yet"
          text="Once patients book a visit with you, they will show up here with their status and notes."
          action={
            <Button variant="primary" to="/staff/doctor/schedule">
              View schedule
            </Button>
          }
        />
      ) : (
        <Card>
          <CardBody>
            <div className="ds-table-wrap">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>When</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((appt) => (
                    <tr key={appt.id}>
                      <td>{`Patient #${appt.patient}`}</td>
                      <td>{formatWhen(appt.scheduled_at)}</td>
                      <td>{appt.reason || 'No reason provided'}</td>
                      <td>
                        <Badge tone={statusTone(appt.status)}>{appt.status.replace('_', ' ')}</Badge>
                      </td>
                      <td>
                        <Link to={`/staff/doctor/appointments/${appt.id}/note`} className="ds-cluster">
                          <Icon name="edit" size={16} />
                          Visit note
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}
    </Section>
  );
}
