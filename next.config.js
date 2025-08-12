/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable server-side features and API routes
  trailingSlash: true,
  images: {
    unoptimized: false, // Enable Next.js image optimization
    domains: ['localhost', 'neotodak-ai-labs.netlify.app'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Performance optimizations
  compress: true,  // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Experimental features for performance
  experimental: {
    // Optimize CSS
    optimizeCss: true,
    
    // Memory usage optimization
    webVitalsAttribution: ['CLS', 'LCP'],
    
    // Disable prefetching to avoid RSC errors
    clientRouterFilter: false,
  },
  
  // Turbopack configuration (moved from experimental)
  turbopack: {
    rules: {
      '*.svg': ['@svgr/webpack'],
    },
  },
  
  // Server external packages (moved from experimental)
  serverExternalPackages: ['three', '@react-three/fiber'],
  
  // Transpile packages for better performance (removed conflicting packages)
  transpilePackages: [
    '@react-three/drei',
    'framer-motion'
  ],
  
  // Webpack optimizations
  webpack: (config, { dev, isServer, webpack, nextRuntime }) => {
    // Canvas externals for server-side rendering
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    
    // Performance optimizations
    if (!dev && !isServer) {
      // Bundle splitting and optimization
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            // Three.js vendor chunk
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: 'three',
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
            // React vendor chunk  
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react-vendor',
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
            // UI libraries
            ui: {
              test: /[\\/]node_modules[\\/](framer-motion|@tabler\/icons-react|lucide-react)[\\/]/,
              name: 'ui-vendor',
              chunks: 'all',
              priority: 8,
              reuseExistingChunk: true,
            },
            // Charts library
            charts: {
              test: /[\\/]node_modules[\\/](recharts|d3)[\\/]/,
              name: 'charts-vendor',
              chunks: 'all',
              priority: 7,
              reuseExistingChunk: true,
            },
            // Analytics
            analytics: {
              test: /[\\/]node_modules[\\/](@google-analytics|google-auth-library)[\\/]/,
              name: 'analytics-vendor',
              chunks: 'all',
              priority: 6,
              reuseExistingChunk: true,
            },
            // Default vendor chunk
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        
        // Module concatenation for better tree shaking
        concatenateModules: true,
        
        // Minimize configuration
        minimize: true,
      };
      
      // Add bundle analyzer in development
      if (process.env.ANALYZE === 'true') {
        const BundleAnalyzerPlugin = require('@next/bundle-analyzer')({
          enabled: true,
        });
        config.plugins.push(new BundleAnalyzerPlugin());
      }
      
      // Remove Three.js tree shaking - it's causing Matrix4 constructor errors
      // Keep the standard Three.js imports
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/examples/jsm': 'three/examples/jsm',
        // Don't override the main three import
      };
      
      // Optimize imports
      config.resolve.mainFields = ['browser', 'module', 'main'];
    }
    
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // Shader files for Three.js
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });
    
    // Performance hints
    config.performance = {
      hints: dev ? false : 'warning',
      maxAssetSize: 250000, // 250kb
      maxEntrypointSize: 250000, // 250kb
    };
    
    // Add webpack plugins for performance
    config.plugins.push(
      // Define plugin for environment variables
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.ANALYZE': JSON.stringify(process.env.ANALYZE),
      })
    );
    
    return config;
  },
  
  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600', // 1 hour cache for API
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year cache for static assets
          },
        ],
      },
      {
        source: '/(.*\\.(?:jpg|jpeg|png|webp|avif|gif|svg))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000', // 30 days cache for images
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO and performance
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/analytics-dashboard',
        destination: '/analytics',
      },
    ];
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    ENABLE_PERFORMANCE_MONITORING: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
}

module.exports = nextConfig