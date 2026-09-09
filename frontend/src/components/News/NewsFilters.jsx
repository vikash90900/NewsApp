import { Tag, MapPin, RotateCcw } from 'lucide-react';

const CATEGORIES = [
  { id: '', label: 'All Categories' },
  { id: 'top', label: 'Top News' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
  { id: 'world', label: 'World' },
];

const NewsFilters = ({ category, location, onCategoryChange, onLocationChange, onReset }) => {
  const hasActiveFilters = category || location;

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'var(--space-md)', 
        flexWrap: 'wrap',
        width: '100%'
      }}
    >
      {/* Category Dropdown */}
      <div style={{ position: 'relative', minWidth: '180px', flex: '1 1 180px' }}>
        <label htmlFor="category-select" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
          Filter by category
        </label>
        <div style={{ position: 'relative' }}>
          <select
            id="category-select"
            className="input"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              paddingLeft: '38px',
              height: '46px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-white)',
              cursor: 'pointer'
            }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          <Tag 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--color-muted)',
              pointerEvents: 'none'
            }} 
          />
        </div>
      </div>

      {/* Location Input */}
      <div style={{ position: 'relative', minWidth: '180px', flex: '1 1 180px' }}>
        <label htmlFor="location-input" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
          Filter by location
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="location-input"
            type="text"
            className="input"
            placeholder="Location (e.g. US, UK)"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            style={{
              paddingLeft: '38px',
              height: '46px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-white)'
            }}
          />
          <MapPin 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--color-muted)',
              pointerEvents: 'none'
            }} 
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="btn-secondary"
          style={{
            height: '46px',
            padding: '0 16px',
            fontSize: '0.875rem'
          }}
          aria-label="Reset all news filters"
        >
          <RotateCcw size={16} />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
};

export default NewsFilters;
