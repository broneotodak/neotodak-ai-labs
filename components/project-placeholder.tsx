import React from 'react';

interface ProjectPlaceholderProps {
  title: string;
  type: 'ai' | 'web' | 'mobile' | 'data' | 'blockchain' | 'devops' | 'api';
  className?: string;
}

const projectConfig = {
  ai: {
    gradient: 'from-blue-500 via-purple-500 to-pink-500',
    icon: '🤖',
    pattern: 'neural'
  },
  web: {
    gradient: 'from-green-400 via-blue-500 to-purple-600',
    icon: '💻',
    pattern: 'web'
  },
  mobile: {
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
    icon: '📱',
    pattern: 'mobile'
  },
  data: {
    gradient: 'from-cyan-400 via-teal-500 to-blue-600',
    icon: '📊',
    pattern: 'data'
  },
  blockchain: {
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    icon: '⛓️',
    pattern: 'blockchain'
  },
  devops: {
    gradient: 'from-gray-400 via-gray-600 to-gray-800',
    icon: '⚙️',
    pattern: 'devops'
  },
  api: {
    gradient: 'from-indigo-400 via-purple-500 to-pink-500',
    icon: '🔌',
    pattern: 'api'
  }
};

export const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({ title, type, className = '' }) => {
  const config = projectConfig[type];
  
  return (
    <div className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}>
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-90`} />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern id={`pattern-${type}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pattern-${type})`} />
        </svg>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
        <div className="text-6xl mb-4 drop-shadow-lg">
          {config.icon}
        </div>
        <h3 className="text-xl font-bold text-center drop-shadow-lg">
          {title}
        </h3>
        <div className="mt-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
          <span className="text-sm font-medium capitalize">{type}</span>
        </div>
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </div>
  );
}; 