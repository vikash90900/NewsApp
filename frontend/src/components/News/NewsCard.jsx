import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, MapPin, Calendar, ExternalLink, Check, ImageOff } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const NewsCard = ({ article }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const articleId = article._id || article.id;

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on action buttons or links
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    navigate(`/news/${articleId}`, { state: { article } });
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = window.location.origin + `/news/${articleId}`;
    const shareData = {
      title: article.title || 'NewsHub Article',
      text: article.description || article.title,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback if clipboard permission is denied
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <article
      className="card"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${article.title}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
        outline: 'none',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-white)'
      }}
    >
      {/* Article Image Container */}
      <div 
        style={{ 
          width: '100%', 
          height: '190px', 
          backgroundColor: '#F1F5F9',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {article.image_url && !imageError ? (
          <img
            src={article.image_url}
            alt={article.title || 'News article image'}
            onError={() => setImageError(true)}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform var(--transition-speed)'
            }}
          />
        ) : (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 'var(--space-xs)',
              color: 'var(--color-muted)' 
            }}
          >
            <ImageOff size={32} />
            <span style={{ fontSize: '0.8rem' }}>NewsHub Editorial</span>
          </div>
        )}

        {/* Category Badge */}
        {article.category && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {article.category}
          </span>
        )}

        {/* Location Badge */}
        {article.location && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(4px)',
              color: 'var(--color-white)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <MapPin size={12} />
            <span>{article.location}</span>
          </span>
        )}
      </div>

      {/* Card Content */}
      <div 
        style={{ 
          padding: 'var(--space-md)', 
          display: 'flex', 
          flexDirection: 'column', 
          flex: 1 
        }}
      >
        {/* Meta Header */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            fontSize: '0.8rem', 
            color: 'var(--color-muted)',
            marginBottom: 'var(--space-xs)' 
          }}
        >
          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
            {article.source || article.author || 'NewsHub'}
          </span>
          {(article.published_date || article.createdAt) && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} />
              {formatDate(article.published_date || article.createdAt)}
            </span>
          )}
        </div>

        {/* Headline */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.3,
            margin: '0 0 var(--space-xs) 0',
            color: 'var(--color-text)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {article.title}
        </h3>

        {/* Short Description */}
        {article.description && (
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--color-muted)',
              lineHeight: 1.5,
              margin: '0 0 var(--space-md) 0',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1
            }}
          >
            {article.description}
          </p>
        )}

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-sm)',
            borderTop: '1px solid var(--color-border)',
            marginTop: 'auto'
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--color-cta)',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
            Read Story
            <ExternalLink size={14} />
          </span>

          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share article"
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: copied ? 'var(--color-success)' : 'var(--color-muted)',
                transition: 'all var(--transition-speed)',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
            </button>

            {copied && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  right: 0,
                  marginBottom: '6px',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  color: 'white',
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-sm)',
                  pointerEvents: 'none'
                }}
              >
                Copied to clipboard!
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
