import { Section } from './ui/Section.tsx';
import { Icon } from '../components/icons';
import type { DoctorProfile } from '../types';

interface DoctorProfileDetailsProps {
  profile: Partial<DoctorProfile> | null;
  onChange: (field: keyof DoctorProfile, value: string | number) => void;
  onSubmit: (e: React.FormEvent) => void;
  saving?: boolean;
}

export default function DoctorProfileDetails({ profile, onChange, onSubmit, saving }: DoctorProfileDetailsProps) {
  return (
    <Section
      narrow
      eyebrow="Account details"
      title="Your clinical profile"
      subtitle="Keep your specialty, experience and bio up to date so patients know who they're booking with."
    >
      <form className="ds-form" onSubmit={onSubmit}>
        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label" htmlFor="specialty">
              <Icon name="award" size={16} /> Specialty
            </label>
            <input
              id="specialty"
              className="input"
              type="text"
              value={profile?.specialty || ''}
              onChange={(e) => onChange('specialty', e.target.value)}
              placeholder="e.g. Family Medicine"
              required
            />
          </div>
          <div className="ds-field">
            <label className="ds-label" htmlFor="years_experience">
              <Icon name="clock" size={16} /> Years of experience
            </label>
            <input
              id="years_experience"
              className="input"
              type="number"
              min={0}
              value={profile?.years_experience ?? 0}
              onChange={(e) => onChange('years_experience', Number(e.target.value))}
            />
          </div>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="bio">
            <Icon name="info" size={16} /> Bio
          </label>
          <textarea
            id="bio"
            className="input"
            rows={5}
            value={profile?.bio || ''}
            onChange={(e) => onChange('bio', e.target.value)}
            placeholder="Share your training, areas of focus and approach to patient care."
          />
          <p className="ds-help">Patients see this bio when choosing a doctor to book with.</p>
        </div>

        <div className="ds-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Section>
  );
}