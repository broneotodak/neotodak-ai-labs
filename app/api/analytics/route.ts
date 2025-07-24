import { NextRequest, NextResponse } from 'next/server';

// Google Analytics Data API v1 (GA4)
// This fetches real data from your Google Analytics property

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    
    // Get environment variables
    const propertyId = process.env.GA4_PROPERTY_ID;
    const serviceAccountKey = process.env.GA4_SERVICE_ACCOUNT_KEY;
    
    if (!propertyId || !serviceAccountKey) {
      console.log('🔍 Analytics API: Missing GA4 credentials, using demo data');
      return NextResponse.json(generateDemoData(days));
    }

    // Parse service account key
    let credentials;
    try {
      credentials = JSON.parse(serviceAccountKey);
    } catch (error) {
      console.error('🔍 Analytics API: Invalid service account key format, using demo data');
      return NextResponse.json(generateDemoData(days));
    }

    // Initialize Google Analytics Data API client
    const { GoogleAuth } = await import('google-auth-library');
    const { BetaAnalyticsDataClient } = await import('@google-analytics/data');
    
    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsDataClient = new BetaAnalyticsDataClient({ auth });

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    console.log(`🔍 Analytics API: Fetching real GA4 data for ${days} days`);

    // Fetch multiple reports in parallel
    const [
      basicMetricsResponse,
      dailyViewsResponse,
      deviceTypesResponse,
      topPagesResponse,
      customEventsResponse
    ] = await Promise.all([
      // Basic metrics
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: formatDate(startDate), endDate: formatDate(endDate) }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'averageSessionDuration' },
        ],
      }),

      // Daily page views
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: formatDate(startDate), endDate: formatDate(endDate) }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),

      // Device categories
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: formatDate(startDate), endDate: formatDate(endDate) }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'screenPageViews' }],
      }),

      // Top pages
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: formatDate(startDate), endDate: formatDate(endDate) }],
        dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),

      // Custom events
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: formatDate(startDate), endDate: formatDate(endDate) }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          orGroup: {
            expressions: [
              { filter: { fieldName: 'eventName', stringFilter: { value: 'click_project' } } },
              { filter: { fieldName: 'eventName', stringFilter: { value: 'contact_attempt' } } }
            ]
          }
        },
      }),
    ]);

    // Process the responses
    const basicMetrics = basicMetricsResponse[0]?.rows?.[0]?.metricValues || [];
    const pageViews = parseInt(basicMetrics[0]?.value || '0');
    const uniqueVisitors = parseInt(basicMetrics[1]?.value || '0');
    const avgTimeOnSite = Math.round(parseFloat(basicMetrics[2]?.value || '0'));

    // Process daily views
    const dailyViews = (dailyViewsResponse[0]?.rows || []).map((row: any) => ({
      date: new Date(row.dimensionValues?.[0]?.value || '').toLocaleDateString(),
      views: parseInt(row.metricValues?.[0]?.value || '0')
    }));

    // Process device types
    const deviceData = { mobile: 0, desktop: 0, tablet: 0 };
    (deviceTypesResponse[0]?.rows || []).forEach((row: any) => {
      const deviceType = row.dimensionValues?.[0]?.value?.toLowerCase() || '';
      const views = parseInt(row.metricValues?.[0]?.value || '0');
      
      if (deviceType.includes('mobile')) {
        deviceData.mobile += views;
      } else if (deviceType.includes('tablet')) {
        deviceData.tablet += views;
      } else {
        deviceData.desktop += views;
      }
    });

    // Process top projects
    const topProjects = (topPagesResponse[0]?.rows || [])
      .filter((row: any) => {
        const title = row.dimensionValues?.[0]?.value || '';
        const path = row.dimensionValues?.[1]?.value || '';
        return path.includes('/projects/') || title.toLowerCase().includes('ai') || title.toLowerCase().includes('project');
      })
      .slice(0, 5)
      .map((row: any) => ({
        name: extractProjectName(row.dimensionValues?.[0]?.value || 'Unknown Project'),
        clicks: parseInt(row.metricValues?.[0]?.value || '0')
      }));

    // Process custom events
    let projectClicks = 0;
    let contactAttempts = 0;
    
    (customEventsResponse[0]?.rows || []).forEach((row: any) => {
      const eventName = row.dimensionValues?.[0]?.value || '';
      const eventCount = parseInt(row.metricValues?.[0]?.value || '0');
      
      if (eventName === 'click_project') {
        projectClicks += eventCount;
      } else if (eventName === 'contact_attempt') {
        contactAttempts += eventCount;
      }
    });

    const analyticsData: AnalyticsData = {
      pageViews,
      uniqueVisitors,
      projectClicks,
      contactAttempts,
      avgTimeOnSite,
      topProjects: topProjects.length > 0 ? topProjects : getDefaultProjects(),
      dailyViews: dailyViews.length > 0 ? dailyViews : generateDefaultDailyViews(days),
      deviceTypes: deviceData,
    };

    console.log('🔍 Analytics API: Successfully fetched real GA4 data', {
      pageViews,
      uniqueVisitors,
      projectClicks,
      contactAttempts,
    });

    return NextResponse.json(analyticsData);

  } catch (error) {
    console.error('🔍 Analytics API Error:', error);
    console.log('🔍 Falling back to demo data');
    
    const days = parseInt(new URL(request.url).searchParams.get('days') || '7');
    return NextResponse.json(generateDemoData(days));
  }
}

// Helper function to extract project names from page titles
function extractProjectName(title: string): string {
  // Extract project names from common title patterns
  if (title.includes('THR')) return 'THR Intelligence';
  if (title.includes('FlowState')) return 'FlowState AI';
  if (title.includes('Firasah')) return 'Firasah AI';
  if (title.includes('AutoRecruit')) return 'AutoRecruit';
  if (title.includes('TODAK')) return 'TODAK Bot';
  if (title.includes('ATLAS')) return 'ATLAS AI';
  if (title.includes('Mastra')) return 'Mastra AI';
  if (title.includes('MLBB')) return 'MLBB AI Analytics';
  
  // Return cleaned title or fallback
  return title.replace(/[^\w\s]/gi, '').trim() || 'Project';
}

// Default projects when no real data available
function getDefaultProjects() {
  return [
    { name: 'THR Intelligence', clicks: 0 },
    { name: 'FlowState AI', clicks: 0 },
    { name: 'Firasah AI', clicks: 0 },
    { name: 'AutoRecruit', clicks: 0 },
    { name: 'TODAK Bot', clicks: 0 }
  ];
}

// Generate default daily views when no real data available
function generateDefaultDailyViews(days: number) {
  return Array.from({ length: Math.min(days, 30) }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return {
      date: date.toLocaleDateString(),
      views: 0
    };
  });
}

// Fallback demo data when credentials are missing
function generateDemoData(days: number): AnalyticsData {
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
        views: 15 + Math.floor(Math.random() * 25) + (i > days - 3 ? 5 : 0)
      };
    }),
    deviceTypes: {
      mobile: 45 + Math.floor(Math.random() * 20),
      desktop: 35 + Math.floor(Math.random() * 15),
      tablet: 10 + Math.floor(Math.random() * 10)
    }
  };
} 