// Bundle Optimization for NEOTODAK AI Labs
// Dynamic imports, tree shaking, and chunk splitting strategies

import dynamic from 'next/dynamic';

// Optimized Three.js imports with tree shaking
export const OptimizedThreeImports = {
  // Core Three.js - only import what we need
  Vector3: () => import('three/src/math/Vector3.js'),
  BufferGeometry: () => import('three/src/core/BufferGeometry.js'),
  BufferAttribute: () => import('three/src/core/BufferAttribute.js'),
  Points: () => import('three/src/objects/Points.js'),
  PointsMaterial: () => import('three/src/materials/PointsMaterial.js'),
  Line: () => import('three/src/objects/Line.js'),
  LineBasicMaterial: () => import('three/src/materials/LineBasicMaterial.js'),
  SphereGeometry: () => import('three/src/geometries/SphereGeometry.js'),
  MeshBasicMaterial: () => import('three/src/materials/MeshBasicMaterial.js'),
  
  // Optimized geometry imports
  Float32BufferAttribute: () => import('three/src/core/BufferAttribute.js').then(mod => ({ Float32BufferAttribute: mod.BufferAttribute })),
  
  // Math utilities
  MathUtils: () => import('three/src/math/MathUtils.js'),
  
  // Constants
  AdditiveBlending: () => import('three/src/constants.js').then(mod => ({ AdditiveBlending: mod.AdditiveBlending })),
};

// Dynamic components with optimized loading
export const DynamicOptimizedComponents = {
  // 3D Components - Lazy loaded with suspense
  AnimatedDNAHelix: dynamic(
    () => import('@/components/three/AnimatedDNAHelix').then(mod => ({
      default: mod.default
    })), 
    {
      ssr: false,
      loading: () => null // Loader handled by component
    }
  ),

  PulsingOrbs: dynamic(
    () => import('@/components/three/PulsingOrbs'),
    {
      ssr: false,
      loading: () => null
    }
  ),

  InteractiveParticleField: dynamic(
    () => import('@/components/three/InteractiveParticleField'),
    {
      ssr: false,
      loading: () => null
    }
  ),

  // Analytics Components
  PerformanceDashboard: dynamic(
    () => import('@/components/analytics/PerformanceDashboard'),
    {
      ssr: false,
      loading: () => null
    }
  ),

  PerformanceMonitor: dynamic(
    () => import('@/components/performance/Monitor'),
    {
      ssr: false,
      loading: () => null
    }
  ),

  // FlowState Widget
  FlowStateWidget: dynamic(
    () => import('@/components/integrations/FlowStateWidget'),
    {
      ssr: false,
      loading: () => null
    }
  ),

  // Charts - Load on demand
  Charts: {
    LineChart: dynamic(() => import('recharts').then(mod => ({ default: mod.LineChart })), { ssr: false }),
    AreaChart: dynamic(() => import('recharts').then(mod => ({ default: mod.AreaChart })), { ssr: false }),
    BarChart: dynamic(() => import('recharts').then(mod => ({ default: mod.BarChart })), { ssr: false }),
    ResponsiveContainer: dynamic(() => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false }),
  },

  // Heavy UI Components
  ContactForm: dynamic(() => import('@/components/contact-form').then(mod => ({ default: mod.ContactForm })) as any, {
    loading: () => null
  }),

  TechStack3D: dynamic(() => import('@/components/tech-stack-3d-simple'), {
    ssr: false,
    loading: () => null
  }),

  // Aceternity UI Components - Load on demand
  Aceternity: {
    BackgroundBeams: dynamic(() => import('@/components/aceternity/background-beams'), { ssr: false }),
    CardHoverEffect: dynamic(() => import('@/components/aceternity/card-hover-effect'), { ssr: false }),
    FloatingNavbar: dynamic(() => import('@/components/aceternity/floating-navbar'), { ssr: false }),
    HeroParallax: dynamic(() => import('@/components/aceternity/hero-parallax'), { ssr: false }),
    Spotlight: dynamic(() => import('@/components/aceternity/spotlight'), { ssr: false }),
    TextGenerateEffect: dynamic(() => import('@/components/aceternity/text-generate-effect'), { ssr: false }),
    TypewriterEffect: dynamic(() => import('@/components/aceternity/typewriter-effect'), { ssr: false })
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

// Tree shaking helper for Three.js
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

    // Lazy initialization
    async init() {
      const [
        { Vector3 },
        { BufferGeometry },
        { BufferAttribute },
        { Points },
        { PointsMaterial },
        { Line },
        { LineBasicMaterial },
        { AdditiveBlending }
      ] = await Promise.all([
        import('three/src/math/Vector3.js'),
        import('three/src/core/BufferGeometry.js'),
        import('three/src/core/BufferAttribute.js'),
        import('three/src/objects/Points.js'),
        import('three/src/materials/PointsMaterial.js'),
        import('three/src/objects/Line.js'),
        import('three/src/materials/LineBasicMaterial.js'),
        import('three/src/constants.js')
      ]);

      this.Vector3 = Vector3;
      this.BufferGeometry = BufferGeometry;
      this.BufferAttribute = BufferAttribute;
      this.Points = Points;
      this.PointsMaterial = PointsMaterial;
      this.Line = Line;
      this.LineBasicMaterial = LineBasicMaterial;
      this.AdditiveBlending = AdditiveBlending;

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