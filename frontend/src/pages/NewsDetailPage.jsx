import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getNewsArticles } from '../services/newsService';
import { ArrowLeft, Calendar, MapPin, Share2, ExternalLink, Tag, BookOpen, Check, AlertCircle, Loader2 } from 'lucide-react';
import { formatDate } from '../utils/formatters';

const NewsDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!location.state?.article);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!article && id) {
      const fetchArticle = async () => {
        try {
          setLoading(true);
          const articles = await getNewsArticles();
          const found = articles.find((item) => String(item._id || item.id) === String(id));
          if (found) {
            setArticle(found);
          } else {
            setError('Article not found.');
          }
        } catch (err) {
          console.error('Error loading article:', err);
          setError('Unable to load article details.');
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id, article]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: article?.title || 'NewsHub Article',
        url: shareUrl,
      }).catch(() => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '50vh',
          gap: 'var(--space-md)' 
        }}
      >
        <Loader2 size={36} style={{ color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--color-muted)' }}>Loading article details...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container" style={{ maxWidth: '640px', padding: 'var(--space-2xl) var(--space-md)' }}>
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 'var(--space-xs)', 
            marginBottom: 'var(--space-lg)',
            color: 'var(--color-primary)',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <div 
          style={{ 
            backgroundColor: 'var(--color-white)', 
            padding: 'var(--space-2xl)', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)' 
          }}
        >
          <AlertCircle size={40} style={{ color: 'var(--color-error)', marginBottom: 'var(--space-sm)' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-xs)' }}>Article Not Found</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-lg)' }}>
            The requested article could not be retrieved or has been removed.
          </p>
          <Link to="/" className="btn-primary">Return to News Feed</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '840px', paddingBottom: 'var(--space-3xl)' }}>
      {/* Back Link */}
      <Link 
        to="/" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 'var(--space-xs)', 
          marginBottom: 'var(--space-lg)',
          fontWeight: 600,
          color: 'var(--color-primary)'
        }}
      >
        <ArrowLeft size={18} />
        <span>Back to News Dashboard</span>
      </Link>

      <article 
        style={{ 
          backgroundColor: 'var(--color-white)', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* Featured Image */}
        {article.image_url && (
          <div style={{ width: '100%', maxHeight: '420px', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
            <img 
              src={article.image_url} 
              alt={article.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        )}

        {/* Content Body */}
        <div style={{ padding: 'var(--space-2xl)' }}>
          {/* Metadata Badges */}
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Tag size={14} /> {article.category}
              </span>
            )}
            {article.location && (
              <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={16} /> {article.location}
              </span>
            )}
            <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
              <Calendar size={16} /> {formatDate(article.published_date || article.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h1 
            style={{ 
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.25, 
              margin: '0 0 var(--space-md) 0',
              color: 'var(--color-text)'
            }}
          >
            {article.title}
          </h1>

          {/* Author/Source */}
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-lg)', color: 'var(--color-muted)', fontSize: '0.95rem' }}>
            Source: <strong style={{ color: 'var(--color-text)' }}>{article.source || article.author || 'NewsHub Verified Media'}</strong>
          </div>

          {/* Lead Description */}
          {article.description && (
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 500, color: 'var(--color-text)', marginBottom: 'var(--space-xl)' }}>
              {article.description}
            </p>
          )}

          {/* Article Content */}
          {article.content && (
            <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', marginBottom: 'var(--space-2xl)' }}>
              <p>{article.content}</p>
            </div>
          )}

          {/* Bottom Actions Bar */}
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
            {article.url && (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                <span>Read Full Original Article</span>
                <ExternalLink size={16} />
              </a>
            )}

            <button 
              type="button" 
              onClick={handleShare} 
              className="btn-secondary"
            >
              {copied ? <Check size={18} style={{ color: 'var(--color-success)' }} /> : <Share2 size={18} />}
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;
