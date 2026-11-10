import React, { useState } from 'react';
import { createAppointment } from '../api';
import type { User, Appointment } from '../types';

interface BookingFormProps {
  doctors: User[];
  onSubmit: (appointment: Appointment) => void;
}

export default function BookingForm({ doctors, onSubmit }: BookingFormProps) {
  const [doctorId, setDoctorId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const resetForm = () => {
    setDoctorId('');
    setDate('');
    setTime('');
    setReason('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!doctorId || !date || !time) {
      setError('Please choose a doctor, a date and a time for the visit.');
      return;
    }

    const scheduled_at = `${date}T${time}:00`;

    setSubmitting(true);
    try {
      const appointment = await createAppointment({
        doctor: Number(doctorId),
        scheduled_at,
        reason,
        status: 'requested',
      } as Partial<Appointment>);
      onSubmit(appointment as Appointment);
      resetForm();
    } catch (err) {
      setError('We could not book this appointment. Please try another time.');
    } finally {
      setSubmitting(false);
    }
  };

  const doctorList = Array.isArray(doctors) ? doctors : [];

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      <div className="ds-field">
        <label className="ds-label" htmlFor="booking-doctor">Doctor</label>
        <select
          id="booking-doctor"
          className="input"
          value={doctorId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDoctorId(e.target.value)}
        >
          <option value="">Select a doctor</option>
          {doctorList.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              Dr. #{doctor.id} — {doctor.role}
            </option>
          ))}
        </select>
      </div>

      <div className="ds-form-row">
        <div className="ds-field">
          <label className="ds-label" htmlFor="booking-date">Date</label>
          <input
            id="booking-date"
            type="date"
            className="input"
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
        </div>
        <div className="ds-field">
          <label className="ds-label" htmlFor="booking-time">Time</label>
          <input
            id="booking-time"
            type="time"
            className="input"
            value={time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="booking-reason">Reason for visit</label>
        <textarea
          id="booking-reason"
          className="input"
          rows={4}
          placeholder="Briefly describe your symptoms or the reason for this visit"
          value={reason}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
        />
      </div>

      {error && <p className="ds-help" style={{ color: 'var(--color-danger)' }}>{error}</p>}

      <div className="ds-form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Booking...' : 'Request Appointment'}
        </button>
      </div>
    </form>
  );
}
