import React, { useState } from 'react';
import type { Appointment } from '../types';
import { updateAppointment } from '../api';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';

interface RescheduleModalProps {
  appointment: Appointment;
  onConfirm: (appointment: Appointment) => void;
  onClose: () => void;
}

export default function RescheduleModal({ appointment, onConfirm, onClose }: RescheduleModalProps) {
  const initialDate = appointment.scheduled_at ? appointment.scheduled_at.slice(0, 16) : '';
  const [scheduledAt, setScheduledAt] = useState<string>(initialDate);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledAt) {
      setError('Please choose a new date and time.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const updated = await updateAppointment(appointment.id, {
        scheduled_at: new Date(scheduledAt).toISOString(),
        status: 'requested',
      });
      onConfirm(updated as Appointment);
    } catch (err) {
      setError('Could not reschedule this appointment. Please try a different time.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ds-modal-overlay" onClick={onClose}>
      <div className="card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', width: '100%' }}>
        <div className="ds-card-body">
          <div className="ds-between" style={{ marginBottom: 'var(--space-md)' }}>
            <h3 className="ds-card-title">Reschedule Appointment</h3>
            <button
              type="button"
              className="ds-btn-ghost"
              onClick={onClose}
              aria-label="Close"
            >
              <Icon name="close" />
            </button>
          </div>

          <p className="ds-muted" style={{ marginBottom: 'var(--space-md)' }}>
            Pick a new date and time for your visit with your doctor.
          </p>

          <form className="ds-form" onSubmit={handleSubmit}>
            <div className="ds-field">
              <label className="ds-label" htmlFor="reschedule-datetime">
                New date &amp; time
              </label>
              <input
                id="reschedule-datetime"
                type="datetime-local"
                className="input"
                value={scheduledAt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScheduledAt(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="ds-alert" style={{ color: 'var(--color-danger)' }}>
                {error}
              </div>
            )}

            <div className="ds-form-actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? 'Saving...' : 'Confirm New Time'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
