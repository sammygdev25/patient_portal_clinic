import './App.css';
import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { Footer } from './components/ui/Footer.tsx';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientProfilePage from './pages/PatientProfilePage';
import VisitNotesPage from './pages/VisitNotesPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import BillsPage from './pages/BillsPage';
import DocumentsPage from './pages/DocumentsPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import DoctorSchedulePage from './pages/DoctorSchedulePage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import PatientRecordPage from './pages/PatientRecordPage';
import VisitNoteFormPage from './pages/VisitNoteFormPage';
import ReceptionistDashboardPage from './pages/ReceptionistDashboardPage';
import ScheduleManagementPage from './pages/ScheduleManagementPage';
import PatientCheckInPage from './pages/PatientCheckInPage';
import PatientManagementPage from './pages/PatientManagementPage';
import ProfilePage from './pages/ProfilePage';

interface RequireAuthProps { children: ReactNode }

function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth() as { isAuthenticated?: boolean; loading?: boolean };
  if (auth && auth.loading) {
    return null;
  }
  const authed = auth && typeof auth.isAuthenticated === 'boolean' ? auth.isAuthenticated : Boolean(localStorage.getItem('token'));
  if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className="ds-page">
          <Navbar />
          <main className="ds-page-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/patient/dashboard" element={<RequireAuth><PatientDashboardPage /></RequireAuth>} />
              <Route path="/patient/book" element={<RequireAuth><AppointmentBookingPage /></RequireAuth>} />
              <Route path="/patient/appointments" element={<RequireAuth><AppointmentsPage /></RequireAuth>} />
              <Route path="/patient/profile" element={<RequireAuth><PatientProfilePage /></RequireAuth>} />
              <Route path="/patient/visit-notes" element={<RequireAuth><VisitNotesPage /></RequireAuth>} />
              <Route path="/patient/prescriptions" element={<RequireAuth><PrescriptionsPage /></RequireAuth>} />
              <Route path="/patient/bills" element={<RequireAuth><BillsPage /></RequireAuth>} />
              <Route path="/patient/documents" element={<RequireAuth><DocumentsPage /></RequireAuth>} />
              <Route path="/staff/doctor/dashboard" element={<RequireAuth><DoctorDashboardPage /></RequireAuth>} />
              <Route path="/staff/doctor/schedule" element={<RequireAuth><DoctorSchedulePage /></RequireAuth>} />
              <Route path="/staff/doctor/profile" element={<RequireAuth><DoctorProfilePage /></RequireAuth>} />
              <Route path="/staff/doctor/patients/:id" element={<RequireAuth><PatientRecordPage /></RequireAuth>} />
              <Route path="/staff/doctor/appointments/:id/note" element={<RequireAuth><VisitNoteFormPage /></RequireAuth>} />
              <Route path="/staff/receptionist/dashboard" element={<RequireAuth><ReceptionistDashboardPage /></RequireAuth>} />
              <Route path="/staff/receptionist/schedule" element={<RequireAuth><ScheduleManagementPage /></RequireAuth>} />
              <Route path="/staff/receptionist/checkin" element={<RequireAuth><PatientCheckInPage /></RequireAuth>} />
              <Route path="/staff/receptionist/patients" element={<RequireAuth><PatientManagementPage /></RequireAuth>} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer brand="Patient Portal Clinic" columns={[{ title: 'Explore', links: [{ label: 'Home', to: '/' }, { label: 'Profile', to: '/profile' }] }]} />
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
