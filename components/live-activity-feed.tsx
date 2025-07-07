'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandGithub, IconActivity, IconCode, IconGitCommit, IconGitBranch, IconRocket } from '@tabler/icons-react';

interface Activity {
  id: string;
  type: 'commit' | 'deploy' | 'ai_activity' | 'project_update';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ReactNode;
  color: string;
}

// Mock activities - in production, these would come from GitHub API and Supabase
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'commit',
    title: 'Updated CTK with enhanced setup',
    description: 'claude-tools-kit: Added automatic context loading for WSL',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    icon: <IconGitCommit className="w-5 h-5" />,
    color: 'text-green-400'
  },
  {
    id: '2',
    type: 'ai_activity',
    title: 'FlowState Dashboard Update',
    description: 'Processed 1,247 AI activities today',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: <IconActivity className="w-5 h-5" />,
    color: 'text-cyan-400'
  },
  {
    id: '3',
    type: 'deploy',
    title: 'Deployed neotodak.com updates',
    description: 'New portfolio design with 3D tech stack visualization',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    icon: <IconRocket className="w-5 h-5" />,
    color: 'text-purple-400'
  },
  {
    id: '4',
    type: 'project_update',
    title: 'Firasah AI: New Model Training',
    description: 'Completed training on expanded classical text dataset',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    icon: <IconCode className="w-5 h-5" />,
    color: 'text-orange-400'
  }
];

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);

    // In production, set up real-time subscription here
    // const subscription = supabase.from('activities').on('INSERT', ...)
  }, []);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Live Activity Feed</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 group hover:bg-gray-800/30 p-3 rounded-lg transition-all duration-300"
              >
                <div className={`p-2 bg-gray-800 rounded-full ${activity.color}`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      <div className="mt-6 text-center">
        <a
          href="https://github.com/broneotodak"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <IconBrandGithub className="w-4 h-4" />
          View all activity on GitHub
        </a>
      </div>
    </div>
  );
}