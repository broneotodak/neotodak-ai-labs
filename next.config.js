/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable server-side features and API routes
  trailingSlash: true,
  images: {
    unoptimized: true, // Keep for Netlify compatibility
  },
  // Removed 'distDir: out' - will use default .next directory
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
}

module.exports = nextConfig