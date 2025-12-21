// Auto-generated from memory system
// Last updated: 2025-12-21T21:35:00.000Z

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
    "description": "AI-powered HRMS with Custom AI Dashboard & Sofia Assistant",
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
      "demo": "https://thr.neotodak.com/demo",
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
      "Advanced payroll automation with Malaysian tax calculations",
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
      "Improved employee satisfaction scores by 40% through better self-service",
      "Streamlined onboarding process reducing time-to-productivity by 60%"
    ],
    "featured": true,
    "longDescription": "THR Intelligence revolutionizes human resource management through advanced AI integration and comprehensive workforce analytics. This enterprise-grade HRMS combines traditional HR functionalities with cutting-edge artificial intelligence, featuring Sofia - an AI assistant that handles HR queries via WhatsApp. The platform delivers unprecedented automation in payroll processing, attendance management, and employee lifecycle optimization with sophisticated multi-tenant security.",
    "images": {
      "thumbnail": "/projects/thr-intelligence-thumbnail.png",
      "screenshots": [
        "/projects/thr-dashboard-overview.png",
        "/projects/thr-payroll-system.png",
        "/projects/thr-attendance-tracker.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["kenal-admin", "atlas-ai", "todak-ai-hq"]
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
      "Real-time APIs",
      "OpenAI Embeddings",
      "Multi-tool Integration"
    ],
    "links": {
      "live": "https://flowstate.todak.io",
      "demo": "https://flowstate.todak.io/track",
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
      "Advanced pgVector embeddings for semantic memory search",
      "Unified memory layer shared between all AI tools",
      "Machine vs Tool distinction for flexible multi-device workflows",
      "Automatic activity categorization with FlowState-ready metadata",
      "Cross-session memory persistence and retrieval"
    ],
    "challenges": [
      "Building accurate activity classification without privacy invasion",
      "Implementing real-time sync across multiple AI tools and machines",
      "Creating meaningful productivity metrics from diverse activity patterns"
    ],
    "outcomes": [
      "Unified memory ecosystem across 4+ AI tools (Claude Desktop, Cursor, Antigravity, Claude Code)",
      "Tracked 50,000+ activities with semantic search capability",
      "Reduced context loss between sessions by 90%",
      "Enabled seamless project switching with automatic context restoration"
    ],
    "featured": true,
    "longDescription": "FlowState AI represents the cutting edge of AI workflow optimization through intelligent activity monitoring and cross-tool memory synchronization. Built with advanced pgVector semantic analysis, the platform continuously tracks activities across multiple AI tools (Claude Desktop, Cursor, Antigravity) and machines, providing a unified memory layer that ensures context is never lost. The system maintains the critical distinction between machines (hardware) and tools (software) for flexible deployment workflows.",
    "images": {
      "thumbnail": "/projects/flowstate-ai-thumbnail.png",
      "screenshots": [
        "/projects/flowstate-dashboard.png",
        "/projects/flowstate-analytics.png",
        "/projects/flowstate-tracking.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["claude-tools-kit", "clauden"]
  },
  {
    "id": "claude-tools-kit",
    "title": "Claude Tools Kit (CTK)",
    "description": "Multi-agent AI development framework with memory management and SQL migrations",
    "category": "ai",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "pgVector",
      "AI Integration",
      "SQL Migration",
      "MCP Protocol"
    ],
    "links": {
      "live": "https://github.com/broneotodak/claude-tools-kit",
      "github": "https://github.com/broneotodak/claude-tools-kit",
      "docs": "https://github.com/broneotodak/claude-tools-kit#readme"
    },
    "metrics": {
      "users": 1450,
      "apiCalls": 58000,
      "uptime": 99.9,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🛠️",
    "highlights": [
      "Advanced pgVector memory management for persistent AI conversations",
      "Safe SQL migration runner with preview and rollback capabilities",
      "Multi-project memory isolation and cross-reference support",
      "Universal failsafe memory backup system with validation",
      "FlowState-compatible metadata structure for activity tracking"
    ],
    "challenges": [
      "Implementing secure SQL execution without compromising system integrity",
      "Building reliable memory persistence across different AI conversation contexts",
      "Creating universal compatibility across diverse project structures"
    ],
    "outcomes": [
      "Deployed across 20+ AI projects with 99.9% reliability",
      "Zero data loss incidents since implementation",
      "50% reduction in development setup time for new AI projects"
    ],
    "featured": true,
    "longDescription": "Claude Tools Kit (CTK) is a comprehensive multi-agent AI development framework that revolutionizes how AI projects handle memory persistence and database operations. Built with enterprise-grade reliability, CTK provides advanced pgVector integration for semantic memory storage, safe SQL migration capabilities, and universal memory management that works seamlessly across diverse project architectures.",
    "images": {
      "thumbnail": "/projects/claude-tools-kit-thumbnail.png",
      "screenshots": [
        "/projects/ctk-memory-dashboard.png",
        "/projects/ctk-sql-migration.png",
        "/projects/ctk-multi-agent.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["flowstate-ai", "clauden"]
  },
  {
    "id": "atlas-ai",
    "title": "ATLAS AI",
    "description": "Enterprise asset management system with predictive maintenance",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "React",
      "TypeScript",
      "Material-UI",
      "Supabase",
      "Chart.js",
      "IoT Integration",
      "Predictive Analytics"
    ],
    "links": {
      "live": "https://atlas.neotodak.com",
      "demo": "https://atlas.neotodak.com/tracking",
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
      "Comprehensive asset lifecycle tracking from procurement to disposal",
      "AI-powered predictive maintenance with failure prediction algorithms",
      "Real-time asset location monitoring with IoT sensor integration",
      "Automated compliance reporting and audit trail generation",
      "Smart asset allocation optimization based on usage patterns"
    ],
    "challenges": [
      "Integrating diverse IoT sensors across multiple asset categories",
      "Building accurate predictive models for various asset types",
      "Scaling real-time tracking for enterprise-level asset inventories"
    ],
    "outcomes": [
      "Reduced asset downtime by 45% through predictive maintenance",
      "Improved asset utilization rates by 60% with intelligent allocation",
      "Decreased maintenance costs by 35% through optimized scheduling",
      "Achieved 99% asset tracking accuracy across distributed locations"
    ],
    "featured": true,
    "longDescription": "ATLAS AI transforms enterprise asset management through intelligent automation and predictive analytics. This comprehensive platform combines advanced IoT sensor integration with sophisticated AI algorithms to provide real-time visibility into asset health, location, and performance across entire organizational ecosystems.",
    "images": {
      "thumbnail": "/projects/atlas-ai-thumbnail.png",
      "screenshots": [
        "/projects/atlas-dashboard.png",
        "/projects/atlas-tracking-map.png",
        "/projects/atlas-maintenance-schedule.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["thr-intelligence", "kenal-admin"]
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
      "Twilio",
      "Voice Processing"
    ],
    "links": {
      "live": "https://ars.neotodak.com",
      "demo": "https://ars.neotodak.com/interview-demo",
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
      "Automated AI-powered voice interviews with natural conversation flow",
      "ElevenLabs integration for human-like voice synthesis",
      "Advanced transcript processing and candidate sentiment analysis",
      "Real-time candidate evaluation with behavioral assessment",
      "Multi-language support with cultural context awareness"
    ],
    "challenges": [
      "Building natural conversation AI that handles diverse interview scenarios",
      "Ensuring unbiased candidate evaluation across different backgrounds",
      "Creating reliable voice processing for various accents and audio qualities"
    ],
    "outcomes": [
      "Reduced initial screening time by 80% while improving candidate quality",
      "Conducted 8,000+ automated interviews with 92% candidate satisfaction",
      "Improved hiring manager efficiency by 65% through pre-qualified candidates",
      "Eliminated scheduling conflicts with 24/7 interview availability"
    ],
    "featured": true,
    "longDescription": "ARS Intelligence revolutionizes recruitment through sophisticated AI-powered voice interview automation. This cutting-edge system combines advanced natural language processing with ElevenLabs voice synthesis to conduct human-like interviews that assess both technical competencies and cultural fit.",
    "images": {
      "thumbnail": "/projects/ars-intelligence-thumbnail.png",
      "screenshots": [
        "/projects/ars-interview-dashboard.png",
        "/projects/ars-candidate-evaluation.png",
        "/projects/ars-voice-processing.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["thr-intelligence", "todak-ai-hq"]
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
      "WhatsApp API",
      "Media Processing"
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
    "icon": "🏢",
    "highlights": [
      "Sofia AI - Intelligent WhatsApp assistant with natural conversation",
      "Automated customer service with contextual response generation",
      "Media storage integration for voice notes and images",
      "Multi-language support (English, Malay, Chinese)",
      "Integration with THR for HR queries via WhatsApp"
    ],
    "challenges": [
      "Building reliable WhatsApp API integration with message threading",
      "Creating context-aware responses across extended conversation flows",
      "Handling voice notes and media processing at scale"
    ],
    "outcomes": [
      "Reduced customer response time from hours to seconds",
      "Handled 40,000+ customer inquiries automatically",
      "Improved employee productivity by 50% through automated communications",
      "Achieved 4.8/5 customer satisfaction rating"
    ],
    "featured": true,
    "longDescription": "TODAK AI Bot transforms business communications through sophisticated WhatsApp automation. Powered by Sofia, an advanced AI assistant, the platform seamlessly handles customer inquiries, internal team communications, and workflow automation through familiar WhatsApp interfaces.",
    "images": {
      "thumbnail": "/projects/todak-ai-hq-thumbnail.png",
      "screenshots": [
        "/projects/todak-whatsapp-sofia.png",
        "/projects/todak-admin-dashboard.png",
        "/projects/todak-analytics.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["ars-intelligence", "thr-intelligence"]
  },
  {
    "id": "tad-event-system",
    "title": "TAD Event System",
    "description": "Complete event management with QR check-in, trivia, and lucky draw",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "HTML5",
      "JavaScript",
      "Supabase",
      "QR Code Generation",
      "Real-time WebSockets",
      "Netlify Functions",
      "Responsive Design"
    ],
    "links": {
      "live": "https://tad.neotodak.com",
      "demo": "https://tad.neotodak.com/demo",
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
      "QR code-based event check-in with real-time attendance tracking",
      "Interactive trivia system with live leaderboards",
      "Animated lucky draw with dramatic reveal effects",
      "Table management and seating arrangement",
      "Public display screens for event engagement",
      "Admin dashboard for complete event control"
    ],
    "challenges": [
      "Building real-time sync for hundreds of concurrent participants",
      "Creating engaging animations for lucky draw reveals",
      "Ensuring reliable QR scanning across different devices"
    ],
    "outcomes": [
      "Successfully managed 50+ corporate events",
      "Processed 10,000+ check-ins with zero failures",
      "Achieved 95% participant engagement in trivia games",
      "Reduced event check-in time by 80%"
    ],
    "featured": true,
    "longDescription": "TAD Event System is a comprehensive event management platform designed for corporate annual dinners and large gatherings. Features include QR-based check-in, interactive trivia games with live scoring, dramatic lucky draw animations, and real-time public display screens that keep attendees engaged throughout the event.",
    "images": {
      "thumbnail": "/projects/tad-event-thumbnail.png",
      "screenshots": [
        "/projects/tad-checkin.png",
        "/projects/tad-trivia.png",
        "/projects/tad-luckydraw.png"
      ]
    },
    "startDate": "2024-06-01",
    "relatedProjects": ["thr-intelligence"]
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
      "demo": "https://venture-canvas.neotodak.com/demo",
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
      "AI-driven market analysis and competitive intelligence",
      "Interactive business model canvas with real-time validation",
      "Automated financial projections and risk assessment",
      "Smart investor deck generation with industry benchmarks"
    ],
    "challenges": [
      "Integrating diverse market data sources for accurate intelligence",
      "Building AI models that understand complex business relationships",
      "Creating intuitive interfaces for non-technical entrepreneurs"
    ],
    "outcomes": [
      "Helped 300+ entrepreneurs validate their business ideas",
      "Generated over $75M in projected business value",
      "85% of users report improved investor pitch success"
    ],
    "featured": true,
    "longDescription": "Venture Canvas is a revolutionary AI-powered business planning platform that transforms raw entrepreneurial ideas into comprehensive, data-driven venture strategies. Leveraging advanced GPT-4 integration and real-time market intelligence, the platform guides users through sophisticated business model validation.",
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
    "description": "AI-powered facial analysis rooted in Islamic Firasah tradition",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Next.js",
      "TypeScript",
      "Replicate AI",
      "Computer Vision",
      "Facial Recognition",
      "Islamic Knowledge Base"
    ],
    "links": {
      "live": "https://firasah.neotodak.com",
      "demo": "https://firasah.neotodak.com/analyze",
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
      "Advanced facial feature analysis with cultural sensitivity",
      "Integration of classical Islamic Firasah texts (Kitab Firasat)",
      "Real-time personality insights based on facial characteristics",
      "Privacy-focused processing with zero data retention",
      "Multi-modal analysis combining tradition with AI"
    ],
    "challenges": [
      "Building culturally respectful facial analysis",
      "Digitizing classical Islamic physiognomy texts accurately",
      "Ensuring privacy while enabling AI-driven insights"
    ],
    "outcomes": [
      "Achieved 90% accuracy in feature detection",
      "Processed 60,000+ facial analyses",
      "First AI system to integrate classical Firasah tradition",
      "Maintained strict privacy with zero data retention"
    ],
    "featured": true,
    "longDescription": "Firasah AI uniquely combines cutting-edge computer vision with the classical Islamic tradition of Firasah (physiognomy). Built with cultural sensitivity and privacy as core principles, the platform analyzes facial features while drawing insights from digitized classical texts like Kitab Firasat.",
    "images": {
      "thumbnail": "/projects/firasah-ai-thumbnail.png",
      "screenshots": [
        "/projects/firasah-analysis-dashboard.png",
        "/projects/firasah-tradition-integration.png",
        "/projects/firasah-privacy-features.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["kaia-ai", "ars-intelligence"]
  },
  {
    "id": "kenal-admin",
    "title": "KENAL Admin",
    "description": "AI-enhanced user management and role-based access control",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "React",
      "TypeScript",
      "Material-UI",
      "Supabase",
      "Role-Based Access",
      "MCP Integration"
    ],
    "links": {
      "live": "https://kenal-admin.netlify.app",
      "demo": "https://kenal-admin.netlify.app/dashboard",
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
      "Comprehensive user management with intelligent role assignment",
      "Advanced permission system with granular access control",
      "Real-time activity monitoring and audit trail",
      "AI-powered user behavior analysis",
      "MCP server integration for Supabase operations"
    ],
    "challenges": [
      "Building scalable RBAC for complex organizational structures",
      "Implementing secure user management at scale",
      "Creating intuitive interfaces for complex permissions"
    ],
    "outcomes": [
      "Streamlined user onboarding reducing setup time by 75%",
      "Enhanced security with zero breach incidents",
      "Improved admin efficiency by 60%",
      "Successfully manages 15,000+ user accounts"
    ],
    "featured": true,
    "longDescription": "KENAL Admin represents the pinnacle of intelligent user management and administrative control systems. This sophisticated platform combines advanced role-based access control with AI-powered user behavior analytics.",
    "images": {
      "thumbnail": "/projects/kenal-admin-thumbnail.png",
      "screenshots": [
        "/projects/kenal-user-management.png",
        "/projects/kenal-permissions-matrix.png",
        "/projects/kenal-analytics-dashboard.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["thr-intelligence", "atlas-ai"]
  },
  {
    "id": "n8n-integration-hub",
    "title": "n8n Integration Hub",
    "description": "Enterprise workflow automation with AI-enhanced optimization",
    "category": "automation",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "n8n",
      "Node.js",
      "JavaScript",
      "API Integration",
      "Workflow Automation",
      "Webhook Management"
    ],
    "links": {
      "live": "https://n8n.todak.io",
      "demo": "https://n8n.todak.io/workflow-gallery",
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
      "Advanced workflow automation with 200+ integrations",
      "Powers TODAK AI, ARS, and THR backend processes",
      "Real-time monitoring and alert systems",
      "Custom webhook management with intelligent routing",
      "Enterprise-grade security with role-based access"
    ],
    "challenges": [
      "Building reliable workflow execution across diverse APIs",
      "Implementing intelligent error handling and recovery",
      "Scaling concurrent workflow execution"
    ],
    "outcomes": [
      "Automated 15,000+ business processes",
      "Achieved 99.9% workflow reliability",
      "Processed 3M+ workflow executions",
      "Enabled integration across 60+ applications"
    ],
    "featured": true,
    "longDescription": "n8n Integration Hub serves as the nerve center for enterprise workflow automation, powering the backend of multiple NEOTODAK projects including TODAK AI, ARS Intelligence, and THR system workflows.",
    "images": {
      "thumbnail": "/projects/n8n-integration-hub-thumbnail.png",
      "screenshots": [
        "/projects/n8n-workflow-designer.png",
        "/projects/n8n-monitoring-dashboard.png",
        "/projects/n8n-integration-map.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["todak-ai-hq", "ars-intelligence", "thr-intelligence"]
  },
  {
    "id": "clauden",
    "title": "ClaudeN",
    "description": "AI partnership ecosystem with memory management and task coordination",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Python",
      "JavaScript",
      "Supabase",
      "pgVector",
      "Memory Systems",
      "ntfy Notifications"
    ],
    "links": {
      "demo": "https://clauden.neotodak.com/dashboard",
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
      "Advanced memory backup and recovery for AI conversations",
      "Intelligent task manager with priority queues",
      "Cross-project memory synchronization",
      "ntfy notification integration for important events",
      "FlowState-compatible activity tracking"
    ],
    "challenges": [
      "Building reliable memory persistence across AI contexts",
      "Creating seamless integration between AI workflows",
      "Ensuring data consistency across backup systems"
    ],
    "outcomes": [
      "Protected 150,000+ AI conversation memories",
      "Improved AI workflow efficiency by 55%",
      "Achieved 99.9% memory recovery success rate",
      "Enabled collaboration across 25+ AI projects"
    ],
    "featured": true,
    "longDescription": "ClaudeN represents the evolution of AI partnership management, providing comprehensive memory systems, task coordination, and workflow optimization for Neo Todak's AI ecosystem.",
    "images": {
      "thumbnail": "/projects/clauden-thumbnail.png",
      "screenshots": [
        "/projects/clauden-memory-dashboard.png",
        "/projects/clauden-task-manager.png",
        "/projects/clauden-backup-system.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["claude-tools-kit", "flowstate-ai"]
  },
  {
    "id": "todak-llm-dataset",
    "title": "TODAK LLM Dataset",
    "description": "Custom training dataset for fine-tuning Sofia AI assistant",
    "category": "research",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "JSONL",
      "Python",
      "Hugging Face",
      "Data Processing",
      "NLP",
      "Fine-tuning"
    ],
    "links": {
      "github": "https://github.com/broneotodak/todak-llm-dataset-v1",
      "docs": "https://huggingface.co/datasets/neotodak"
    },
    "metrics": {
      "users": 85,
      "apiCalls": 5000,
      "uptime": 100,
      "lastUpdated": "2025-12-21"
    },
    "icon": "🧬",
    "highlights": [
      "25+ specialized JSONL datasets for Sofia AI training",
      "Company knowledge, HR policies, and product information",
      "Bilingual (English/Malay) conversation datasets",
      "Real Sofia conversation logs for authentic responses",
      "Gaming knowledge and cultural context datasets"
    ],
    "challenges": [
      "Curating high-quality training data from real conversations",
      "Ensuring bilingual consistency across datasets",
      "Balancing personality with factual accuracy"
    ],
    "outcomes": [
      "Created 50,000+ training examples",
      "Improved Sofia response quality by 40%",
      "Enabled domain-specific fine-tuning for HR queries",
      "Published datasets on Hugging Face for community use"
    ],
    "featured": false,
    "longDescription": "TODAK LLM Dataset is a comprehensive collection of custom training data designed to fine-tune Sofia, the AI assistant powering TODAK AI and THR systems. The dataset includes company knowledge, HR policies, product information, bilingual conversations, and real interaction logs.",
    "images": {
      "thumbnail": "/projects/todak-llm-dataset-thumbnail.png",
      "screenshots": [
        "/projects/dataset-structure.png",
        "/projects/dataset-examples.png"
      ]
    },
    "startDate": "2024-06-01",
    "relatedProjects": ["todak-ai-hq", "thr-intelligence"]
  },
  {
    "id": "ledger-finance",
    "title": "Ledger Finance",
    "description": "Personal and business financial tracking with AI insights",
    "category": "saas",
    "status": "beta",
    "complexity": 3,
    "techStack": [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Chart.js"
    ],
    "links": {
      "live": "https://ledger.neotodak.com",
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
      "Multi-account financial tracking and reconciliation",
      "Automated expense categorization with AI",
      "Visual financial reports and trend analysis",
      "Budget planning with predictive forecasting",
      "Multi-currency support for international transactions"
    ],
    "challenges": [
      "Building accurate expense categorization AI",
      "Ensuring data security for financial information",
      "Creating intuitive visualizations for complex financial data"
    ],
    "outcomes": [
      "Helped users track $2M+ in transactions",
      "Achieved 85% accuracy in auto-categorization",
      "Reduced manual bookkeeping time by 70%"
    ],
    "featured": false,
    "longDescription": "Ledger Finance is a comprehensive financial tracking application that combines personal and business expense management with AI-powered insights and beautiful visualizations.",
    "images": {
      "thumbnail": "/projects/ledger-finance-thumbnail.png",
      "screenshots": [
        "/projects/ledger-dashboard.png",
        "/projects/ledger-reports.png"
      ]
    },
    "startDate": "2024-08-01",
    "relatedProjects": ["venture-canvas"]
  },
  {
    "id": "waifu-way",
    "title": "WaifuWay Navigator",
    "description": "Fun GPS navigation app with anime-style virtual companions",
    "category": "gaming",
    "status": "beta",
    "complexity": 4,
    "techStack": [
      "React Native",
      "Expo",
      "Google Maps API",
      "TypeScript",
      "Gyroscope API",
      "3D Character Rendering"
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
      "Anime-style virtual companion for navigation",
      "Gyroscope-based character movement and reactions",
      "Voice-guided navigation with character personality",
      "Customizable companion appearances and voices",
      "Gamified driving achievements and rewards"
    ],
    "challenges": [
      "Implementing smooth gyroscope-based character animations",
      "Balancing fun features with navigation usability",
      "Optimizing battery usage for continuous GPS tracking"
    ],
    "outcomes": [
      "Created unique navigation experience with 4.5/5 user rating",
      "Built engaged community of 350+ beta testers",
      "Featured in local tech showcases"
    ],
    "featured": false,
    "longDescription": "WaifuWay Navigator brings fun to everyday driving with anime-style virtual companions that react to your driving, provide voice navigation, and make every journey an adventure.",
    "images": {
      "thumbnail": "/projects/waifu-way-thumbnail.png",
      "screenshots": [
        "/projects/waifu-navigation.png",
        "/projects/waifu-character.png"
      ]
    },
    "startDate": "2024-09-01",
    "relatedProjects": ["mastra-game"]
  },
  {
    "id": "mastra-game",
    "title": "Mastra Universe",
    "description": "AI-powered gaming with Southeast Asian mythology",
    "category": "gaming",
    "status": "development",
    "complexity": 5,
    "techStack": [
      "Godot Engine",
      "GDScript",
      "3D Modeling",
      "AI NPCs",
      "Mixamo Animations",
      "Procedural Generation"
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
      "Rich Southeast Asian mythology and worldbuilding",
      "AI-driven NPC behavior and storytelling",
      "Procedurally generated environments",
      "Cultural authenticity with traditional elements",
      "Mixamo-powered character animations"
    ],
    "challenges": [
      "Building culturally authentic SEA game world",
      "Implementing AI-driven dynamic storytelling",
      "Creating engaging gameplay with meaningful cultural elements"
    ],
    "outcomes": [
      "Established comprehensive lore and worldbuilding",
      "Integrated Mixamo animation pipeline",
      "Built foundation for procedural content generation"
    ],
    "featured": false,
    "longDescription": "Mastra Universe is an ambitious game project that brings Southeast Asian mythology to life through AI-powered storytelling, culturally authentic worldbuilding, and procedurally generated adventures in Godot Engine.",
    "images": {
      "thumbnail": "/projects/mastra-game-thumbnail.png",
      "screenshots": [
        "/projects/mastra-world.png",
        "/projects/mastra-characters.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["waifu-way"]
  },
  {
    "id": "ultimate-web-scraping",
    "title": "Ultimate Web Scraping",
    "description": "AI-powered web scraping toolkit with anti-detection",
    "category": "tool",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Python",
      "Selenium",
      "BeautifulSoup",
      "AI Data Processing",
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
      "Intelligent data extraction with AI content recognition",
      "Advanced anti-detection with dynamic fingerprinting",
      "Scalable proxy management and rotation",
      "Real-time data validation and quality assurance"
    ],
    "challenges": [
      "Building reliable anti-detection for modern websites",
      "Creating intelligent extraction across diverse structures",
      "Maintaining ethical scraping practices"
    ],
    "outcomes": [
      "Successfully scraped 15M+ web pages",
      "Achieved 95% success rate against anti-bot systems",
      "Reduced data extraction time by 85%"
    ],
    "featured": false,
    "longDescription": "Ultimate Web Scraping represents intelligent web data extraction, combining advanced AI algorithms with sophisticated anti-detection technologies for reliable, large-scale scraping operations.",
    "images": {
      "thumbnail": "/projects/ultimate-web-scraping-thumbnail.png",
      "screenshots": [
        "/projects/webscraping-dashboard.png",
        "/projects/webscraping-extraction.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["n8n-integration-hub"]
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
