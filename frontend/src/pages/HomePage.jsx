import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNewsArticles, triggerNewsFetch } from '../services/newsService';
import SearchBar from '../components/News/SearchBar';
import NewsFilters from '../components/News/NewsFilters';
import NewsGrid from '../components/News/NewsGrid';
import { AlertCircle, RefreshCw, Flame, ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import { formatDate } from '../utils/formatters';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingLatest, setFetchingLatest] = useState(false);
  const [error, setError] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const navigate = useNavigate();

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNewsArticles({
        category: selectedCategory,
        location: selectedLocation,
      });
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Unable to load news articles at this moment. Please verify your connection or try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedLocation]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleRefreshLatest = async () => {
    try {
      setFetchingLatest(true);
      await triggerNewsFetch();
      await fetchArticles();
    } catch (err) {
      console.error('Error triggering news fetch:', err);
      setError('Failed to fetch latest news from external sources.');
    } finally {
      setFetchingLatest(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
  };

  // Client-side search filtering on title/description/source
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        (article.title && article.title.toLowerCase().includes(query)) ||
        (article.description && article.description.toLowerCase().includes(query)) ||
        (article.source && article.source.toLowerCase().includes(query))
    );
  }, [articles, searchQuery]);

  // Featured article is the first item in the list
  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>
      {/* Dashboard Header Banner */}
      <header
        style={{
          marginBottom: 'var(--space-2xl)',
          paddingBottom: 'var(--space-lg)',
          borderBottom: '2px solid var(--color-border)'
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-lg)'
          }}
        >
          <div>
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '4px 12px', 
                borderRadius: '16px', 
                backgroundColor: 'var(--color-white)', 
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: '0.8rem',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                marginBottom: 'var(--space-xs)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Sparkles size={14} /> LIVE EDITORIAL DASHBOARD
            </div>
            <h1 
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                fontWeight: 700, 
                margin: 0,
                color: 'var(--color-text)',
                letterSpacing: '-0.02em'
              }}
            >
              Today's News
            </h1>
            <p 
              style={{ 
                color: 'var(--color-muted)', 
                margin: '4px 0 0 0', 
                fontSize: '1.05rem' 
              }}
            >
              Real-time global news aggregation, verified coverage, and categorized intelligence
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefreshLatest}
            disabled={fetchingLatest || loading}
            className="btn-secondary"
            style={{ fontSize: '0.9rem', padding: '10px 18px' }}
            aria-label="Fetch latest news articles"
          >
            <RefreshCw 
              size={16} 
              style={{ 
                animation: fetchingLatest ? 'spin 1s linear infinite' : 'none' 
              }} 
            />
            <span>{fetchingLatest ? 'Fetching Latest...' : 'Fetch Latest News'}</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--space-md)',
            backgroundColor: 'var(--color-white)',
            padding: 'var(--space-lg)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </div>

          <NewsFilters
            category={selectedCategory}
            location={selectedLocation}
            onCategoryChange={setSelectedCategory}
            onLocationChange={setSelectedLocation}
            onReset={handleResetFilters}
          />
        </div>
      </header>

      {/* Error Alert State */}
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-md)',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: 'var(--color-error)',
            padding: 'var(--space-md)',
            borderRadius: '12px',
            marginBottom: 'var(--space-xl)'
          }}
          role="alert"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <AlertCircle size={24} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={fetchArticles}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.875rem' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Featured / Breaking News Section (If available and not loading) */}
      {!loading && !error && featuredArticle && (
        <section style={{ marginBottom: 'var(--space-2xl)' }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-xs)',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: 'var(--space-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <Flame size={18} /> Breaking Feature
          </div>

          <div
            onClick={() => navigate(`/news/${featuredArticle._id || featuredArticle.id}`, { state: { article: featuredArticle } })}
            tabIndex={0}
            role="button"
            aria-label={`Read featured story: ${featuredArticle.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/news/${featuredArticle._id || featuredArticle.id}`, { state: { article: featuredArticle } });
              }
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-xl)',
              backgroundColor: 'var(--color-white)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              transition: 'transform var(--transition-speed), box-shadow var(--transition-speed)'
            }}
            className="card"
          >
            {/* Image */}
            <div style={{ height: '320px', width: '100%', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
              {featuredArticle.image_url ? (
                <img
                  src={featuredArticle.image_url}
                  alt={featuredArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)' }}>
                  NewsHub Feature
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                {featuredArticle.category && (
                  <span
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-white)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}
                  >
                    {featuredArticle.category}
                  </span>
                )}
                {featuredArticle.location && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {featuredArticle.location}
                  </span>
                )}
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  margin: '0 0 var(--space-sm) 0',
                  lineHeight: 1.25,
                  color: 'var(--color-text)'
                }}
              >
                {featuredArticle.title}
              </h2>

              {featuredArticle.description && (
                <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', lineHeight: 1.6, margin: '0 0 var(--space-lg) 0' }}>
                  {featuredArticle.description}
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {formatDate(featuredArticle.published_date || featuredArticle.createdAt)}
                </span>
                <span className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                  <span>Read Full Story</span>
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main News Feed Grid */}
      <section>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: 'var(--space-lg)' 
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            {featuredArticle ? 'Latest Articles' : 'News Feed'}
          </h2>
          {!loading && (
            <span style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          )}
        </div>

        <NewsGrid
          articles={featuredArticle ? gridArticles : filteredArticles}
          loading={loading}
          onResetFilters={handleResetFilters}
        />
      </section>
    </div>
  );
};

export default HomePage;
