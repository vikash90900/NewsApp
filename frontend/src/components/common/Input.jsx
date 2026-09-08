import React from 'react';

const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  className = '',
  disabled = false,
  icon: Icon = null,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span style={{ color: 'var(--color-primary)', marginLeft: 4 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', width: '100%' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-subtle)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon size={18} />
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`input ${error ? 'input-error' : ''} ${className}`}
          style={{
            paddingLeft: Icon ? '42px' : '16px',
          }}
          {...props}
        />
      </div>
      {error && <span className="error-text">{error}</span>}
      {!error && helperText && (
        <span style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', marginTop: 2 }}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
