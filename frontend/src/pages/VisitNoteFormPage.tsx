import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppointment, getUser } from '../api';
import type { Appointment, User, VisitNote } from '../types';
import VisitNoteFormHeader from '../components/VisitNoteFormHeader';
import VisitNoteFormForm from '../components/VisitNoteFormForm';
import VisitNoteFormInfo from '../components/VisitNoteFormInfo';
import PrescriptionForm from '../components/PrescriptionForm';
import { Section } from '../components/ui/Section.tsx';
import { Alert } from '../components/ui/Badge.tsx';
import { LoadingBlock } from '../components/ui/Loading.tsx';

function resolvePatientId(appointment: Appointment): number | undefined {
  const raw: unknown = appointment.patient;
  if (typeof raw === 'number') return raw;
  if (raw && typeof raw === 'object' && typeof (raw as { id?: unknown }).id === 'number') {
    return (raw as { id: number }).id;
  }
  return undefined;
}

export default function VisitNoteFormPage() {
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [prescriptionSaved, setPrescriptionSaved] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const appt = await getAppointment(appointmentId);
        if (cancelled) return;
        setAppointment(appt);

        const patientId = resolvePatientId(appt);
        if (patientId) {
          try {
            const user = await getUser(patientId);
            if (!cancelled) setPatient(user);
          } catch {
            // patient name is optional; the header falls back gracefully
          }
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load this appointment. It may have been removed or you may not have access to it.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (appointmentId) {
      load();
    } else {
      setLoading(false);
      setError('No appointment was specified.');
    }

    return () => {
      cancelled = true;
    };
  }, [appointmentId]);

  const handleNoteSaved = (_note: VisitNote) => {
    // VisitNoteFormForm already renders its own success state inline.
  };

  const handlePrescriptionSaved = () => {
    setPrescriptionSaved(true);
    setTimeout(() => setPrescriptionSaved(false), 2000);
  };

  if (loading) {
    return <LoadingBlock label="Loading appointment details..." />;
  }

  if (error || !appointment) {
    return (
      <div className="ds-stack-lg">
        <VisitNoteFormHeader />
        <Alert tone="danger">{error || 'Appointment not found.'}</Alert>
      </div>
    );
  }

  const patientId = resolvePatientId(appointment);
  const patientName = patient ? `Patient #${patient.id}` : undefined;

  return (
    <div className="ds-stack-lg">
      <VisitNoteFormHeader patientName={patientName} scheduledAt={appointment.scheduled_at} />

      <VisitNoteFormForm
        appointmentId={appointment.id}
        patientId={patientId}
        onSaved={handleNoteSaved}
      />

      <Section
        eyebrow="Pharmacy"
        title="Prescribe medication"
        subtitle="Add a prescription for this visit, if the patient needs one"
        tight
        narrow
      >
        {prescriptionSaved ? (
          <Alert tone="success">Prescription added. You can add another below.</Alert>
        ) : null}
        <PrescriptionForm appointment={appointment} onSave={handlePrescriptionSaved} />
      </Section>

      <VisitNoteFormInfo />
    </div>
  );
}
