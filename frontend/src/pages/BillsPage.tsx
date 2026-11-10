import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getBillList } from '../api';
import type { Bill } from '../types';
import BillsHeader from '../components/BillsHeader';
import BillsContent from '../components/BillsContent';

export default function BillsPage() {
  const { user } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadBills() {
      setLoading(true);
      setError(null);
      try {
        const data = await getBillList();
        const mine = user
          ? (Array.isArray(data) ? data : []).filter((b: Bill) => {
              const patientId =
                typeof b.patient === 'object' && b.patient !== null
                  ? (b.patient as { id: number }).id
                  : b.patient;
              return patientId === user.id;
            })
          : data;
        if (active) setBills(mine);
      } catch (err) {
        if (active) setError('Unable to load your bills right now.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadBills();
    return () => {
      active = false;
    };
  }, [user]);

  const totalUnpaid = bills
    .filter((b) => b.status === 'unpaid')
    .reduce((sum, b) => sum + Number(b.amount || 0), 0);

  return (
    <div className="ds-stack-lg">
      <BillsHeader totalUnpaid={totalUnpaid} />
      <BillsContent bills={bills} loading={loading} error={error} />
    </div>
  );
}