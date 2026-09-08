import React, { useState } from 'react';
import { Newspaper, Send, Globe, Rss, ShieldCheck, Heart } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#450A0A',
        color: '#FEF2F2',
        borderTop: '4px solid #DC2626',
        marginTop: 'auto',
        padding: '4rem 1.5rem 2rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                }}
              >
                <Newspaper size={24} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                NEWSHUB
              </span>
            </div>
            <p style={{ color: '#FCA5A5', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Next-generation news intelligence platform powering editorial clarity, automated aggregation, and unbiased journalism.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#rss" style={{ color: '#FEF2F2' }} aria-label="RSS Feed"><Rss size={20} /></a>
              <a href="#globe" style={{ color: '#FEF2F2' }} aria-label="Global Edition"><Globe size={20} /></a>
              <a href="#trust" style={{ color: '#FEF2F2' }} aria-label="Trust Standards"><ShieldCheck size={20} /></a>
            </div>
          </div>

          {/* Editorial Desk Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                color: '#FFFFFF',
                marginBottom: '1rem',
                borderBottom: '1px solid #7F1D1D',
                paddingBottom: '0.5rem',
              }}
            >
              Editorial Desks
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['World & Politics', 'Technology & AI', 'Business & Markets', 'Science & Innovation', 'Culture & Society'].map((cat) => (
                <li key={cat}>
                  <a href={`#${cat.toLowerCase()}`} style={{ color: '#FCA5A5', fontSize: '0.9rem' }}>
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                color: '#FFFFFF',
                marginBottom: '1rem',
                borderBottom: '1px solid #7F1D1D',
                paddingBottom: '0.5rem',
              }}
            >
              Daily Morning Brief
            </h4>
            <p style={{ color: '#FCA5A5', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Curated intelligence delivered directly to your inbox every morning at 6:00 AM.
            </p>
            {subscribed ? (
              <div
                style={{
                  backgroundColor: '#1E40AF',
                  color: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Thank you for subscribing to NewsHub Briefing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }}
                />
                <Button type="submit" variant="primary" icon={Send}>
                  Subscribe Briefing
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid #7F1D1D',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#FCA5A5',
          }}
        >
          <span>&copy; {new Date().getFullYear()} NewsHub Media Group. All rights reserved.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Crafted with</span>
            <Heart size={14} style={{ color: '#EF4444', fill: '#EF4444' }} />
            <span>for Modern Editorial Journalism.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
