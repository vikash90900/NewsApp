import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getNewsArticles } from '../services/newsService';
import { trackActivity } from '../services/activityService';
import useAuth from '../hooks/useAuth';
import NewsArticle from '../components/News/NewsArticle';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { currentUser } = useAuth();

  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!location.state?.article);
  const [error, setError] = useState(null);

  // Load article if not passed in location state
  useEffect(() => {
    let isMounted = true;

    const fetchArticleDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const articles = await getNewsArticles();
        const found = articles.find(
          (item) => String(item._id || item.id) === String(id)
        );

        if (isMounted) {
          if (found) {
            setArticle(found);
          } else {
            setError('The requested news article could not be found.');
          }
        }
      } catch (err) {
        console.error('Failed to fetch article details:', err);
        if (isMounted) {
          setError('Unable to load article details. Please check your network connection.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (!article && id) {
      fetchArticleDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [id, article]);

  // Track User Activity on Article Load (Fail-safe, non-blocking)
  useEffect(() => {
    if (article) {
      const articleId = article._id || article.id || id;
      const userId = currentUser?._id || currentUser?.id || 'guest';

      // Call activity API asynchronously
      trackActivity({
        user_id: userId,
        news_id: articleId,
        time_spent: 1,
      });
    }
  }, [article, id, currentUser]);

  // Skeleton Loading State
  if (loading) {
    return (
      <div className="container" style={{ maxWidth: '840px', paddingBottom: 'var(--space-3xl)' }} aria-busy="true">
        <div className="skeleton" style={{ width: '180px', height: '24px', marginBottom: 'var(--space-lg)' }} />
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <div className="skeleton" style={{ width: '100%', height: '360px' }} />
          <div style={{ padding: 'var(--space-2xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <div className="skeleton" style={{ width: '80px', height: '24px' }} />
              <div className="skeleton" style={{ width: '100px', height: '24px' }} />
            </div>
            <div className="skeleton" style={{ width: '95%', height: '36px' }} />
            <div className="skeleton" style={{ width: '80%', height: '36px' }} />
            <div className="skeleton" style={{ width: '40%', height: '20px' }} />
            <div className="skeleton" style={{ width: '100%', height: '80px', marginTop: 'var(--space-md)' }} />
          </div>
        </div>
      </div>
    );
  }

  // Error / Not Found State
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
          <ArrowLeft size={18} /> Back to News Dashboard
        </Link>

        <div 
          style={{ 
            backgroundColor: 'var(--color-white)', 
            padding: 'var(--space-2xl)', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border)' 
          }}
        >
          <AlertCircle size={44} style={{ color: 'var(--color-error)', marginBottom: 'var(--space-sm)' }} />
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 var(--space-xs) 0' }}>
            Article Not Available
          </h2>
          <p style={{ color: 'var(--color-muted)', margin: '0 0 var(--space-lg) 0', fontSize: '0.95rem' }}>
            {error || 'We could not find the article you were looking for.'}
          </p>
          <Link to="/" className="btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '840px', paddingBottom: 'var(--space-3xl)' }}>
      <NewsArticle article={article} />
    </div>
  );
};

export default NewsDetail;
