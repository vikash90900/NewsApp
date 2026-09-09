import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Newspaper, User, Bell, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header 
      style={{ 
        backgroundColor: 'var(--color-white)', 
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          height: '70px' 
        }}
      >
        {/* Brand Logo */}
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-sm)',
            textDecoration: 'none' 
          }}
          aria-label="NewsHub Home"
        >
          <Newspaper size={32} style={{ color: 'var(--color-primary)' }} />
          <span 
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: 'var(--color-text)',
              letterSpacing: '-0.02em'
            }}
          >
            News<span style={{ color: 'var(--color-primary)' }}>Hub</span>
          </span>
        </Link>

        {/* Main Navigation Links */}
        <nav 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-lg)' 
          }}
          aria-label="Main Navigation"
        >
          <Link 
            to="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-xs)',
              fontWeight: 500,
              color: 'var(--color-text)'
            }}
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link 
                to="/notifications" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-xs)',
                  fontWeight: 500,
                  color: 'var(--color-text)'
                }}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </Link>

              <Link 
                to="/profile" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-xs)',
                  fontWeight: 500,
                  color: 'var(--color-text)'
                }}
              >
                <User size={18} />
                <span>{currentUser?.name || 'Profile'}</span>
              </Link>

              <button 
                onClick={handleLogout}
                className="btn-secondary"
                style={{ 
                  padding: '6px 14px', 
                  fontSize: '0.875rem' 
                }}
                aria-label="Log out"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Link to="/login" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
