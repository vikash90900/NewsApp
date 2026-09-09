import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="container" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}
    >
      <div 
        style={{ 
          backgroundColor: 'var(--color-white)', 
          padding: 'var(--space-xl)', 
          borderRadius: '16px', 
          boxShadow: 'var(--shadow-lg)', 
          width: '100%', 
          maxWidth: '440px',
          border: '1px solid var(--color-border)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              padding: '12px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-primary)',
              marginBottom: 'var(--space-sm)'
            }}
          >
            <LogIn size={28} />
          </div>
          <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Account Sign In</h1>
          <p style={{ color: 'var(--color-muted)', marginTop: '4px', fontSize: '0.95rem' }}>
            Enter your credentials to access your NewsHub profile
          </p>
        </div>

        {formError && (
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-sm)', 
              backgroundColor: '#FEF2F2', 
              border: '1px solid #FCA5A5', 
              color: 'var(--color-error)',
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: 'var(--space-md)',
              fontSize: '0.9rem'
            }}
            role="alert"
          >
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <label 
              htmlFor="email" 
              style={{ 
                display: 'block', 
                fontWeight: 600, 
                marginBottom: '6px', 
                fontSize: '0.9rem' 
              }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                required
                style={{ paddingLeft: '40px' }}
              />
              <Mail 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--color-muted)' 
                }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <label 
              htmlFor="password" 
              style={{ 
                display: 'block', 
                fontWeight: 600, 
                marginBottom: '6px', 
                fontSize: '0.9rem' 
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required
                style={{ paddingLeft: '40px' }}
              />
              <Lock 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--color-muted)' 
                }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '12px' }}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--color-muted)' }}>Don't have an account yet? </span>
          <Link to="/register" style={{ fontWeight: 600 }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
