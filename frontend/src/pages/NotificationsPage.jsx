import { Bell, Inbox, CheckCircle2 } from 'lucide-react';

const NotificationsPage = () => {
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
            gap: 'var(--space-md)', 
            marginBottom: 'var(--space-xl)',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--space-md)'
          }}
        >
          <div 
            style={{ 
              padding: '10px', 
              borderRadius: '12px', 
              backgroundColor: 'var(--color-background)', 
              color: 'var(--color-primary)' 
            }}
          >
            <Bell size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Notifications</h1>
            <p style={{ color: 'var(--color-muted)', margin: 0, fontSize: '0.95rem' }}>
              Real-time breaking news updates and activity alerts
            </p>
          </div>
        </div>

        <div 
          style={{ 
            textAlign: 'center', 
            padding: 'var(--space-3xl) var(--space-md)',
            backgroundColor: 'var(--color-background)',
            borderRadius: '12px',
            border: '1px dashed var(--color-border)'
          }}
        >
          <Inbox size={48} style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-sm)' }} />
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-xs)' }}>
            No New Notifications
          </h2>
          <p style={{ color: 'var(--color-muted)', margin: 0, fontSize: '0.95rem' }}>
            You are all caught up! Breaking news alerts and personalized updates will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
