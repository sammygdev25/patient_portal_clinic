import React, { useState } from 'react';
import { updateDoctorProfile } from '../api';
import type { DoctorProfile } from '../types';
import { Button } from './ui/Button.tsx';
import { Stack } from './ui/Grid.tsx';

interface DoctorProfileFormProps {
  profile: DoctorProfile | null;
  onSave: (profile: DoctorProfile) => void;
}

export default function DoctorProfileForm({ profile, onSave }: DoctorProfileFormProps) {
  const [specialty, setSpecialty] = useState<string>(profile?.specialty || '');
  const [bio, setBio] = useState<string>(profile?.bio || '');
  const [yearsExperience, setYearsExperience] = useState<number>(profile?.years_experience || 0);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) setPhotoFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError('');
    try {
      const payload: Record<string, unknown> = {
        specialty,
        bio,
        years_experience: yearsExperience,
      };
      if (photoFile) {
        payload.photo = photoFile;
      }
      const updated = await updateDoctorProfile(profile.id, payload);
      onSave(updated as unknown as DoctorProfile);
    } catch (err) {
      setError('Could not save your profile. Please check the fields and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      <div className="ds-field">
        <label className="ds-label" htmlFor="specialty">Specialty</label>
        <input
          id="specialty"
          className="input"
          type="text"
          value={specialty}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecialty(e.target.value)}
          placeholder="e.g. Family Medicine, Cardiology, Pediatrics"
          required
        />
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          className="input"
          rows={5}
          value={bio}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
          placeholder="Tell patients about your background, approach to care and areas of focus"
        />
      </div>

      <div className="ds-form-row">
        <div className="ds-field">
          <label className="ds-label" htmlFor="years_experience">Years of experience</label>
          <input
            id="years_experience"
            className="input"
            type="number"
            min={0}
            value={yearsExperience}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYearsExperience(Number(e.target.value))}
          />
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="photo">Profile photo</label>
          <input
            id="photo"
            className="input"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <span className="ds-help">Shown to patients when booking an appointment with you.</span>
        </div>
      </div>

      {error && <p className="ds-help" style={{ color: 'var(--color-danger)' }}>{error}</p>}

      <div className="ds-form-actions">
        <Stack gap="sm" justify="end">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save profile'}
          </Button>
        </Stack>
      </div>
    </form>
  );
}