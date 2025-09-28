// SCHOOL2CAREER - Performance Monitoring Hook
// مراقب الأداء المتقدم لضمان تجربة مستخدم مثلى
'use client';
import { useState, useEffect, useCallback } from 'react';

const usePerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState({
    deviceClass: 'unknown',
    connectionSpeed: 'unknown',
    memoryStatus: 'unknown',
    batteryLevel: 'unknown',
    renderTime: 0,
    recommendations: []
  });

  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);

  // Detect device capabilities
  const detectDeviceCapabilities = useCallback(() => {
    const data = {
      deviceClass: 'high',
      connectionSpeed: 'fast',
      memoryStatus: 'good',
      batteryLevel: 'good',
      renderTime: 0,
      recommendations: []
    };

    // Device Memory Detection
    if (navigator.deviceMemory) {
      if (navigator.deviceMemory <= 2) {
        data.deviceClass = 'low';
        data.memoryStatus = 'limited';
        data.recommendations.push('تقليل الانيميشنز');
      } else if (navigator.deviceMemory <= 4) {
        data.deviceClass = 'medium';
        data.memoryStatus = 'moderate';
        data.recommendations.push('تحسين معتدل');
      }
    }

    // CPU Detection
    if (navigator.hardwareConcurrency) {
      if (navigator.hardwareConcurrency <= 2) {
        data.deviceClass = 'low';
        data.recommendations.push('تقليل المعالجة');
      }
    }

    // Connection Speed Detection
    if (navigator.connection) {
      const connection = navigator.connection;
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        data.connectionSpeed = 'slow';
        data.recommendations.push('تقليل البيانات');
      } else if (connection.effectiveType === '3g') {
        data.connectionSpeed = 'medium';
      }
    }

    // Battery Level Detection
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
          data.batteryLevel = 'low';
          data.recommendations.push('توفير البطارية');
          setIsLowPerformanceMode(true);
        }
      });
    }

    // Screen Size Detection
    const screenSize = window.innerWidth;
    if (screenSize <= 480) {
      data.recommendations.push('تحسين الجوال');
    }

    return data;
  }, []);

  // Measure render performance
  const measureRenderTime = useCallback(() => {
    const startTime = performance.now();
    
    requestAnimationFrame(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      setPerformanceData(prev => ({
        ...prev,
        renderTime
      }));

      // If render time is slow, enable performance mode
      if (renderTime > 16.67) { // 60fps = 16.67ms per frame
        setIsLowPerformanceMode(true);
      }
    });
  }, []);

  // Performance optimization recommendations
  const getOptimizationSettings = useCallback(() => {
    const settings = {
      particleCount: 50,
      animationIntensity: 'high',
      enableShapes: true,
      enableGradients: true,
      enableBlur: true,
      enableShadows: true
    };

    if (performanceData.deviceClass === 'low' || isLowPerformanceMode) {
      settings.particleCount = 10;
      settings.animationIntensity = 'low';
      settings.enableShapes = false;
      settings.enableBlur = false;
      settings.enableShadows = false;
    } else if (performanceData.deviceClass === 'medium') {
      settings.particleCount = 25;
      settings.animationIntensity = 'medium';
      settings.enableGradients = true;
    }

    if (performanceData.batteryLevel === 'low') {
      settings.particleCount = Math.min(settings.particleCount, 5);
      settings.animationIntensity = 'minimal';
      settings.enableShapes = false;
    }

    return settings;
  }, [performanceData, isLowPerformanceMode]);

  // Monitor frame rate
  const [frameRate, setFrameRate] = useState(60);
  
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFrameRate(frameCount);
        frameCount = 0;
        lastTime = currentTime;
        
        // If frame rate drops below 30fps, enable performance mode
        if (frameCount < 30) {
          setIsLowPerformanceMode(true);
        }
      }
      
      requestAnimationFrame(measureFrameRate);
    };

    const rafId = requestAnimationFrame(measureFrameRate);
    
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Initialize performance monitoring
  useEffect(() => {
    const data = detectDeviceCapabilities();
    setPerformanceData(data);
    measureRenderTime();

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsLowPerformanceMode(true);
    }
  }, [detectDeviceCapabilities, measureRenderTime]);

  // Performance warning system
  const getPerformanceWarnings = useCallback(() => {
    const warnings = [];
    
    if (frameRate < 30) {
      warnings.push('معدل الإطارات منخفض - سيتم تقليل التأثيرات');
    }
    
    if (performanceData.memoryStatus === 'limited') {
      warnings.push('ذاكرة الجهاز محدودة - تم تفعيل الوضع المحسن');
    }
    
    if (performanceData.batteryLevel === 'low') {
      warnings.push('مستوى البطارية منخفض - تم تفعيل وضع توفير الطاقة');
    }
    
    return warnings;
  }, [frameRate, performanceData]);

  return {
    performanceData,
    isLowPerformanceMode,
    frameRate,
    optimizationSettings: getOptimizationSettings(),
    warnings: getPerformanceWarnings(),
    setPerformanceMode: setIsLowPerformanceMode,
    measureRenderTime
  };
};

export default usePerformanceMonitor;