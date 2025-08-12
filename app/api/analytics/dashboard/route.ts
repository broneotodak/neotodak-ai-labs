// Analytics Dashboard API Route
// Provides real-time analytics data for the performance dashboard

import { NextRequest, NextResponse } from 'next/server';

interface AnalyticsData {
  pageViews: number;
  interactions3D: number;
  projectViews: number;
  flowStateEngagements: number;
  averageSessionTime: number;
  topProjects: Array<{ name: string; views: number }>;
  performanceMetrics: {
    averageFPS: number;
    averageMemoryUsage: number;
    averageLoadTime: number;
  };
  deviceBreakdown: Array<{ device: string; percentage: number }>;
  timeRanges: {
    today: number;
    week: number;
    month: number;
  };
}

// Mock data for demonstration - replace with actual analytics data
const generateMockAnalytics = (): AnalyticsData => {
  const now = Date.now();
  const randomVariation = () => Math.random() * 0.2 + 0.9; // 90-110% variation
  
  return {
    pageViews: Math.floor(1250 * randomVariation()),
    interactions3D: Math.floor(485 * randomVariation()),
    projectViews: Math.floor(326 * randomVariation()),
    flowStateEngagements: Math.floor(142 * randomVariation()),
    averageSessionTime: Math.floor(185 * randomVariation()), // seconds
    topProjects: [
      { name: 'TODAK AI HQ', views: Math.floor(89 * randomVariation()) },
      { name: 'ARS Intelligence', views: Math.floor(76 * randomVariation()) },
      { name: 'FlowState AI', views: Math.floor(65 * randomVariation()) },
      { name: 'Firasah AI', views: Math.floor(58 * randomVariation()) },
      { name: 'ATLAS AI', views: Math.floor(54 * randomVariation()) },
      { name: 'THR Intelligence', views: Math.floor(47 * randomVariation()) },
      { name: 'ClaudeN', views: Math.floor(42 * randomVariation()) },
      { name: 'Neo Mind Portal', views: Math.floor(38 * randomVariation()) }
    ],
    performanceMetrics: {
      averageFPS: Math.floor(58 * randomVariation()),
      averageMemoryUsage: Math.floor(125 * randomVariation()),
      averageLoadTime: Math.floor(1200 * randomVariation()) // milliseconds
    },
    deviceBreakdown: [
      { device: 'Desktop', percentage: Math.floor(65 * randomVariation()) },
      { device: 'Mobile', percentage: Math.floor(28 * randomVariation()) },
      { device: 'Tablet', percentage: Math.floor(7 * randomVariation()) }
    ],
    timeRanges: {
      today: Math.floor(156 * randomVariation()),
      week: Math.floor(892 * randomVariation()),
      month: Math.floor(3247 * randomVariation())
    }
  };
};

// Simulated real-time data with trends
let analyticsCache: AnalyticsData | null = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 30000; // 30 seconds

const getAnalyticsData = (): AnalyticsData => {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (analyticsCache && (now - lastCacheUpdate) < CACHE_DURATION) {
    return analyticsCache;
  }
  
  // Generate new data
  analyticsCache = generateMockAnalytics();
  lastCacheUpdate = now;
  
  return analyticsCache;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'today';
    const includeRealtime = searchParams.get('realtime') === 'true';
    
    const analyticsData = getAnalyticsData();
    
    // Add real-time indicators
    if (includeRealtime) {
      // Simulate real-time activity
      const realtimeData = {
        activeUsers: Math.floor(Math.random() * 15) + 5, // 5-20 active users
        currentPageViews: Math.floor(Math.random() * 8) + 2, // 2-10 current views
        recentInteractions: [
          {
            type: '3d_interaction',
            action: 'dna_helix_click',
            timestamp: Date.now() - Math.random() * 300000, // Within last 5 minutes
            page: '/'
          },
          {
            type: 'project_view',
            projectName: 'TODAK AI HQ',
            timestamp: Date.now() - Math.random() * 600000, // Within last 10 minutes
            page: '/projects'
          },
          {
            type: 'flowstate_engagement',
            action: 'expand',
            timestamp: Date.now() - Math.random() * 900000, // Within last 15 minutes
            page: '/'
          }
        ].filter(() => Math.random() > 0.3) // Randomly include interactions
      };
      
      return NextResponse.json({
        ...analyticsData,
        realtime: realtimeData,
        timestamp: Date.now()
      });
    }
    
    // Apply time range filtering if needed
    if (timeRange !== 'today') {
      const multiplier = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 1;
      analyticsData.pageViews = Math.floor(analyticsData.pageViews * multiplier);
      analyticsData.interactions3D = Math.floor(analyticsData.interactions3D * multiplier);
      analyticsData.projectViews = Math.floor(analyticsData.projectViews * multiplier);
      analyticsData.flowStateEngagements = Math.floor(analyticsData.flowStateEngagements * multiplier);
    }
    
    return NextResponse.json({
      ...analyticsData,
      timestamp: Date.now(),
      timeRange
    });
    
  } catch (error) {
    console.error('Analytics dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, eventData } = body;
    
    // Process analytics event
    console.log('Analytics event received:', { eventType, eventData });
    
    // In a real implementation, you would:
    // 1. Validate the event data
    // 2. Store it in your analytics database
    // 3. Update real-time counters
    // 4. Process any aggregations
    
    // For now, just acknowledge receipt
    return NextResponse.json({
      success: true,
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('Analytics event processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process analytics event' },
      { status: 500 }
    );
  }
}

// Performance metrics endpoint
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { metrics } = body;
    
    // Process performance metrics
    console.log('Performance metrics received:', metrics);
    
    // In a real implementation:
    // 1. Validate metrics data
    // 2. Store in time-series database
    // 3. Update performance alerts
    // 4. Trigger notifications if needed
    
    return NextResponse.json({
      success: true,
      metricsProcessed: Array.isArray(metrics) ? metrics.length : 1,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('Performance metrics processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process performance metrics' },
      { status: 500 }
    );
  }
}