import { useEffect, useState } from 'react';
import { getDoctorProfileList } from '../api';
import type { DoctorProfile } from '../types';
import PatientNavbar from '../components/PatientNavbar';
import AppointmentBookingHeader from '../components/AppointmentBookingHeader';
import AppointmentBookingForm from '../components/AppointmentBookingForm';
import AppointmentBookingInfo from '../components/AppointmentBookingInfo';
import { LoadingBlock } from '../components/ui/Loading.tsx';

export default function AppointmentBookingPage() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getDoctorProfileList()
      .then((data) => {
        if (mounted) setDoctors(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setDoctors([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <PatientNavbar />
      <div className="ds-stack-lg">
        <AppointmentBookingHeader />
        {loading ? (
          <LoadingBlock label="Loading doctors..." />
        ) : (
          <AppointmentBookingForm doctors={doctors} />
        )}
        <AppointmentBookingInfo />
      </div>
    </>
  );
}