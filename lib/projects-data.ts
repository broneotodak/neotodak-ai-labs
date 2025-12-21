// Auto-generated from memory system
// Last updated: 2025-12-21T21:45:00.000Z

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'ai' | 'automation' | 'saas' | 'tool' | 'integration' | 'research' | 'gaming';
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
    "description": "AI-powered HRMS with Sofia AI Assistant for Malaysian enterprises",
    "category": "ai",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "React",
      "TypeScript",
      "Material-UI",
      "Supabase",
      "OpenAI GPT-4",
      "Tailwind CSS",
      "Vite",
      "pgVector",
      "Edge Functions"
    ],
    "links": {
      "live": "https://thr.neotodak.com",
      "github": "https://github.com/broneotodak/THR"
    },
    "metrics": {
      "users": 892,
      "apiCalls": 67500,
      "uptime": 99.8,
      "lastUpdated": "2025-12-21"
    },
    "icon": "💼",
    "highlights": [
      "Comprehensive employee lifecycle management with AI-powered insights",
      "Sofia AI Assistant for natural language HR queries via WhatsApp",
      "Advanced payroll automation with Malaysian tax calculations (PCB, EPF, SOCSO)",
      "Real-time attendance tracking with facial recognition integration",
      "Intelligent leave management with predictive approval workflows",
      "RLS-secured multi-tenant architecture for enterprise clients"
    ],
    "challenges": [
      "Integrating complex payroll calculations with Malaysian tax jurisdictions",
      "Building scalable attendance tracking for distributed teams",
      "Ensuring data privacy compliance with multi-tenant RLS policies"
    ],
    "outcomes": [
      "Reduced HR processing time by 70% for 50+ companies",
      "Achieved 99.9% payroll accuracy with automated compliance checks",
      "Improved employee satisfaction scores by 40% through better self-service"
    ],
    "featured": true,
    "longDescription": "THR Intelligence revolutionizes human resource management for Malaysian enterprises through advanced AI integration. Features Sofia AI assistant for WhatsApp-based HR queries, comprehensive payroll with local tax compliance, and multi-tenant security.",
    "images": {
      "thumbnail": "/projects/thr-intelligence-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["todak-ai-hq", "atlas-ai"]
  },
  {
    "id": "flowstate-ai",
    "title": "FlowState AI",
    "description": "Real-time AI activity monitoring & cross-tool memory sync",
    "category": "ai",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "HTML5",
      "JavaScript",
      "Supabase",
      "pgVector",
      "Edge Functions",
      "OpenAI Embeddings",
      "Real-time WebSockets"
    ],
    "links": {
      "live": "https://flowstate.neotodak.com",
      "github": "https://github.com/broneotodak/flowstate-ai"
    },
    "metrics": {
      "users": 245,
      "apiCalls": 18500,
      "uptime": 99.9,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🌊",
    "highlights": [
      "Real-time activity tracking across Claude Desktop, Cursor, and Antigravity",
      "Unified memory layer with pgVector semantic embeddings",
      "Machine vs Tool distinction for flexible multi-device workflows",
      "Automatic activity categorization with FlowState-ready metadata",
      "Cross-session memory persistence and semantic search"
    ],
    "challenges": [
      "Building accurate activity classification across multiple AI tools",
      "Implementing real-time sync between different machines and tools",
      "Creating meaningful productivity insights from diverse activity patterns"
    ],
    "outcomes": [
      "Unified memory ecosystem across 4+ AI tools",
      "Tracked 50,000+ activities with semantic search capability",
      "Reduced context loss between sessions by 90%"
    ],
    "featured": true,
    "longDescription": "FlowState AI provides a unified memory layer for Neo Todak's AI workflow, tracking activities across Claude Desktop, Cursor, Antigravity, and Claude Code with pgVector semantic embeddings for intelligent retrieval.",
    "images": {
      "thumbnail": "/projects/flowstate-ai-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["claude-tools-kit", "clauden"]
  },
  {
    "id": "claude-tools-kit",
    "title": "Claude Tools Kit (CTK)",
    "description": "Multi-agent AI development framework with memory management",
    "category": "ai",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "pgVector",
      "SQL Migration",
      "MCP Protocol"
    ],
    "links": {
      "github": "https://github.com/broneotodak/claude-tools-kit"
    },
    "metrics": {
      "users": 1450,
      "apiCalls": 58000,
      "uptime": 99.9,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🛠️",
    "highlights": [
      "Advanced pgVector memory management for AI conversations",
      "Safe SQL migration runner with preview and rollback",
      "Multi-project memory isolation and cross-reference",
      "FlowState-compatible metadata structure"
    ],
    "challenges": [
      "Implementing secure SQL execution without compromising integrity",
      "Building reliable memory persistence across AI contexts",
      "Creating universal compatibility across project structures"
    ],
    "outcomes": [
      "Deployed across 20+ AI projects with 99.9% reliability",
      "Zero data loss incidents since implementation",
      "50% reduction in development setup time"
    ],
    "featured": true,
    "longDescription": "Claude Tools Kit (CTK) is the backbone of Neo Todak's AI development workflow, providing memory persistence, safe SQL migrations, and multi-project coordination.",
    "images": {
      "thumbnail": "/projects/claude-tools-kit-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["flowstate-ai", "clauden"]
  },
  {
    "id": "todak-ai-hq",
    "title": "TODAK AI Bot",
    "description": "WhatsApp automation with Sofia AI assistant",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "HTML5",
      "JavaScript",
      "Supabase",
      "n8n Workflows",
      "OpenAI GPT-4",
      "WhatsApp API"
    ],
    "links": {
      "live": "https://todak.ai",
      "demo": "https://wa.me/601137569010",
      "github": "https://github.com/broneotodak/todak-ai"
    },
    "metrics": {
      "users": 380,
      "apiCalls": 38500,
      "uptime": 99.5,
      "lastUpdated": "2025-12-21"
    },
    "icon": "💬",
    "highlights": [
      "Sofia AI - Intelligent WhatsApp assistant with natural conversation",
      "Integration with THR for HR queries via WhatsApp",
      "Media storage for voice notes and images",
      "Multi-language support (English, Malay, Chinese)"
    ],
    "challenges": [
      "Building reliable WhatsApp API integration",
      "Creating context-aware responses across conversations",
      "Handling voice notes and media at scale"
    ],
    "outcomes": [
      "Handled 40,000+ customer inquiries automatically",
      "Achieved 4.8/5 customer satisfaction rating",
      "Reduced response time from hours to seconds"
    ],
    "featured": true,
    "longDescription": "TODAK AI Bot powers Sofia, the AI assistant that handles customer inquiries, HR queries, and internal communications through WhatsApp integration.",
    "images": {
      "thumbnail": "/projects/todak-ai-hq-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["thr-intelligence", "ars-intelligence"]
  },
  {
    "id": "ars-intelligence",
    "title": "ARS Intelligence",
    "description": "AI recruitment system with automated voice interviews",
    "category": "saas",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "Python",
      "n8n Workflows",
      "ElevenLabs",
      "OpenAI GPT-4",
      "Supabase",
      "Twilio"
    ],
    "links": {
      "live": "https://ars.neotodak.com",
      "github": "https://github.com/broneotodak/ARS"
    },
    "metrics": {
      "users": 680,
      "apiCalls": 45000,
      "uptime": 99.7,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🤖",
    "highlights": [
      "Automated AI voice interviews with ElevenLabs",
      "Natural conversation flow with GPT-4",
      "Candidate sentiment analysis and scoring",
      "24/7 interview availability"
    ],
    "challenges": [
      "Building natural conversation for diverse scenarios",
      "Ensuring unbiased candidate evaluation",
      "Reliable voice processing for various accents"
    ],
    "outcomes": [
      "Reduced screening time by 80%",
      "Conducted 8,000+ automated interviews",
      "92% candidate satisfaction rate"
    ],
    "featured": true,
    "longDescription": "ARS Intelligence automates the recruitment screening process with AI-powered voice interviews using ElevenLabs for natural speech synthesis.",
    "images": {
      "thumbnail": "/projects/ars-intelligence-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["thr-intelligence", "todak-ai-hq"]
  },
  {
    "id": "atlas-ai",
    "title": "ATLAS AI",
    "description": "Enterprise asset management with predictive maintenance",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "React",
      "TypeScript",
      "Material-UI",
      "Supabase",
      "Chart.js"
    ],
    "links": {
      "live": "https://atlas.neotodak.com",
      "github": "https://github.com/broneotodak/ATLAS"
    },
    "metrics": {
      "users": 520,
      "apiCalls": 24500,
      "uptime": 99.6,
      "lastUpdated": "2025-12-21"
    },
    "icon": "📦",
    "highlights": [
      "Comprehensive asset lifecycle tracking",
      "Predictive maintenance algorithms",
      "Real-time location monitoring",
      "Automated compliance reporting"
    ],
    "challenges": [
      "Integrating diverse asset categories",
      "Building accurate predictive models",
      "Scaling for enterprise inventories"
    ],
    "outcomes": [
      "Reduced asset downtime by 45%",
      "Improved utilization rates by 60%",
      "99% asset tracking accuracy"
    ],
    "featured": true,
    "longDescription": "ATLAS AI provides comprehensive asset management with predictive maintenance capabilities for enterprise organizations.",
    "images": {
      "thumbnail": "/projects/atlas-ai-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["thr-intelligence", "kenal-admin"]
  },
  {
    "id": "tad-event-system",
    "title": "TAD Event System",
    "description": "Event management with QR check-in, trivia, and lucky draw",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "HTML5",
      "JavaScript",
      "Supabase",
      "QR Code",
      "Real-time WebSockets",
      "Netlify Functions"
    ],
    "links": {
      "live": "https://tad.neotodak.com",
      "github": "https://github.com/broneotodak/TAD"
    },
    "metrics": {
      "users": 2500,
      "apiCalls": 35000,
      "uptime": 99.8,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🎉",
    "highlights": [
      "QR code-based event check-in",
      "Interactive trivia with live leaderboards",
      "Animated lucky draw with dramatic reveals",
      "Table management and seating",
      "Public display screens for engagement"
    ],
    "challenges": [
      "Real-time sync for hundreds of participants",
      "Creating engaging lucky draw animations",
      "Reliable QR scanning across devices"
    ],
    "outcomes": [
      "Managed 50+ corporate events",
      "10,000+ check-ins with zero failures",
      "95% participant engagement in trivia"
    ],
    "featured": true,
    "longDescription": "TAD Event System is a complete event management platform for corporate annual dinners featuring QR check-in, interactive trivia, and dramatic lucky draw animations.",
    "images": {
      "thumbnail": "/projects/tad-event-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-06-01",
    "relatedProjects": ["thr-intelligence"]
  },
  {
    "id": "firasah-ai",
    "title": "Firasah AI",
    "description": "AI facial analysis rooted in Islamic Firasah tradition",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Next.js",
      "TypeScript",
      "Replicate AI",
      "Computer Vision"
    ],
    "links": {
      "live": "https://firasah.neotodak.com",
      "github": "https://github.com/broneotodak/Firasah"
    },
    "metrics": {
      "users": 450,
      "apiCalls": 28000,
      "uptime": 99.4,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🔮",
    "highlights": [
      "Integration of classical Islamic Firasah texts",
      "AI-powered facial feature analysis",
      "Privacy-focused with zero data retention",
      "Cultural sensitivity in analysis"
    ],
    "challenges": [
      "Digitizing classical Firasah texts accurately",
      "Building culturally respectful analysis",
      "Ensuring privacy while enabling insights"
    ],
    "outcomes": [
      "First AI system integrating classical Firasah",
      "Processed 60,000+ facial analyses",
      "90% accuracy in feature detection"
    ],
    "featured": true,
    "longDescription": "Firasah AI uniquely combines computer vision with the classical Islamic tradition of Firasah (physiognomy), drawing insights from digitized texts like Kitab Firasat.",
    "images": {
      "thumbnail": "/projects/firasah-ai-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["ars-intelligence"]
  },
  {
    "id": "kenal-admin",
    "title": "KENAL Admin",
    "description": "User management and role-based access control",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "React",
      "TypeScript",
      "Material-UI",
      "Supabase",
      "MCP Integration"
    ],
    "links": {
      "live": "https://kenal-admin.netlify.app",
      "github": "https://github.com/broneotodak/Kenal"
    },
    "metrics": {
      "users": 240,
      "apiCalls": 12500,
      "uptime": 99.3,
      "lastUpdated": "2025-12-21"
    },
    "icon": "📊",
    "highlights": [
      "Comprehensive user management",
      "Granular role-based access control",
      "Real-time activity monitoring",
      "MCP server integration for Supabase"
    ],
    "challenges": [
      "Building scalable RBAC",
      "Secure user management at scale",
      "Intuitive permission interfaces"
    ],
    "outcomes": [
      "Manages 15,000+ user accounts",
      "75% reduction in onboarding time",
      "Zero security breach incidents"
    ],
    "featured": false,
    "longDescription": "KENAL Admin provides enterprise-grade user management with sophisticated role-based access control and MCP integration for Supabase operations.",
    "images": {
      "thumbnail": "/projects/kenal-admin-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["thr-intelligence", "atlas-ai"]
  },
  {
    "id": "venture-canvas",
    "title": "Venture Canvas",
    "description": "AI-powered business planning with market intelligence",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI GPT-4",
      "Supabase",
      "Google OAuth"
    ],
    "links": {
      "live": "https://venture-canvas.neotodak.com",
      "github": "https://github.com/broneotodak/venture-canvas"
    },
    "metrics": {
      "users": 1050,
      "apiCalls": 32000,
      "uptime": 99.6,
      "lastUpdated": "2025-12-21"
    },
    "icon": "📈",
    "highlights": [
      "AI-driven market analysis",
      "Interactive business model canvas",
      "Automated financial projections",
      "Investor deck generation"
    ],
    "challenges": [
      "Integrating diverse market data sources",
      "Building AI for complex business relationships",
      "Creating intuitive interfaces for entrepreneurs"
    ],
    "outcomes": [
      "Helped 300+ entrepreneurs validate ideas",
      "85% improved investor pitch success",
      "$75M+ in projected business value"
    ],
    "featured": false,
    "longDescription": "Venture Canvas transforms entrepreneurial ideas into data-driven venture strategies using GPT-4 and real-time market intelligence.",
    "images": {
      "thumbnail": "/projects/venture-canvas-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["todak-ai-hq"]
  },
  {
    "id": "n8n-integration-hub",
    "title": "n8n Integration Hub",
    "description": "Enterprise workflow automation powering all NEOTODAK systems",
    "category": "automation",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "n8n",
      "Node.js",
      "JavaScript",
      "API Integration",
      "Webhook Management"
    ],
    "links": {
      "live": "https://n8n.todak.io",
      "github": "https://github.com/broneotodak/n8n-workflows"
    },
    "metrics": {
      "users": 125,
      "apiCalls": 650000,
      "uptime": 99.9,
      "lastUpdated": "2025-12-21"
    },
    "icon": "⚡",
    "highlights": [
      "Powers TODAK AI, ARS, and THR backends",
      "200+ workflow integrations",
      "Real-time monitoring and alerts",
      "Enterprise-grade security"
    ],
    "challenges": [
      "Reliable execution across diverse APIs",
      "Intelligent error handling and recovery",
      "Scaling concurrent executions"
    ],
    "outcomes": [
      "Automated 15,000+ business processes",
      "99.9% workflow reliability",
      "3M+ workflow executions processed"
    ],
    "featured": false,
    "longDescription": "n8n Integration Hub serves as the automation backbone for all NEOTODAK projects, powering TODAK AI, ARS Intelligence, and THR system workflows.",
    "images": {
      "thumbnail": "/projects/n8n-integration-hub-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["todak-ai-hq", "ars-intelligence", "thr-intelligence"]
  },
  {
    "id": "clauden",
    "title": "ClaudeN",
    "description": "AI partnership ecosystem with memory and task coordination",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Python",
      "JavaScript",
      "Supabase",
      "pgVector",
      "ntfy Notifications"
    ],
    "links": {
      "github": "https://github.com/broneotodak/ClaudeN"
    },
    "metrics": {
      "users": 180,
      "apiCalls": 22000,
      "uptime": 99.5,
      "lastUpdated": "2025-12-21"
    },
    "icon": "💜",
    "highlights": [
      "Memory backup and recovery for AI conversations",
      "Intelligent task manager with priority queues",
      "Cross-project memory synchronization",
      "ntfy notification integration"
    ],
    "challenges": [
      "Reliable memory persistence across AI contexts",
      "Seamless integration between AI workflows",
      "Data consistency across backup systems"
    ],
    "outcomes": [
      "Protected 150,000+ AI conversation memories",
      "99.9% memory recovery success rate",
      "55% improvement in AI workflow efficiency"
    ],
    "featured": false,
    "longDescription": "ClaudeN manages Neo Todak's AI partnership ecosystem, providing comprehensive memory systems, task coordination, and workflow optimization.",
    "images": {
      "thumbnail": "/projects/clauden-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["claude-tools-kit", "flowstate-ai"]
  },
  {
    "id": "todak-llm-dataset",
    "title": "TODAK LLM Dataset",
    "description": "Custom training dataset for fine-tuning Sofia AI",
    "category": "research",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "JSONL",
      "Python",
      "Hugging Face",
      "NLP",
      "Data Processing"
    ],
    "links": {
      "github": "https://github.com/broneotodak/todak-llm-dataset-v1"
    },
    "metrics": {
      "users": 85,
      "apiCalls": 5000,
      "uptime": 100,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🧬",
    "highlights": [
      "25+ specialized JSONL datasets",
      "Bilingual (English/Malay) conversations",
      "Real Sofia conversation logs",
      "Company knowledge and HR policies"
    ],
    "challenges": [
      "Curating high-quality training data",
      "Ensuring bilingual consistency",
      "Balancing personality with accuracy"
    ],
    "outcomes": [
      "50,000+ training examples created",
      "40% improvement in Sofia responses",
      "Published on Hugging Face"
    ],
    "featured": false,
    "longDescription": "TODAK LLM Dataset provides custom training data for Sofia AI, including company knowledge, HR policies, bilingual conversations, and real interaction logs.",
    "images": {
      "thumbnail": "/projects/todak-llm-dataset-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-06-01",
    "relatedProjects": ["todak-ai-hq", "thr-intelligence"]
  },
  {
    "id": "ultimate-web-scraping",
    "title": "Ultimate Web Scraping",
    "description": "AI-powered web scraping toolkit",
    "category": "tool",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Python",
      "Selenium",
      "BeautifulSoup",
      "Proxy Management"
    ],
    "links": {
      "github": "https://github.com/broneotodak/Ultimate-web-scraping"
    },
    "metrics": {
      "users": 200,
      "apiCalls": 35000,
      "uptime": 99.2,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🕷️",
    "highlights": [
      "Intelligent data extraction with AI",
      "Anti-detection with dynamic fingerprinting",
      "Scalable proxy rotation",
      "Real-time data validation"
    ],
    "challenges": [
      "Reliable anti-detection for modern sites",
      "Intelligent extraction across diverse structures",
      "Maintaining ethical scraping practices"
    ],
    "outcomes": [
      "Scraped 15M+ web pages",
      "95% success rate against anti-bot",
      "85% reduction in extraction time"
    ],
    "featured": false,
    "longDescription": "Ultimate Web Scraping combines AI-powered extraction with sophisticated anti-detection for reliable, large-scale web scraping operations.",
    "images": {
      "thumbnail": "/projects/ultimate-web-scraping-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["n8n-integration-hub"]
  },
  {
    "id": "ledger-finance",
    "title": "Ledger Finance",
    "description": "Personal and business financial tracking",
    "category": "saas",
    "status": "beta",
    "complexity": 3,
    "techStack": [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    "links": {
      "github": "https://github.com/broneotodak/ledger"
    },
    "metrics": {
      "users": 120,
      "apiCalls": 8500,
      "uptime": 99.2,
      "lastUpdated": "2025-12-21"
    },
    "icon": "💰",
    "highlights": [
      "Multi-account financial tracking",
      "Automated expense categorization",
      "Visual financial reports",
      "Multi-currency support"
    ],
    "challenges": [
      "Accurate expense categorization",
      "Data security for financial info",
      "Intuitive financial visualizations"
    ],
    "outcomes": [
      "Tracked $2M+ in transactions",
      "85% auto-categorization accuracy",
      "70% reduction in bookkeeping time"
    ],
    "featured": false,
    "longDescription": "Ledger Finance provides comprehensive financial tracking for personal and business use with AI-powered categorization and beautiful visualizations.",
    "images": {
      "thumbnail": "/projects/ledger-finance-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-08-01",
    "relatedProjects": ["venture-canvas"]
  },
  {
    "id": "waifu-way",
    "title": "WaifuWay Navigator",
    "description": "Fun GPS navigation with anime-style virtual companions",
    "category": "gaming",
    "status": "beta",
    "complexity": 4,
    "techStack": [
      "React Native",
      "Expo",
      "Google Maps API",
      "TypeScript",
      "Gyroscope API"
    ],
    "links": {
      "github": "https://github.com/broneotodak/waifu-way"
    },
    "metrics": {
      "users": 350,
      "apiCalls": 15000,
      "uptime": 98.5,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🗺️",
    "highlights": [
      "Anime-style virtual navigation companion",
      "Gyroscope-based character reactions",
      "Voice-guided navigation with personality",
      "Gamified driving achievements"
    ],
    "challenges": [
      "Smooth gyroscope animations",
      "Balancing fun with navigation usability",
      "Battery optimization for GPS"
    ],
    "outcomes": [
      "4.5/5 user rating",
      "350+ beta testers engaged",
      "Featured in local tech showcases"
    ],
    "featured": false,
    "longDescription": "WaifuWay Navigator makes everyday driving fun with anime-style virtual companions that react to your driving and provide voice navigation.",
    "images": {
      "thumbnail": "/projects/waifu-way-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-09-01",
    "relatedProjects": []
  },
  {
    "id": "mastra-universe",
    "title": "Mastra Universe",
    "description": "Game development with Southeast Asian mythology",
    "category": "gaming",
    "status": "development",
    "complexity": 5,
    "techStack": [
      "Godot Engine",
      "GDScript",
      "3D Modeling",
      "Mixamo Animations"
    ],
    "links": {
      "github": "https://github.com/broneotodak/new-godot-game"
    },
    "metrics": {
      "users": 0,
      "apiCalls": 0,
      "uptime": 0,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🎮",
    "highlights": [
      "Rich Southeast Asian mythology worldbuilding",
      "Godot Engine with GDScript",
      "Mixamo-powered character animations",
      "Cultural authenticity with traditional elements"
    ],
    "challenges": [
      "Culturally authentic SEA game world",
      "Dynamic storytelling with AI",
      "Engaging gameplay with cultural meaning"
    ],
    "outcomes": [
      "Comprehensive lore established",
      "Mixamo animation pipeline integrated",
      "Procedural content foundation built"
    ],
    "featured": false,
    "longDescription": "Mastra Universe brings Southeast Asian mythology to life through game development in Godot Engine with culturally authentic worldbuilding.",
    "images": {
      "thumbnail": "/projects/mastra-universe-thumbnail.png",
      "screenshots": []
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["waifu-way"]
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
