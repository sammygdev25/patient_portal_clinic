import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  getAppointmentList,
  getPrescriptionList,
  getBillList,
  getClinicDocumentList,
} from '../api';
import type { Appointment, Prescription, Bill, ClinicDocument } from '../types';
import { LoadingBlock } from '../components/ui/Loading.tsx';
import PatientDashboardHeader from '../components/PatientDashboardHeader';
import PatientDashboardStats from '../components/PatientDashboardStats';
import PatientDashboardRecent from '../components/PatientDashboardRecent';
import PatientDashboardActions from '../components/PatientDashboardActions';

export default function PatientDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [documents, setDocuments] = useState<ClinicDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const [apps, rx, billList, docs] = await Promise.all([
          getAppointmentList(),
          getPrescriptionList(),
          getBillList(),
          getClinicDocumentList(),
        ]);
        if (!active) return;
        const uid = user?.id;
        setAppointments(
          uid ? (Array.isArray(apps) ? apps : []).filter((a) => a.patient === uid) : apps
        );
        setPrescriptions(
          uid ? (Array.isArray(rx) ? rx : []).filter((p) => p.patient === uid) : rx
        );
        setBills(uid ? (Array.isArray(billList) ? billList : []).filter((b) => b.patient === uid) : billList);
        setDocuments(uid ? (Array.isArray(docs) ? docs : []).filter((d) => d.patient === uid) : docs);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [user]);

  if (loading) {
    return <LoadingBlock label="Loading your dashboard..." />;
  }

  return (
    <div className="ds-stack-lg">
      <PatientDashboardHeader
        userName={user?.username || 'Patient'}
        onBookAppointment={() => navigate('/patient/book')}
      />
      <PatientDashboardStats
        appointments={appointments}
        prescriptions={prescriptions}
        bills={bills}
        documents={documents}
      />
      <PatientDashboardRecent appointments={appointments} />
      <PatientDashboardActions />
    </div>
  );
}