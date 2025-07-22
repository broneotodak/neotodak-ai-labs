// React Hook for Analytics Integration
// Provides easy-to-use analytics functions throughout the app

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import * as analytics from './google-analytics';

export const useAnalytics = () => {
  const pathname = usePathname();
  const timeOnPageRef = useRef<number>(Date.now());
  const scrollDepthRef = useRef<number>(0);

  // Track page views on route changes
  useEffect(() => {
    analytics.trackPageView(pathname);
    timeOnPageRef.current = Date.now();
    scrollDepthRef.current = 0;

    // Track time on page when leaving
    return () => {
      const timeSpent = Math.floor((Date.now() - timeOnPageRef.current) / 1000);
      analytics.trackTimeOnPage(timeSpent, pathname);
    };
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.floor((scrollTop / docHeight) * 100);
      
      if (scrollPercent > scrollDepthRef.current) {
        scrollDepthRef.current = scrollPercent;
        analytics.trackScrollDepth(scrollPercent, pathname);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Memoized tracking functions
  const trackProjectClick = useCallback((projectId: string, projectTitle: string, projectCategory: string) => {
    analytics.trackProjectClick(projectId, projectTitle, projectCategory);
  }, []);

  const trackProjectLinkClick = useCallback((projectId: string, linkType: string, url: string) => {
    analytics.trackProjectLinkClick(projectId, linkType, url);
  }, []);

  const trackNavigation = useCallback((destination: string, source?: string) => {
    analytics.trackNavigation(destination, source);
  }, []);

  const trackContactAttempt = useCallback((method: string) => {
    analytics.trackContactAttempt(method);
  }, []);

  const trackTechStackClick = useCallback((technology: string) => {
    analytics.trackTechStackClick(technology);
  }, []);

  const trackProjectFilter = useCallback((filterType: string, filterValue: string) => {
    analytics.trackProjectFilter(filterType, filterValue);
  }, []);

  const trackAIInterest = useCallback((feature: string, context: string) => {
    analytics.trackAIInterest(feature, context);
  }, []);

  const trackError = useCallback((error: string, additionalInfo?: object) => {
    analytics.trackError(error, pathname, additionalInfo);
  }, [pathname]);

  return {
    trackProjectClick,
    trackProjectLinkClick,
    trackNavigation,
    trackContactAttempt,
    trackTechStackClick,
    trackProjectFilter,
    trackAIInterest,
    trackError,
  };
};

// Higher-order component for analytics
export const withAnalytics = <T extends object>(Component: React.ComponentType<T>) => {
  const WrappedComponent = (props: T) => {
    const analytics = useAnalytics();
    return <Component {...props} analytics={analytics} />;
  };
  
  WrappedComponent.displayName = `withAnalytics(${Component.displayName || Component.name})`;
  return WrappedComponent;
};
