import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from './icons';

const DoctorNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'ds-nav-link ds-nav-link-active' : 'ds-nav-link';

  return (
    <nav className="ds-nav">
      <div className="ds-container ds-between">
        <div className="ds-cluster" style={{ alignItems: 'center', gap: 'var(--space-lg)' }}>
          <NavLink to="/staff/doctor/dashboard" className="ds-nav-brand">
            <Icon name="award" size={20} />
            <span>Clinic Portal</span>
          </NavLink>
          <div className="ds-cluster" style={{ gap: 'var(--space-md)' }}>
            <NavLink to="/staff/doctor/dashboard" className={navLinkClass}>
              <Icon name="home" size={16} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/staff/doctor/schedule" className={navLinkClass}>
              <Icon name="calendar" size={16} />
              <span>Schedule</span>
            </NavLink>
            <NavLink to="/staff/doctor/profile" className={navLinkClass}>
              <Icon name="user" size={16} />
              <span>Profile</span>
            </NavLink>
          </div>
        </div>
        <div className="ds-cluster" style={{ alignItems: 'center', gap: 'var(--space-md)' }}>
          <span className="ds-muted ds-small">
            Dr. {user?.username ?? 'Doctor'}
          </span>
          <button type="button" className="btn btn-secondary" onClick={handleLogout}>
            <Icon name="logout" size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;