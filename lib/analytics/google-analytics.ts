// Google Analytics 4 Integration for NEOTODAK AI Labs
// Tracks page views, events, and custom metrics

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | object,
      config?: object
    ) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || !ANALYTICS_ENABLED) {
    console.log('🔍 Analytics: Disabled or missing GA_MEASUREMENT_ID');
    return;
  }

  // Create gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // Initialize with timestamp
  window.gtag('js', new Date());
  
  // Configure with your measurement ID
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    custom_map: {
      custom_parameter_1: 'project_interaction',
      custom_parameter_2: 'user_engagement_level'
    }
  });

  console.log('🔍 Analytics: Google Analytics initialized');
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || !ANALYTICS_ENABLED) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });

  console.log('📊 Analytics: Page view tracked', { url, title });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number, additionalParams?: object) => {
  if (!GA_MEASUREMENT_ID || !ANALYTICS_ENABLED) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    custom_parameter_1: label,
    ...additionalParams
  });

  console.log('🎯 Analytics: Event tracked', { action, category, label, value });
};

// Specific tracking functions for NEOTODAK AI Labs

// Track project clicks
export const trackProjectClick = (projectId: string, projectTitle: string, projectCategory: string) => {
  trackEvent('click_project', 'projects', projectId, 1, {
    project_title: projectTitle,
    project_category: projectCategory,
    engagement_type: 'project_exploration'
  });
};

// Track project link clicks (GitHub, Live, etc.)
export const trackProjectLinkClick = (projectId: string, linkType: string, url: string) => {
  trackEvent('click_project_link', 'project_links', `${projectId}_${linkType}`, 1, {
    project_id: projectId,
    link_type: linkType,
    destination_url: url,
    engagement_type: 'external_navigation'
  });
};

// Track navigation
export const trackNavigation = (destination: string, source: string = 'menu') => {
  trackEvent('navigate', 'navigation', destination, 1, {
    navigation_source: source,
    destination_page: destination
  });
};

// Track contact attempts
export const trackContactAttempt = (method: string) => {
  trackEvent('contact_attempt', 'engagement', method, 1, {
    contact_method: method,
    engagement_type: 'lead_generation'
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number, page: string) => {
  if (percentage % 25 === 0) { // Track at 25%, 50%, 75%, 100%
    trackEvent('scroll_depth', 'engagement', `${page}_${percentage}%`, percentage, {
      page_path: page,
      scroll_percentage: percentage,
      engagement_type: 'content_consumption'
    });
  }
};

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number, page: string) => {
  if (timeInSeconds >= 30) { // Only track if user stays 30+ seconds
    trackEvent('time_on_page', 'engagement', page, timeInSeconds, {
      page_path: page,
      time_spent: timeInSeconds,
      engagement_type: 'content_engagement'
    });
  }
};

// Track tech stack interest
export const trackTechStackClick = (technology: string) => {
  trackEvent('tech_stack_click', 'technology_interest', technology, 1, {
    technology_name: technology,
    engagement_type: 'technical_interest'
  });
};

// Track filter usage on projects page
export const trackProjectFilter = (filterType: string, filterValue: string) => {
  trackEvent('filter_projects', 'projects', `${filterType}_${filterValue}`, 1, {
    filter_type: filterType,
    filter_value: filterValue,
    engagement_type: 'content_discovery'
  });
};

// Enhanced error tracking
export const trackError = (error: string, page: string, additionalInfo?: object) => {
  trackEvent('error', 'system', error, 1, {
    error_message: error,
    page_path: page,
    error_context: additionalInfo,
    ...additionalInfo
  });
};

// Track AI/automation interest patterns
export const trackAIInterest = (feature: string, context: string) => {
  trackEvent('ai_interest', 'ai_engagement', feature, 1, {
    ai_feature: feature,
    interaction_context: context,
    engagement_type: 'ai_exploration'
  });
};
