import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ArrowRight, ShieldCheck, Zap, Layers, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      {/* 1. HERO SECTION: Video-First Hero Pattern */}
      <section
        style={{
          position: 'relative',
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#450A0A',
          color: '#FEF2F2',
          padding: 'var(--space-3xl) var(--space-lg)',
        }}
      >
        {/* Animated Background Video / Visual Canvas simulation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isPlaying ? 0.35 : 0.15,
            transition: 'opacity var(--transition-slow)',
            background: 'radial-gradient(circle at 50% 50%, #DC2626 0%, #450A0A 70%)',
            pointerEvents: 'none',
          }}
        >
          {/* Subtle Grid Canvas Effect */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(254, 242, 242, 0.2) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Hero Overlay Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge variant="primary">
              <Sparkles size={14} /> Breaking News Engine
            </Badge>
            <span style={{ fontSize: '0.85rem', color: '#FCA5A5', letterSpacing: '0.05em' }}>
              Real-time Global Dispatch
            </span>
          </div>

          {/* Statement Typography: Exaggerated Minimalism */}
          <h1 className="statement-title" style={{ color: '#FFFFFF' }}>
            BREAKING THROUGH THE NOISE.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: '#FCA5A5',
              maxWidth: '780px',
              fontWeight: 400,
              lineHeight: 1.5,
              fontFamily: 'var(--font-body)',
            }}
          >
            NewsHub aggregates verified stories from over 10,000 global news outlets, powered by automated intelligence and high-contrast editorial journalism.
          </p>

          {/* Hero CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-md)',
              marginTop: 'var(--space-md)',
            }}
          >
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Explore Live News Feed
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(254, 242, 242, 0.3)',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                transition: 'all var(--transition-normal)',
              }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Pause Background Motion' : 'Play Background Motion'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. KEY FEATURES OVERLAY SECTION */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '-3rem auto 0 auto',
          padding: '0 var(--space-lg)',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          <Card style={{ backgroundColor: '#FFFFFF', borderLeft: '6px solid var(--color-primary)' }}>
            <div
              style={{
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: 'var(--color-primary)',
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Zap size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Real-Time Aggregation
            </h3>
            <p style={{ color: 'var(--color-subtle)', fontSize: '0.95rem' }}>
              Instant updates across world politics, technology, finance, and science with zero latency.
            </p>
          </Card>

          <Card style={{ backgroundColor: '#FFFFFF', borderLeft: '6px solid var(--color-cta)' }}>
            <div
              style={{
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                color: 'var(--color-cta)',
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Verified Fact-Checking
            </h3>
            <p style={{ color: 'var(--color-subtle)', fontSize: '0.95rem' }}>
              Automated source ranking ensures clickbait is filtered out before reaching your screen.
            </p>
          </Card>

          <Card style={{ backgroundColor: '#FFFFFF', borderLeft: '6px solid var(--color-secondary)' }}>
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--color-secondary)',
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Layers size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Personalized Intelligence
            </h3>
            <p style={{ color: 'var(--color-subtle)', fontSize: '0.95rem' }}>
              Custom topic subscriptions and AI recommendation algorithms tailored to your read habits.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. EDITORIAL BENEFITS & DEMO PREVIEW */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '5rem auto',
          padding: '0 var(--space-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow-tag">Editorial Craft</span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              marginTop: '0.5rem',
            }}
          >
            Built for Serious News Readers
          </h2>
          <p
            style={{
              maxWidth: '640px',
              margin: '1rem auto 0 auto',
              color: 'var(--color-subtle)',
            }}
          >
            We combine bold editorial design with state-of-the-art technology to make reading the news fast, clear, and trustworthy.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                title: 'High-Contrast Typography',
                desc: 'Designed using Newsreader and Roboto fonts for effortless readability across desktop and mobile screens.',
              },
              {
                title: 'Instant Category Filtering',
                desc: 'Jump between World, Tech, Science, and Business desks in a single click.',
              },
              {
                title: 'Clean Bookmark System',
                desc: 'Save important stories to read offline or review later in your personal dashboard.',
              },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={24} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: 4 }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--color-subtle)', fontSize: '0.95rem', marginTop: 4 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-xl)',
              border: '2px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <Badge variant="primary">Sample Dispatch</Badge>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrendingUp size={14} /> 2 mins ago
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              Global Markets Shift as Breakthrough AI Models Launch Across Tech Hubs
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Financial indexes responded rapidly this morning following major releases in autonomous intelligence. Analysts report record investment activity across technology sectors worldwide...
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-light)', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-cta)' }}>Financial Times Desk</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-subtle)' }}>3 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <section
        style={{
          backgroundColor: 'var(--color-cta)',
          color: '#FFFFFF',
          padding: '5rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            Ready to upgrade your daily briefing?
          </h2>
          <p
            style={{
              color: '#93C5FD',
              fontSize: '1.2rem',
              marginBottom: '2rem',
            }}
          >
            Join thousands of journalists, analysts, and readers who rely on NewsHub daily.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/register">
              <Button
                variant="primary"
                size="lg"
                style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
              >
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
