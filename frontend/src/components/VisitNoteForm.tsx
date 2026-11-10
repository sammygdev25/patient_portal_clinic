import { useState } from 'react';
import type { Appointment, VisitNote } from '../types';
import { createVisitNote } from '../api';
import { Button } from './ui/Button.tsx';
import { Alert } from './ui/Badge.tsx';

interface VisitNoteFormProps {
  appointment: Appointment;
  onSave: (note: VisitNote) => void;
}

export default function VisitNoteForm({ appointment, onSave }: VisitNoteFormProps) {
  const [notes, setNotes] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Please enter visit notes before saving.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const created = await createVisitNote({
        appointment: appointment.id,
        notes,
      });
      setNotes('');
      onSave(created);
    } catch (err) {
      setError('Unable to save the visit note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      {error && <Alert tone="danger">{error}</Alert>}
      <div className="ds-field">
        <label className="ds-label" htmlFor="visit-note-notes">
          Visit Notes
        </label>
        <textarea
          id="visit-note-notes"
          className="input"
          rows={8}
          placeholder="Document the patient's symptoms, examination findings, diagnosis and treatment plan..."
          value={notes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
        />
        <p className="ds-help">
          This note will be saved against the appointment and shared with the patient's record.
        </p>
      </div>
      <div className="ds-form-actions">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Visit Note'}
        </Button>
      </div>
    </form>
  );
}