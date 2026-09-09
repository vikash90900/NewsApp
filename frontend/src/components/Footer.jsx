import { Globe, Shield, Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      style={{ 
        backgroundColor: 'var(--color-white)', 
        borderTop: '1px solid var(--color-border)', 
        marginTop: 'auto',
        padding: 'var(--space-xl) 0'
      }}
    >
      <div 
        className="container"
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 'var(--space-md)',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', color: 'var(--color-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', fontSize: '0.9rem' }}>
            <Globe size={16} /> Global News Aggregation
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', fontSize: '0.9rem' }}>
            <Shield size={16} /> Verified Sources
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', fontSize: '0.9rem' }}>
            <Info size={16} /> Real-Time Intelligence
          </span>
        </div>

        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-muted)' }}>
          &copy; {new Date().getFullYear()} NewsHub Platform. All rights reserved. Editorial Journalism & News Aggregation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
