'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track3DInteraction, trackProjectView, trackFlowStateEngagement, trackPerformanceMetric } from '@/lib/analytics/events';
import { usePerformanceMonitor } from '@/components/three/PerformanceOptimizer';

interface AnalyticsTrackerProps {
  children?: React.ReactNode;
}

interface ViewportIntersection {
  element: Element;
  ratio: number;
  startTime: number;
}

export default function AnalyticsTracker({ children }: AnalyticsTrackerProps) {
  const pathname = usePathname();
  const { stats } = usePerformanceMonitor();
  const viewportObserver = useRef<IntersectionObserver | null>(null);
  const viewedElements = useRef<Map<string, ViewportIntersection>>(new Map());
  const scrollDepth = useRef<number>(0);
  const pageStartTime = useRef<number>(Date.now());

  // Track 3D animation interactions
  const setupAnimationTracking = useCallback(() => {
    // DNA Helix interaction tracking
    const trackDNAInteraction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-dna-helix]') || target.closest('canvas')) {
        track3DInteraction('dna_helix', 'click', {
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now(),
          page: pathname
        });
      }
    };

    // Orb hover tracking
    const trackOrbHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-orb]') || target.closest('[data-particle-field]')) {
        track3DInteraction('pulsing_orb', 'hover', {
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now(),
          page: pathname
        });
      }
    };

    // Mouse move tracking for 3D interactions
    const trackMouseMovement = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const canvas = target.closest('canvas');
      if (canvas) {
        // Throttle mouse tracking to avoid excessive events
        const now = Date.now();
        const lastTracked = canvas.getAttribute('data-last-tracked');
        if (!lastTracked || now - parseInt(lastTracked) > 500) {
          canvas.setAttribute('data-last-tracked', now.toString());
          track3DInteraction('3d_scene', 'mouse_move', {
            x: event.clientX,
            y: event.clientY,
            canvasId: canvas.id || 'unknown',
            page: pathname
          });
        }
      }
    };

    document.addEventListener('click', trackDNAInteraction);
    document.addEventListener('mouseenter', trackOrbHover, true);
    document.addEventListener('mousemove', trackMouseMovement);

    return () => {
      document.removeEventListener('click', trackDNAInteraction);
      document.removeEventListener('mouseenter', trackOrbHover, true);
      document.removeEventListener('mousemove', trackMouseMovement);
    };
  }, [pathname]);

  // Track project card interactions
  const setupProjectTracking = useCallback(() => {
    const trackProjectCardClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const projectCard = target.closest('[data-project-card]');
      if (projectCard) {
        const projectName = projectCard.getAttribute('data-project-name') || 'Unknown';
        const projectCategory = projectCard.getAttribute('data-project-category') || 'Unknown';
        const source = projectCard.getAttribute('data-source') || pathname;
        
        trackProjectView(projectName, source, {
          category: projectCategory,
          position: Array.from(projectCard.parentElement?.children || []).indexOf(projectCard),
          timestamp: Date.now()
        });
      }
    };

    // Track project link clicks
    const trackProjectLink = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[data-project-link]');
      if (link) {
        const projectName = link.getAttribute('data-project-name') || 'Unknown';
        const linkType = link.getAttribute('data-link-type') || 'external';
        const url = (link as HTMLAnchorElement).href;
        
        trackProjectView(projectName, 'project_link', {
          linkType,
          url,
          timestamp: Date.now()
        });
      }
    };

    document.addEventListener('click', trackProjectCardClick);
    document.addEventListener('click', trackProjectLink);

    return () => {
      document.removeEventListener('click', trackProjectCardClick);
      document.removeEventListener('click', trackProjectLink);
    };
  }, [pathname]);

  // Track FlowState widget interactions
  const setupFlowStateTracking = useCallback(() => {
    const trackFlowStateClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const widget = target.closest('[data-flowstate-widget]');
      if (widget) {
        const action = target.getAttribute('data-action') || 'general_click';
        const isExpanded = widget.getAttribute('data-expanded') === 'true';
        
        trackFlowStateEngagement(action, {
          isExpanded,
          timestamp: Date.now(),
          page: pathname
        });
      }
    };

    // Track widget expand/collapse
    const trackWidgetState = (event: CustomEvent) => {
      const { action, expanded } = event.detail;
      trackFlowStateEngagement(action, {
        expanded,
        timestamp: Date.now(),
        page: pathname
      });
    };

    document.addEventListener('click', trackFlowStateClick);
    document.addEventListener('flowstate-action' as any, trackWidgetState);

    return () => {
      document.removeEventListener('click', trackFlowStateClick);
      document.removeEventListener('flowstate-action' as any, trackWidgetState);
    };
  }, [pathname]);

  // Track viewport intersections and time spent on sections
  const setupViewportTracking = useCallback(() => {
    viewportObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-section-id') || 
                           entry.target.id || 
                           entry.target.className.split(' ')[0];
          
          if (entry.isIntersecting) {
            // Element entered viewport
            if (!viewedElements.current.has(elementId)) {
              viewedElements.current.set(elementId, {
                element: entry.target,
                ratio: entry.intersectionRatio,
                startTime: Date.now()
              });
              
              // Track section view
              track3DInteraction('viewport', 'section_enter', {
                sectionId: elementId,
                intersectionRatio: entry.intersectionRatio,
                page: pathname
              });
            }
          } else {
            // Element left viewport
            const viewData = viewedElements.current.get(elementId);
            if (viewData) {
              const timeSpent = Date.now() - viewData.startTime;
              viewedElements.current.delete(elementId);
              
              // Track time spent in section
              trackPerformanceMetric('time_in_section', timeSpent, {
                sectionId: elementId,
                page: pathname
              });
            }
          }
        });
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75, 0.9],
        rootMargin: '0px'
      }
    );

    // Observe all trackable sections
    const observeElements = () => {
      const elements = document.querySelectorAll(
        '[data-section-id], [data-track-viewport], section, main, article, .hero, .projects, .tech-stack'
      );
      elements.forEach((el) => viewportObserver.current?.observe(el));
    };

    // Initial observation
    setTimeout(observeElements, 1000);

    return () => {
      viewportObserver.current?.disconnect();
    };
  }, [pathname]);

  // Track scroll depth with custom dimensions
  const setupScrollTracking = useCallback(() => {
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollPercent = Math.floor((scrollTop / docHeight) * 100);
      
      // Track significant scroll milestones
      if (currentScrollPercent > scrollDepth.current) {
        const milestones = [25, 50, 75, 90, 100];
        const newMilestone = milestones.find(
          milestone => milestone <= currentScrollPercent && milestone > scrollDepth.current
        );
        
        if (newMilestone) {
          scrollDepth.current = newMilestone;
          track3DInteraction('scroll', 'depth_milestone', {
            depth: newMilestone,
            page: pathname,
            timestamp: Date.now()
          });
        }
      }
    };

    const throttledScrollTracker = throttle(trackScrollDepth, 1000);
    window.addEventListener('scroll', throttledScrollTracker, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScrollTracker);
    };
  }, [pathname]);

  // Track performance metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Track FPS when animations are active
      if (stats.fps < 60) {
        trackPerformanceMetric('fps', stats.fps, {
          page: pathname,
          timestamp: Date.now()
        });
      }
      
      // Track memory usage
      if (stats.memoryUsage > 0) {
        trackPerformanceMetric('memory_usage', stats.memoryUsage, {
          page: pathname,
          timestamp: Date.now()
        });
      }
      
      // Track frame time for smooth animations
      if (stats.frameTime > 16.67) { // More than 60fps
        trackPerformanceMetric('frame_time', stats.frameTime, {
          page: pathname,
          timestamp: Date.now()
        });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [stats, pathname]);

  // Setup all tracking on mount and route changes
  useEffect(() => {
    const cleanupFunctions = [
      setupAnimationTracking(),
      setupProjectTracking(),
      setupFlowStateTracking(),
      setupViewportTracking(),
      setupScrollTracking()
    ];

    // Reset page-specific tracking
    scrollDepth.current = 0;
    viewedElements.current.clear();
    pageStartTime.current = Date.now();

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup?.());
    };
  }, [
    pathname,
    setupAnimationTracking,
    setupProjectTracking,
    setupFlowStateTracking,
    setupViewportTracking,
    setupScrollTracking
  ]);

  // Track page leave
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - pageStartTime.current;
      trackPerformanceMetric('time_on_page', timeOnPage, {
        page: pathname,
        timestamp: Date.now()
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname]);

  return <>{children}</>;
}

// Utility function for throttling events
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
}

// Higher-order component to add analytics tracking to any component
export function withAnalyticsTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithAnalyticsComponent = (props: P) => (
    <AnalyticsTracker>
      <WrappedComponent {...props} />
    </AnalyticsTracker>
  );

  WithAnalyticsComponent.displayName = `withAnalyticsTracking(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithAnalyticsComponent;
}