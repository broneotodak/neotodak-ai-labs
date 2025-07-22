'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconEye, IconMouse, IconUsers, IconChartBar, IconClick, IconBrain, IconExternalLink } from '@tabler/icons-react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  projectClicks: number;
  contactAttempts: number;
  avgTimeOnSite: number;
  topProjects: Array<{ name: string; clicks: number }>;
  dailyViews: Array<{ date: string; views: number }>;
  deviceTypes: { mobile: number; desktop: number; tablet: number };
}

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [loading, setLoading] = useState(true);

  // Simulated data - you can replace this with actual GA4 API calls
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual Google Analytics data
      const mockData: AnalyticsData = {
        pageViews: Math.floor(Math.random() * 1000) + 500,
        uniqueVisitors: Math.floor(Math.random() * 300) + 150,
        projectClicks: Math.floor(Math.random() * 100) + 50,
        contactAttempts: Math.floor(Math.random() * 20) + 5,
        avgTimeOnSite: Math.floor(Math.random() * 120) + 45,
        topProjects: [
          { name: 'THR Intelligence', clicks: Math.floor(Math.random() * 50) + 20 },
          { name: 'FlowState AI', clicks: Math.floor(Math.random() * 40) + 15 },
          { name: 'Firasah AI', clicks: Math.floor(Math.random() * 30) + 10 },
          { name: 'AutoRecruit', clicks: Math.floor(Math.random() * 25) + 8 },
          { name: 'TODAK Bot', clicks: Math.floor(Math.random() * 20) + 5 }
        ],
        dailyViews: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          views: Math.floor(Math.random() * 100) + 20
        })),
        deviceTypes: {
          mobile: Math.floor(Math.random() * 60) + 30,
          desktop: Math.floor(Math.random() * 50) + 40,
          tablet: Math.floor(Math.random() * 20) + 10
        }
      };
      
      setData(mockData);
      setLoading(false);
    };

    fetchAnalytics();
  }, [timeRange]);

  const StatCard = ({ icon, title, value, change, color }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    change?: string;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        {change && (
          <span className={`text-sm ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400">Loading Analytics Data...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">📊 NEOTODAK Analytics</h1>
          <p className="text-gray-400">Real-time insights into your AI projects portfolio</p>
          
          {/* Time Range Selector */}
          <div className="flex gap-2 mt-4">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-cyan-500 text-black'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<IconEye className="w-6 h-6 text-white" />}
            title="Total Page Views"
            value={data.pageViews.toLocaleString()}
            change="+12%"
            color="bg-blue-500/20"
          />
          <StatCard
            icon={<IconUsers className="w-6 h-6 text-white" />}
            title="Unique Visitors"
            value={data.uniqueVisitors.toLocaleString()}
            change="+8%"
            color="bg-green-500/20"
          />
          <StatCard
            icon={<IconClick className="w-6 h-6 text-white" />}
            title="Project Clicks"
            value={data.projectClicks}
            change="+25%"
            color="bg-purple-500/20"
          />
          <StatCard
            icon={<IconMouse className="w-6 h-6 text-white" />}
            title="Contact Attempts"
            value={data.contactAttempts}
            change="+5%"
            color="bg-orange-500/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <IconBrain className="w-5 h-5 text-cyan-400" />
              Most Viewed Projects
            </h2>
            <div className="space-y-3">
              {data.topProjects.map((project, index) => (
                <div key={project.name} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-cyan-500 text-black rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-white">{project.name}</span>
                  </div>
                  <span className="text-cyan-400 font-mono">{project.clicks}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily Views Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <IconChartBar className="w-5 h-5 text-cyan-400" />
              Daily Traffic
            </h2>
            <div className="space-y-2">
              {data.dailyViews.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{day.date}</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="bg-cyan-500 h-3 rounded-full"
                      style={{ width: `${(day.views / Math.max(...data.dailyViews.map(d => d.views))) * 100}px` }}
                    />
                    <span className="text-cyan-400 font-mono text-sm w-12 text-right">{day.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <IconExternalLink className="w-4 h-4" />
              View Full GA4 Dashboard
            </a>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Export Data
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Share Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
