import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from './icons';

const PatientNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const links = [
    { to: '/patient/dashboard', label: 'Dashboard', icon: 'home' as const },
    { to: '/patient/book', label: 'Book', icon: 'calendar' as const },
    { to: '/patient/appointments', label: 'Appointments', icon: 'clock' as const },
    { to: '/patient/visit-notes', label: 'Visit Notes', icon: 'book' as const },
    { to: '/patient/prescriptions', label: 'Prescriptions', icon: 'tag' as const },
    { to: '/patient/bills', label: 'Bills', icon: 'credit-card' as const },
    { to: '/patient/documents', label: 'Documents', icon: 'upload' as const },
    { to: '/patient/profile', label: 'Profile', icon: 'user' as const },
  ];

  return (
    <div className="ds-nav" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="ds-container ds-between" style={{ paddingTop: 'var(--space-sm)', paddingBottom: 'var(--space-sm)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        <div className="ds-cluster" style={{ gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          {(Array.isArray(links) ? links : []).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `ds-cluster ds-small${isActive ? ' ds-nav-active' : ''}`
              }
              style={({ isActive }) => ({
                gap: 'var(--space-xs)',
                alignItems: 'center',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 600 : 400,
                textDecoration: 'none',
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-md)',
              })}
            >
              <Icon name={link.icon} size={16} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
        <div className="ds-cluster" style={{ gap: 'var(--space-sm)', alignItems: 'center' }}>
          <span className="ds-small ds-muted">{user?.username}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            <Icon name="logout" size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientNavbar;