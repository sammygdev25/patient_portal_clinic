import { useState, useMemo, ChangeEvent } from 'react';
import { Icon } from './icons';

interface DoctorOption {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  doctor_profile?: {
    specialty?: string;
  };
}

interface DoctorScheduleFilterProps {
  doctors: DoctorOption[];
  onFilter: (filters: { doctorId: string; specialty: string }) => void;
}

function doctorLabel(doctor: DoctorOption): string {
  const name =
    doctor.first_name || doctor.last_name
      ? `Dr. ${doctor.first_name ?? ''} ${doctor.last_name ?? ''}`.trim()
      : doctor.username || `Doctor #${doctor.id}`;
  return doctor.doctor_profile?.specialty
    ? `${name} — ${doctor.doctor_profile.specialty}`
    : name;
}

export default function DoctorScheduleFilter({ doctors, onFilter }: DoctorScheduleFilterProps) {
  const [doctorId, setDoctorId] = useState('');
  const [specialty, setSpecialty] = useState('');

  const specialties = useMemo(() => {
    const unique = new Set<string>();
    (Array.isArray(doctors) ? doctors : []).forEach((doc) => {
      if (doc.doctor_profile?.specialty) {
        unique.add(doc.doctor_profile.specialty);
      }
    });
    return Array.from(unique).sort();
  }, [doctors]);

  const applyFilter = (nextDoctorId: string, nextSpecialty: string) => {
    onFilter({ doctorId: nextDoctorId, specialty: nextSpecialty });
  };

  const handleDoctorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDoctorId(value);
    applyFilter(value, specialty);
  };

  const handleSpecialtyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSpecialty(value);
    applyFilter(doctorId, value);
  };

  const handleReset = () => {
    setDoctorId('');
    setSpecialty('');
    applyFilter('', '');
  };

  return (
    <div className="ds-filters">
      <div className="ds-field">
        <label className="ds-label" htmlFor="doctor-filter-doctor">
          <Icon name="user" size={16} /> Doctor
        </label>
        <select
          id="doctor-filter-doctor"
          className="input"
          value={doctorId}
          onChange={handleDoctorChange}
        >
          <option value="">All doctors</option>
          {(Array.isArray(doctors) ? doctors : []).map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doctorLabel(doc)}
            </option>
          ))}
        </select>
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="doctor-filter-specialty">
          <Icon name="filter" size={16} /> Specialty
        </label>
        <select
          id="doctor-filter-specialty"
          className="input"
          value={specialty}
          onChange={handleSpecialtyChange}
        >
          <option value="">All specialties</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <div className="ds-field">
        <label className="ds-label">&nbsp;</label>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          <Icon name="refresh" size={16} /> Reset
        </button>
      </div>
    </div>
  );
}