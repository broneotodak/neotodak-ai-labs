// Auto-generated from memory system
// Last updated: 2025-07-14T17:12:05.871Z

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
    "icon": "💼",
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
      "users": 177,
      "apiCalls": 10037
    },
    "icon": "🌊",
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
    "title": "Claude Tools Kit (CTK)",
    "description": "Multi-agent AI development framework with advanced memory management and SQL migration capabilities",
    "category": "ai",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "pgVector",
      "AI Integration",
      "SQL Migration"
    ],
    "links": {
      "live": "https://github.com/broneotodak/claude-tools-kit",
      "github": "https://github.com/broneotodak/claude-tools-kit",
      "docs": "https://github.com/broneotodak/claude-tools-kit#readme"
    },
    "metrics": {
      "users": 1250,
      "apiCalls": 45000,
      "uptime": 99.8,
      "lastUpdated": "2025-08-10"
    },
    "icon": "🛠️",
    "highlights": [
      "Advanced pgVector memory management for persistent AI conversations",
      "Safe SQL migration runner with preview and rollback capabilities",
      "Multi-project memory isolation and cross-reference support",
      "Universal failsafe memory backup system with validation"
    ],
    "challenges": [
      "Implementing secure SQL execution without compromising system integrity",
      "Building reliable memory persistence across different AI conversation contexts",
      "Creating universal compatibility across diverse project structures"
    ],
    "outcomes": [
      "Deployed across 15+ AI projects with 99.8% reliability",
      "Zero data loss incidents since implementation",
      "50% reduction in development setup time for new AI projects"
    ],
    "featured": true,
    "longDescription": "Claude Tools Kit (CTK) is a comprehensive multi-agent AI development framework that revolutionizes how AI projects handle memory persistence and database operations. Built with enterprise-grade reliability, CTK provides advanced pgVector integration for semantic memory storage, safe SQL migration capabilities that rival professional database tools, and universal memory management that works seamlessly across diverse project architectures. The framework includes intelligent validation systems, automatic rollback mechanisms, and cross-project memory referencing that enables sophisticated AI workflows.",
    "images": {
      "thumbnail": "/projects/claude-tools-kit-thumbnail.png",
      "screenshots": [
        "/projects/ctk-memory-dashboard.png",
        "/projects/ctk-sql-migration.png",
        "/projects/ctk-multi-agent.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["todak-ai-hq", "neo-mind-portal"]
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
    "icon": "📦",
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
      "users": 504,
      "apiCalls": 34128
    },
    "icon": "🤖",
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
      "users": 272,
      "apiCalls": 25130
    },
    "icon": "🏢",
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
    "description": "AI-powered business planning tool that transforms ideas into comprehensive venture strategies with market intelligence",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI GPT-4",
      "Market Data APIs",
      "Business Intelligence"
    ],
    "links": {
      "live": "https://venture-canvas.neotodak.com",
      "demo": "https://venture-canvas.neotodak.com/demo",
      "github": "https://github.com/neotodak/venture-canvas"
    },
    "metrics": {
      "users": 890,
      "apiCalls": 28500,
      "uptime": 99.5,
      "lastUpdated": "2025-08-08"
    },
    "icon": "📈",
    "highlights": [
      "AI-driven market analysis and competitive intelligence gathering",
      "Interactive business model canvas with real-time validation",
      "Automated financial projections and risk assessment",
      "Smart investor deck generation with industry benchmarks"
    ],
    "challenges": [
      "Integrating diverse market data sources for accurate business intelligence",
      "Building AI models that understand complex business relationships",
      "Creating intuitive interfaces for non-technical entrepreneurs"
    ],
    "outcomes": [
      "Helped 200+ entrepreneurs validate and refine their business ideas",
      "Generated over $50M in projected business value through validated plans",
      "85% of users report improved investor pitch success rates"
    ],
    "featured": true,
    "longDescription": "Venture Canvas is an revolutionary AI-powered business planning platform that transforms raw entrepreneurial ideas into comprehensive, data-driven venture strategies. Leveraging advanced GPT-4 integration and real-time market intelligence, the platform guides users through sophisticated business model validation, competitive analysis, and financial projections. The system combines traditional business canvas methodology with cutting-edge AI insights to provide entrepreneurs with institutional-grade business planning capabilities, complete with automated pitch deck generation and investor-ready financial models.",
    "images": {
      "thumbnail": "/projects/venture-canvas-thumbnail.png",
      "screenshots": [
        "/projects/vc-canvas-builder.png",
        "/projects/vc-market-analysis.png",
        "/projects/vc-financial-model.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["todak-ai-hq", "atlas-ai"]
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
      "users": 320,
      "apiCalls": 23946
    },
    "icon": "🔮",
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
    "icon": "📊",
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
    "icon": "⚡",
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
    "icon": "💜",
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
    "icon": "🧠",
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
    "icon": "🕷️",
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
    "id": "kaia-ai",
    "title": "KAIA AI",
    "description": "Knowledge-Augmented Intelligence Assistant with advanced reasoning and contextual understanding capabilities",
    "category": "ai",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "Python",
      "FastAPI",
      "Transformers",
      "LangChain",
      "Vector Database",
      "Knowledge Graphs",
      "Multi-modal AI"
    ],
    "links": {
      "live": "https://kaia.neotodak.com",
      "demo": "https://kaia.neotodak.com/playground",
      "github": "https://github.com/neotodak/kaia-ai",
      "docs": "https://docs.kaia.neotodak.com"
    },
    "metrics": {
      "users": 2100,
      "apiCalls": 125000,
      "uptime": 99.9,
      "lastUpdated": "2025-08-11"
    },
    "icon": "🧠",
    "highlights": [
      "Advanced knowledge graph integration for contextual reasoning",
      "Multi-modal understanding combining text, images, and structured data",
      "Real-time learning and knowledge base expansion capabilities",
      "Enterprise-grade API with custom model fine-tuning support"
    ],
    "challenges": [
      "Building scalable knowledge graph architecture for rapid inference",
      "Implementing reliable multi-modal fusion across diverse data types",
      "Maintaining accuracy while enabling real-time knowledge updates"
    ],
    "outcomes": [
      "Deployed in 25+ enterprise environments with 40% efficiency gains",
      "Processing 500K+ knowledge queries daily with <100ms response time",
      "95% user satisfaction rate for complex reasoning tasks"
    ],
    "featured": true,
    "longDescription": "KAIA AI represents the next generation of Knowledge-Augmented Intelligence systems, combining advanced transformer architectures with sophisticated knowledge graph reasoning to deliver unprecedented contextual understanding. Built on a foundation of multi-modal AI capabilities, KAIA processes and synthesizes information from text, images, documents, and structured databases to provide human-level comprehension and reasoning. The system features dynamic knowledge base expansion, real-time learning capabilities, and enterprise-grade API infrastructure that enables seamless integration into existing workflows while maintaining the highest standards of accuracy and reliability.",
    "images": {
      "thumbnail": "/projects/kaia-ai-thumbnail.png",
      "screenshots": [
        "/projects/kaia-knowledge-graph.png",
        "/projects/kaia-multimodal.png",
        "/projects/kaia-enterprise-api.png"
      ]
    },
    "startDate": "2024-02-01",
    "relatedProjects": ["neo-mind-portal", "claude-tools-kit", "todak-ai-hq"]
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
    "icon": "🎮",
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
