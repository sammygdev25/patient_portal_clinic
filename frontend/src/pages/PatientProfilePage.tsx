import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PatientNavbar from '../components/PatientNavbar';
import PatientProfileHeader from '../components/PatientProfileHeader';
import PatientProfileContent from '../components/PatientProfileContent';
import PatientProfileDetails from '../components/PatientProfileDetails';
import { getPatientProfileList, updatePatientProfile, createPatientProfile, getAppointmentList } from '../api';
import type { PatientProfile, Appointment } from '../types';

export default function PatientProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    try {
      const profiles = await getPatientProfileList();
      const mine = (Array.isArray(profiles) ? profiles : []).find(
        (p: PatientProfile) => p.user === user?.id
      );
      setProfile(mine || null);

      const appts = await getAppointmentList();
      const list = Array.isArray(appts) ? appts : [];
      const myAppts = list.filter((a: Appointment) => a.patient === user?.id);
      setAppointments(myAppts);
    } catch (err) {
      setProfile(null);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(data: Partial<PatientProfile>) {
    try {
      if (profile && profile.id) {
        const updated = await updatePatientProfile(profile.id, data);
        setProfile(updated);
      } else {
        const created = await createPatientProfile({
          ...data,
          user: user?.id,
        } as Partial<PatientProfile>);
        setProfile(created);
      }
    } catch (err) {
      // surfaced via PatientProfileDetails form feedback
    }
  }

  const userName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.username || user?.email || '';

  return (
    <>
      <PatientNavbar />
      <div className="ds-stack-lg">
        <PatientProfileHeader userName={userName} />
        {loading ? (
          <div className="ds-container">
            <div className="ds-loading">Loading profile...</div>
          </div>
        ) : (
          <>
            <PatientProfileContent appointments={appointments} />
            <PatientProfileDetails profile={profile} onSave={handleSave} />
          </>
        )}
      </div>
    </>
  );
}