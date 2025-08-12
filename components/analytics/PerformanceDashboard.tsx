'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { IconChartLine, IconCpu, IconMemory, IconClock, IconTrendingUp, IconTrendingDown, IconEye, IconX } from '@tabler/icons-react';
import { usePerformanceMonitor, getDeviceQuality, getQualitySettings } from '@/components/three/PerformanceOptimizer';

interface PerformanceMetric {
  timestamp: number;
  fps: number;
  frameTime: number;
  memoryUsage: number;
  loadTime?: number;
}

interface AnalyticsData {
  pageViews: number;
  interactions3D: number;
  projectViews: number;
  flowStateEngagements: number;
  averageSessionTime: number;
  topProjects: Array<{ name: string; views: number }>;
}

interface PerformanceDashboardProps {
  isVisible?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function PerformanceDashboard({ 
  isVisible = true, 
  onClose,
  className = '' 
}: PerformanceDashboardProps) {
  const { stats, isLowPerformance } = usePerformanceMonitor();
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceMetric[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    interactions3D: 0,
    projectViews: 0,
    flowStateEngagements: 0,
    averageSessionTime: 0,
    topProjects: []
  });
  const [activeTab, setActiveTab] = useState<'performance' | 'analytics' | 'realtime'>('performance');
  const [isMinimized, setIsMinimized] = useState(false);

  // Collect performance metrics over time
  useEffect(() => {
    const interval = setInterval(() => {
      const metric: PerformanceMetric = {
        timestamp: Date.now(),
        fps: stats.fps,
        frameTime: stats.frameTime,
        memoryUsage: stats.memoryUsage
      };

      setPerformanceHistory(prev => {
        const updated = [...prev, metric];
        // Keep only last 50 data points (about 25 minutes of data)
        return updated.slice(-50);
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [stats]);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics/dashboard');
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 60000); // Every minute
    return () => clearInterval(interval);
  }, []);

  // Prepare chart data
  const chartData = useMemo(() => {
    return performanceHistory.map(metric => ({
      time: new Date(metric.timestamp).toLocaleTimeString(),
      fps: metric.fps,
      frameTime: metric.frameTime,
      memory: metric.memoryUsage
    }));
  }, [performanceHistory]);

  // Performance status indicators
  const performanceStatus = useMemo(() => {
    const avgFps = performanceHistory.length > 0 
      ? performanceHistory.reduce((acc, curr) => acc + curr.fps, 0) / performanceHistory.length
      : stats.fps;

    return {
      fps: {
        value: stats.fps,
        average: avgFps,
        status: stats.fps >= 55 ? 'excellent' : stats.fps >= 30 ? 'good' : 'poor',
        trend: avgFps > 55 ? 'up' : avgFps < 30 ? 'down' : 'stable'
      },
      memory: {
        value: stats.memoryUsage,
        status: stats.memoryUsage < 100 ? 'excellent' : stats.memoryUsage < 300 ? 'good' : 'poor',
        trend: 'stable' as const
      },
      frameTime: {
        value: stats.frameTime,
        status: stats.frameTime < 20 ? 'excellent' : stats.frameTime < 33 ? 'good' : 'poor',
        trend: 'stable' as const
      }
    };
  }, [stats, performanceHistory]);

  const deviceQuality = getDeviceQuality();
  const qualitySettings = getQualitySettings(isLowPerformance);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-4 z-50 pointer-events-auto ${className}`}
      >
        <div 
          className="relative h-full rounded-xl border border-white/20 shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <IconChartLine className="w-6 h-6 text-cyan-400" />
              <div>
                <h2 className="text-lg font-semibold text-white">Performance Analytics Dashboard</h2>
                <p className="text-sm text-gray-400">Real-time monitoring and insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <IconEye className={`w-5 h-5 ${isMinimized ? 'text-gray-400' : 'text-cyan-400'}`} />
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <IconX className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {!isMinimized && (
            <div className="flex flex-col h-full">
              {/* Tabs */}
              <div className="flex space-x-1 p-4 border-b border-white/10">
                {[
                  { key: 'performance', label: 'Performance', icon: IconCpu },
                  { key: 'analytics', label: 'Analytics', icon: IconChartLine },
                  { key: 'realtime', label: 'Real-time', icon: IconTrendingUp }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.key 
                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4">
                {/* Performance Tab */}
                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard
                        title="FPS"
                        value={stats.fps}
                        unit="fps"
                        status={performanceStatus.fps.status}
                        trend={performanceStatus.fps.trend}
                        icon={IconCpu}
                        average={performanceStatus.fps.average}
                      />
                      <MetricCard
                        title="Memory Usage"
                        value={stats.memoryUsage}
                        unit="MB"
                        status={performanceStatus.memory.status}
                        trend={performanceStatus.memory.trend}
                        icon={IconMemory}
                      />
                      <MetricCard
                        title="Frame Time"
                        value={stats.frameTime}
                        unit="ms"
                        status={performanceStatus.frameTime.status}
                        trend={performanceStatus.frameTime.trend}
                        icon={IconClock}
                      />
                    </div>

                    {/* Performance Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ChartCard title="FPS Over Time">
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                            <YAxis stroke="#6B7280" fontSize={12} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                                border: '1px solid rgba(59, 130, 246, 0.5)',
                                borderRadius: '8px'
                              }} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="fps" 
                              stroke="#06B6D4" 
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartCard>

                      <ChartCard title="Memory Usage">
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                            <YAxis stroke="#6B7280" fontSize={12} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                                border: '1px solid rgba(59, 130, 246, 0.5)',
                                borderRadius: '8px'
                              }} 
                            />
                            <Area 
                              type="monotone" 
                              dataKey="memory" 
                              stroke="#8B5CF6" 
                              fill="rgba(139, 92, 246, 0.3)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartCard>
                    </div>

                    {/* Device & Quality Settings */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Device Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Quality Level:</span>
                            <span className="text-white capitalize">{deviceQuality}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Performance Mode:</span>
                            <span className={`${isLowPerformance ? 'text-red-400' : 'text-green-400'}`}>
                              {isLowPerformance ? 'Low Performance' : 'Normal'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">CPU Cores:</span>
                            <span className="text-white">{navigator.hardwareConcurrency || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Quality Settings</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Particles:</span>
                            <span className="text-white">{qualitySettings.particleCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">DNA Points:</span>
                            <span className="text-white">{qualitySettings.dnaHelixPoints}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Advanced Shaders:</span>
                            <span className={`${qualitySettings.enableAdvancedShaders ? 'text-green-400' : 'text-red-400'}`}>
                              {qualitySettings.enableAdvancedShaders ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <AnalyticsCard
                        title="Page Views"
                        value={analyticsData.pageViews}
                        change={+12.5}
                        icon={IconEye}
                      />
                      <AnalyticsCard
                        title="3D Interactions"
                        value={analyticsData.interactions3D}
                        change={+8.3}
                        icon={IconCpu}
                      />
                      <AnalyticsCard
                        title="Project Views"
                        value={analyticsData.projectViews}
                        change={+15.7}
                        icon={IconChartLine}
                      />
                      <AnalyticsCard
                        title="FlowState Engagements"
                        value={analyticsData.flowStateEngagements}
                        change={+23.1}
                        icon={IconTrendingUp}
                      />
                    </div>

                    {/* Top Projects */}
                    <ChartCard title="Top Projects by Views">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData.topProjects}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                          <YAxis stroke="#6B7280" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                              border: '1px solid rgba(59, 130, 246, 0.5)',
                              borderRadius: '8px'
                            }} 
                          />
                          <Bar dataKey="views" fill="#06B6D4" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  </div>
                )}

                {/* Real-time Tab */}
                {activeTab === 'realtime' && (
                  <div className="space-y-6">
                    <div className="text-center text-gray-400">
                      <IconTrendingUp className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                      <h3 className="text-lg font-semibold text-white mb-2">Real-time Monitoring</h3>
                      <p>Live performance and user interaction data</p>
                    </div>
                    
                    {/* Live metrics would go here */}
                    <div className="bg-white/5 rounded-lg p-6 text-center">
                      <p className="text-gray-400">Real-time features coming soon...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Minimized view */}
          {isMinimized && (
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${performanceStatus.fps.status === 'excellent' ? 'text-green-400' : performanceStatus.fps.status === 'good' ? 'text-yellow-400' : 'text-red-400'}`}>
                  <IconCpu className="w-4 h-4" />
                  <span className="text-sm font-mono">{stats.fps} FPS</span>
                </div>
                <div className="text-purple-400 flex items-center space-x-2">
                  <IconMemory className="w-4 h-4" />
                  <span className="text-sm font-mono">{stats.memoryUsage} MB</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Helper Components
interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'poor';
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  average?: number;
}

function MetricCard({ title, value, unit, status, trend, icon: Icon, average }: MetricCardProps) {
  const statusColors = {
    excellent: 'text-green-400 border-green-400/30 bg-green-400/10',
    good: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    poor: 'text-red-400 border-red-400/30 bg-red-400/10'
  };

  const trendIcons = {
    up: IconTrendingUp,
    down: IconTrendingDown,
    stable: IconClock
  };

  const TrendIcon = trendIcons[trend];

  return (
    <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5" />
        <TrendIcon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-2xl font-bold">{Math.round(value)}<span className="text-sm ml-1">{unit}</span></p>
        <p className="text-sm text-gray-400">{title}</p>
        {average && (
          <p className="text-xs text-gray-500 mt-1">
            Avg: {Math.round(average)}{unit}
          </p>
        )}
      </div>
    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ComponentType<any>;
}

function AnalyticsCard({ title, value, change, icon: Icon }: AnalyticsCardProps) {
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5 text-cyan-400" />
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(1)}%
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}