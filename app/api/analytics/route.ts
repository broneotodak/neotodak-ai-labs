import { NextRequest, NextResponse } from 'next/server';

// Configure this route as dynamic (not static)
export const dynamic = 'force-dynamic';

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
      console.log('🔍 Analytics API: Missing GA4 credentials');
      return NextResponse.json(
        { error: 'Google Analytics credentials not configured' },
        { status: 500 }
      );
    }

    // Parse service account key
    let credentials;
    try {
      credentials = JSON.parse(serviceAccountKey);
    } catch (error) {
      console.error('🔍 Analytics API: Invalid service account key format');
      return NextResponse.json(
        { error: 'Invalid service account key format' },
        { status: 500 }
      );
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

    console.log(`🔍 Analytics API: Fetching data for ${days} days (${formatDate(startDate)} to ${formatDate(endDate)})`);

    // Fetch multiple reports in parallel
    const [
      // Basic metrics
      basicMetricsResponse,
      // Daily views
      dailyViewsResponse,
      // Device types
      deviceTypesResponse,
      // Top pages (projects)
      topPagesResponse,
      // Custom events (project clicks, contact attempts)
      customEventsResponse
    ] = await Promise.all([
      // Basic metrics: page views, unique visitors, average session duration
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'averageSessionDuration' },
        ],
      }),

      // Daily page views
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),

      // Device categories
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'screenPageViews' }],
      }),

      // Top pages (to identify project pages)
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),

      // Custom events (project clicks, contact attempts)
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [{ name: 'eventName' }, { name: 'customEvent:event_label' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          orGroup: {
            expressions: [
              {
                filter: {
                  fieldName: 'eventName',
                  stringFilter: { value: 'click_project' }
                }
              },
              {
                filter: {
                  fieldName: 'eventName',
                  stringFilter: { value: 'contact_attempt' }
                }
              }
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

    // Process top projects from page titles
    const topProjects = (topPagesResponse[0]?.rows || [])
      .filter((row: any) => {
        const title = row.dimensionValues?.[0]?.value || '';
        const path = row.dimensionValues?.[1]?.value || '';
        return path.includes('/projects/') || title.toLowerCase().includes('ai');
      })
      .slice(0, 5)
      .map((row: any) => ({
        name: row.dimensionValues?.[0]?.value || 'Unknown Project',
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
      topProjects,
      dailyViews,
      deviceTypes: deviceData,
    };

    console.log('🔍 Analytics API: Successfully fetched real GA4 data', {
      pageViews,
      uniqueVisitors,
      projectClicks,
      contactAttempts,
      dailyViewsCount: dailyViews.length,
      topProjectsCount: topProjects.length
    });

    return NextResponse.json(analyticsData);

  } catch (error) {
    console.error('🔍 Analytics API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 