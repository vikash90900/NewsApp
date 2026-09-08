import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <Card
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-xl)',
        }}
        hoverable={false}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="eyebrow-tag">Join NewsHub</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', marginTop: '0.25rem' }}>
            Create Your Account
          </h2>
          <p style={{ color: 'var(--color-subtle)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Get instant access to editorial briefings and tailored news feeds
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              border: '1px solid #FCA5A5',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={User}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            helperText="Must be at least 6 characters long"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            icon={UserPlus}
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            Create Account
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--color-text)' }}>
          Already registered?{' '}
          <Link to="/login" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
            Sign In Here
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
