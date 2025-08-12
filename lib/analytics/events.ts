// Custom Analytics Events for NEOTODAK AI Labs
// Specialized tracking for 3D interactions, project views, and performance metrics

import { trackEvent } from './google-analytics';

// 3D Animation Interaction Tracking
export interface ThreeDInteractionData {
  x?: number;
  y?: number;
  timestamp?: number;
  page?: string;
  canvasId?: string;
  intensity?: number;
  duration?: number;
  [key: string]: any;
}

export function track3DInteraction(
  animationType: 'dna_helix' | 'pulsing_orb' | 'particle_field' | 'connection_lines' | '3d_scene' | 'viewport' | 'scroll',
  action: 'click' | 'hover' | 'drag' | 'scroll' | 'mouse_move' | 'section_enter' | 'depth_milestone',
  data?: ThreeDInteractionData
) {
  const eventData = {
    event_category: '3D_Interaction',
    event_label: `${animationType}_${action}`,
    animation_type: animationType,
    interaction_action: action,
    mouse_x: data?.x,
    mouse_y: data?.y,
    canvas_id: data?.canvasId,
    page_path: data?.page || window.location.pathname,
    timestamp: data?.timestamp || Date.now(),
    ...data
  };

  // Track with Google Analytics
  trackEvent('3d_interaction', eventData);

  // Track performance impact of interactions
  if (animationType !== 'viewport' && animationType !== 'scroll') {
    trackPerformanceImpact(animationType, action);
  }

  // Log for debugging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 3D Interaction Tracked:', eventData);
  }
}

// Project View and Engagement Tracking
export interface ProjectViewData {
  category?: string;
  position?: number;
  linkType?: string;
  url?: string;
  timestamp?: number;
  viewDuration?: number;
  scrollDepth?: number;
  [key: string]: any;
}

export function trackProjectView(
  projectName: string,
  source: 'project_card' | 'project_link' | 'navigation' | 'search' | 'hero' | 'featured',
  data?: ProjectViewData
) {
  const eventData = {
    event_category: 'Project_Engagement',
    event_label: projectName,
    project_name: projectName,
    source: source,
    project_category: data?.category,
    list_position: data?.position,
    link_type: data?.linkType,
    external_url: data?.url,
    page_path: window.location.pathname,
    timestamp: data?.timestamp || Date.now(),
    ...data
  };

  trackEvent('project_view', eventData);

  // Track project popularity for recommendations
  incrementProjectPopularity(projectName, source);

  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Project View Tracked:', eventData);
  }
}

// FlowState Widget Engagement Tracking
export interface FlowStateEngagementData {
  isExpanded?: boolean;
  expanded?: boolean;
  activityCount?: number;
  timestamp?: number;
  page?: string;
  sessionDuration?: number;
  [key: string]: any;
}

export function trackFlowStateEngagement(
  action: 'expand' | 'collapse' | 'refresh' | 'activity_click' | 'general_click',
  data?: FlowStateEngagementData
) {
  const eventData = {
    event_category: 'FlowState_Widget',
    event_label: action,
    widget_action: action,
    is_expanded: data?.isExpanded || data?.expanded,
    activity_count: data?.activityCount,
    page_path: data?.page || window.location.pathname,
    timestamp: data?.timestamp || Date.now(),
    ...data
  };

  trackEvent('flowstate_engagement', eventData);

  // Track widget usage patterns
  trackWidgetUsagePattern(action, data);

  if (process.env.NODE_ENV === 'development') {
    console.log('⚡ FlowState Engagement Tracked:', eventData);
  }
}

// Performance Metrics Tracking
export interface PerformanceMetricData {
  page?: string;
  timestamp?: number;
  sectionId?: string;
  deviceType?: string;
  connectionType?: string;
  [key: string]: any;
}

export function trackPerformanceMetric(
  metric: 'fps' | 'memory_usage' | 'frame_time' | 'load_time' | 'time_in_section' | 'time_on_page' | 'bundle_size',
  value: number,
  data?: PerformanceMetricData
) {
  const eventData = {
    event_category: 'Performance',
    event_label: metric,
    metric_name: metric,
    metric_value: value,
    page_path: data?.page || window.location.pathname,
    section_id: data?.sectionId,
    timestamp: data?.timestamp || Date.now(),
    device_type: getDeviceType(),
    connection_type: getConnectionType(),
    ...data
  };

  trackEvent('performance_metric', eventData);

  // Alert on performance issues
  if (shouldAlertOnPerformance(metric, value)) {
    trackPerformanceAlert(metric, value, data);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('⚡ Performance Metric Tracked:', eventData);
  }
}

// Advanced Analytics Functions

// Track performance impact of 3D interactions
function trackPerformanceImpact(animationType: string, action: string) {
  // Measure performance before and after interaction
  const startTime = performance.now();
  
  requestAnimationFrame(() => {
    const endTime = performance.now();
    const interactionTime = endTime - startTime;
    
    trackPerformanceMetric('frame_time', interactionTime, {
      interaction_type: `${animationType}_${action}`,
      measurement_type: 'interaction_impact'
    });
  });
}

// Track project popularity for recommendations
const projectPopularity = new Map<string, { views: number, sources: Set<string> }>();

function incrementProjectPopularity(projectName: string, source: string) {
  const current = projectPopularity.get(projectName) || { views: 0, sources: new Set() };
  current.views++;
  current.sources.add(source);
  projectPopularity.set(projectName, current);
  
  // Send popularity data periodically
  if (current.views % 10 === 0) {
    trackEvent('project_popularity', {
      event_category: 'Project_Analytics',
      project_name: projectName,
      total_views: current.views,
      unique_sources: current.sources.size,
      sources: Array.from(current.sources)
    });
  }
}

// Track widget usage patterns
const widgetUsageStats = {
  totalInteractions: 0,
  expandCount: 0,
  refreshCount: 0,
  averageSessionDuration: 0,
  lastInteractionTime: Date.now()
};

function trackWidgetUsagePattern(action: string, data?: FlowStateEngagementData) {
  widgetUsageStats.totalInteractions++;
  
  if (action === 'expand') {
    widgetUsageStats.expandCount++;
  } else if (action === 'refresh') {
    widgetUsageStats.refreshCount++;
  }
  
  const now = Date.now();
  const sessionDuration = now - widgetUsageStats.lastInteractionTime;
  widgetUsageStats.averageSessionDuration = 
    (widgetUsageStats.averageSessionDuration + sessionDuration) / 2;
  widgetUsageStats.lastInteractionTime = now;
  
  // Send usage pattern every 20 interactions
  if (widgetUsageStats.totalInteractions % 20 === 0) {
    trackEvent('widget_usage_pattern', {
      event_category: 'Widget_Analytics',
      total_interactions: widgetUsageStats.totalInteractions,
      expand_rate: widgetUsageStats.expandCount / widgetUsageStats.totalInteractions,
      refresh_rate: widgetUsageStats.refreshCount / widgetUsageStats.totalInteractions,
      avg_session_duration: widgetUsageStats.averageSessionDuration
    });
  }
}

// Performance alerting
function shouldAlertOnPerformance(metric: string, value: number): boolean {
  const thresholds = {
    fps: 30,           // Alert if FPS drops below 30
    memory_usage: 500, // Alert if memory usage exceeds 500MB
    frame_time: 33.33, // Alert if frame time exceeds 33ms (30fps)
    load_time: 3000,   // Alert if load time exceeds 3 seconds
  };
  
  const threshold = thresholds[metric as keyof typeof thresholds];
  return threshold !== undefined && value > threshold;
}

function trackPerformanceAlert(metric: string, value: number, data?: PerformanceMetricData) {
  trackEvent('performance_alert', {
    event_category: 'Performance_Alert',
    alert_metric: metric,
    alert_value: value,
    page_path: data?.page || window.location.pathname,
    device_type: getDeviceType(),
    timestamp: Date.now()
  });
  
  // Log critical performance issues
  console.warn(`🚨 Performance Alert: ${metric} = ${value}`, data);
}

// Utility functions for device and connection detection
function getDeviceType(): string {
  if (typeof window === 'undefined') return 'server';
  
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

function getConnectionType(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  return connection ? connection.effectiveType || connection.type || 'unknown' : 'unknown';
}

// Batch event sending for performance
class EventBatcher {
  private events: any[] = [];
  private batchSize = 10;
  private flushInterval = 5000; // 5 seconds
  private timer: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.startTimer();
    }
  }

  addEvent(event: any) {
    this.events.push(event);
    
    if (this.events.length >= this.batchSize) {
      this.flush();
    }
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.events.length > 0) {
        this.flush();
      }
    }, this.flushInterval);
  }

  private flush() {
    if (this.events.length === 0) return;
    
    const eventsToSend = [...this.events];
    this.events = [];
    
    // Send batched events
    trackEvent('batch_events', {
      event_category: 'Analytics_Batch',
      events: eventsToSend,
      batch_size: eventsToSend.length,
      timestamp: Date.now()
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Batched Events Sent:', eventsToSend.length);
    }
  }
}

// Global event batcher instance
const eventBatcher = new EventBatcher();

// Enhanced tracking with batching for high-frequency events
export function trackHighFrequencyEvent(eventType: string, eventData: any) {
  eventBatcher.addEvent({
    type: eventType,
    data: eventData,
    timestamp: Date.now()
  });
}

// Custom dimensions and metrics for Google Analytics 4
export function setCustomDimensions(dimensions: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      custom_map: dimensions
    });
  }
}

// A/B Test tracking
export function trackABTest(testName: string, variant: string, metric?: string, value?: number) {
  trackEvent('ab_test', {
    event_category: 'AB_Testing',
    test_name: testName,
    variant: variant,
    metric: metric,
    value: value,
    timestamp: Date.now()
  });
}

// User journey tracking
const userJourney: Array<{ page: string; timestamp: number; action?: string }> = [];

export function addToUserJourney(page: string, action?: string) {
  userJourney.push({
    page,
    timestamp: Date.now(),
    action
  });
  
  // Keep only last 50 journey steps
  if (userJourney.length > 50) {
    userJourney.shift();
  }
  
  // Track complete user journey every 10 steps
  if (userJourney.length % 10 === 0) {
    trackEvent('user_journey', {
      event_category: 'User_Journey',
      journey_steps: userJourney.length,
      current_page: page,
      journey_data: userJourney.slice(-10), // Last 10 steps
      timestamp: Date.now()
    });
  }
}

export { eventBatcher };