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
      "React",
      "TypeScript",
      "Material-UI",
      "Supabase",
      "OpenAI GPT-4",
      "Tailwind CSS",
      "Vite"
    ],
    "links": {
      "live": "https://thr.neotodak.com",
      "demo": "https://thr.neotodak.com/demo",
      "github": "https://github.com/neotodak/thr-intelligence"
    },
    "metrics": {
      "users": 750,
      "apiCalls": 42000,
      "uptime": 99.7,
      "lastUpdated": "2025-08-10"
    },
    "icon": "💼",
    "highlights": [
      "Comprehensive employee lifecycle management with AI-powered insights",
      "Advanced payroll automation with tax calculations and compliance",
      "Real-time attendance tracking with facial recognition integration",
      "Intelligent leave management with predictive approval workflows",
      "AI-driven performance analytics and career development recommendations"
    ],
    "challenges": [
      "Integrating complex payroll calculations with multiple tax jurisdictions",
      "Building scalable attendance tracking for distributed teams",
      "Ensuring data privacy compliance across international operations"
    ],
    "outcomes": [
      "Reduced HR processing time by 70% for 50+ companies",
      "Achieved 99.9% payroll accuracy with automated compliance checks",
      "Improved employee satisfaction scores by 40% through better self-service",
      "Streamlined onboarding process reducing time-to-productivity by 60%"
    ],
    "featured": true,
    "longDescription": "THR Intelligence revolutionizes human resource management through advanced AI integration and comprehensive workforce analytics. This enterprise-grade HRMS combines traditional HR functionalities with cutting-edge artificial intelligence to deliver unprecedented automation in payroll processing, attendance management, and employee lifecycle optimization. The platform features sophisticated leave management algorithms, real-time performance tracking, and AI-powered career development recommendations that help organizations maximize their human capital potential while maintaining strict compliance standards across multiple jurisdictions.",
    "images": {
      "thumbnail": "/projects/thr-intelligence-thumbnail.png",
      "screenshots": [
        "/projects/thr-dashboard-overview.png",
        "/projects/thr-payroll-system.png",
        "/projects/thr-attendance-tracker.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["kenal-admin", "atlas-ai"]
  },
  {
    "id": "flowstate-ai",
    "title": "FlowState AI",
    "description": "Real-time AI activity monitoring",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "HTML5",
      "JavaScript",
      "Supabase",
      "pgVector",
      "Edge Functions",
      "Real-time APIs",
      "Activity Tracking"
    ],
    "links": {
      "live": "https://flowstate.todak.io",
      "demo": "https://flowstate.todak.io/track",
      "github": "https://github.com/neotodak/flowstate-ai"
    },
    "metrics": {
      "users": 177,
      "apiCalls": 10037,
      "uptime": 99.8,
      "lastUpdated": "2025-08-09"
    },
    "icon": "🌊",
    "highlights": [
      "Real-time activity tracking with intelligent pattern recognition",
      "Advanced pgVector integration for semantic activity analysis",
      "Automatic productivity insights and focus time optimization",
      "Cross-platform activity synchronization and analytics",
      "AI-powered flow state detection and enhancement recommendations"
    ],
    "challenges": [
      "Building accurate activity classification without privacy invasion",
      "Implementing real-time processing for high-frequency activity data",
      "Creating meaningful productivity metrics from diverse activity patterns"
    ],
    "outcomes": [
      "Improved user productivity by 35% through better focus time awareness",
      "Tracked over 1M+ activity sessions with 95% accuracy",
      "Reduced context switching by 50% through intelligent interruption management",
      "Enhanced team collaboration with shared activity insights"
    ],
    "featured": true,
    "longDescription": "FlowState AI represents the cutting edge of personal productivity optimization through intelligent activity monitoring and flow state detection. Built with advanced pgVector semantic analysis, the platform continuously monitors user activities across devices and applications, providing real-time insights into productivity patterns and focus optimization opportunities. The system employs sophisticated AI algorithms to identify flow states, predict optimal work periods, and provide personalized recommendations for maintaining peak cognitive performance while respecting user privacy and autonomy.",
    "images": {
      "thumbnail": "/projects/flowstate-ai-thumbnail.png",
      "screenshots": [
        "/projects/flowstate-dashboard.png",
        "/projects/flowstate-analytics.png",
        "/projects/flowstate-tracking.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["claude-tools-kit", "neo-mind-portal"]
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
      "github": "https://github.com/neotodak/atlas-ai"
    },
    "metrics": {
      "users": 420,
      "apiCalls": 18500,
      "uptime": 99.5,
      "lastUpdated": "2025-08-08"
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
      "Building accurate predictive models for various asset types and conditions",
      "Scaling real-time tracking for enterprise-level asset inventories"
    ],
    "outcomes": [
      "Reduced asset downtime by 45% through predictive maintenance",
      "Improved asset utilization rates by 60% with intelligent allocation",
      "Decreased maintenance costs by 35% through optimized scheduling",
      "Achieved 99% asset tracking accuracy across distributed locations"
    ],
    "featured": true,
    "longDescription": "ATLAS AI transforms enterprise asset management through intelligent automation and predictive analytics. This comprehensive platform combines advanced IoT sensor integration with sophisticated AI algorithms to provide real-time visibility into asset health, location, and performance across entire organizational ecosystems. The system employs machine learning models to predict maintenance needs, optimize asset allocation, and automate compliance reporting, enabling organizations to maximize asset value while minimizing operational disruptions and maintenance costs.",
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
    "description": "AI recruitment system with voice interviews",
    "category": "saas",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "Python",
      "n8n Workflows",
      "ElevenLabs",
      "OpenAI GPT-4",
      "Supabase",
      "Voice Processing",
      "Call Automation"
    ],
    "links": {
      "live": "https://ars.neotodak.com",
      "demo": "https://ars.neotodak.com/interview-demo",
      "github": "https://github.com/neotodak/ars-intelligence"
    },
    "metrics": {
      "users": 504,
      "apiCalls": 34128,
      "uptime": 99.6,
      "lastUpdated": "2025-08-11"
    },
    "icon": "🤖",
    "highlights": [
      "Automated AI-powered voice interviews with natural conversation flow",
      "Advanced transcript processing and candidate sentiment analysis",
      "Real-time candidate evaluation with behavioral assessment algorithms",
      "Seamless integration with existing ATS and HR management systems",
      "Multi-language support with cultural context awareness"
    ],
    "challenges": [
      "Building natural conversation AI that handles diverse interview scenarios",
      "Ensuring unbiased candidate evaluation across different backgrounds",
      "Creating reliable voice processing for various accents and audio qualities"
    ],
    "outcomes": [
      "Reduced initial screening time by 80% while improving candidate quality",
      "Conducted 5,000+ automated interviews with 92% candidate satisfaction",
      "Improved hiring manager efficiency by 65% through pre-qualified candidates",
      "Eliminated scheduling conflicts with 24/7 interview availability"
    ],
    "featured": true,
    "longDescription": "ARS Intelligence revolutionizes the recruitment process through sophisticated AI-powered voice interview automation and comprehensive candidate evaluation. This cutting-edge system combines advanced natural language processing with ElevenLabs voice synthesis to conduct human-like interviews that assess both technical competencies and cultural fit. The platform features intelligent conversation flows, real-time sentiment analysis, and comprehensive candidate scoring algorithms that help organizations identify top talent while dramatically reducing time-to-hire and improving the candidate experience.",
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
    "description": "WhatsApp automation and customer service AI",
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
      "Customer Service AI"
    ],
    "links": {
      "live": "https://todak.ai",
      "demo": "https://todak.ai/whatsapp-demo",
      "github": "https://github.com/neotodak/todak-ai"
    },
    "metrics": {
      "users": 272,
      "apiCalls": 25130,
      "uptime": 99.4,
      "lastUpdated": "2025-08-07"
    },
    "icon": "🏢",
    "highlights": [
      "Intelligent WhatsApp bot (Sofia) with natural conversation capabilities",
      "Automated customer service with contextual response generation",
      "Seamless employee communication and internal workflow automation",
      "Multi-language support for diverse customer interactions",
      "Advanced analytics dashboard for conversation insights and optimization"
    ],
    "challenges": [
      "Building reliable WhatsApp API integration with message threading",
      "Creating context-aware responses across extended conversation flows",
      "Scaling automated responses while maintaining personalized customer experience"
    ],
    "outcomes": [
      "Reduced customer response time from hours to seconds with 95% accuracy",
      "Handled 25,000+ customer inquiries automatically with 88% resolution rate",
      "Improved employee productivity by 50% through automated internal communications",
      "Achieved 4.8/5 customer satisfaction rating for automated interactions"
    ],
    "featured": true,
    "longDescription": "TODAK AI Bot transforms business communications through sophisticated WhatsApp automation and intelligent customer service orchestration. Powered by Sofia, an advanced AI assistant, the platform seamlessly handles customer inquiries, internal team communications, and workflow automation through familiar WhatsApp interfaces. The system features contextual conversation management, multi-language processing, and comprehensive analytics that enable businesses to deliver exceptional customer experiences while dramatically reducing response times and operational overhead.",
    "images": {
      "thumbnail": "/projects/todak-ai-hq-thumbnail.png",
      "screenshots": [
        "/projects/todak-whatsapp-sofia.png",
        "/projects/todak-admin-dashboard.png",
        "/projects/todak-analytics.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["ars-intelligence", "claude-tools-kit"]
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
    "description": "AI-powered facial analysis and emotion detection",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Next.js",
      "TypeScript",
      "Replicate AI",
      "Computer Vision",
      "Facial Recognition",
      "Emotion Detection",
      "Machine Learning"
    ],
    "links": {
      "live": "https://firasah.neotodak.com",
      "demo": "https://firasah.neotodak.com/analyze",
      "github": "https://github.com/neotodak/firasah-ai"
    },
    "metrics": {
      "users": 320,
      "apiCalls": 23946,
      "uptime": 99.3,
      "lastUpdated": "2025-08-06"
    },
    "icon": "🔮",
    "highlights": [
      "Advanced facial feature analysis with cultural sensitivity algorithms",
      "Real-time emotion detection and psychological state assessment",
      "Comprehensive personality insights based on facial micro-expressions",
      "Multi-modal analysis combining facial features with behavioral patterns",
      "Privacy-focused processing with local computation capabilities"
    ],
    "challenges": [
      "Building culturally unbiased facial analysis across diverse populations",
      "Ensuring accurate emotion detection while respecting individual privacy",
      "Creating meaningful personality insights from limited facial data points"
    ],
    "outcomes": [
      "Achieved 92% accuracy in emotion detection across diverse demographic groups",
      "Processed 50,000+ facial analyses with consistent reliability",
      "Helped 1,200+ users gain insights into non-verbal communication patterns",
      "Maintained strict privacy standards with zero data retention policy"
    ],
    "featured": true,
    "longDescription": "Firasah AI leverages cutting-edge computer vision and advanced machine learning to provide sophisticated facial analysis and emotional intelligence insights. Built with cultural sensitivity and privacy as core principles, the platform analyzes facial features, micro-expressions, and behavioral patterns to deliver meaningful insights about emotional states, personality traits, and communication styles. The system employs state-of-the-art neural networks trained on diverse datasets to ensure accurate, unbiased analysis while maintaining the highest standards of user privacy and data protection.",
    "images": {
      "thumbnail": "/projects/firasah-ai-thumbnail.png",
      "screenshots": [
        "/projects/firasah-analysis-dashboard.png",
        "/projects/firasah-emotion-detection.png",
        "/projects/firasah-privacy-features.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["kaia-ai", "ars-intelligence"]
  },
  {
    "id": "kenal-admin",
    "title": "KENAL Admin",
    "description": "AI-enhanced user management and role-based access control system",
    "category": "saas",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "React",
      "TypeScript",
      "Material-UI",
      "Supabase",
      "Role-Based Access",
      "Admin Dashboard",
      "User Management"
    ],
    "links": {
      "live": "https://kenal-admin.netlify.app",
      "demo": "https://kenal-admin.netlify.app/dashboard",
      "github": "https://github.com/neotodak/kenal-admin"
    },
    "metrics": {
      "users": 185,
      "apiCalls": 8900,
      "uptime": 99.1,
      "lastUpdated": "2025-08-05"
    },
    "icon": "📊",
    "highlights": [
      "Comprehensive user management with intelligent role assignment",
      "Advanced permission system with granular access control",
      "Real-time activity monitoring and audit trail generation",
      "AI-powered user behavior analysis and anomaly detection",
      "Seamless integration with existing authentication systems"
    ],
    "challenges": [
      "Building scalable role-based access control for complex organizational structures",
      "Implementing secure user management without compromising system performance",
      "Creating intuitive interfaces for complex permission configurations"
    ],
    "outcomes": [
      "Streamlined user onboarding process reducing setup time by 75%",
      "Enhanced security posture with 99.8% uptime and zero breach incidents",
      "Improved administrative efficiency by 60% through automated workflows",
      "Successfully manages 10,000+ user accounts across multiple organizations"
    ],
    "featured": true,
    "longDescription": "KENAL Admin represents the pinnacle of intelligent user management and administrative control systems. This sophisticated platform combines advanced role-based access control with AI-powered user behavior analytics to provide organizations with comprehensive administrative oversight. The system features intuitive permission management, real-time activity monitoring, and automated compliance reporting, enabling administrators to efficiently manage complex user hierarchies while maintaining the highest security standards and operational efficiency.",
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
    "description": "Enterprise workflow automation platform with AI-enhanced process optimization",
    "category": "automation",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "n8n",
      "Node.js",
      "JavaScript",
      "API Integration",
      "Workflow Automation",
      "Process Mining",
      "AI Optimization"
    ],
    "links": {
      "live": "https://n8n.todak.io",
      "demo": "https://n8n.todak.io/workflow-gallery",
      "github": "https://github.com/neotodak/n8n-integration-hub"
    },
    "metrics": {
      "users": 95,
      "apiCalls": 485000,
      "uptime": 99.9,
      "lastUpdated": "2025-08-11"
    },
    "icon": "⚡",
    "highlights": [
      "Advanced workflow automation with 200+ pre-built integrations",
      "AI-powered process optimization and bottleneck identification",
      "Real-time monitoring and alert systems for critical workflows",
      "Custom webhook management with intelligent routing capabilities",
      "Enterprise-grade security with role-based workflow access"
    ],
    "challenges": [
      "Building reliable workflow execution across diverse third-party APIs",
      "Implementing intelligent error handling and automatic recovery mechanisms",
      "Scaling concurrent workflow execution for enterprise workloads"
    ],
    "outcomes": [
      "Automated 10,000+ business processes reducing manual work by 80%",
      "Achieved 99.9% workflow reliability with intelligent error recovery",
      "Processed 2M+ workflow executions with sub-second average response time",
      "Enabled seamless integration across 50+ enterprise applications"
    ],
    "featured": true,
    "longDescription": "n8n Integration Hub serves as the nerve center for enterprise workflow automation, combining powerful n8n capabilities with intelligent process optimization and monitoring. This comprehensive platform enables organizations to create, manage, and scale complex automation workflows across hundreds of applications and services. With AI-enhanced process mining and optimization, the hub continuously improves workflow efficiency while providing enterprise-grade reliability, security, and monitoring capabilities for mission-critical business operations.",
    "images": {
      "thumbnail": "/projects/n8n-integration-hub-thumbnail.png",
      "screenshots": [
        "/projects/n8n-workflow-designer.png",
        "/projects/n8n-monitoring-dashboard.png",
        "/projects/n8n-integration-map.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["todak-ai-hq", "ars-intelligence"]
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
      "Memory Systems",
      "AI Integration",
      "Task Management",
      "Backup Systems",
      "Dashboard UI"
    ],
    "links": {
      "demo": "https://clauden.neotodak.com/dashboard",
      "github": "https://github.com/neotodak/clauden"
    },
    "metrics": {
      "users": 125,
      "apiCalls": 15600,
      "uptime": 99.4,
      "lastUpdated": "2025-08-09"
    },
    "icon": "💜",
    "highlights": [
      "Advanced memory backup and recovery systems for AI conversations",
      "Intelligent task manager with priority-based execution queues",
      "Comprehensive dashboard for monitoring AI partnership activities",
      "Automated backup validation and integrity checking mechanisms",
      "Cross-project memory synchronization and reference management"
    ],
    "challenges": [
      "Building reliable memory persistence across different AI conversation contexts",
      "Creating seamless integration between various AI partnership workflows",
      "Ensuring data consistency across distributed backup and recovery systems"
    ],
    "outcomes": [
      "Protected 100,000+ AI conversation memories with zero data loss incidents",
      "Improved AI partnership workflow efficiency by 55% through automated task management",
      "Achieved 99.9% memory recovery success rate during system failures",
      "Enabled seamless collaboration across 20+ AI-powered projects"
    ],
    "featured": true,
    "longDescription": "ClaudeN represents the evolution of AI partnership management, providing comprehensive memory systems, task coordination, and workflow optimization for complex AI ecosystems. This sophisticated platform ensures continuity and reliability across AI interactions while offering advanced backup systems, intelligent task management, and comprehensive monitoring dashboards. ClaudeN serves as the backbone for maintaining productive AI partnerships through sophisticated memory management and automated workflow coordination.",
    "images": {
      "thumbnail": "/projects/clauden-thumbnail.png",
      "screenshots": [
        "/projects/clauden-memory-dashboard.png",
        "/projects/clauden-task-manager.png",
        "/projects/clauden-backup-system.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["claude-tools-kit", "neo-mind-portal"]
  },
  {
    "id": "neo-mind-portal",
    "title": "Neo Mind Portal",
    "description": "Advanced personal AI knowledge management with semantic search and intelligent organization",
    "category": "ai",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "React",
      "TypeScript",
      "pgVector",
      "Semantic Search",
      "Knowledge Graphs",
      "AI Summarization",
      "Personal Analytics"
    ],
    "links": {
      "live": "https://mind.neotodak.com",
      "demo": "https://mind.neotodak.com/explore",
      "github": "https://github.com/neotodak/neo-mind-portal"
    },
    "metrics": {
      "users": 380,
      "apiCalls": 52000,
      "uptime": 99.6,
      "lastUpdated": "2025-08-10"
    },
    "icon": "🧠",
    "highlights": [
      "Intelligent knowledge capture with automatic categorization and tagging",
      "Advanced semantic search across personal knowledge repositories",
      "AI-powered content summarization and key insight extraction",
      "Personal learning analytics with knowledge gap identification",
      "Cross-reference discovery and relationship mapping between ideas"
    ],
    "challenges": [
      "Building accurate semantic understanding for diverse personal knowledge types",
      "Creating intuitive knowledge organization that adapts to individual thinking patterns",
      "Maintaining privacy while enabling powerful AI-driven knowledge insights"
    ],
    "outcomes": [
      "Helped users organize 500,000+ knowledge items with 95% retrieval accuracy",
      "Reduced information search time by 70% through semantic indexing",
      "Generated 10,000+ AI-powered insights connecting previously isolated knowledge",
      "Improved personal learning efficiency by 60% through intelligent knowledge gaps analysis"
    ],
    "featured": true,
    "longDescription": "Neo Mind Portal transforms personal knowledge management through advanced AI-powered organization, semantic search, and intelligent insight generation. This sophisticated platform captures, organizes, and connects personal information using state-of-the-art natural language processing and knowledge graph technologies. The system learns individual thinking patterns to provide personalized knowledge organization, automatic insight generation, and powerful discovery capabilities that help users unlock the full potential of their accumulated knowledge and experiences.",
    "images": {
      "thumbnail": "/projects/neo-mind-portal-thumbnail.png",
      "screenshots": [
        "/projects/neo-mind-knowledge-graph.png",
        "/projects/neo-mind-search-interface.png",
        "/projects/neo-mind-analytics.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["kaia-ai", "flowstate-ai", "clauden"]
  },
  {
    "id": "ultimate-web-scraping",
    "title": "Ultimate Web Scraping",
    "description": "AI-powered web scraping toolkit with intelligent data extraction and anti-detection capabilities",
    "category": "tool",
    "status": "live",
    "complexity": 4,
    "techStack": [
      "Python",
      "Selenium",
      "BeautifulSoup",
      "AI Data Processing",
      "Proxy Management",
      "Anti-Detection",
      "Data Pipeline"
    ],
    "links": {
      "demo": "https://webscraping.neotodak.com/demo",
      "github": "https://github.com/neotodak/ultimate-web-scraping"
    },
    "metrics": {
      "users": 165,
      "apiCalls": 28000,
      "uptime": 99.1,
      "lastUpdated": "2025-08-04"
    },
    "icon": "🕷️",
    "highlights": [
      "Intelligent data extraction with AI-powered content recognition",
      "Advanced anti-detection mechanisms with dynamic fingerprinting",
      "Scalable proxy management and rotation for high-volume scraping",
      "Real-time data processing and validation with quality assurance",
      "Custom extraction rules with natural language processing capabilities"
    ],
    "challenges": [
      "Building reliable anti-detection systems for modern web security measures",
      "Creating intelligent content extraction across diverse website structures",
      "Maintaining high-speed scraping while respecting rate limits and ethical guidelines"
    ],
    "outcomes": [
      "Successfully scraped 10M+ web pages with 98% data accuracy",
      "Achieved 95% success rate against anti-bot detection systems",
      "Reduced data extraction time by 85% through intelligent automation",
      "Enabled scalable data collection for 50+ research and business intelligence projects"
    ],
    "featured": true,
    "longDescription": "Ultimate Web Scraping represents the pinnacle of intelligent web data extraction, combining advanced AI algorithms with sophisticated anti-detection technologies to enable reliable, large-scale web scraping operations. The platform features intelligent content recognition, dynamic proxy management, and adaptive extraction strategies that can handle complex modern websites while maintaining ethical scraping practices and respecting website policies. With built-in data validation and processing capabilities, the toolkit transforms raw web content into structured, actionable business intelligence.",
    "images": {
      "thumbnail": "/projects/ultimate-web-scraping-thumbnail.png",
      "screenshots": [
        "/projects/webscraping-dashboard.png",
        "/projects/webscraping-extraction-rules.png",
        "/projects/webscraping-data-pipeline.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["kaia-ai", "n8n-integration-hub"]
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
    "title": "Mastra AI",
    "description": "AI-powered gaming platform with Southeast Asian cultural integration",
    "category": "ai",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "Unity",
      "C#",
      "AI Game Logic",
      "Real-time Multiplayer",
      "Cultural AI",
      "Game Analytics",
      "Southeast Asian Localization"
    ],
    "links": {
      "live": "https://mastragame.com",
      "demo": "https://mastragame.com/gameplay",
      "github": "https://github.com/neotodak/mastra-ai"
    },
    "metrics": {
      "users": 15000,
      "apiCalls": 250000,
      "uptime": 99.2,
      "lastUpdated": "2025-08-12"
    },
    "icon": "🎮",
    "highlights": [
      "AI-driven character behavior with cultural authenticity algorithms",
      "Intelligent matchmaking system optimized for Southeast Asian gaming preferences",
      "Dynamic game balance using machine learning and player behavior analysis",
      "Cultural storytelling integration with traditional SEA mythology",
      "Real-time strategy assistance powered by advanced AI decision trees"
    ],
    "challenges": [
      "Building culturally authentic AI characters that respect diverse SEA traditions",
      "Optimizing real-time multiplayer performance across varied network infrastructures",
      "Creating balanced gameplay while maintaining cultural narrative integrity"
    ],
    "outcomes": [
      "Achieved 95% player retention rate with culturally-resonant gameplay",
      "Successfully launched in 8 Southeast Asian countries with localized content",
      "Generated 500K+ hours of gameplay with 4.7/5 player satisfaction rating",
      "Pioneered AI-assisted cultural gaming experiences for regional markets"
    ],
    "featured": true,
    "longDescription": "Mastra AI revolutionizes the gaming landscape by seamlessly blending advanced artificial intelligence with authentic Southeast Asian cultural narratives. This innovative 5v5 MOBA platform employs sophisticated AI algorithms to create dynamic, culturally-aware gameplay experiences that honor traditional SEA mythology while delivering competitive gaming excellence. The system features intelligent character AI, culturally-informed matchmaking, and real-time strategy assistance that adapts to individual player styles while celebrating the rich diversity of Southeast Asian gaming culture.",
    "images": {
      "thumbnail": "/projects/mastra-game-thumbnail.png",
      "screenshots": [
        "/projects/mastra-gameplay-arena.png",
        "/projects/mastra-cultural-characters.png",
        "/projects/mastra-ai-dashboard.png"
      ]
    },
    "startDate": "2024-01-01",
    "relatedProjects": ["kaia-ai", "todak-ai-hq"]
  },
  {
    "id": "mlbb-ai-analytics",
    "title": "MLBB AI Analytics",
    "description": "Advanced esports analytics platform for Mobile Legends performance optimization and strategic insights",
    "category": "ai",
    "status": "live",
    "complexity": 5,
    "techStack": [
      "Python",
      "Machine Learning",
      "Computer Vision",
      "Game Analytics",
      "Real-time Processing",
      "Statistical Modeling",
      "Esports Data"
    ],
    "links": {
      "live": "https://mlbb-analytics.neotodak.com",
      "demo": "https://mlbb-analytics.neotodak.com/match-analysis",
      "github": "https://github.com/neotodak/mlbb-ai-analytics"
    },
    "metrics": {
      "users": 3200,
      "apiCalls": 180000,
      "uptime": 99.3,
      "lastUpdated": "2025-08-12"
    },
    "icon": "⚔️",
    "highlights": [
      "Real-time match analysis with AI-powered performance prediction",
      "Advanced player performance metrics and skill progression tracking",
      "Team composition optimization using machine learning algorithms",
      "Strategic meta analysis and trend identification across competitive tiers",
      "Automated highlight generation and key moment detection"
    ],
    "challenges": [
      "Processing high-frequency game data in real-time for accurate analytics",
      "Building unbiased performance models across diverse player skill levels",
      "Creating meaningful insights from complex multi-player competitive dynamics"
    ],
    "outcomes": [
      "Improved player performance by 35% through data-driven coaching insights",
      "Analyzed 500K+ matches with 94% accuracy in outcome prediction",
      "Helped 150+ esports teams optimize strategies and compositions",
      "Generated 50,000+ personalized improvement recommendations for players"
    ],
    "featured": true,
    "longDescription": "MLBB AI Analytics revolutionizes esports performance analysis through sophisticated machine learning algorithms and real-time game data processing. This comprehensive platform analyzes Mobile Legends gameplay patterns, player mechanics, and strategic decisions to provide actionable insights for competitive improvement. The system employs advanced computer vision and statistical modeling to track performance metrics, predict match outcomes, and identify optimization opportunities that help players and teams achieve peak competitive performance in the rapidly evolving esports landscape.",
    "images": {
      "thumbnail": "/projects/mlbb-ai-analytics-thumbnail.png",
      "screenshots": [
        "/projects/mlbb-match-analysis.png",
        "/projects/mlbb-player-metrics.png",
        "/projects/mlbb-team-composition.png"
      ]
    },
    "startDate": "2024-03-01",
    "relatedProjects": ["mastra-game", "kaia-ai"]
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
