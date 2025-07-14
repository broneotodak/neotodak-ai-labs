// Utility to generate beautiful SVG placeholders for projects
export const generateProjectImage = (title: string, type: string): string => {
  const configs: Record<string, { gradient: string; icon: string; color1: string; color2: string; color3: string }> = {
    'ai-chat': { gradient: 'from-blue-500 to-purple-600', icon: '🤖', color1: '#3b82f6', color2: '#8b5cf6', color3: '#ec4899' },
    'ecommerce': { gradient: 'from-green-400 to-blue-500', icon: '🛒', color1: '#10b981', color2: '#3b82f6', color3: '#8b5cf6' },
    'ml-api': { gradient: 'from-purple-500 to-pink-500', icon: '🧠', color1: '#8b5cf6', color2: '#ec4899', color3: '#f59e0b' },
    'dashboard': { gradient: 'from-cyan-400 to-blue-600', icon: '📊', color1: '#06b6d4', color2: '#3b82f6', color3: '#8b5cf6' },
    'data-analysis': { gradient: 'from-teal-400 to-blue-600', icon: '📈', color1: '#14b8a6', color2: '#06b6d4', color3: '#3b82f6' },
    'mobile-app': { gradient: 'from-pink-500 to-red-500', icon: '📱', color1: '#ec4899', color2: '#ef4444', color3: '#f59e0b' },
    'neural-network': { gradient: 'from-indigo-500 to-purple-600', icon: '🔗', color1: '#6366f1', color2: '#8b5cf6', color3: '#ec4899' },
    'web-scraping': { gradient: 'from-yellow-400 to-orange-500', icon: '🕷️', color1: '#facc15', color2: '#f59e0b', color3: '#ef4444' },
    'image-recognition': { gradient: 'from-green-500 to-teal-600', icon: '👁️', color1: '#22c55e', color2: '#10b981', color3: '#06b6d4' },
    'saas': { gradient: 'from-blue-400 to-indigo-600', icon: '☁️', color1: '#60a5fa', color2: '#3b82f6', color3: '#6366f1' },
    'blockchain': { gradient: 'from-yellow-400 to-red-500', icon: '⛓️', color1: '#facc15', color2: '#f59e0b', color3: '#ef4444' },
    'devops': { gradient: 'from-gray-500 to-gray-700', icon: '⚙️', color1: '#6b7280', color2: '#4b5563', color3: '#374151' },
    'recommendation': { gradient: 'from-purple-400 to-pink-600', icon: '🎯', color1: '#a855f7', color2: '#d946ef', color3: '#ec4899' },
    'cloud': { gradient: 'from-blue-300 to-blue-600', icon: '☁️', color1: '#93c5fd', color2: '#3b82f6', color3: '#1d4ed8' },
    'opensource': { gradient: 'from-green-400 to-green-600', icon: '🌟', color1: '#4ade80', color2: '#22c55e', color3: '#16a34a' }
  };

  const config = configs[type] || configs['saas'];
  
  const svg = `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${config.color1};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${config.color2};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${config.color3};stop-opacity:1" />
        </linearGradient>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
          <circle cx="10" cy="10" r="1" fill="white" opacity="0.2"/>
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grad1)"/>
      <rect width="100%" height="100%" fill="url(#dots)"/>
      
      <text x="300" y="160" font-family="Arial" font-size="80" text-anchor="middle" fill="white" opacity="0.9">${config.icon}</text>
      
      <text x="300" y="220" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">${title}</text>
      
      <rect x="220" y="240" width="160" height="30" rx="15" fill="rgba(255,255,255,0.2)"/>
      <text x="300" y="260" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="white">${type.toUpperCase()}</text>
      
      <circle cx="100" cy="100" r="30" fill="rgba(255,255,255,0.1)"/>
      <circle cx="500" cy="300" r="40" fill="rgba(255,255,255,0.1)"/>
      <circle cx="550" cy="80" r="20" fill="rgba(255,255,255,0.1)"/>
    </svg>`;

  // Use URL encoding instead of base64 to avoid btoa issues with emojis
  const encodedSvg = encodeURIComponent(svg);
  return `data:image/svg+xml,${encodedSvg}`;
};

// Project type mappings
export const projectTypes: Record<string, string> = {
  'AI Chat Assistant': 'ai-chat',
  'E-commerce Platform': 'ecommerce',
  'Machine Learning API': 'ml-api',
  'React Dashboard': 'dashboard',
  'Python Data Analysis': 'data-analysis',
  'Mobile App (React Native)': 'mobile-app',
  'Neural Network Project': 'neural-network',
  'Web Scraping Tool': 'web-scraping',
  'AI Image Recognition': 'image-recognition',
  'Full Stack SaaS': 'saas',
  'Blockchain DApp': 'blockchain',
  'DevOps Automation': 'devops',
  'AI Recommendation System': 'recommendation',
  'Cloud Infrastructure': 'cloud',
  'Open Source Contribution': 'opensource'
}; 