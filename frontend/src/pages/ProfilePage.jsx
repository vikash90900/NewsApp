import useAuth from '../hooks/useAuth';
import { User, Mail, Calendar, ShieldCheck, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div 
        style={{ 
          backgroundColor: 'var(--color-white)', 
          padding: 'var(--space-2xl)', 
          borderRadius: '16px', 
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-lg)', 
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--space-lg)',
            marginBottom: 'var(--space-xl)',
            flexWrap: 'wrap'
          }}
        >
          <div 
            style={{ 
              width: '72px', 
              height: '72px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-background)', 
              color: 'var(--color-primary)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid var(--color-primary)'
            }}
          >
            <User size={36} />
          </div>

          <div>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>
              {currentUser?.name || 'NewsHub Subscriber'}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-muted)', marginTop: '4px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-success)' }} />
              <span>Verified Account</span>
            </div>
          </div>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          <div 
            style={{ 
              backgroundColor: 'var(--color-background)', 
              padding: 'var(--space-md)', 
              borderRadius: '10px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
              <Mail size={16} /> Email Address
            </div>
            <p style={{ margin: '6px 0 0 0', fontWeight: 600, fontSize: '1.05rem' }}>
              {currentUser?.email || 'N/A'}
            </p>
          </div>

          <div 
            style={{ 
              backgroundColor: 'var(--color-background)', 
              padding: 'var(--space-md)', 
              borderRadius: '10px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
              <Calendar size={16} /> Member Status
            </div>
            <p style={{ margin: '6px 0 0 0', fontWeight: 600, fontSize: '1.05rem' }}>
              Active Authentication Session
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={logout} className="btn-secondary">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
