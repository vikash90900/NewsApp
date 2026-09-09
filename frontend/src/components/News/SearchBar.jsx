import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
      <label htmlFor="news-search-input" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
        Search news articles
      </label>
      <input
        id="news-search-input"
        type="text"
        className="input"
        placeholder="Search headlines, keywords, or topics..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          paddingLeft: '44px',
          paddingRight: value ? '40px' : '16px',
          height: '46px',
          borderRadius: '24px',
          backgroundColor: 'var(--color-white)',
          boxShadow: 'var(--shadow-sm)'
        }}
      />
      <Search
        size={20}
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--color-muted)',
          pointerEvents: 'none'
        }}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search text"
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-muted)',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
