'use client';

import React from 'react';

interface ProjectPlaceholderProps {
  title: string;
  category: string;
}

export default function ProjectPlaceholder({ title, category }: ProjectPlaceholderProps) {
  // Generate colors based on category
  const getCategoryColor = () => {
    switch(category) {
      case 'ai': return { bg: 'from-cyan-600 to-blue-600', icon: '🧠' };
      case 'automation': return { bg: 'from-purple-600 to-pink-600', icon: '⚙️' };
      case 'saas': return { bg: 'from-green-600 to-emerald-600', icon: '☁️' };
      case 'tool': return { bg: 'from-orange-600 to-red-600', icon: '🛠️' };
      case 'integration': return { bg: 'from-indigo-600 to-purple-600', icon: '🔗' };
      case 'research': return { bg: 'from-yellow-600 to-orange-600', icon: '🔬' };
      default: return { bg: 'from-gray-600 to-gray-700', icon: '📦' };
    }
  };

  const { bg, icon } = getCategoryColor();

  return (
    <div className={`w-full h-48 bg-gradient-to-br ${bg} rounded-lg flex flex-col items-center justify-center p-6`}>
      <div className="text-6xl mb-4">{icon}</div>
      <div className="text-white font-bold text-center text-lg">{title}</div>
      <div className="text-white/80 text-sm mt-1 capitalize">{category}</div>
    </div>
  );
}