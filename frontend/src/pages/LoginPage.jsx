import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
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
          maxWidth: '440px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-xl)',
        }}
        hoverable={false}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="eyebrow-tag">Welcome Back</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', marginTop: '0.25rem' }}>
            Sign In to NewsHub
          </h2>
          <p style={{ color: 'var(--color-subtle)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Access your personalized news dashboard and saved dispatches
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            icon={LogIn}
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            Sign In
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--color-text)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
            Register Now
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
