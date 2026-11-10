import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDoctorProfileList } from '../api';
import type { DoctorProfile } from '../types';
import HomeHero from '../components/HomeHero';
import HomeFeatured from '../components/HomeFeatured';
import HomeCategories from '../components/HomeCategories';
import HomeAbout from '../components/HomeAbout';
import HomeCta from '../components/HomeCta';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const data = await getDoctorProfileList();
        if (mounted) setDoctors(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setDoctors([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadDoctors();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="ds-stack-lg">
      <HomeHero />
      <HomeFeatured doctors={doctors} loading={loading} />
      <HomeCategories />
      <HomeAbout />
      <HomeCta isAuthenticated={isAuthenticated} />
    </div>
  );
}