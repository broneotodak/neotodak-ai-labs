'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronUp, IconChevronDown, IconActivity, IconRefresh } from '@tabler/icons-react';
import type { FlowStateActivity, FlowStateApiResponse } from '@/lib/integrations/flowstate-client';
import { ACTIVITY_CONFIG, getTimeAgo } from '@/lib/integrations/flowstate-client';

interface FlowStateWidgetProps {
  className?: string;
}

export default function FlowStateWidget({ className = '' }: FlowStateWidgetProps) {
  const [activities, setActivities] = useState<FlowStateActivity[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/flowstate?limit=5');
      const data: FlowStateApiResponse = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setActivities(data.activities);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch FlowState activities:', err);
      setError('Failed to load activities');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and set up polling
  useEffect(() => {
    fetchActivities();
    
    const interval = setInterval(fetchActivities, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatActivity = (activity: FlowStateActivity) => {
    const config = ACTIVITY_CONFIG[activity.activity_type as keyof typeof ACTIVITY_CONFIG] || ACTIVITY_CONFIG.default;
    let displayText = activity.activity_description;
    
    // Truncate long descriptions
    if (displayText.length > 50) {
      displayText = displayText.substring(0, 47) + '...';
    }
    
    return {
      ...config,
      text: displayText,
      project: activity.project_name || activity.metadata?.project || 'Unknown Project',
      timeAgo: getTimeAgo(activity.created_at),
      metadata: activity.metadata
    };
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      <motion.div
        layout
        className="relative"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Main Widget Container - Glassmorphism */}
        <motion.div
          layout
          className="relative overflow-hidden rounded-lg border border-white/20 shadow-2xl"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors duration-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: isLoading ? 360 : 0 }}
                transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
              >
                <IconActivity className="w-5 h-5 text-cyan-400" />
              </motion.div>
              <div>
                <h3 className="text-sm font-mono text-cyan-400">FlowState</h3>
                <p className="text-xs text-gray-400">
                  {error ? 'Error' : `${activities.length} activities`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  fetchActivities();
                }}
                className="p-1 rounded hover:bg-white/10 transition-colors duration-200"
                disabled={isLoading}
              >
                <IconRefresh className="w-4 h-4 text-gray-400" />
              </motion.button>
              
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <IconChevronUp className="w-4 h-4 text-gray-400" />
              </motion.div>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/30">
                  {error ? (
                    <div className="text-center py-4">
                      <p className="text-red-400 text-sm">{error}</p>
                      <button
                        onClick={fetchActivities}
                        className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : activities.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">
                        {isLoading ? 'Loading activities...' : 'No recent activities'}
                      </p>
                    </div>
                  ) : (
                    activities.map((activity, index) => {
                      const formatted = formatActivity(activity);
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative"
                        >
                          <div 
                            className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10"
                          >
                            {/* Activity Icon */}
                            <div 
                              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono"
                              style={{
                                background: `rgba(${parseInt(formatted.color.slice(1, 3), 16)}, ${parseInt(formatted.color.slice(3, 5), 16)}, ${parseInt(formatted.color.slice(5, 7), 16)}, 0.2)`,
                                border: `1px solid ${formatted.color}40`
                              }}
                            >
                              {formatted.icon}
                            </div>
                            
                            {/* Activity Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-white font-medium truncate">
                                    {formatted.text}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span 
                                      className="text-xs px-2 py-0.5 rounded-full font-mono"
                                      style={{
                                        background: `${formatted.color}20`,
                                        color: formatted.color
                                      }}
                                    >
                                      {formatted.project}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatted.timeAgo}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Metadata */}
                              {formatted.metadata && (
                                <div className="mt-1 space-y-1">
                                  {formatted.metadata.tool && (
                                    <p className="text-xs text-gray-400 truncate">
                                      🛠️ {formatted.metadata.tool}
                                    </p>
                                  )}
                                  {formatted.metadata.todos_completed && (
                                    <p className="text-xs text-green-400 truncate">
                                      ✅ {formatted.metadata.todos_completed} tasks completed
                                    </p>
                                  )}
                                  {formatted.metadata.files_modified && formatted.metadata.files_modified.length > 0 && (
                                    <p className="text-xs text-blue-400 truncate">
                                      📝 {formatted.metadata.files_modified.length} files modified
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                  
                  {lastUpdated && !error && (
                    <div className="text-center pt-2 border-t border-white/10">
                      <p className="text-xs text-gray-500">
                        Updated {getTimeAgo(lastUpdated.toISOString())}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ambient glow effect */}
        <div 
          className="absolute -inset-1 rounded-lg opacity-20 blur-xl"
          style={{
            background: 'linear-gradient(45deg, #00ffff, #0088ff, #00ffaa)'
          }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}