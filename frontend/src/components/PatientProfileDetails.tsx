import { useState, useEffect, FormEvent } from 'react';
import { Section } from './ui/Section.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';
import type { PatientProfile } from '../types';

interface PatientProfileDetailsProps {
  profile: PatientProfile | null;
  onSave: (data: Partial<PatientProfile>) => void | Promise<void>;
}

export default function PatientProfileDetails({ profile, onSave }: PatientProfileDetailsProps) {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setDateOfBirth(profile.date_of_birth || '');
      setPhone(profile.phone || '');
      setAddress(profile.address || '');
      setInsuranceProvider(profile.insurance_provider || '');
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        date_of_birth: dateOfBirth || undefined,
        phone,
        address,
        insurance_provider: insuranceProvider,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section narrow eyebrow="Patient profile" title="Account details"
      subtitle="Keep your contact and insurance information current so the clinic can reach you.">
      <form className="ds-form" onSubmit={handleSubmit}>
        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label" htmlFor="date_of_birth">
              <Icon name="calendar" size={16} /> Date of birth
            </label>
            <input
              id="date_of_birth"
              type="date"
              className="input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="ds-field">
            <label className="ds-label" htmlFor="phone">
              <Icon name="phone" size={16} /> Phone number
            </label>
            <input
              id="phone"
              type="tel"
              className="input"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="ds-field">
          <label className="ds-label" htmlFor="address">
            <Icon name="map-pin" size={16} /> Home address
          </label>
          <textarea
            id="address"
            className="input"
            rows={3}
            placeholder="Street, city, state, zip"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className="ds-help">Used for mailed statements and emergency contact purposes.</p>
        </div>
        <div className="ds-field">
          <label className="ds-label" htmlFor="insurance_provider">
            <Icon name="shield" size={16} /> Insurance provider
          </label>
          <input
            id="insurance_provider"
            type="text"
            className="input"
            placeholder="e.g. Blue Cross Blue Shield"
            value={insuranceProvider}
            onChange={(e) => setInsuranceProvider(e.target.value)}
          />
        </div>
        <div className="ds-form-actions">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Section>
  );
}