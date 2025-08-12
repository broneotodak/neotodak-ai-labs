// Bundle Optimization for NEOTODAK AI Labs
// Dynamic imports, tree shaking, and chunk splitting strategies

// Three.js imports - use standard imports to avoid build issues
export const OptimizedThreeImports = {
  // Use standard Three.js imports
  Vector3: () => import('three').then(mod => ({ Vector3: mod.Vector3 })),
  BufferGeometry: () => import('three').then(mod => ({ BufferGeometry: mod.BufferGeometry })),
  BufferAttribute: () => import('three').then(mod => ({ BufferAttribute: mod.BufferAttribute })),
  Points: () => import('three').then(mod => ({ Points: mod.Points })),
  PointsMaterial: () => import('three').then(mod => ({ PointsMaterial: mod.PointsMaterial })),
  Line: () => import('three').then(mod => ({ Line: mod.Line })),
  LineBasicMaterial: () => import('three').then(mod => ({ LineBasicMaterial: mod.LineBasicMaterial })),
  SphereGeometry: () => import('three').then(mod => ({ SphereGeometry: mod.SphereGeometry })),
  MeshBasicMaterial: () => import('three').then(mod => ({ MeshBasicMaterial: mod.MeshBasicMaterial })),
  
  // Optimized geometry imports
  Float32BufferAttribute: () => import('three').then(mod => ({ Float32BufferAttribute: mod.Float32BufferAttribute })),
  
  // Math utilities
  MathUtils: () => import('three').then(mod => ({ MathUtils: mod.MathUtils })),
  
  // Constants
  AdditiveBlending: () => import('three').then(mod => ({ AdditiveBlending: mod.AdditiveBlending })),
};

// Component optimization paths - components can use these for dynamic imports
export const ComponentPaths = {
  // 3D Components
  AnimatedDNAHelix: '@/components/three/AnimatedDNAHelix',
  PulsingOrbs: '@/components/three/PulsingOrbs',
  InteractiveParticleField: '@/components/three/InteractiveParticleField',
  
  // Analytics Components
  PerformanceDashboard: '@/components/analytics/PerformanceDashboard',
  PerformanceMonitor: '@/components/performance/Monitor',
  
  // FlowState Widget
  FlowStateWidget: '@/components/integrations/FlowStateWidget',
  
  // Heavy UI Components
  ContactForm: '@/components/contact-form',
  TechStack3D: '@/components/tech-stack-3d-simple',
  
  // Aceternity UI Components
  Aceternity: {
    BackgroundBeams: '@/components/aceternity/background-beams',
    CardHoverEffect: '@/components/aceternity/card-hover-effect',
    FloatingNavbar: '@/components/aceternity/floating-navbar',
    HeroParallax: '@/components/aceternity/hero-parallax',
    Spotlight: '@/components/aceternity/spotlight',
    TextGenerateEffect: '@/components/aceternity/text-generate-effect',
    TypewriterEffect: '@/components/aceternity/typewriter-effect'
  }
};

// Code splitting strategies
export class ChunkOptimizer {
  private static instance: ChunkOptimizer;
  private loadedChunks = new Set<string>();
  private chunkPromises = new Map<string, Promise<any>>();

  static getInstance(): ChunkOptimizer {
    if (!ChunkOptimizer.instance) {
      ChunkOptimizer.instance = new ChunkOptimizer();
    }
    return ChunkOptimizer.instance;
  }

  // Preload critical chunks
  async preloadCriticalChunks() {
    const criticalChunks = [
      { name: 'framer-motion', import: () => import('framer-motion') },
      { name: 'react-three-fiber', import: () => import('@react-three/fiber') }
    ];

    await Promise.all(
      criticalChunks.map(chunk => this.loadChunk(chunk.name, chunk.import))
    );
  }

  // Load chunk with caching
  async loadChunk(name: string, importFn: () => Promise<any>): Promise<any> {
    if (this.loadedChunks.has(name)) {
      return Promise.resolve();
    }

    if (this.chunkPromises.has(name)) {
      return this.chunkPromises.get(name);
    }

    const promise = importFn()
      .then(module => {
        this.loadedChunks.add(name);
        this.chunkPromises.delete(name);
        return module;
      })
      .catch(error => {
        this.chunkPromises.delete(name);
        console.error(`Failed to load chunk ${name}:`, error);
        throw error;
      });

    this.chunkPromises.set(name, promise);
    return promise;
  }

  // Preload chunks based on route
  preloadRouteChunks(route: string) {
    const routeChunks: Record<string, Array<{ name: string; import: () => Promise<any> }>> = {
      '/': [
        { name: 'dna-helix', import: () => import('@/components/three/AnimatedDNAHelix') },
        { name: 'orbs', import: () => import('@/components/three/PulsingOrbs') },
      ],
      '/projects': [
        { name: 'project-cards', import: () => import('@/components/aceternity/card-hover-effect') },
        { name: 'parallax', import: () => import('@/components/aceternity/hero-parallax') }
      ],
      '/tech-stack': [
        { name: 'tech-3d', import: () => import('@/components/tech-stack-3d-simple') }
      ],
      '/analytics': [
        { name: 'charts', import: () => import('recharts') },
        { name: 'dashboard', import: () => import('@/components/analytics/PerformanceDashboard') }
      ]
    };

    const chunks = routeChunks[route] || [];
    chunks.forEach(chunk => {
      setTimeout(() => {
        this.loadChunk(chunk.name, chunk.import).catch(() => {
          // Silent fail for preloading
        });
      }, Math.random() * 2000); // Random delay 0-2s
    });
  }

  // Get loading stats
  getLoadingStats() {
    return {
      loadedChunks: Array.from(this.loadedChunks),
      pendingChunks: Array.from(this.chunkPromises.keys()),
      totalLoaded: this.loadedChunks.size,
      totalPending: this.chunkPromises.size
    };
  }
}

// Helper for Three.js imports
export function createOptimizedThreeModule() {
  return {
    // Only expose the minimal Three.js API we actually use
    Vector3: null as any,
    BufferGeometry: null as any,
    BufferAttribute: null as any,
    Points: null as any,
    PointsMaterial: null as any,
    Line: null as any,
    LineBasicMaterial: null as any,
    AdditiveBlending: null as any,

    // Lazy initialization with standard Three.js imports
    async init() {
      const THREE = await import('three');

      this.Vector3 = THREE.Vector3;
      this.BufferGeometry = THREE.BufferGeometry;
      this.BufferAttribute = THREE.BufferAttribute;
      this.Points = THREE.Points;
      this.PointsMaterial = THREE.PointsMaterial;
      this.Line = THREE.Line;
      this.LineBasicMaterial = THREE.LineBasicMaterial;
      this.AdditiveBlending = THREE.AdditiveBlending;

      return this;
    }
  };
}

// Bundle analysis utilities
export class BundleAnalyzer {
  private chunkSizes = new Map<string, number>();
  
  // Track chunk loading performance
  trackChunkLoad(chunkName: string, loadTime: number, size?: number) {
    console.log(`📦 Chunk loaded: ${chunkName} (${loadTime.toFixed(2)}ms${size ? `, ${(size / 1024).toFixed(2)}KB` : ''})`);
    
    if (size) {
      this.chunkSizes.set(chunkName, size);
    }
  }

  // Get bundle statistics
  getBundleStats() {
    const totalSize = Array.from(this.chunkSizes.values()).reduce((a, b) => a + b, 0);
    const chunkCount = this.chunkSizes.size;
    const averageSize = chunkCount > 0 ? totalSize / chunkCount : 0;

    return {
      totalSize: (totalSize / 1024).toFixed(2) + 'KB',
      chunkCount,
      averageSize: (averageSize / 1024).toFixed(2) + 'KB',
      chunks: Array.from(this.chunkSizes.entries()).map(([name, size]) => ({
        name,
        size: (size / 1024).toFixed(2) + 'KB'
      }))
    };
  }

  // Analyze and recommend optimizations
  analyzeBundle() {
    const stats = this.getBundleStats();
    const recommendations = [];

    if (this.chunkSizes.size > 20) {
      recommendations.push('Consider consolidating small chunks to reduce HTTP requests');
    }

    const largeChunks = Array.from(this.chunkSizes.entries())
      .filter(([_, size]) => size > 100 * 1024) // > 100KB
      .map(([name]) => name);

    if (largeChunks.length > 0) {
      recommendations.push(`Large chunks detected: ${largeChunks.join(', ')}. Consider further code splitting.`);
    }

    return {
      stats,
      recommendations
    };
  }
}

// Webpack bundle optimization helpers
export const webpackOptimizations = {
  // Split chunks configuration
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // Three.js vendor chunk
      three: {
        test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
        name: 'three',
        chunks: 'all',
        priority: 10,
      },
      // React vendor chunk
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'react',
        chunks: 'all',
        priority: 10,
      },
      // UI libraries
      ui: {
        test: /[\\/]node_modules[\\/](framer-motion|@tabler\/icons-react|lucide-react)[\\/]/,
        name: 'ui',
        chunks: 'all',
        priority: 8,
      },
      // Charts
      charts: {
        test: /[\\/]node_modules[\\/](recharts|d3)[\\/]/,
        name: 'charts',
        chunks: 'all',
        priority: 7,
      },
      // Analytics
      analytics: {
        test: /[\\/]node_modules[\\/](@google-analytics|google-auth-library)[\\/]/,
        name: 'analytics',
        chunks: 'all',
        priority: 6,
      },
      // Default vendor chunk
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        priority: 5,
      },
    },
  },

  // Module concatenation (webpack scope hoisting)
  concatenateModules: true,

  // Minimize configuration
  minimize: true,
  minimizer: [
    // TerserPlugin configuration for better minification
    {
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
      extractComments: false,
    },
  ],

  // Tree shaking configuration
  usedExports: true,
  sideEffects: false,
};

// Export the chunk optimizer singleton
export const chunkOptimizer = ChunkOptimizer.getInstance();
export const bundleAnalyzer = new BundleAnalyzer();

// Initialize optimizations
export function initializeBundleOptimizations() {
  if (typeof window !== 'undefined') {
    // Preload critical chunks
    chunkOptimizer.preloadCriticalChunks().catch(console.error);
    
    // Setup route-based preloading
    const currentPath = window.location.pathname;
    chunkOptimizer.preloadRouteChunks(currentPath);
    
    console.log('📦 Bundle optimizations initialized');
  }
}

// Performance monitoring for chunks
export function monitorChunkPerformance() {
  if (typeof window !== 'undefined' && (window as any).__webpack_require__) {
    const originalRequire = (window as any).__webpack_require__;
    
    (window as any).__webpack_require__ = function(moduleId: any) {
      const start = performance.now();
      const result = originalRequire(moduleId);
      const end = performance.now();
      
      if (end - start > 100) { // Log slow chunks
        console.warn(`🐌 Slow chunk load: ${moduleId} (${(end - start).toFixed(2)}ms)`);
      }
      
      return result;
    };
  }
}