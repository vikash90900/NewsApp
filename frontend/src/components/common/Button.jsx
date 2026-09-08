import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'ghost':
        return 'btn-ghost';
      case 'primary':
      default:
        return 'btn-primary';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return { padding: '8px 16px', fontSize: '0.875rem' };
      case 'lg':
        return { padding: '16px 32px', fontSize: '1.125rem' };
      case 'md':
      default:
        return {};
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn ${getVariantClass()} ${className}`}
      style={getSizeStyle()}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="btn-spinner" style={{ animation: 'spin 1s linear infinite', width: 18, height: 18 }} />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon style={{ width: 18, height: 18 }} />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon style={{ width: 18, height: 18 }} />}
        </>
      )}
    </button>
  );
};

export default Button;
