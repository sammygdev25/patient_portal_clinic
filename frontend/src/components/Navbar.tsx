import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NAV_LINKS = [
  { path: '/', label: 'Home', auth: false },
  { path: '/patient/dashboard', label: 'Patient Dashboard', auth: true },
  { path: '/patient/book', label: 'Appointment Booking', auth: true },
  { path: '/patient/appointments', label: 'Appointments', auth: true },
  { path: '/patient/profile', label: 'Patient Profile', auth: true },
  { path: '/patient/visit-notes', label: 'Visit Notes', auth: true },
  { path: '/patient/prescriptions', label: 'Patient Prescriptions', auth: true },
  { path: '/patient/bills', label: 'Patient Bills', auth: true },
  { path: '/patient/documents', label: 'Patient Documents', auth: true },
  { path: '/staff/doctor/dashboard', label: 'Staff Doctor Dashboard', auth: true },
  { path: '/staff/doctor/schedule', label: 'Staff Doctor Schedule', auth: true },
  { path: '/staff/doctor/profile', label: 'Staff Doctor Profile', auth: true },
  { path: '/staff/receptionist/dashboard', label: 'Staff Receptionist Dashboard', auth: true },
  { path: '/staff/receptionist/schedule', label: 'Staff Receptionist Schedule', auth: true },
  { path: '/staff/receptionist/checkin', label: 'Staff Receptionist Checkin', auth: true },
  { path: '/staff/receptionist/patients', label: 'Staff Receptionist Patients', auth: true },
];
const STAFF_PREFIXES = ['/staff', '/admin'];
const STAFF_ROLE_NAMES = ['staff', 'admin'];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const staffUser = (user ?? {}) as unknown as { isStaff?: boolean; is_staff?: boolean; role?: string };
  const isStaff = Boolean(staffUser.isStaff || staffUser.is_staff || STAFF_ROLE_NAMES.indexOf(staffUser.role || '') >= 0);
  const showLink = (link: { path: string; auth?: boolean; roles?: readonly string[] }) => (link.auth !== true || isAuthenticated)
    && (STAFF_PREFIXES.some(prefix => link.path.startsWith(prefix)) === false || isStaff)
    && (link.roles === undefined || link.roles.indexOf(staffUser.role || '') >= 0);

  const handleLogout = async () => {
    if (logout) await logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        padding: '0 var(--space-lg)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '60px',
      }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 'var(--text-lg)', whiteSpace: 'nowrap',
          color: 'var(--color-primary)', textDecoration: 'none' }}>
          Patient Portal Clinic
        </Link>
        <div className="ds-nav-links">
          {NAV_LINKS.filter(showLink).map(link => (
            <Link key={link.path} to={link.path} style={{
              padding: '6px 12px', borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)', fontWeight: 500, whiteSpace: 'nowrap',
              color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              background: location.pathname === link.path ? 'var(--color-primary-light)' : 'transparent',
              textDecoration: 'none', transition: 'all var(--transition-fast)',
            }}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="ds-nav-actions">
          {isAuthenticated ? (
            <>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                {user?.username || user?.email || 'Account'}
              </span>
              <button className="btn btn-secondary" onClick={handleLogout}
                style={{ fontSize: 'var(--text-sm)', padding: '6px 12px' }}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary"
                style={{ fontSize: 'var(--text-sm)', padding: '6px 12px' }}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary"
                style={{ fontSize: 'var(--text-sm)', padding: '6px 12px' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button type="button" className="ds-nav-toggle" aria-label="Menu" aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(open => !open)}>
          {mobileOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
      <div className={'ds-nav-mobile' + (mobileOpen ? ' open' : '')} style={{ padding: '0 var(--space-lg)' }}>
        {NAV_LINKS.filter(showLink).map(link => (
          <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} style={{
            padding: '10px 4px', fontSize: 'var(--text-base)', fontWeight: 500, textDecoration: 'none',
            color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text)',
          }}>
            {link.label}
          </Link>
        ))}
        {isAuthenticated ? (
          <button className="btn btn-secondary" onClick={handleLogout}>Sign Out</button>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary" onClick={() => setMobileOpen(false)}>Sign In</Link>
            <Link to="/register" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
