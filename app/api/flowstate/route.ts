import { NextRequest, NextResponse } from 'next/server';
import { flowStateClient } from '@/lib/integrations/flowstate-client';

// Cache response for 30 seconds
export const revalidate = 30;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    
    // Validate limit
    if (limit < 1 || limit > 20) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 20' },
        { status: 400 }
      );
    }

    const result = await flowStateClient.getRecentActivities(limit);
    
    if (result.error) {
      console.error('FlowState API error:', result.error);
      return NextResponse.json(
        { 
          activities: [],
          count: 0,
          error: 'Failed to fetch activities'
        },
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        }
      );
    }

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('FlowState route error:', error);
    
    return NextResponse.json(
      { 
        activities: [],
        count: 0,
        error: 'Internal server error'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}