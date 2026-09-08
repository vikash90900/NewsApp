import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <span className="eyebrow-tag" style={{ fontSize: '1rem' }}>404 Error</span>
      <h1 className="statement-title" style={{ marginTop: '0.5rem', color: 'var(--color-primary)' }}>
        PAGE NOT FOUND.
      </h1>
      <p
        style={{
          maxWidth: '540px',
          color: 'var(--color-subtle)',
          fontSize: '1.1rem',
          margin: '1rem 0 2rem 0',
        }}
      >
        The dispatch or page you are looking for may have been archived, renamed, or does not exist in our editorial catalog.
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Back to Front Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
