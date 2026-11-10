import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getPrescriptionList } from '../api';
import type { Prescription } from '../types';
import PrescriptionsHeader from '../components/PrescriptionsHeader';
import PrescriptionsContent from '../components/PrescriptionsContent';
import { Alert } from '../components/ui/Badge.tsx';

export default function PrescriptionsPage() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let active = true;
    async function loadPrescriptions() {
      setLoading(true);
      setError('');
      try {
        const all = await getPrescriptionList();
        const mine = user
          ? (Array.isArray(all) ? all : []).filter((p: Prescription) => p.patient === user.id)
          : all;
        if (active) {
          setPrescriptions(mine);
        }
      } catch (err) {
        if (active) {
          setError('Unable to load your prescriptions right now. Please try again later.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    loadPrescriptions();
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="ds-stack-lg">
      <PrescriptionsHeader prescriptionCount={prescriptions.length} />
      {error ? <Alert tone="danger">{error}</Alert> : null}
      <PrescriptionsContent prescriptions={prescriptions} loading={loading} />
    </div>
  );
}