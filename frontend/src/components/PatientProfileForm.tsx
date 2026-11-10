import React, { useState } from 'react';
import { createPatientProfile, updatePatientProfile } from '../api';
import type { PatientProfile } from '../types';
import { Button } from './ui/Button.tsx';
import { Alert } from './ui/Badge.tsx';

interface PatientProfileFormProps {
  profile: PatientProfile | null;
  onSave: (profile: PatientProfile) => void;
}

export default function PatientProfileForm({ profile, onSave }: PatientProfileFormProps) {
  const [dateOfBirth, setDateOfBirth] = useState<string>(profile?.date_of_birth || '');
  const [phone, setPhone] = useState<string>(profile?.phone || '');
  const [address, setAddress] = useState<string>(profile?.address || '');
  const [insuranceProvider, setInsuranceProvider] = useState<string>(profile?.insurance_provider || '');
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        date_of_birth: dateOfBirth || null,
        phone,
        address,
        insurance_provider: insuranceProvider,
      };
      let saved: PatientProfile;
      if (profile && profile.id) {
        saved = await updatePatientProfile(profile.id, payload);
      } else {
        saved = await createPatientProfile(payload);
      }
      onSave(saved);
    } catch (err: any) {
      setError(err?.message || 'Unable to save your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      {error && <Alert tone="danger">{error}</Alert>}

      <div className="ds-form-row">
        <div className="ds-field">
          <label className="ds-label" htmlFor="date_of_birth">Date of birth</label>
          <input
            id="date_of_birth"
            type="date"
            className="input"
            value={dateOfBirth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            className="input"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="address">Home address</label>
        <textarea
          id="address"
          className="input"
          rows={3}
          placeholder="123 Main Street, Springfield"
          value={address}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)}
        />
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="insurance_provider">Insurance provider</label>
        <input
          id="insurance_provider"
          type="text"
          className="input"
          placeholder="e.g. Blue Cross Blue Shield"
          value={insuranceProvider}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInsuranceProvider(e.target.value)}
        />
        <p className="ds-help">Used to verify coverage when billing for your visits.</p>
      </div>

      <div className="ds-form-actions">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </Button>
      </div>
    </form>
  );
}