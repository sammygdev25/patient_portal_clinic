import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from '../components/icons';

const NAV_LINKS = [
  { to: '/staff/receptionist/dashboard', label: 'Dashboard', icon: 'home' as const },
  { to: '/staff/receptionist/schedule', label: 'Schedule', icon: 'calendar' as const },
  { to: '/staff/receptionist/checkin', label: 'Check-In', icon: 'check' as const },
  { to: '/staff/receptionist/patients', label: 'Patients', icon: 'users' as const },
];

export default function ReceptionistNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="ds-nav">
      <div className="ds-container ds-between">
        <Link to="/staff/receptionist/dashboard" className="ds-cluster" style={{ alignItems: 'center', gap: 'var(--space-sm)' }}>
          <Icon name="calendar" size={22} />
          <strong>Clinic Front Desk</strong>
        </Link>

        <div className="ds-cluster" style={{ gap: 'var(--space-md)', alignItems: 'center' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`ds-cluster${location.pathname === link.to ? ' active' : ''}`}
              style={{
                alignItems: 'center',
                gap: 'var(--space-xs)',
                color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: location.pathname === link.to ? 600 : 400,
              }}
            >
              <Icon name={link.icon} size={18} />
              <span>{link.label}</span>
            </Link>
          ))}

          <Link
            to="/profile"
            className="ds-cluster"
            style={{
              alignItems: 'center',
              gap: 'var(--space-xs)',
              color: location.pathname === '/profile' ? 'var(--color-primary)' : 'var(--color-text)',
            }}
          >
            <Icon name="user" size={18} />
            <span>{user?.username || 'Profile'}</span>
          </Link>

          <button type="button" className="btn btn-secondary" onClick={handleLogout}>
            <Icon name="logout" size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}