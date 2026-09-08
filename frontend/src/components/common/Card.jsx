import React from 'react';

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = true,
  style = {},
  ...props
}) => {
  return (
    <div
      className={`card ${!hoverable ? 'no-hover' : ''} ${className}`}
      onClick={onClick}
      style={{
        ...style,
        cursor: onClick ? 'pointer' : 'default',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
