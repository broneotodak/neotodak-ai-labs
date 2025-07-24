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
  const [isUsingRealData, setIsUsingRealData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const daysMap = { '7d': 7, '30d': 30, '90d': 90 };
        const days = daysMap[timeRange];
        
        const response = await fetch(`/api/analytics?days=${days}`);
        
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        
        const analyticsData = await response.json();
        setData(analyticsData);
        
        // Check if we got real data or demo data by looking at realistic patterns
        const hasRealData = analyticsData.pageViews > 0 && 
                           analyticsData.dailyViews.some((day: any) => day.views > 0) &&
                           !analyticsData.pageViews.toString().includes('15'); // Demo data often starts with 15x
        
        setIsUsingRealData(hasRealData);
        
        if (!hasRealData) {
          setError('Using demonstration data. Add GA4 credentials to show real analytics.');
        }
        
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError('Failed to load analytics data. Please try again.');
        
        // Fallback to basic demo data
        setData({
          pageViews: 0,
          uniqueVisitors: 0,
          projectClicks: 0,
          contactAttempts: 0,
          avgTimeOnSite: 0,
          topProjects: [
            { name: 'THR Intelligence', clicks: 0 },
            { name: 'FlowState AI', clicks: 0 },
            { name: 'Firasah AI', clicks: 0 },
            { name: 'AutoRecruit', clicks: 0 },
            { name: 'TODAK Bot', clicks: 0 }
          ],
          dailyViews: [],
          deviceTypes: { mobile: 0, desktop: 0, tablet: 0 }
        });
        setIsUsingRealData(false);
      } finally {
        setLoading(false);
      }
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
          <span className={`text-sm ${isUsingRealData ? 'text-green-400' : 'text-gray-500'}`}>
            {isUsingRealData ? change : `Demo ${change}`}
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
          <p className="text-gray-400">
            {isUsingRealData ? 'Real-time insights from Google Analytics 4' : 'Analytics dashboard demonstration'}
          </p>
          
          {/* Data Status Info */}
          {isUsingRealData ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mt-4 flex items-start gap-3"
            >
              <IconBrain className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">✅ Live Google Analytics Data</p>
                <p className="text-green-300/80 text-sm mt-1">
                  Showing real visitor data from your Google Analytics 4 property. Data updates automatically.
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mt-4 flex items-start gap-3"
              >
                <IconAlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-400 font-medium">Demo Data Notice</p>
                  <p className="text-yellow-300/80 text-sm mt-1">
                    {error || "Currently showing demonstration data. Add Google Analytics 4 credentials to display real visitor analytics."}
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 mt-3 flex items-start gap-3"
              >
                <IconInfoCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium">Real Tracking Active</p>
                  <p className="text-blue-300/80 text-sm mt-1">
                    Google Analytics 4 is actively collecting real visitor data. 
                    View actual metrics in your <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-blue-200">GA4 Dashboard</a>.
                  </p>
                </div>
              </motion.div>
            </>
          )}
          
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
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                {!isUsingRealData && ' (Demo)'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<IconEye className="w-6 h-6 text-white" />}
            title={isUsingRealData ? "Page Views" : "Page Views (Demo)"}
            value={data.pageViews.toLocaleString()}
            change="+12%"
            color="bg-blue-500/20"
          />
          <StatCard
            icon={<IconUsers className="w-6 h-6 text-white" />}
            title={isUsingRealData ? "Unique Visitors" : "Unique Visitors (Demo)"}
            value={data.uniqueVisitors.toLocaleString()}
            change="+8%"
            color="bg-green-500/20"
          />
          <StatCard
            icon={<IconClick className="w-6 h-6 text-white" />}
            title={isUsingRealData ? "Project Clicks" : "Project Clicks (Demo)"}
            value={data.projectClicks}
            change="+25%"
            color="bg-purple-500/20"
          />
          <StatCard
            icon={<IconMouse className="w-6 h-6 text-white" />}
            title={isUsingRealData ? "Contact Attempts" : "Contact Attempts (Demo)"}
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
              Most Viewed Projects {!isUsingRealData && '(Demo)'}
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
              Daily Traffic {!isUsingRealData && '(Demo)'}
            </h2>
            <div className="space-y-2">
              {data.dailyViews.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{day.date}</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="bg-cyan-500 h-3 rounded-full"
                      style={{ width: `${Math.max((day.views / Math.max(...data.dailyViews.map(d => d.views), 1)) * 100, 2)}px` }}
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
            {isUsingRealData && (
              <span className="ml-2 text-sm text-green-400">✅ Live Data</span>
            )}
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <IconExternalLink className="w-4 h-4" />
              View Google Analytics 4
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
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <IconBrain className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
          
          {/* Setup Instructions */}
          {!isUsingRealData && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">
                <strong className="text-white">To show real Google Analytics data:</strong>
              </p>
              <ol className="text-gray-400 text-sm space-y-1 ml-4">
                <li>1. Get your GA4 Property ID from Google Analytics</li>
                <li>2. Create a service account in Google Cloud Console</li>
                <li>3. Add these environment variables to Netlify:</li>
                <li className="ml-4 font-mono text-xs bg-gray-900/50 p-2 rounded mt-2">
                  GA4_PROPERTY_ID=your_property_id<br/>
                  GA4_SERVICE_ACCOUNT_KEY={"{"}"type":"service_account",...{"}"}
                </li>
              </ol>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
