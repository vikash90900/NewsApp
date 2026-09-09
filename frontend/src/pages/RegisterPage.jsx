import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { UserPlus, User, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setFormError('Please fill in all fields.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');
      await register({ name, email, password });
      navigate('/profile', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Registration failed. Please try again.');
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
            <UserPlus size={28} />
          </div>
          <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Create Account</h1>
          <p style={{ color: 'var(--color-muted)', marginTop: '4px', fontSize: '0.95rem' }}>
            Join NewsHub for personalized news tracking
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
              htmlFor="name" 
              style={{ 
                display: 'block', 
                fontWeight: 600, 
                marginBottom: '6px', 
                fontSize: '0.9rem' 
              }}
            >
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="name"
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                required
                style={{ paddingLeft: '40px' }}
              />
              <User 
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
                placeholder="name@example.com"
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
                placeholder="Enter password"
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Register</span>
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--color-muted)' }}>Already have an account? </span>
          <Link to="/login" style={{ fontWeight: 600 }}>
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
