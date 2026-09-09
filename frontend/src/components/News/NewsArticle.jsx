import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, ExternalLink, Tag, User, Globe, ImageOff } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import ShareButton from './ShareButton';

const NewsArticle = ({ article }) => {
  const [imageError, setImageError] = useState(false);

  if (!article) return null;

  return (
    <article
      style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)'
      }}
    >
      {/* Article Navigation Bar */}
      <div 
        style={{ 
          padding: 'var(--space-md) var(--space-xl)', 
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)'
        }}
      >
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 'var(--space-xs)', 
            fontWeight: 600,
            color: 'var(--color-primary)'
          }}
        >
          <ArrowLeft size={18} />
          <span>Back to News Dashboard</span>
        </Link>

        <ShareButton title={article.title} text={article.description} />
      </div>

      {/* Hero Image */}
      <div 
        style={{ 
          width: '100%', 
          maxHeight: '480px', 
          height: '360px', 
          backgroundColor: '#F1F5F9',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {article.image_url && !imageError ? (
          <img
            src={article.image_url}
            alt={article.title || 'News article header image'}
            onError={() => setImageError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-muted)' }}>
            <ImageOff size={44} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>NewsHub Verified Editorial Coverage</span>
          </div>
        )}
      </div>

      {/* Main Content Body */}
      <div style={{ padding: 'var(--space-2xl)' }}>
        {/* Category & Location Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
          {article.category && (
            <span
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Tag size={14} /> {article.category}
            </span>
          )}

          {article.location && (
            <span
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <MapPin size={14} /> {article.location}
            </span>
          )}

          {(article.published_date || article.createdAt) && (
            <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
              <Calendar size={16} /> {formatDate(article.published_date || article.createdAt)}
            </span>
          )}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            margin: '0 0 var(--space-md) 0',
            color: 'var(--color-text)',
            letterSpacing: '-0.02em'
          }}
        >
          {article.title}
        </h1>

        {/* Author / Source Meta Bar */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-lg)', 
            borderBottom: '1px solid var(--color-border)', 
            paddingBottom: 'var(--space-md)', 
            marginBottom: 'var(--space-xl)',
            color: 'var(--color-muted)', 
            fontSize: '0.95rem',
            flexWrap: 'wrap'
          }}
        >
          {article.source && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={16} style={{ color: 'var(--color-primary)' }} />
              Source: <strong style={{ color: 'var(--color-text)' }}>{article.source}</strong>
            </span>
          )}

          {article.author && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} />
              Author: <strong style={{ color: 'var(--color-text)' }}>{article.author}</strong>
            </span>
          )}
        </div>

        {/* Lead Summary / Description */}
        {article.description && (
          <div 
            style={{ 
              fontSize: '1.25rem', 
              lineHeight: 1.6, 
              fontWeight: 500, 
              color: 'var(--color-text)', 
              marginBottom: 'var(--space-xl)',
              paddingLeft: 'var(--space-md)',
              borderLeft: '4px solid var(--color-primary)'
            }}
          >
            {article.description}
          </div>
        )}

        {/* Full Article Content */}
        {article.content && (
          <div 
            style={{ 
              fontSize: '1.1rem', 
              lineHeight: 1.8, 
              color: '#334155', 
              marginBottom: 'var(--space-2xl)' 
            }}
          >
            <p>{article.content}</p>
          </div>
        )}

        {/* Bottom CTA Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-lg)',
            borderTop: '1px solid var(--color-border)',
            flexWrap: 'wrap',
            gap: 'var(--space-md)'
          }}
        >
          {article.url ? (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Read Full Article on Original Source</span>
              <ExternalLink size={16} />
            </a>
          ) : (
            <span style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              Verified NewsHub Syndicated Article
            </span>
          )}

          <ShareButton title={article.title} text={article.description} />
        </div>
      </div>
    </article>
  );
};

export default NewsArticle;
