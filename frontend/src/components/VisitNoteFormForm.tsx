import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from './ui/Section.tsx';
import { Alert } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';
import { createVisitNote } from '../api';
import type { VisitNote } from '../types';

interface VisitNoteFormFormProps {
  appointmentId: number;
  patientId?: number;
  onSaved?: (note: VisitNote) => void;
}

export default function VisitNoteFormForm({ appointmentId, patientId, onSaved }: VisitNoteFormFormProps) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!notes.trim()) {
      setError('Please describe the visit findings before saving.');
      return;
    }
    setSaving(true);
    try {
      const created = await createVisitNote({ appointment: appointmentId, notes } as Partial<VisitNote>);
      setSaved(true);
      if (onSaved) onSaved(created as VisitNote);
    } catch (err) {
      setError('Could not save the visit note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const recordsPath = patientId ? `/staff/doctor/patients/${patientId}` : '/staff/doctor/dashboard';

  if (saved) {
    return (
      <Section narrow title="Visit note saved">
        <Alert tone="success">
          The visit note has been added to the patient's chart.
        </Alert>
        <div className="ds-form-actions">
          <Button variant="primary" to={recordsPath}>
            <Icon name="book" size={16} /> View patient record
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section narrow eyebrow="Clinical documentation" title="Visit note">
      <form className="ds-form" onSubmit={handleSubmit}>
        {error && <Alert tone="danger">{error}</Alert>}
        <div className="ds-field">
          <label className="ds-label" htmlFor="visit-notes">
            Notes for this visit
          </label>
          <textarea
            id="visit-notes"
            className="input"
            rows={8}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Chief complaint, examination findings, assessment and plan..."
          />
          <p className="ds-help">
            This note is attached to the appointment and becomes part of the patient's permanent record.
          </p>
        </div>
        <div className="ds-form-actions">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            <Icon name="check" size={16} /> {saving ? 'Saving...' : 'Save visit note'}
          </Button>
        </div>
      </form>
    </Section>
  );
}