import React from 'react';

const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'neutral'
  className = '',
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#DC2626',
          color: '#FFFFFF',
        };
      case 'secondary':
        return {
          backgroundColor: '#EF4444',
          color: '#FFFFFF',
        };
      case 'accent':
        return {
          backgroundColor: '#1E40AF',
          color: '#FFFFFF',
        };
      case 'neutral':
      default:
        return {
          backgroundColor: '#FEE2E2',
          color: '#450A0A',
          border: '1px solid #FCA5A5',
        };
    }
  };

  return (
    <span
      className={`badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 10px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '700',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        ...getStyles(),
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
