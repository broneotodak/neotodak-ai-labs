export interface FlowStateActivity {
  id: string;
  user_id: string;
  activity_type: string;
  activity_description: string;
  project_name: string;
  duration_minutes?: number;
  created_at: string;
  metadata?: {
    tool?: string;
    source?: string;
    machine?: string;
    project?: string;
    memory_id?: number;
    importance?: string;
    todos_completed?: number;
    files_modified?: string[];
    [key: string]: any;
  };
}

export interface FlowStateApiResponse {
  activities: FlowStateActivity[];
  count: number;
  error?: string;
}

export class FlowStateClient {
  private baseUrl: string;
  private anonKey: string;
  private cache = new Map<string, { data: FlowStateApiResponse; timestamp: number }>();
  private readonly CACHE_TTL = 30 * 1000; // 30 seconds

  constructor(baseUrl: string, anonKey: string) {
    this.baseUrl = baseUrl;
    this.anonKey = anonKey;
  }

  private getCacheKey(params: Record<string, any> = {}): string {
    return JSON.stringify(params);
  }

  private isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_TTL;
  }

  async getRecentActivities(limit: number = 5, retries: number = 3): Promise<FlowStateApiResponse> {
    const cacheKey = this.getCacheKey({ limit });
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isValidCache(cached.timestamp)) {
      return cached.data;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}/rest/v1/flowstate_activities`, {
          method: 'GET',
          headers: {
            'apikey': this.anonKey,
            'Authorization': `Bearer ${this.anonKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!response.ok) {
          throw new Error(`FlowState API error: ${response.status} ${response.statusText}`);
        }

        const activities: FlowStateActivity[] = await response.json();
        
        // Sort by created_at desc and limit
        const sortedActivities = activities
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, limit);

        const result: FlowStateApiResponse = {
          activities: sortedActivities,
          count: sortedActivities.length
        };

        // Cache the result
        this.cache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });

        return result;
      } catch (error) {
        console.warn(`FlowState API attempt ${attempt}/${retries} failed:`, error);
        
        if (attempt === retries) {
          return {
            activities: [],
            count: 0,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
        
        // Exponential backoff: wait 1s, 2s, 4s...
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000));
      }
    }

    return { activities: [], count: 0, error: 'Max retries exceeded' };
  }

  // Clear cache manually if needed
  clearCache(): void {
    this.cache.clear();
  }
}

// Activity type icons and colors mapping
export const ACTIVITY_CONFIG = {
  // Bug fixes and improvements
  'bug_fixes_and_cleanup': { icon: '🐛', color: '#ff4400', label: 'Bug Fix' },
  'bug_fixes_and_improvements': { icon: '🔧', color: '#ff8800', label: 'Improvement' },
  'bug_fix': { icon: '🐛', color: '#ff4400', label: 'Bug Fix' },
  'comprehensive_fixes': { icon: '🛠️', color: '#ff6600', label: 'Major Fix' },
  
  // Architecture and design
  'architecture_design': { icon: '🏗️', color: '#00ffff', label: 'Architecture' },
  'planning': { icon: '📋', color: '#ffaa00', label: 'Planning' },
  
  // Development activities
  'code': { icon: '💻', color: '#00ffff', label: 'Coding' },
  'file_edit': { icon: '📝', color: '#00ff88', label: 'Editing' },
  'development': { icon: '💻', color: '#00ccff', label: 'Development' },
  
  // Testing and deployment
  'test': { icon: '🧪', color: '#44ff00', label: 'Testing' },
  'deploy': { icon: '🚀', color: '#ff0088', label: 'Deploy' },
  
  // Meetings and research
  'meeting': { icon: '🤝', color: '#ff8800', label: 'Meeting' },
  'research': { icon: '🔍', color: '#8800ff', label: 'Research' },
  
  // Completion and tasks
  'task_complete': { icon: '✅', color: '#00ff44', label: 'Completed' },
  'completion': { icon: '✅', color: '#00ff44', label: 'Completed' },
  
  // Default fallback
  'default': { icon: '⚡', color: '#00ffff', label: 'Activity' }
} as const;

// Utility function to format time ago
export function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

// Create a singleton client instance
// FlowState public configuration (anon key is safe for client-side use)
const FLOWSTATE_URL = process.env.NEXT_PUBLIC_FLOWSTATE_URL || '';
const FLOWSTATE_ANON_KEY = process.env.NEXT_PUBLIC_FLOWSTATE_ANON_KEY || '';

export const flowStateClient = new FlowStateClient(
  FLOWSTATE_URL,
  FLOWSTATE_ANON_KEY
);