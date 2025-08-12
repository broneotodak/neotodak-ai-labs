'use client';

import React, { useEffect, useState } from 'react';

interface PerformanceStats {
  fps: number;
  frameTime: number;
  memoryUsage: number;
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 0
  });
  
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let totalFrameTime = 0;
    
    const measurePerformance = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      
      frameCount++;
      totalFrameTime += deltaTime;
      
      // Update stats every second
      if (frameCount >= 60) {
        const avgFrameTime = totalFrameTime / frameCount;
        const fps = 1000 / avgFrameTime;
        
        // Get memory usage if available
        const memoryUsage = (performance as any).memory 
          ? (performance as any).memory.usedJSHeapSize / 1048576 // Convert to MB
          : 0;
        
        setStats({
          fps: Math.round(fps),
          frameTime: Math.round(avgFrameTime * 100) / 100,
          memoryUsage: Math.round(memoryUsage)
        });
        
        // Detect low performance
        setIsLowPerformance(fps < 30);
        
        frameCount = 0;
        totalFrameTime = 0;
      }
      
      lastTime = currentTime;
      requestAnimationFrame(measurePerformance);
    };
    
    const animationId = requestAnimationFrame(measurePerformance);
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return { stats, isLowPerformance };
}

// Performance-based quality settings
export const getQualitySettings = (isLowPerformance: boolean) => {
  if (isLowPerformance) {
    return {
      particleCount: 50,
      dnaHelixPoints: 50,
      orbCount: 3,
      connectionNodes: 6,
      animationSpeed: 0.5,
      enableAdvancedShaders: false,
      enableMouseInteraction: false
    };
  }
  
  return {
    particleCount: 150,
    dnaHelixPoints: 100,
    orbCount: 8,
    connectionNodes: 15,
    animationSpeed: 1.0,
    enableAdvancedShaders: true,
    enableMouseInteraction: true
  };
};

// Device detection for initial quality settings
export const getDeviceQuality = () => {
  if (typeof window === 'undefined') return 'high';
  
  // Check for mobile devices
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  if (isMobile) return 'low';
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 2) return 'low';
  if (cores <= 4) return 'medium';
  
  // Check memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory <= 4) return 'medium';
  
  return 'high';
};

// Responsive 3D settings based on screen size
export const getResponsiveSettings = () => {
  if (typeof window === 'undefined') {
    return { scale: 1, bounds: 4, complexity: 1 };
  }
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio || 1;
  
  // Mobile portrait
  if (width < 768) {
    return {
      scale: 0.7,
      bounds: 2,
      complexity: 0.5,
      particleCount: 30,
      enableAdvancedEffects: false
    };
  }
  
  // Tablet
  if (width < 1024) {
    return {
      scale: 0.85,
      bounds: 3,
      complexity: 0.7,
      particleCount: 75,
      enableAdvancedEffects: true
    };
  }
  
  // High DPI displays
  if (pixelRatio > 2) {
    return {
      scale: 1,
      bounds: 4,
      complexity: 0.8, // Slightly reduced for high DPI
      particleCount: 100,
      enableAdvancedEffects: true
    };
  }
  
  // Desktop
  return {
    scale: 1,
    bounds: 4,
    complexity: 1,
    particleCount: 150,
    enableAdvancedEffects: true
  };
};

// Performance debugging component (only shows in development)
export function PerformanceDebugger() {
  const { stats, isLowPerformance } = usePerformanceMonitor();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg font-mono text-xs z-50">
      <div className="flex flex-col gap-1">
        <div className={`flex items-center gap-2 ${isLowPerformance ? 'text-red-400' : 'text-green-400'}`}>
          <div className={`w-2 h-2 rounded-full ${isLowPerformance ? 'bg-red-400' : 'bg-green-400'}`} />
          FPS: {stats.fps}
        </div>
        <div className="text-gray-400">
          Frame: {stats.frameTime}ms
        </div>
        {stats.memoryUsage > 0 && (
          <div className="text-gray-400">
            Memory: {stats.memoryUsage}MB
          </div>
        )}
      </div>
    </div>
  );
}