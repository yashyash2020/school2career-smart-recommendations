// SCHOOL2CAREER - Standardized Animated Background Component
'use client';
import { useEffect, useRef, useState } from 'react';

const SCAnimatedBackground = ({
  variant = 'default',
  showParticles = true,
  showShapes = true,
  particleCount = 50,
  className = ''
}) => {
  const particlesRef = useRef(null);
  const requestRef = useRef();
  const [performanceMode, setPerformanceMode] = useState('normal');

  // Advanced performance detection
  useEffect(() => {
    const detectPerformanceCapabilities = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android/i.test(userAgent) && window.innerWidth >= 768;
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = navigator.deviceMemory || 4;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Performance scoring
      let score = 100;
      if (isMobile && !isTablet) score -= 30;
      if (hardwareConcurrency <= 2) score -= 25;
      if (deviceMemory <= 2) score -= 20;
      if (window.innerWidth <= 480) score -= 15;
      if (prefersReducedMotion) score = 0;
      
      if (score >= 80) setPerformanceMode('high');
      else if (score >= 50) setPerformanceMode('normal');
      else if (score >= 20) setPerformanceMode('low');
      else setPerformanceMode('minimal');
    };

    detectPerformanceCapabilities();
  }, []);

  useEffect(() => {
    if (!showParticles || performanceMode === 'minimal') return;

    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      container.innerHTML = '';

      // Performance-based particle count
      let count = particleCount;
      switch (performanceMode) {
        case 'minimal':
          count = 0;
          break;
        case 'low':
          count = Math.min(count, 10);
          break;
        case 'normal':
          count = Math.min(count, 25);
          break;
        case 'high':
          count = Math.min(count, 50);
          break;
        default:
          count = Math.min(count, 30);
      }

      // Create particles with performance optimizations
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'sc-particle sc-performance-optimized';
        // Use deterministic positioning for SSR compatibility
        particle.style.left = ((i * 37) % 100) + '%';
        particle.style.top = ((i * 17) % 100) + '%';
        particle.style.animationDelay = (i * 0.8) % 25 + 's';
        particle.style.animationDuration = (20 + (i % 10)) + 's';
        
        // Add will-change for better GPU acceleration
        particle.style.willChange = 'transform, opacity';
        
        container.appendChild(particle);
      }
    };

    const handleResize = () => {
      // Debounce resize for better performance
      clearTimeout(requestRef.current);
      requestRef.current = setTimeout(createParticles, 250);
    };

    createParticles();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(requestRef.current);
    };
  }, [showParticles, particleCount, performanceMode]);

  const variantClasses = {
    default: 'sc-bg-default',
    gradient: 'sc-bg-animated',
    minimal: 'sc-bg-minimal',
    dark: 'sc-bg-dark'
  };

  const backgroundClass = variantClasses[variant];

  return (
    <div className={`sc-animated-background ${backgroundClass} ${className}`}>
      {/* Animated Gradient Background */}
      <div className="sc-bg-layer sc-bg-animated"></div>

      {/* Floating Shapes */}
      {showShapes && (
        <div className="sc-floating-shapes">
          <div className="sc-shape sc-shape-1 sc-performance-optimized"></div>
          <div className="sc-shape sc-shape-2 sc-performance-optimized"></div>
          <div className="sc-shape sc-shape-3 sc-performance-optimized"></div>
        </div>
      )}

      {/* Particles */}
      {showParticles && (
        <div 
          ref={particlesRef}
          className="sc-particles-container"
        ></div>
      )}
    </div>
  );
};

export default SCAnimatedBackground;