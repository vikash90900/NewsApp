import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

const ShareButton = ({ title, text, url, className = 'btn-secondary', style = {} }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = url || window.location.href;
    const shareData = {
      title: title || 'NewsHub Article',
      text: text || title || 'Check out this article on NewsHub',
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

  const copyToClipboard = (shareUrl) => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={handleShare}
        className={className}
        style={{ ...style }}
        aria-label="Share this news article"
      >
        {copied ? <Check size={18} style={{ color: 'var(--color-success)' }} /> : <Share2 size={18} />}
        <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
      </button>

      {copied && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            color: 'white',
            fontSize: '0.75rem',
            padding: '6px 12px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-md)',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ShareButton;
