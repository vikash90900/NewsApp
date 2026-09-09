import NewsCard from './NewsCard';
import { FileX, RotateCcw } from 'lucide-react';

const NewsGrid = ({ articles = [], loading = false, onResetFilters }) => {
  // Skeleton Loading Grid
  if (loading) {
    return (
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: 'var(--space-lg)',
          width: '100%'
        }}
        aria-busy="true"
        aria-live="polite"
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
              height: '380px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="skeleton" style={{ width: '100%', height: '190px' }} />
            <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', flex: 1 }}>
              <div className="skeleton" style={{ width: '40%', height: '14px' }} />
              <div className="skeleton" style={{ width: '90%', height: '22px' }} />
              <div className="skeleton" style={{ width: '70%', height: '22px' }} />
              <div className="skeleton" style={{ width: '100%', height: '14px', marginTop: 'var(--space-xs)' }} />
              <div className="skeleton" style={{ width: '80%', height: '14px' }} />
              <div className="skeleton" style={{ width: '30%', height: '16px', marginTop: 'auto' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (!articles || articles.length === 0) {
    return (
      <div 
        style={{ 
          textAlign: 'center', 
          padding: 'var(--space-3xl) var(--space-md)',
          backgroundColor: 'var(--color-white)',
          borderRadius: '16px',
          border: '1px border var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '560px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <div 
          style={{ 
            display: 'inline-flex', 
            padding: '16px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-primary)',
            marginBottom: 'var(--space-md)'
          }}
        >
          <FileX size={36} />
        </div>
        <h3 style={{ fontSize: '1.4rem', margin: '0 0 var(--space-xs) 0' }}>
          No Articles Found
        </h3>
        <p style={{ color: 'var(--color-muted)', margin: '0 0 var(--space-lg) 0', fontSize: '0.95rem' }}>
          We couldn't find any news matching your current filters or search criteria.
        </p>
        {onResetFilters && (
          <button 
            type="button" 
            onClick={onResetFilters} 
            className="btn-primary"
          >
            <RotateCcw size={18} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    );
  }

  // Articles Grid
  return (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: 'var(--space-lg)',
        width: '100%'
      }}
    >
      {articles.map((article) => (
        <NewsCard key={article._id || article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsGrid;
