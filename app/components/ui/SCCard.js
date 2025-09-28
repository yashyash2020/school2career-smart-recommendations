// SCHOOL2CAREER - Standardized Card Component
'use client';
import { forwardRef } from 'react';

const SCCard = forwardRef(({
  children,
  variant = 'default',
  hover = true,
  glow = false,
  padding = 'lg',
  className = '',
  header,
  footer,
  ...props
}, ref) => {
  
  const baseClasses = [
    'sc-card',
    'sc-transition',
    'sc-performance-optimized'
  ];

  const variantClasses = {
    default: 'sc-card-default',
    glass: 'sc-card-glass',
    gradient: 'sc-card-gradient',
    minimal: 'sc-card-minimal',
    elevated: 'sc-card-elevated'
  };

  const paddingClasses = {
    none: 'sc-p-0',
    sm: 'sc-p-sm',
    md: 'sc-p-md',
    lg: 'sc-p-lg',
    xl: 'sc-p-xl'
  };

  const classes = [
    ...baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    hover && 'sc-card-hover',
    glow && 'sc-card-glow',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {header && (
        <div className="sc-card-header">
          {header}
        </div>
      )}
      
      <div className="sc-card-body">
        {children}
      </div>
      
      {footer && (
        <div className="sc-card-footer">
          {footer}
        </div>
      )}
    </div>
  );
});

SCCard.displayName = 'SCCard';

export default SCCard;