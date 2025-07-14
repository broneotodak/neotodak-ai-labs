// Auto-generated from memory system
// Last updated: 2025-07-14T17:09:39.865Z

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'ai' | 'automation' | 'saas' | 'tool' | 'integration' | 'research';
  status: 'live' | 'beta' | 'development' | 'archived';
  featured: boolean;
  complexity: 1 | 2 | 3 | 4 | 5;
  techStack: string[];
  links: {
    live?: string;
    github?: string;
    docs?: string;
    demo?: string;
    video?: string;
  };
  metrics?: {
    users?: number;
    uptime?: number;
    apiCalls?: number;
    lastUpdated?: string;
  };
  images: {
    thumbnail: string;
    screenshots?: string[];
  };
  icon?: string;
  highlights: string[];
  challenges: string[];
  outcomes: string[];
  relatedProjects?: string[];
  startDate: string;
  endDate?: string;
}

export const projectsData: Project[] = [
  {
    "id": "thr-intelligence",
    "title": "THR Intelligence",
    "description": "AI-powered HRMS with Custom AI Dashboard",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://thr.neotodak.com"
    },
    "metrics": {},
    "image": "💼",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": true,
    "longDescription": "AI-powered HRMS with Custom AI Dashboard",
    "images": {
      "thumbnail": "/projects/thr-intelligence-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "flowstate-ai",
    "title": "FlowState AI",
    "description": "Real-time AI activity monitoring",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://flowstate.todak.io"
    },
    "metrics": {
      "users": 369,
      "apiCalls": 29191
    },
    "image": "🌊",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": true,
    "longDescription": "Real-time AI activity monitoring",
    "images": {
      "thumbnail": "/projects/flowstate-ai-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "claude-tools-kit",
    "title": "Claude Tools Kit",
    "description": "Memory management tools for Claude AI",
    "category": "tool",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://github.com/broneotodak/claude-tools-kit",
      "github": "https://github.com/broneotodak/claude-tools-kit"
    },
    "metrics": {},
    "image": "🛠️",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "Memory management tools for Claude AI",
    "images": {
      "thumbnail": "/projects/claude-tools-kit-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "atlas-ai",
    "title": "ATLAS AI",
    "description": "Enterprise asset management system",
    "category": "ai",
    "status": "development",
    "complexity": 3,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://atlas.neotodak.com"
    },
    "metrics": {},
    "image": "📦",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "Enterprise asset management system",
    "images": {
      "thumbnail": "/projects/atlas-ai-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "ars-intelligence",
    "title": "ARS Intelligence",
    "description": "AI recruitment system with voice interviews",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://ars.neotodak.com"
    },
    "metrics": {
      "users": 100,
      "apiCalls": 44609
    },
    "image": "🤖",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": true,
    "longDescription": "AI recruitment system with voice interviews",
    "images": {
      "thumbnail": "/projects/ars-intelligence-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "todak-ai-hq",
    "title": "TODAK AI HQ",
    "description": "AI-powered digital headquarters",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://todak.ai"
    },
    "metrics": {
      "users": 594,
      "apiCalls": 29322
    },
    "image": "🏢",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": true,
    "longDescription": "AI-powered digital headquarters",
    "images": {
      "thumbnail": "/projects/todak-ai-hq-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "venture-canvas",
    "title": "Venture Canvas",
    "description": "Business venture planning tool",
    "category": "saas",
    "status": "development",
    "complexity": 3,
    "techStack": [],
    "links": {
      "live": "https://venture-canvas.neotodak.com"
    },
    "metrics": {},
    "image": "📈",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "Business venture planning tool",
    "images": {
      "thumbnail": "/projects/venture-canvas-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "firasah-ai",
    "title": "Firasah AI",
    "description": "AI-powered facial analysis",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://firasah.neotodak.com"
    },
    "metrics": {
      "users": 590,
      "apiCalls": 52697
    },
    "image": "🔮",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": true,
    "longDescription": "AI-powered facial analysis",
    "images": {
      "thumbnail": "/projects/firasah-ai-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "kenal-admin",
    "title": "KENAL Admin",
    "description": "AI-enhanced admin dashboard",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://kenal-admin.netlify.app"
    },
    "metrics": {},
    "image": "📊",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "AI-enhanced admin dashboard",
    "images": {
      "thumbnail": "/projects/kenal-admin-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "n8n-integration-hub",
    "title": "n8n Integration Hub",
    "description": "Workflow automation platform",
    "category": "automation",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "n8n"
    ],
    "links": {
      "live": "https://n8n.todak.io"
    },
    "metrics": {},
    "image": "⚡",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "Workflow automation platform",
    "images": {
      "thumbnail": "/projects/n8n-integration-hub-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "clauden",
    "title": "ClaudeN",
    "description": "AI partnership system",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "AI"
    ],
    "links": {},
    "metrics": {},
    "image": "💜",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "AI partnership system",
    "images": {
      "thumbnail": "/projects/clauden-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "neo-mind-portal",
    "title": "Neo Mind Portal",
    "description": "Personal AI knowledge management",
    "category": "saas",
    "status": "development",
    "complexity": 3,
    "techStack": [
      "AI"
    ],
    "links": {
      "live": "https://mind.neotodak.com"
    },
    "metrics": {},
    "image": "🧠",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "Personal AI knowledge management",
    "images": {
      "thumbnail": "/projects/neo-mind-portal-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "ultimate-web-scraping",
    "title": "Ultimate Web Scraping",
    "description": "Web scraping toolkit",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [],
    "links": {},
    "metrics": {},
    "image": "🕷️",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "Web scraping toolkit",
    "images": {
      "thumbnail": "/projects/ultimate-web-scraping-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  },
  {
    "id": "mastra-game",
    "title": "Mastra Game",
    "description": "5v5 MOBA game with SEA culture",
    "category": "saas",
    "status": "development",
    "complexity": 3,
    "techStack": [],
    "links": {
      "live": "https://www.mastragame.com"
    },
    "metrics": {},
    "image": "🎮",
    "highlights": [],
    "challenges": [],
    "outcomes": [],
    "featured": false,
    "longDescription": "5v5 MOBA game with SEA culture",
    "images": {
      "thumbnail": "/projects/mastra-game-thumbnail.png"
    },
    "startDate": "2024-01-01",
    "relatedProjects": []
  }
];

// Helper functions
export function getProjectById(id: string): Project | undefined {
  return projectsData.find(p => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter(p => p.featured).sort((a, b) => {
    const statusOrder = { live: 0, beta: 1, development: 2, archived: 3 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return b.complexity - a.complexity;
  });
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projectsData.filter(p => p.category === category);
}

export function getRelatedProjects(projectId: string): Project[] {
  const project = getProjectById(projectId);
  if (!project || !project.relatedProjects) return [];
  
  return project.relatedProjects
    .map(id => getProjectById(id))
    .filter(Boolean) as Project[];
}

export function getProjectStats() {
  const total = projectsData.length;
  const live = projectsData.filter(p => p.status === 'live').length;
  const totalUsers = projectsData.reduce((acc, p) => acc + (p.metrics?.users || 0), 0);
  const totalApiCalls = projectsData.reduce((acc, p) => acc + (p.metrics?.apiCalls || 0), 0);
  
  return {
    totalProjects: total,
    liveProjects: live,
    totalUsers,
    totalApiCalls,
    categories: [...new Set(projectsData.map(p => p.category))].length
  };
}
