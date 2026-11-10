import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from './ui/Section.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface ReceptionistDashboardRecentProps {
  appointments: Appointment[];
}

function formatWhen(value: string): string {
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function statusTone(status: string): string {
  switch (status) {
    case 'confirmed':
      return 'badge badge-primary';
    case 'checked_in':
      return 'badge badge-success';
    case 'completed':
      return 'badge badge-success';
    case 'cancelled':
      return 'badge badge-danger';
    default:
      return 'badge';
  }
}

export default function ReceptionistDashboardRecent({ appointments }: ReceptionistDashboardRecentProps) {
  const recent = Array.isArray(appointments) ? appointments.slice(0, 8) : [];

  return (
    <Section eyebrow="Front desk" title="Recent activity" subtitle="Latest bookings and status changes across the clinic">
      {recent.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No recent appointments"
          text="New bookings and check-ins will show up here as they come in."
          action={
            <Link to="/staff/receptionist/schedule" className="btn btn-primary">
              View schedule
            </Link>
          }
        />
      ) : (
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Scheduled</th>
                <th>Status</th>
                <th aria-label="Link" />
              </tr>
            </thead>
            <tbody>
              {recent.map((appt: any) => (
                <tr key={appt.id}>
                  <td>{appt.patient_name || appt.patient_username || `Patient #${appt.patient}`}</td>
                  <td>{appt.doctor_name || appt.doctor_username || `Dr. #${appt.doctor}`}</td>
                  <td>{formatWhen(appt.scheduled_at)}</td>
                  <td>
                    <span className={statusTone(appt.status)}>{appt.status.replace('_', ' ')}</span>
                  </td>
                  <td>
                    <Link to="/staff/receptionist/schedule" aria-label="Open in schedule">
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}