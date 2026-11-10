import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from './ui/Section.tsx';
import { Button } from './ui/Button.tsx';
import { Alert } from './ui/Badge.tsx';
import { Icon } from '../components/icons';
import { createAppointment } from '../api';
import type { DoctorProfile } from '../types';

interface AppointmentBookingFormProps {
  doctors: DoctorProfile[];
}

export default function AppointmentBookingForm({ doctors }: AppointmentBookingFormProps) {
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!doctorId) {
      setError('Please choose a doctor for your visit.');
      return;
    }
    if (!scheduledAt) {
      setError('Please pick a date and time for your appointment.');
      return;
    }
    setSubmitting(true);
    try {
      const created: any = await createAppointment({
        doctor: Number(doctorId),
        scheduled_at: new Date(scheduledAt).toISOString(),
        reason,
      } as any);
      if (created && (created.amount || created.total)) {
        navigate(`/order-pay?order=${created.id}`);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('We could not book that appointment. Please try a different time.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Section narrow title="Appointment requested">
        <Alert tone="success">
          Your appointment request has been sent. Our front desk will confirm it shortly.
        </Alert>
        <div className="ds-form-actions">
          <Button variant="primary" to="/patient/appointments">
            View my appointments
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section narrow title="Book an appointment">
      <form className="ds-form" onSubmit={handleSubmit}>
        {error && <Alert tone="danger">{error}</Alert>}

        <div className="ds-field">
          <label className="ds-label" htmlFor="doctor">Doctor</label>
          <select
            id="doctor"
            className="input"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          >
            <option value="">Select a doctor</option>
            {(Array.isArray(doctors) ? doctors : []).map((d: any) => (
              <option key={d.id} value={d.user?.id ?? d.id}>
                {d.user?.username ? `Dr. ${d.user?.username}` : 'Doctor'} — {d.specialty}
              </option>
            ))}
          </select>
          <p className="ds-help">Choose the specialist you'd like to see for this visit.</p>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="scheduledAt">Date &amp; time</label>
          <input
            id="scheduledAt"
            type="datetime-local"
            className="input"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
          <p className="ds-help">Our clinic hours are Monday through Saturday, 8am to 6pm.</p>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="reason">Reason for visit</label>
          <textarea
            id="reason"
            className="input"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="E.g. annual checkup, persistent cough, follow-up on lab results..."
          />
          <p className="ds-help">This helps your doctor prepare before you arrive.</p>
        </div>

        <div className="ds-form-actions">
          <Button variant="secondary" type="button" onClick={() => navigate('/patient/dashboard')}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Icon name="clock" size={16} /> Booking...
              </>
            ) : (
              <>
                <Icon name="calendar" size={16} /> Request appointment
              </>
            )}
          </Button>
        </div>
      </form>
    </Section>
  );
}