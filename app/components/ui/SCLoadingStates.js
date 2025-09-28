// SCHOOL2CAREER - Advanced Loading States Component
'use client';
import { useState, useEffect } from 'react';
import usePerformanceMonitor from '../hooks/usePerformanceMonitor';

const SCLoadingStates = ({
  type = 'spinner',
  message = 'جاري التحميل...',
  progress = null,
  showProgress = false,
  size = 'md',
  className = '',
  performance = true
}) => {
  const { optimizationSettings, isLowPerformanceMode } = usePerformanceMonitor();
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (showProgress && progress === null) {
      let increment = 0;
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Use deterministic increment instead of Math.random()
          increment = (increment + 1) % 5; // 0 to 4
          const deterministicIncrement = 8 + increment * 2; // 8, 10, 12, 14, 16
          return prev + deterministicIncrement;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [showProgress, progress]);

  const currentProgress = progress !== null ? progress : loadingProgress;

  const sizeClasses = {
    sm: 'sc-loading-sm',
    md: 'sc-loading-md',
    lg: 'sc-loading-lg',
    xl: 'sc-loading-xl'
  };

  const LoadingSpinner = () => (
    <div className={`sc-loading-spinner ${sizeClasses[size]} ${isLowPerformanceMode ? 'sc-loading-simple' : 'sc-loading-animated'}`}>
      <div className="sc-spinner-circle"></div>
      <div className="sc-spinner-path"></div>
    </div>
  );

  const LoadingDots = () => (
    <div className={`sc-loading-dots ${sizeClasses[size]}`}>
      <div className="sc-dot sc-dot-1"></div>
      <div className="sc-dot sc-dot-2"></div>
      <div className="sc-dot sc-dot-3"></div>
    </div>
  );

  const LoadingProgress = () => (
    <div className={`sc-loading-progress ${sizeClasses[size]}`}>
      <div className="sc-progress-bg">
        <div 
          className="sc-progress-fill"
          style={{ width: `${Math.min(currentProgress, 100)}%` }}
        ></div>
      </div>
      <div className="sc-progress-text">
        {Math.round(currentProgress)}%
      </div>
    </div>
  );

  const renderLoadingType = () => {
    if (isLowPerformanceMode && type !== 'progress') {
      return <LoadingDots />;
    }

    switch (type) {
      case 'spinner':
        return <LoadingSpinner />;
      case 'dots':
        return <LoadingDots />;
      case 'progress':
        return <LoadingProgress />;
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div className={`sc-loading-container ${className}`}>
      {renderLoadingType()}
      {message && (
        <div className="sc-loading-message">
          {message}
        </div>
      )}
      {showProgress && type !== 'progress' && (
        <div className="sc-loading-progress-bar">
          <div 
            className="sc-progress-indicator"
            style={{ width: `${Math.min(currentProgress, 100)}%` }}
          ></div>
        </div>
      )}
      {performance && isLowPerformanceMode && (
        <div className="sc-performance-notice">
          🔋 وضع توفير الأداء مفعل
        </div>
      )}
    </div>
  );
};

export const PageLoader = ({ message = "تحميل الصفحة..." }) => (
  <div className="sc-page-loader">
    <SCLoadingStates 
      type="spinner" 
      size="lg" 
      message={message}
      className="sc-page-loader-content"
    />
  </div>
);

export const ComponentLoader = ({ message = "جاري التحميل..." }) => (
  <SCLoadingStates 
    type="dots" 
    size="md" 
    message={message}
    className="sc-component-loader"
  />
);

export const DataLoader = ({ progress, message = "تحميل البيانات..." }) => (
  <SCLoadingStates 
    type="progress" 
    size="md" 
    message={message}
    progress={progress}
    showProgress
    className="sc-data-loader"
  />
);

export default SCLoadingStates;