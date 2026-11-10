import React, { useState } from 'react';
import type { Appointment } from '../types';
import { createPrescription } from '../api';
import { Button } from './ui/Button.tsx';
import { Alert } from './ui/Badge.tsx';

interface PrescriptionFormProps {
  appointment: Appointment;
  onSave: () => void;
}

export default function PrescriptionForm({ appointment, onSave }: PrescriptionFormProps) {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medication.trim() || !dosage.trim()) {
      setError('Medication and dosage are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await createPrescription({
        appointment: appointment.id,
        doctor: appointment.doctor,
        patient: appointment.patient,
        medication: medication.trim(),
        dosage: dosage.trim(),
        instructions: instructions.trim(),
      } as any);
      setMedication('');
      setDosage('');
      setInstructions('');
      onSave();
    } catch (err) {
      console.error('Failed to create prescription:', err);
      setError('Could not save the prescription. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      {error && <Alert tone="danger">{error}</Alert>}
      <div className="ds-field">
        <label className="ds-label" htmlFor="medication">Medication</label>
        <input
          id="medication"
          className="input"
          type="text"
          value={medication}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMedication(e.target.value)}
          placeholder="e.g. Amoxicillin 500mg"
          required
        />
      </div>
      <div className="ds-field">
        <label className="ds-label" htmlFor="dosage">Dosage</label>
        <input
          id="dosage"
          className="input"
          type="text"
          value={dosage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDosage(e.target.value)}
          placeholder="e.g. 1 tablet twice daily for 7 days"
          required
        />
      </div>
      <div className="ds-field">
        <label className="ds-label" htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          className="input"
          rows={4}
          value={instructions}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value)}
          placeholder="Take with food. Avoid alcohol. Contact the clinic if a rash develops."
        />
        <span className="ds-help">Optional notes for the patient about how to take this medication.</span>
      </div>
      <div className="ds-form-actions">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Add Prescription'}
        </Button>
      </div>
    </form>
  );
}