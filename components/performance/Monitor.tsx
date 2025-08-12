'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconCpu, IconMemory, IconClock, IconActivity, IconSettings, IconX, IconEye, IconEyeOff } from '@tabler/icons-react';
import { usePerformanceMonitor } from '@/components/three/PerformanceOptimizer';
import { trackPerformanceMetric } from '@/lib/analytics/events';
import { adaptiveQualityManager } from '@/lib/performance/optimizer';

interface PerformanceAlert {
  id: string;
  type: 'fps' | 'memory' | 'frame_time';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: number;
}

interface PerformanceMonitorProps {
  showInProduction?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  autoHide?: boolean;
  alertThresholds?: {
    fps: number;
    memory: number;
    frameTime: number;
  };
}

export default function PerformanceMonitor({
  showInProduction = false,
  position = 'bottom-left',
  autoHide = true,
  alertThresholds = {
    fps: 30,
    memory: 500,
    frameTime: 33.33
  }
}: PerformanceMonitorProps) {
  const { stats, isLowPerformance } = usePerformanceMonitor();
  const [isVisible, setIsVisible] = useState(!autoHide);
  const [isExpanded, setIsExpanded] = useState(false);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingData, setRecordingData] = useState<Array<{ timestamp: number; fps: number; memory: number; frameTime: number }>>([]);
  const alertIdCounter = useRef(0);
  const previousStats = useRef(stats);

  // Don't show in production unless explicitly enabled
  const shouldShow = process.env.NODE_ENV === 'development' || showInProduction;

  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  // Monitor for performance alerts
  useEffect(() => {
    const checkAlerts = () => {
      const newAlerts: PerformanceAlert[] = [];

      // FPS alert
      if (stats.fps < alertThresholds.fps && previousStats.current.fps >= alertThresholds.fps) {
        newAlerts.push({
          id: `fps-${alertIdCounter.current++}`,
          type: 'fps',
          message: `FPS dropped to ${stats.fps}`,
          severity: stats.fps < 20 ? 'high' : stats.fps < 25 ? 'medium' : 'low',
          timestamp: Date.now()
        });
      }

      // Memory alert
      if (stats.memoryUsage > alertThresholds.memory && previousStats.current.memoryUsage <= alertThresholds.memory) {
        newAlerts.push({
          id: `memory-${alertIdCounter.current++}`,
          type: 'memory',
          message: `Memory usage: ${stats.memoryUsage}MB`,
          severity: stats.memoryUsage > 800 ? 'high' : stats.memoryUsage > 600 ? 'medium' : 'low',
          timestamp: Date.now()
        });
      }

      // Frame time alert
      if (stats.frameTime > alertThresholds.frameTime && previousStats.current.frameTime <= alertThresholds.frameTime) {
        newAlerts.push({
          id: `frame-${alertIdCounter.current++}`,
          type: 'frame_time',
          message: `Frame time: ${stats.frameTime.toFixed(2)}ms`,
          severity: stats.frameTime > 50 ? 'high' : stats.frameTime > 40 ? 'medium' : 'low',
          timestamp: Date.now()
        });
      }

      if (newAlerts.length > 0) {
        setAlerts(prev => [...prev, ...newAlerts].slice(-10)); // Keep only last 10 alerts
        
        // Track performance alerts
        newAlerts.forEach(alert => {
          trackPerformanceMetric(alert.type, alert.type === 'fps' ? stats.fps : 
                                            alert.type === 'memory' ? stats.memoryUsage : 
                                            stats.frameTime, {
            alert_severity: alert.severity,
            timestamp: alert.timestamp
          });
        });

        // Auto-show monitor when there are alerts
        if (autoHide && !isVisible) {
          setIsVisible(true);
        }
      }

      previousStats.current = { ...stats };
    };

    const interval = setInterval(checkAlerts, 1000);
    return () => clearInterval(interval);
  }, [stats, alertThresholds, autoHide, isVisible]);

  // Recording functionality
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setRecordingData(prev => {
        const newData = [...prev, {
          timestamp: Date.now(),
          fps: stats.fps,
          memory: stats.memoryUsage,
          frameTime: stats.frameTime
        }];
        return newData.slice(-300); // Keep last 5 minutes at 1-second intervals
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, stats]);

  // Auto-hide functionality
  useEffect(() => {
    if (!autoHide) return;

    let hideTimer: NodeJS.Timeout;
    
    if (isVisible && !isLowPerformance && alerts.length === 0) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
        setIsExpanded(false);
      }, 10000); // Hide after 10 seconds if no issues
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isVisible, isLowPerformance, alerts.length, autoHide]);

  // Download recording data
  const downloadRecording = () => {
    if (recordingData.length === 0) return;

    const data = {
      recording: recordingData,
      metadata: {
        startTime: recordingData[0]?.timestamp,
        endTime: recordingData[recordingData.length - 1]?.timestamp,
        duration: recordingData.length,
        deviceInfo: {
          userAgent: navigator.userAgent,
          memory: (navigator as any).deviceMemory,
          hardwareConcurrency: navigator.hardwareConcurrency,
          connection: (navigator as any).connection?.effectiveType
        }
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-recording-${new Date().toISOString().slice(0, 19)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear alerts
  const clearAlerts = () => {
    setAlerts([]);
  };

  // Get status color
  const getStatusColor = () => {
    if (alerts.some(a => a.severity === 'high')) return 'text-red-400 bg-red-400/20 border-red-400/30';
    if (alerts.some(a => a.severity === 'medium') || isLowPerformance) return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
    return 'text-green-400 bg-green-400/20 border-green-400/30';
  };

  if (!shouldShow || !isVisible) {
    return (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <button
          onClick={() => setIsVisible(true)}
          className="p-2 rounded-lg bg-black/80 border border-white/20 text-gray-400 hover:text-white transition-colors"
          title="Show Performance Monitor"
        >
          <IconEye className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className={`fixed ${positionClasses[position]} z-50 max-w-sm`}
      >
        <div 
          className={`rounded-lg border shadow-2xl overflow-hidden ${getStatusColor()}`}
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Compact View */}
          <div 
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <IconActivity className="w-4 h-4" />
              </motion.div>
              <div className="text-sm font-mono">
                <span className="mr-2">{stats.fps}fps</span>
                {stats.memoryUsage > 0 && (
                  <span className="text-xs text-gray-400">{Math.round(stats.memoryUsage)}MB</span>
                )}
              </div>
              {alerts.length > 0 && (
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <IconEyeOff className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Expanded View */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-white/10"
              >
                <div className="p-3 space-y-3">
                  {/* Performance Metrics */}
                  <div className="space-y-2">
                    <MetricRow
                      icon={IconCpu}
                      label="FPS"
                      value={stats.fps}
                      unit="fps"
                      status={stats.fps >= 55 ? 'good' : stats.fps >= 30 ? 'warning' : 'critical'}
                    />
                    <MetricRow
                      icon={IconClock}
                      label="Frame"
                      value={stats.frameTime}
                      unit="ms"
                      precision={2}
                      status={stats.frameTime <= 16.67 ? 'good' : stats.frameTime <= 33.33 ? 'warning' : 'critical'}
                    />
                    {stats.memoryUsage > 0 && (
                      <MetricRow
                        icon={IconMemory}
                        label="Memory"
                        value={stats.memoryUsage}
                        unit="MB"
                        status={stats.memoryUsage < 100 ? 'good' : stats.memoryUsage < 300 ? 'warning' : 'critical'}
                      />
                    )}
                  </div>

                  {/* Quality Settings */}
                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="text-white capitalize">{adaptiveQualityManager.getCurrentQuality()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low Perf Mode:</span>
                      <span className={isLowPerformance ? 'text-red-400' : 'text-green-400'}>
                        {isLowPerformance ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Alerts */}
                  {alerts.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-300">Recent Alerts</span>
                        <button
                          onClick={clearAlerts}
                          className="text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="space-y-1 max-h-20 overflow-y-auto">
                        {alerts.slice(-3).reverse().map(alert => (
                          <div
                            key={alert.id}
                            className={`text-xs p-2 rounded border ${
                              alert.severity === 'high' ? 'bg-red-400/20 border-red-400/30' :
                              alert.severity === 'medium' ? 'bg-yellow-400/20 border-yellow-400/30' :
                              'bg-blue-400/20 border-blue-400/30'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span>{alert.message}</span>
                              <span className="text-gray-500 ml-2">
                                {new Date(alert.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                          isRecording 
                            ? 'bg-red-400/20 text-red-400 border border-red-400/30' 
                            : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-400 animate-pulse' : 'bg-gray-400'}`} />
                        <span>{isRecording ? 'Recording' : 'Record'}</span>
                      </button>
                      
                      {recordingData.length > 0 && (
                        <button
                          onClick={downloadRecording}
                          className="px-2 py-1 rounded text-xs bg-cyan-400/20 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/30 transition-colors"
                        >
                          Export ({recordingData.length})
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-1 rounded hover:bg-white/10 transition-colors"
                    >
                      <IconX className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Helper component for metric rows
interface MetricRowProps {
  icon: React.ComponentType<any>;
  label: string;
  value: number;
  unit: string;
  precision?: number;
  status: 'good' | 'warning' | 'critical';
}

function MetricRow({ icon: Icon, label, value, unit, precision = 0, status }: MetricRowProps) {
  const statusColors = {
    good: 'text-green-400',
    warning: 'text-yellow-400',
    critical: 'text-red-400'
  };

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center space-x-2">
        <Icon className={`w-3 h-3 ${statusColors[status]}`} />
        <span className="text-gray-300">{label}</span>
      </div>
      <span className={`font-mono ${statusColors[status]}`}>
        {value.toFixed(precision)}{unit}
      </span>
    </div>
  );
}

// Hook for external components to access monitor data
export function usePerformanceMonitorData() {
  const { stats, isLowPerformance } = usePerformanceMonitor();
  const quality = adaptiveQualityManager.getCurrentQuality();
  
  return {
    fps: stats.fps,
    frameTime: stats.frameTime,
    memoryUsage: stats.memoryUsage,
    isLowPerformance,
    quality,
    qualitySettings: adaptiveQualityManager.getQualitySettings()
  };
}