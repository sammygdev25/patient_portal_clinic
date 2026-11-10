import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getUser,
  getPatientProfileList,
  getAppointmentList,
  getVisitNoteList,
  getPrescriptionList,
  getDoctorProfileList,
} from '../api';
import type {
  User,
  PatientProfile,
  Appointment,
  VisitNote,
  Prescription,
  DoctorProfile,
} from '../types';
import { LoadingBlock } from '../components/ui/Loading.tsx';
import { Alert } from '../components/ui/Badge.tsx';
import { EmptyState } from '../components/ui/EmptyState.tsx';
import PatientRecordMedia from '../components/PatientRecordMedia';
import PatientInfoCard from '../components/PatientInfoCard';
import PatientRecordFacts from '../components/PatientRecordFacts';
import VisitHistoryList from '../components/VisitHistoryList';
import PatientRecordRelated from '../components/PatientRecordRelated';

export default function PatientRecordPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patientId = id ? Number(id) : null;

  const [patient, setPatient] = useState<User | null>(null);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notes, setNotes] = useState<VisitNote[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!patientId) {
      setError('No patient specified.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadRecord = async () => {
      setLoading(true);
      setError('');
      try {
        const [userData, profileList, appointmentList, noteList, prescriptionList, doctorList] =
          await Promise.all([
            getUser(patientId),
            getPatientProfileList(),
            getAppointmentList(),
            getVisitNoteList(),
            getPrescriptionList(),
            getDoctorProfileList(),
          ]);

        if (cancelled) return;

        const matchedProfile = (Array.isArray(profileList) ? profileList : []).find(
          (p: any) => Number(p.user) === patientId || Number(p.user?.id) === patientId
        );

        const patientAppointments = (Array.isArray(appointmentList) ? appointmentList : []).filter(
          (a: any) => Number(a.patient) === patientId || Number(a.patient?.id) === patientId
        );
        const patientNotes = (Array.isArray(noteList) ? noteList : []).filter(
          (n: any) => Number(n.patient) === patientId || Number(n.patient?.id) === patientId
        );
        const patientPrescriptions = (Array.isArray(prescriptionList) ? prescriptionList : []).filter(
          (p: any) => Number(p.patient) === patientId || Number(p.patient?.id) === patientId
        );

        setPatient(userData || null);
        setProfile(matchedProfile || null);
        setAppointments(patientAppointments);
        setNotes(patientNotes);
        setPrescriptions(patientPrescriptions);
        setDoctors(Array.isArray(doctorList) ? doctorList.slice(0, 6) : []);
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load this patient record right now.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadRecord();

    return () => {
      cancelled = true;
    };
  }, [patientId]);

  const handleNewVisitNote = () => {
    if (appointments.length === 0) return;
    const mostRecent = [...appointments].sort(
      (a: any, b: any) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime()
    )[0];
    if (mostRecent) {
      navigate(`/staff/doctor/appointments/${mostRecent.id}/note`);
    }
  };

  if (loading) {
    return <LoadingBlock label="Loading patient record..." />;
  }

  if (error || !patient) {
    return (
      <div className="ds-container">
        <Alert tone="danger">{error || 'Patient record not found.'}</Alert>
      </div>
    );
  }

  const combinedPatient = {
    id: patient.id,
    username: (patient as any).username,
    email: (patient as any).email,
    date_of_birth: profile?.date_of_birth ?? undefined,
    phone: profile?.phone,
    address: profile?.address,
    insurance_provider: profile?.insurance_provider,
    created_at: (patient as any).created_at,
  };

  return (
    <div className="ds-stack-lg">
      <PatientRecordMedia
        patient={combinedPatient as any}
        appointmentCount={appointments.length}
        onNewVisitNote={handleNewVisitNote}
      />

      <PatientInfoCard patient={combinedPatient as any} />

      <PatientRecordFacts patient={combinedPatient} />

      {notes.length === 0 && prescriptions.length === 0 ? (
        <EmptyState
          icon="clock"
          title="No visit history yet"
          text="Once a visit note or prescription is recorded for this patient, it will show up here."
        />
      ) : (
        <VisitHistoryList notes={notes} prescriptions={prescriptions} />
      )}

      <PatientRecordRelated doctors={doctors} />
    </div>
  );
}
