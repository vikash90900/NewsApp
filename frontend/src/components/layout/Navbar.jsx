import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Newspaper, Bell, User, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/#trending' },
    { name: 'Topics', path: '/#topics' },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: 'Dashboard', path: '/dashboard' });
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#FEF2F2',
        borderBottom: '2px solid #FCA5A5',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'var(--color-text)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              padding: '6px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Newspaper size={24} />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
                lineHeight: 1,
                display: 'block',
              }}
            >
              NEWSHUB
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                display: 'block',
              }}
            >
              Editorial Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: isActive(link.path) ? 700 : 500,
                color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text)',
                textDecoration: 'none',
                paddingBottom: '2px',
                borderBottom: isActive(link.path) ? '2px solid var(--color-primary)' : '2px solid transparent',
                transition: 'all var(--transition-fast)',
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                aria-label="Notifications"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--color-text)',
                }}
              >
                <Bell size={18} />
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  padding: '4px 12px 4px 8px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--color-cta)',
                    color: '#FFFFFF',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                  }}
                >
                  {user?.name || 'User'}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Logout"
                  title="Logout"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 4,
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" icon={Sparkles}>
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text)',
              padding: '6px',
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '2px solid var(--color-border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--color-border-light)',
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
