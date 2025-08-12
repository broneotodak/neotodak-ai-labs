// Performance Optimizer for NEOTODAK AI Labs
// Handles lazy loading, code splitting, and resource optimization

import { lazy, ComponentType, LazyExoticComponent } from 'react';
import dynamic from 'next/dynamic';

// Intersection Observer for viewport detection
class ViewportObserver {
  private observer: IntersectionObserver | null = null;
  private callbacks = new Map<Element, () => void>();

  constructor() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const callback = this.callbacks.get(entry.target);
              if (callback) {
                callback();
                this.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '100px', // Start loading 100px before entering viewport
          threshold: 0.1
        }
      );
    }
  }

  observe(element: Element, callback: () => void) {
    if (this.observer) {
      this.callbacks.set(element, callback);
      this.observer.observe(element);
    } else {
      // Fallback: execute immediately if IntersectionObserver not supported
      callback();
    }
  }

  unobserve(element: Element) {
    if (this.observer) {
      this.observer.unobserve(element);
      this.callbacks.delete(element);
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.callbacks.clear();
    }
  }
}

// Global viewport observer instance
export const viewportObserver = new ViewportObserver();

// Lazy loading factory with error boundaries
export function createLazyComponent<P extends object>(
  componentImport: () => Promise<{ default: ComponentType<P> }>,
  fallback?: ComponentType,
  errorFallback?: ComponentType<{ error: Error; retry: () => void }>
): LazyExoticComponent<ComponentType<P>> {
  return lazy(async () => {
    try {
      const component = await componentImport();
      return component;
    } catch (error) {
      console.error('Failed to load component:', error);
      throw error;
    }
  });
}

// Dynamic imports with Next.js optimization
export const DynamicComponents = {
  // 3D Components (Heavy - Load on demand)
  AnimatedDNAHelix: dynamic(() => import('@/components/three/AnimatedDNAHelix'), {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-cyan-400">Loading 3D Animation...</div>
      </div>
    )
  }),

  PulsingOrbs: dynamic(() => import('@/components/three/PulsingOrbs'), {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-purple-400">Loading Orbs...</div>
      </div>
    )
  }),

  InteractiveParticleField: dynamic(() => import('@/components/three/InteractiveParticleField'), {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-blue-400">Loading Particles...</div>
      </div>
    )
  }),

  ConnectionLines: dynamic(() => import('@/components/three/ConnectionLines'), {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-green-400">Loading Connections...</div>
      </div>
    )
  }),

  // Analytics Components
  PerformanceDashboard: dynamic(() => import('@/components/analytics/PerformanceDashboard'), {
    ssr: false,
    loading: () => (
      <div className="fixed inset-4 flex items-center justify-center bg-black/80 rounded-xl">
        <div className="animate-pulse text-white">Loading Dashboard...</div>
      </div>
    )
  }),

  // Heavy UI Components
  FlowStateWidget: dynamic(() => import('@/components/integrations/FlowStateWidget'), {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-8 right-8 w-64 h-16 bg-black/80 rounded-lg animate-pulse" />
    )
  }),

  // Charts and Visualizations
  TechStack3D: dynamic(() => import('@/components/tech-stack-3d-simple'), {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center bg-gray-900/50 rounded-lg">
        <div className="animate-pulse text-cyan-400">Loading Tech Stack...</div>
      </div>
    )
  })
};

// Preload strategies
export class ResourcePreloader {
  private preloadedComponents = new Set<string>();
  private preloadPromises = new Map<string, Promise<any>>();

  // Preload critical components
  preloadCritical() {
    if (typeof window !== 'undefined') {
      // Preload animations that are likely to be needed
      this.preloadComponent('dna-helix', () => import('@/components/three/AnimatedDNAHelix'));
      this.preloadComponent('orbs', () => import('@/components/three/PulsingOrbs'));
    }
  }

  // Preload component on user interaction hints
  preloadOnHover(componentKey: string, importFn: () => Promise<any>) {
    if (!this.preloadedComponents.has(componentKey)) {
      const promise = importFn();
      this.preloadPromises.set(componentKey, promise);
      this.preloadedComponents.add(componentKey);
      
      promise.catch(error => {
        console.warn(`Failed to preload component ${componentKey}:`, error);
        this.preloadedComponents.delete(componentKey);
        this.preloadPromises.delete(componentKey);
      });
    }
  }

  // Check if component is preloaded
  isPreloaded(componentKey: string): boolean {
    return this.preloadedComponents.has(componentKey);
  }

  // Get preload promise
  getPreloadPromise(componentKey: string): Promise<any> | undefined {
    return this.preloadPromises.get(componentKey);
  }

  private preloadComponent(key: string, importFn: () => Promise<any>) {
    if (!this.preloadedComponents.has(key)) {
      const promise = importFn();
      this.preloadPromises.set(key, promise);
      this.preloadedComponents.add(key);
      
      promise.catch(() => {
        this.preloadedComponents.delete(key);
        this.preloadPromises.delete(key);
      });
    }
  }
}

export const resourcePreloader = new ResourcePreloader();

// Image optimization utilities
export class ImageOptimizer {
  private imageCache = new Map<string, string>();
  private lazyImages = new Set<HTMLImageElement>();

  // Setup lazy loading for images
  setupLazyImages() {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll('img[data-lazy]');
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        this.lazyImages.add(img);
        viewportObserver.observe(img, () => this.loadLazyImage(img));
      }
    });
  }

  private loadLazyImage(img: HTMLImageElement) {
    const src = img.dataset.lazy;
    if (src && img.src !== src) {
      img.src = src;
      img.classList.add('fade-in');
      this.lazyImages.delete(img);
    }
  }

  // Generate responsive image srcset
  generateSrcSet(baseUrl: string, sizes: number[] = [320, 640, 768, 1024, 1280]): string {
    return sizes
      .map(size => `${this.getOptimizedImageUrl(baseUrl, size)} ${size}w`)
      .join(', ');
  }

  private getOptimizedImageUrl(url: string, width: number): string {
    // For Next.js Image Optimization API
    const params = new URLSearchParams({
      url: url,
      w: width.toString(),
      q: '75' // Quality 75%
    });
    return `/_next/image?${params.toString()}`;
  }
}

export const imageOptimizer = new ImageOptimizer();

// Bundle splitting utilities
export class BundleSplitter {
  private loadedChunks = new Set<string>();

  // Load chunk on demand
  async loadChunk(chunkName: string, importFn: () => Promise<any>) {
    if (this.loadedChunks.has(chunkName)) {
      return Promise.resolve();
    }

    try {
      await importFn();
      this.loadedChunks.add(chunkName);
    } catch (error) {
      console.error(`Failed to load chunk ${chunkName}:`, error);
      throw error;
    }
  }

  // Check if chunk is loaded
  isChunkLoaded(chunkName: string): boolean {
    return this.loadedChunks.has(chunkName);
  }

  // Preload chunks based on user behavior
  async preloadChunks(priority: 'high' | 'medium' | 'low' = 'medium') {
    const chunkStrategies = {
      high: [
        { name: 'three-core', import: () => import('three') },
        { name: 'react-three-fiber', import: () => import('@react-three/fiber') }
      ],
      medium: [
        { name: 'framer-motion', import: () => import('framer-motion') },
        { name: 'recharts', import: () => import('recharts') }
      ],
      low: [
        { name: 'analytics-dashboard', import: () => import('@/components/analytics/PerformanceDashboard') }
      ]
    };

    const chunks = chunkStrategies[priority] || chunkStrategies.medium;
    
    // Load chunks in parallel with delay to avoid blocking
    for (const chunk of chunks) {
      setTimeout(() => {
        this.loadChunk(chunk.name, chunk.import).catch(() => {
          // Silent fail for preloading
        });
      }, Math.random() * 1000); // Random delay 0-1s
    }
  }
}

export const bundleSplitter = new BundleSplitter();

// Memory management for Three.js
export class ThreeJSMemoryManager {
  private scenes = new WeakSet<any>();
  private geometries = new WeakSet<any>();
  private materials = new WeakSet<any>();
  private textures = new WeakSet<any>();

  // Register Three.js objects for cleanup tracking
  register(object: any, type: 'scene' | 'geometry' | 'material' | 'texture') {
    switch (type) {
      case 'scene':
        this.scenes.add(object);
        break;
      case 'geometry':
        this.geometries.add(object);
        break;
      case 'material':
        this.materials.add(object);
        break;
      case 'texture':
        this.textures.add(object);
        break;
    }
  }

  // Cleanup Three.js resources
  cleanup(object: any) {
    if (!object) return;

    // Traverse and cleanup children
    if (object.children) {
      object.children.forEach((child: any) => this.cleanup(child));
    }

    // Cleanup geometry
    if (object.geometry) {
      object.geometry.dispose();
    }

    // Cleanup material(s)
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((material: any) => this.cleanupMaterial(material));
      } else {
        this.cleanupMaterial(object.material);
      }
    }

    // Remove from parent
    if (object.parent) {
      object.parent.remove(object);
    }
  }

  private cleanupMaterial(material: any) {
    if (!material) return;

    // Cleanup textures
    Object.keys(material).forEach(key => {
      const property = material[key];
      if (property && property.dispose && typeof property.dispose === 'function') {
        property.dispose();
      }
    });

    // Dispose material
    if (material.dispose) {
      material.dispose();
    }
  }

  // Force garbage collection hint
  forceCleanup() {
    if (typeof window !== 'undefined' && (window as any).gc) {
      (window as any).gc();
    }
  }
}

export const threeMemoryManager = new ThreeJSMemoryManager();

// Performance monitoring and adaptive quality
export class AdaptiveQualityManager {
  private qualityLevel: 'low' | 'medium' | 'high' = 'high';
  private performanceHistory: number[] = [];
  private lastAdjustment = 0;

  constructor() {
    this.startMonitoring();
  }

  private startMonitoring() {
    if (typeof window === 'undefined') return;

    let frameCount = 0;
    let lastTime = performance.now();

    const checkPerformance = () => {
      frameCount++;
      
      if (frameCount >= 60) { // Check every 60 frames
        const currentTime = performance.now();
        const avgFrameTime = (currentTime - lastTime) / frameCount;
        const fps = 1000 / avgFrameTime;
        
        this.performanceHistory.push(fps);
        if (this.performanceHistory.length > 10) {
          this.performanceHistory.shift();
        }
        
        this.adjustQuality(fps);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    requestAnimationFrame(checkPerformance);
  }

  private adjustQuality(currentFps: number) {
    const now = Date.now();
    if (now - this.lastAdjustment < 5000) return; // Don't adjust too frequently
    
    const avgFps = this.performanceHistory.reduce((a, b) => a + b, 0) / this.performanceHistory.length;
    
    if (avgFps < 30 && this.qualityLevel !== 'low') {
      this.qualityLevel = 'low';
      this.lastAdjustment = now;
      this.notifyQualityChange();
    } else if (avgFps < 45 && this.qualityLevel === 'high') {
      this.qualityLevel = 'medium';
      this.lastAdjustment = now;
      this.notifyQualityChange();
    } else if (avgFps > 55 && this.qualityLevel !== 'high') {
      this.qualityLevel = 'high';
      this.lastAdjustment = now;
      this.notifyQualityChange();
    }
  }

  private notifyQualityChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('qualityChange', {
        detail: { quality: this.qualityLevel }
      }));
    }
  }

  getCurrentQuality(): 'low' | 'medium' | 'high' {
    return this.qualityLevel;
  }

  getQualitySettings() {
    const settings = {
      low: {
        particleCount: 50,
        shadowQuality: 'off',
        antialiasing: false,
        bloom: false,
        pixelRatio: Math.min(window.devicePixelRatio, 1)
      },
      medium: {
        particleCount: 100,
        shadowQuality: 'low',
        antialiasing: true,
        bloom: false,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5)
      },
      high: {
        particleCount: 200,
        shadowQuality: 'high',
        antialiasing: true,
        bloom: true,
        pixelRatio: window.devicePixelRatio
      }
    };

    return settings[this.qualityLevel];
  }
}

export const adaptiveQualityManager = new AdaptiveQualityManager();

// Initialization function
export function initializeOptimizer() {
  if (typeof window === 'undefined') return;

  // Setup lazy loading
  imageOptimizer.setupLazyImages();
  
  // Preload critical resources
  resourcePreloader.preloadCritical();
  
  // Start chunk preloading based on user behavior
  bundleSplitter.preloadChunks('high');
  
  console.log('🚀 Performance Optimizer initialized');
}

// Utility functions
export function preloadComponentOnHover(element: Element, componentKey: string, importFn: () => Promise<any>) {
  const handleMouseEnter = () => {
    resourcePreloader.preloadOnHover(componentKey, importFn);
    element.removeEventListener('mouseenter', handleMouseEnter);
  };
  
  element.addEventListener('mouseenter', handleMouseEnter, { once: true });
}

export function optimizeThreeJSRenderer(renderer: any) {
  if (!renderer) return;
  
  const quality = adaptiveQualityManager.getCurrentQuality();
  const settings = adaptiveQualityManager.getQualitySettings();
  
  // Apply quality settings
  renderer.setPixelRatio(settings.pixelRatio);
  renderer.antialias = settings.antialiasing;
  
  // Performance optimizations
  renderer.powerPreference = 'high-performance';
  renderer.sortObjects = false;
  renderer.shadowMap.autoUpdate = false;
  
  console.log(`🎨 Three.js renderer optimized for ${quality} quality`);
}

// Cleanup function
export function cleanup() {
  viewportObserver.disconnect();
  console.log('🧹 Performance Optimizer cleaned up');
}