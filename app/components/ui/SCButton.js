// SCHOOL2CAREER - Standardized Button Component
'use client';
import { forwardRef } from 'react';

const SCButton = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  
  const baseClasses = [
    'sc-button',
    'sc-transition',
    'sc-focus-visible',
    'sc-hover-animated',
    'sc-performance-optimized'
  ];

  const variantClasses = {
    primary: 'sc-btn-primary',
    secondary: 'sc-btn-secondary',
    accent: 'sc-btn-accent',
    ghost: 'sc-btn-ghost',
    danger: 'sc-btn-danger'
  };

  const sizeClasses = {
    sm: 'sc-btn-sm',
    md: 'sc-btn-md',
    lg: 'sc-btn-lg',
    xl: 'sc-btn-xl'
  };

  const classes = [
    ...baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'sc-btn-full',
    disabled && 'sc-btn-disabled',
    loading && 'sc-btn-loading',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <div className="sc-btn-spinner">
          <div className="sc-loader-dots">
            <div className="sc-loader-dot"></div>
            <div className="sc-loader-dot"></div>
            <div className="sc-loader-dot"></div>
          </div>
        </div>
      )}
      
      {!loading && leftIcon && (
        <span className="sc-btn-icon sc-btn-icon-left">
          {leftIcon}
        </span>
      )}
      
      <span className="sc-btn-content">
        {children}
      </span>
      
      {!loading && rightIcon && (
        <span className="sc-btn-icon sc-btn-icon-right">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

SCButton.displayName = 'SCButton';

export default SCButton;