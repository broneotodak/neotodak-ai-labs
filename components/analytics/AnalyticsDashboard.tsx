'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconEye, IconMouse, IconUsers, IconChartBar, IconClick, IconBrain, IconExternalLink, IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';

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

  // Generate demonstration data for static site
  const generateDemoData = (days: number): AnalyticsData => {
    // Create realistic but obviously demo data
    const baseViews = 150 + Math.floor(Math.random() * 50);
    const baseUsers = Math.floor(baseViews * 0.6) + Math.floor(Math.random() * 20);
    
    return {
      pageViews: baseViews + days * 2,
      uniqueVisitors: baseUsers + Math.floor(days * 1.5),
      projectClicks: Math.floor(baseViews * 0.15) + Math.floor(Math.random() * 10),
      contactAttempts: Math.floor(baseViews * 0.03) + Math.floor(Math.random() * 3),
      avgTimeOnSite: 85 + Math.floor(Math.random() * 30),
      topProjects: [
        { name: 'THR Intelligence', clicks: 25 + Math.floor(Math.random() * 15) },
        { name: 'FlowState AI', clicks: 20 + Math.floor(Math.random() * 12) },
        { name: 'Firasah AI', clicks: 15 + Math.floor(Math.random() * 10) },
        { name: 'AutoRecruit', clicks: 12 + Math.floor(Math.random() * 8) },
        { name: 'TODAK Bot', clicks: 8 + Math.floor(Math.random() * 6) }
      ],
      dailyViews: Array.from({ length: Math.min(days, 30) }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        return {
          date: date.toLocaleDateString(),
          views: 15 + Math.floor(Math.random() * 25) + (i > days - 3 ? 5 : 0) // Recent days slightly higher
        };
      }),
      deviceTypes: {
        mobile: 45 + Math.floor(Math.random() * 20),
        desktop: 35 + Math.floor(Math.random() * 15),
        tablet: 10 + Math.floor(Math.random() * 10)
      }
    };
  };

  useEffect(() => {
    const loadDemoData = async () => {
      setLoading(true);
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const daysMap = { '7d': 7, '30d': 30, '90d': 90 };
      const days = daysMap[timeRange];
      
      setData(generateDemoData(days));
      setLoading(false);
    };

    loadDemoData();
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
          <span className="text-sm text-gray-500">
            Demo {change}
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
          <p className="text-cyan-400">Loading Analytics Demo...</p>
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
          <p className="text-gray-400">Portfolio analytics dashboard demonstration</p>
          
          {/* Static Site Info */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 mt-4 flex items-start gap-3"
          >
            <IconInfoCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-400 font-medium">Static Site Analytics</p>
              <p className="text-blue-300/80 text-sm mt-1">
                This portfolio is deployed as a static site. The data shown below is demonstration data to showcase the analytics interface design. 
                Real analytics tracking is active via Google Analytics 4.
              </p>
            </div>
          </motion.div>

          {/* Real Analytics Notice */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mt-3 flex items-start gap-3"
          >
            <IconBrain className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 font-medium">Live Tracking Active</p>
              <p className="text-green-300/80 text-sm mt-1">
                ✅ Google Analytics 4 is actively tracking real visitor data, page views, and interactions. 
                View real data in your <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-green-300 underline hover:text-green-200">GA4 Dashboard</a>.
              </p>
            </div>
          </motion.div>
          
          {/* Time Range Selector */}
          <div className="flex gap-2 mt-6">
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
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'} (Demo)
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<IconEye className="w-6 h-6 text-white" />}
            title="Page Views (Demo)"
            value={data.pageViews.toLocaleString()}
            change="+12%"
            color="bg-blue-500/20"
          />
          <StatCard
            icon={<IconUsers className="w-6 h-6 text-white" />}
            title="Unique Visitors (Demo)"
            value={data.uniqueVisitors.toLocaleString()}
            change="+8%"
            color="bg-green-500/20"
          />
          <StatCard
            icon={<IconClick className="w-6 h-6 text-white" />}
            title="Project Clicks (Demo)"
            value={data.projectClicks}
            change="+25%"
            color="bg-purple-500/20"
          />
          <StatCard
            icon={<IconMouse className="w-6 h-6 text-white" />}
            title="Contact Attempts (Demo)"
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
              Most Viewed Projects (Demo)
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
              Daily Traffic (Demo)
            </h2>
            <div className="space-y-2">
              {data.dailyViews.slice(-7).map((day, index) => (
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
          <h2 className="text-xl font-bold text-white mb-4">
            Analytics Tools
            <span className="ml-2 text-sm text-cyan-400">(Real Data Available)</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <IconExternalLink className="w-4 h-4" />
              View Real GA4 Dashboard
            </a>
            <a
              href="https://github.com/broneotodak/neotodak-ai-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <IconExternalLink className="w-4 h-4" />
              View Source Code
            </a>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              <IconInfoCircle className="w-4 h-4" />
              About This Demo
            </button>
          </div>
          
          {/* Technical Note */}
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Technical Note:</strong> This portfolio uses Next.js static export for optimal performance and CDN distribution. 
              Real analytics data is collected via Google Analytics 4, but dashboard integration requires a server-side API. 
              The demonstration data above showcases the interface design and potential metrics visualization.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
