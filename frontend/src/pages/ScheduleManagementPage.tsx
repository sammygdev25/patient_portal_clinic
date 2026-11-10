import { useEffect, useState, useCallback } from 'react';
import ReceptionistNavbar from '../components/ReceptionistNavbar';
import ScheduleManagementHeader from '../components/ScheduleManagementHeader';
import ScheduleManagementContent from '../components/ScheduleManagementContent';
import DoctorScheduleFilter from '../components/DoctorScheduleFilter';
import { getAppointmentList, updateAppointment, getDoctorProfileList } from '../api';
import type { Appointment, DoctorProfile } from '../types';

export default function ScheduleManagementPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorProfiles, setDoctorProfiles] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<{ doctorId: string; specialty: string }>({
    doctorId: '',
    specialty: '',
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [appointmentData, doctorData] = await Promise.all([
        getAppointmentList(),
        getDoctorProfileList(),
      ]);
      setAppointments(Array.isArray(appointmentData) ? appointmentData : []);
      setDoctorProfiles(Array.isArray(doctorData) ? doctorData : []);
    } catch (err) {
      setAppointments([]);
      setDoctorProfiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await updateAppointment(id, { status });
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
      );
    } catch (err) {
      await loadData();
    }
  };

  const doctorOptions = doctorProfiles.map((profile) => ({
    id: profile.user,
    doctor_profile: {
      specialty: profile.specialty,
    },
  }));

  const specialtyByDoctorId: Record<string, string> = {};
  doctorProfiles.forEach((profile) => {
    specialtyByDoctorId[String(profile.user)] = profile.specialty;
  });

  const handleFilter = (nextFilters: { doctorId: string; specialty: string }) => {
    setFilters(nextFilters);
  };

  const filteredAppointments = appointments.filter((appt) => {
    const apptDoctorId = String(appt.doctor);
    if (filters.doctorId && apptDoctorId !== filters.doctorId) {
      return false;
    }
    if (filters.specialty) {
      const apptSpecialty = specialtyByDoctorId[apptDoctorId];
      if (apptSpecialty !== filters.specialty) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <ReceptionistNavbar />
      <div className="ds-stack-lg">
        <ScheduleManagementHeader />
        <DoctorScheduleFilter doctors={doctorOptions} onFilter={handleFilter} />
        <ScheduleManagementContent
          appointments={filteredAppointments}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </>
  );
}
