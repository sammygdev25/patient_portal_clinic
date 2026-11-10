import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DoctorProfileHeader from '../components/DoctorProfileHeader';
import DoctorProfileContent from '../components/DoctorProfileContent';
import DoctorProfileDetails from '../components/DoctorProfileDetails';
import { getDoctorProfileList, createDoctorProfile, updateDoctorProfile, getAppointmentList } from '../api';
import type { DoctorProfile, Appointment } from '../types';
import { LoadingBlock } from '../components/ui/Loading.tsx';
import { Alert } from '../components/ui/Badge.tsx';

export default function DoctorProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [profiles, appts] = await Promise.all([
        getDoctorProfileList(),
        getAppointmentList(),
      ]);
      const list = Array.isArray(profiles) ? profiles : [];
      const mine = list.find((p: DoctorProfile) => p.user === user?.id) || null;
      setProfile(mine);

      const apptList = Array.isArray(appts) ? appts : [];
      const mineAppts = apptList.filter((a: Appointment) => a.doctor === user?.id);
      setAppointments(mineAppts);
    } catch (err) {
      setError('Failed to load your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof DoctorProfile, value: string | number) => {
    setProfile((prev) => ({ ...(prev || {}), [field]: value } as DoctorProfile));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError('');
    try {
      if (profile && profile.id) {
        const updated = await updateDoctorProfile(profile.id, profile);
        setProfile(updated);
      } else {
        const payload = { ...profile, user: user.id } as Partial<DoctorProfile>;
        const created = await createDoctorProfile(payload);
        setProfile(created);
      }
    } catch (err) {
      setError('Failed to save your profile. Please check the fields and try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingBlock label="Loading your profile..." />;
  }

  return (
    <div className="ds-stack-lg">
      <DoctorProfileHeader user={user} />
      {error && <Alert tone="danger">{error}</Alert>}
      <DoctorProfileContent profile={profile} appointments={appointments} />
      <DoctorProfileDetails
        profile={profile}
        onChange={handleChange}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </div>
  );
}