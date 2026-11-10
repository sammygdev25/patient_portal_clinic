import React, { useEffect, useState } from 'react';
import { getUserList } from '../api';
import type { User } from '../types';
import { Alert } from '../components/ui/Badge.tsx';
import PatientManagementHeader from '../components/PatientManagementHeader';
import PatientManagementContent from '../components/PatientManagementContent';

export default function PatientManagementPage() {
  const [patients, setPatients] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    async function loadPatients() {
      setLoading(true);
      setError('');
      try {
        const data = await getUserList();
        const list = Array.isArray(data) ? data : [];
        const patientUsers = list.filter((u) => u.role === 'patient');
        if (mounted) {
          setPatients(patientUsers);
        }
      } catch (err) {
        if (mounted) {
          setError('Unable to load patients right now. Please try again shortly.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPatients();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelect = (patientId: number) => {
    setSelectedPatientId(patientId);
  };

  return (
    <div className="ds-stack">
      <PatientManagementHeader patientCount={patients.length} />
      {error && <Alert tone="danger">{error}</Alert>}
      <PatientManagementContent
        patients={patients}
        loading={loading}
        selectedPatientId={selectedPatientId}
        onSelect={handleSelect}
      />
    </div>
  );
}