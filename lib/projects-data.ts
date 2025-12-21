// NEOTODAK Portfolio Projects Data
// Last updated: 2025-12-22T22:00:00.000Z
// URLs verified from pgVector memory + curl checks
// GitHub repos include private repositories

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'ai' | 'automation' | 'saas' | 'tool' | 'integration' | 'research' | 'gaming' | 'education';
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
    id: "thr-intelligence",
    title: "THR Intelligence",
    description: "AI-powered HRMS with Sofia AI Assistant for Malaysian enterprises",
    category: "ai",
    status: "live",
    complexity: 5,
    techStack: [
      "React", "TypeScript", "Material-UI", "Supabase", "OpenAI GPT-4",
      "Tailwind CSS", "Vite", "pgVector", "Netlify Functions"
    ],
    links: {
      live: "https://thr.todak.io",
      github: "https://github.com/broneotodak/THR"
    },
    metrics: {
      users: 892,
      apiCalls: 67500,
      uptime: 99.8,
      lastUpdated: "2025-12-22"
    },
    icon: "💼",
    highlights: [
      "Comprehensive employee lifecycle management with AI-powered insights",
      "Sofia AI Assistant for natural language HR queries via WhatsApp",
      "Advanced payroll automation with Malaysian tax calculations (PCB, EPF, SOCSO)",
      "Real-time attendance tracking with facial recognition integration",
      "Memo system with email notifications and acknowledgement tracking",
      "RLS-secured multi-tenant architecture for enterprise clients"
    ],
    challenges: [
      "Integrating complex payroll calculations with Malaysian tax jurisdictions",
      "Building scalable attendance tracking for distributed teams",
      "Ensuring data privacy compliance with multi-tenant RLS policies"
    ],
    outcomes: [
      "Reduced HR processing time by 70% for 50+ companies",
      "Achieved 99.9% payroll accuracy with automated compliance checks",
      "Improved employee satisfaction scores by 40% through better self-service"
    ],
    featured: true,
    longDescription: "THR Intelligence revolutionizes human resource management for Malaysian enterprises through advanced AI integration. Features Sofia AI assistant for WhatsApp-based HR queries, comprehensive payroll with local tax compliance, and multi-tenant security.",
    images: { thumbnail: "/projects/thr-intelligence-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["todak-ai-hq", "atlas-ai"]
  },
  {
    id: "flowstate-ai",
    title: "FlowState AI",
    description: "Real-time AI activity monitoring & cross-tool memory sync",
    category: "ai",
    status: "live",
    complexity: 5,
    techStack: [
      "HTML5", "JavaScript", "Supabase", "pgVector", "Edge Functions",
      "OpenAI Embeddings", "Real-time WebSockets"
    ],
    links: {
      live: "https://flowstate.neotodak.com",
      github: "https://github.com/broneotodak/flowstate-ai"
    },
    metrics: {
      users: 245,
      apiCalls: 18500,
      uptime: 99.9,
      lastUpdated: "2025-12-22"
    },
    icon: "🌊",
    highlights: [
      "Real-time activity tracking across Claude Desktop, Cursor, and Antigravity",
      "Unified memory layer with pgVector semantic embeddings",
      "Machine vs Tool distinction for flexible multi-device workflows",
      "Automatic activity categorization with FlowState-ready metadata",
      "Cross-session memory persistence and semantic search"
    ],
    challenges: [
      "Building accurate activity classification across multiple AI tools",
      "Implementing real-time sync between different machines and tools",
      "Creating meaningful productivity insights from diverse activity patterns"
    ],
    outcomes: [
      "Unified memory ecosystem across 4+ AI tools",
      "Tracked 50,000+ activities with semantic search capability",
      "Reduced context loss between sessions by 90%"
    ],
    featured: true,
    longDescription: "FlowState AI provides a unified memory layer for Neo Todak's AI workflow, tracking activities across Claude Desktop, Cursor, Antigravity, and Claude Code with pgVector semantic embeddings for intelligent retrieval.",
    images: { thumbnail: "/projects/flowstate-ai-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["claude-tools-kit", "clauden"]
  },
  {
    id: "claude-tools-kit",
    title: "Claude Tools Kit (CTK)",
    description: "Multi-agent AI development framework with memory management",
    category: "ai",
    status: "live",
    complexity: 5,
    techStack: [
      "Node.js", "TypeScript", "PostgreSQL", "pgVector", "SQL Migration", "MCP Protocol"
    ],
    links: {
      github: "https://github.com/broneotodak/claude-tools-kit"
    },
    metrics: {
      users: 1450,
      apiCalls: 58000,
      uptime: 99.9,
      lastUpdated: "2025-12-22"
    },
    icon: "🛠️",
    highlights: [
      "Advanced pgVector memory management for AI conversations",
      "Safe SQL migration runner with preview and rollback",
      "Multi-project memory isolation and cross-reference",
      "FlowState-compatible metadata structure",
      "One-command setup with automatic context loading"
    ],
    challenges: [
      "Implementing secure SQL execution without compromising integrity",
      "Building reliable memory persistence across AI contexts",
      "Creating universal compatibility across project structures"
    ],
    outcomes: [
      "Deployed across 20+ AI projects with 99.9% reliability",
      "Zero data loss incidents since implementation",
      "50% reduction in development setup time"
    ],
    featured: true,
    longDescription: "Claude Tools Kit (CTK) is the backbone of Neo Todak's AI development workflow, providing memory persistence, safe SQL migrations, and multi-project coordination.",
    images: { thumbnail: "/projects/claude-tools-kit-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["flowstate-ai", "clauden"]
  },
  {
    id: "todak-ai-hq",
    title: "TODAK AI Bot",
    description: "WhatsApp automation with Sofia AI assistant",
    category: "ai",
    status: "live",
    complexity: 4,
    techStack: [
      "HTML5", "JavaScript", "Supabase", "n8n Workflows", "OpenAI GPT-4", "WhatsApp API"
    ],
    links: {
      live: "https://todak.ai",
      github: "https://github.com/broneotodak/todak-ai",
      demo: "https://wa.me/601137569010"
    },
    metrics: {
      users: 380,
      apiCalls: 38500,
      uptime: 99.5,
      lastUpdated: "2025-12-22"
    },
    icon: "💬",
    highlights: [
      "Sofia AI - Intelligent WhatsApp assistant with natural conversation",
      "Integration with THR for HR queries via WhatsApp",
      "Media storage for voice notes and images",
      "Multi-language support (English, Malay, Chinese)"
    ],
    challenges: [
      "Building reliable WhatsApp API integration",
      "Creating context-aware responses across conversations",
      "Handling voice notes and media at scale"
    ],
    outcomes: [
      "Handled 40,000+ customer inquiries automatically",
      "Achieved 4.8/5 customer satisfaction rating",
      "Reduced response time from hours to seconds"
    ],
    featured: true,
    longDescription: "TODAK AI Bot powers Sofia, the AI assistant that handles customer inquiries, HR queries, and internal communications through WhatsApp integration.",
    images: { thumbnail: "/projects/todak-ai-hq-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["thr-intelligence", "ars-intelligence"]
  },
  {
    id: "ars-intelligence",
    title: "ARS Intelligence",
    description: "AI recruitment system with automated voice interviews",
    category: "saas",
    status: "live",
    complexity: 5,
    techStack: [
      "Python", "n8n Workflows", "ElevenLabs", "OpenAI GPT-4", "Supabase", "Twilio"
    ],
    links: {
      live: "https://ars.neotodak.com",
      github: "https://github.com/broneotodak/ARS"
    },
    metrics: {
      users: 680,
      apiCalls: 45000,
      uptime: 99.7,
      lastUpdated: "2025-12-22"
    },
    icon: "🤖",
    highlights: [
      "Automated AI voice interviews with ElevenLabs",
      "Natural conversation flow with GPT-4",
      "Candidate sentiment analysis and scoring",
      "24/7 interview availability"
    ],
    challenges: [
      "Building natural conversation for diverse scenarios",
      "Ensuring unbiased candidate evaluation",
      "Reliable voice processing for various accents"
    ],
    outcomes: [
      "Reduced screening time by 80%",
      "Conducted 8,000+ automated interviews",
      "92% candidate satisfaction rate"
    ],
    featured: true,
    longDescription: "ARS Intelligence automates the recruitment screening process with AI-powered voice interviews using ElevenLabs for natural speech synthesis.",
    images: { thumbnail: "/projects/ars-intelligence-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["thr-intelligence", "todak-ai-hq"]
  },
  {
    id: "atlas-ai",
    title: "ATLAS AI",
    description: "Enterprise asset management with predictive maintenance",
    category: "saas",
    status: "live",
    complexity: 4,
    techStack: [
      "React", "TypeScript", "Material-UI", "Supabase", "Chart.js"
    ],
    links: {
      live: "https://atlas-ai.netlify.app",
      github: "https://github.com/broneotodak/ATLAS"
    },
    metrics: {
      users: 520,
      apiCalls: 24500,
      uptime: 99.6,
      lastUpdated: "2025-12-22"
    },
    icon: "📦",
    highlights: [
      "Comprehensive asset lifecycle tracking",
      "Predictive maintenance algorithms",
      "Real-time location monitoring",
      "Automated compliance reporting"
    ],
    challenges: [
      "Integrating diverse asset categories",
      "Building accurate predictive models",
      "Scaling for enterprise inventories"
    ],
    outcomes: [
      "Reduced asset downtime by 45%",
      "Improved utilization rates by 60%",
      "99% asset tracking accuracy"
    ],
    featured: true,
    longDescription: "ATLAS AI provides comprehensive asset management with predictive maintenance capabilities for enterprise organizations.",
    images: { thumbnail: "/projects/atlas-ai-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["thr-intelligence", "kenal-admin"]
  },
  {
    id: "tad-event-system",
    title: "TAD Event System",
    description: "Event management with QR check-in, trivia, and lucky draw",
    category: "saas",
    status: "live",
    complexity: 4,
    techStack: [
      "HTML5", "JavaScript", "Supabase", "QR Code", "Real-time WebSockets",
      "Netlify Functions", "OpenAI", "Neon PostgreSQL"
    ],
    links: {
      live: "https://events.todak.io",
      github: "https://github.com/broneotodak/TAD"
    },
    metrics: {
      users: 2500,
      apiCalls: 35000,
      uptime: 99.8,
      lastUpdated: "2025-12-22"
    },
    icon: "🎉",
    highlights: [
      "AI-powered participant upload from PDF/Excel",
      "QR code-based event check-in",
      "Interactive trivia with live leaderboards",
      "Animated lucky draw with dramatic reveals",
      "Multi-event management dashboard"
    ],
    challenges: [
      "Real-time sync for hundreds of participants",
      "Creating engaging lucky draw animations",
      "AI extraction from unstructured documents"
    ],
    outcomes: [
      "Managed 50+ corporate events",
      "10,000+ check-ins with zero failures",
      "95% participant engagement in trivia"
    ],
    featured: true,
    longDescription: "TAD Event System is a complete event management platform for corporate annual dinners featuring AI-powered participant import, QR check-in, interactive trivia, and dramatic lucky draw animations.",
    images: { thumbnail: "/projects/tad-event-thumbnail.png", screenshots: [] },
    startDate: "2024-06-01",
    relatedProjects: ["thr-intelligence"]
  },
  {
    id: "firasah-ai",
    title: "Firasah AI",
    description: "AI facial analysis rooted in Islamic Firasah tradition",
    category: "ai",
    status: "live",
    complexity: 4,
    techStack: [
      "Next.js", "TypeScript", "Replicate AI", "Computer Vision", "OpenAI"
    ],
    links: {
      live: "https://firasah.neotodak.com",
      github: "https://github.com/broneotodak/firasah"
    },
    metrics: {
      users: 450,
      apiCalls: 28000,
      uptime: 99.4,
      lastUpdated: "2025-12-22"
    },
    icon: "🔮",
    highlights: [
      "Integration of classical Islamic Firasah texts (Kitab Firasat)",
      "AI-powered facial feature analysis with LLaVA",
      "Bilingual interpretation (English/Malay)",
      "Privacy-focused with zero data retention"
    ],
    challenges: [
      "Digitizing classical Firasah texts accurately",
      "Building culturally respectful analysis",
      "Ensuring privacy while enabling insights"
    ],
    outcomes: [
      "First AI system integrating classical Firasah",
      "Processed 60,000+ facial analyses",
      "90% accuracy in feature detection"
    ],
    featured: true,
    longDescription: "Firasah AI uniquely combines computer vision with the classical Islamic tradition of Firasah (physiognomy), drawing insights from digitized texts like Kitab Firasat.",
    images: { thumbnail: "/projects/firasah-ai-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["ars-intelligence"]
  },
  {
    id: "kenal-admin",
    title: "KENAL Admin",
    description: "User management and role-based access control",
    category: "saas",
    status: "live",
    complexity: 4,
    techStack: [
      "React", "TypeScript", "Material-UI", "Supabase", "MCP Integration"
    ],
    links: {
      live: "https://kenal-admin.netlify.app",
      github: "https://github.com/broneotodak/kenal-admin"
    },
    metrics: {
      users: 240,
      apiCalls: 12500,
      uptime: 99.3,
      lastUpdated: "2025-12-22"
    },
    icon: "📊",
    highlights: [
      "Comprehensive user management",
      "Granular role-based access control",
      "Real-time activity monitoring",
      "MCP server integration for Supabase"
    ],
    challenges: [
      "Building scalable RBAC",
      "Secure user management at scale",
      "Intuitive permission interfaces"
    ],
    outcomes: [
      "Manages 15,000+ user accounts",
      "75% reduction in onboarding time",
      "Zero security breach incidents"
    ],
    featured: false,
    longDescription: "KENAL Admin provides enterprise-grade user management with sophisticated role-based access control and MCP integration for Supabase operations.",
    images: { thumbnail: "/projects/kenal-admin-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["thr-intelligence", "atlas-ai"]
  },
  {
    id: "venture-canvas",
    title: "VentureCanvas",
    description: "AI-powered business planning with investor matching",
    category: "saas",
    status: "live",
    complexity: 5,
    techStack: [
      "Next.js 14", "TypeScript", "tRPC", "Supabase", "OpenAI", "Google Gemini",
      "Tailwind CSS", "shadcn/ui"
    ],
    links: {
      live: "https://vc.neotodak.com",
      github: "https://github.com/broneotodak/VentureCanvas"
    },
    metrics: {
      users: 1050,
      apiCalls: 32000,
      uptime: 99.5,
      lastUpdated: "2025-12-22"
    },
    icon: "📋",
    highlights: [
      "Interactive 9-block Business Canvas builder",
      "Multi-LLM AI content generation (OpenAI + Gemini)",
      "Financial projection assistance",
      "Pitch deck auto-generation",
      "Investor evaluation and matching"
    ],
    challenges: [
      "Building intuitive canvas drag-and-drop UI",
      "Multi-LLM orchestration for optimal responses",
      "Real-time collaboration features"
    ],
    outcomes: [
      "Helped 500+ startups create business plans",
      "Generated 2,000+ pitch decks",
      "Connected startups with 50+ investors"
    ],
    featured: true,
    longDescription: "VentureCanvas transforms business planning with AI-powered canvas building, automatic pitch deck generation, and intelligent investor matching.",
    images: { thumbnail: "/projects/venture-canvas-thumbnail.png", screenshots: [] },
    startDate: "2024-06-01",
    relatedProjects: ["presentai"]
  },
  {
    id: "clauden-dashboard",
    title: "ClaudeN Dashboard",
    description: "Real-time AI memory monitoring and management",
    category: "tool",
    status: "live",
    complexity: 4,
    techStack: [
      "React", "TypeScript", "Supabase", "WebSocket", "Tailwind CSS"
    ],
    links: {
      live: "https://clauden.neotodak.com",
      github: "https://github.com/broneotodak/clauden"
    },
    metrics: {
      users: 180,
      apiCalls: 22000,
      uptime: 99.5,
      lastUpdated: "2025-12-22"
    },
    icon: "💜",
    highlights: [
      "Real-time memory statistics and monitoring",
      "Tool status tracking (MCPs and integrations)",
      "Activity feed with recent memory additions",
      "Quick actions for memory management",
      "WebSocket real-time updates",
      "Visual AI response system"
    ],
    challenges: [
      "Building real-time dashboard without performance issues",
      "Secure API key management",
      "Visual response type detection"
    ],
    outcomes: [
      "Monitors 3,800+ memories in real-time",
      "99.9% uptime for memory operations",
      "55% improvement in AI workflow efficiency"
    ],
    featured: false,
    longDescription: "ClaudeN Dashboard provides a visual interface for monitoring and managing Neo Todak's AI memory ecosystem, featuring real-time statistics and tool status tracking.",
    images: { thumbnail: "/projects/clauden-thumbnail.png", screenshots: [] },
    startDate: "2024-06-01",
    relatedProjects: ["claude-tools-kit", "flowstate-ai"]
  },
  {
    id: "classroom-neo",
    title: "ClassroomNeo",
    description: "Full-stack LMS platform with AI-powered grading",
    category: "education",
    status: "live",
    complexity: 5,
    techStack: [
      "Vanilla JS SPA", "Supabase", "GitHub OAuth", "OpenAI GPT-4o",
      "Netlify", "CSS3"
    ],
    links: {
      live: "https://classroom.neotodak.com",
      github: "https://github.com/broneotodak/classroomneo"
    },
    metrics: {
      users: 350,
      apiCalls: 15000,
      uptime: 99.7,
      lastUpdated: "2025-12-22"
    },
    icon: "🎓",
    highlights: [
      "AI-powered assignment grading with GPT-4o",
      "Role-based access (student/instructor/admin)",
      "Progress tracking with completion percentages",
      "Module and step-based curriculum structure",
      "GitHub OAuth authentication",
      "Dark mode support"
    ],
    challenges: [
      "Building contextual AI grading with meaningful feedback",
      "Real-time progress tracking across many users",
      "Vanilla JS SPA without framework overhead"
    ],
    outcomes: [
      "Deployed for Todak Studios training programs",
      "92.6% average course completion rate",
      "281K lines of vanilla JS code",
      "77 commits of continuous improvement"
    ],
    featured: false,
    longDescription: "ClassroomNeo is a full-stack Learning Management System built with vanilla JavaScript, featuring AI-powered grading via GPT-4o, GitHub OAuth authentication, and comprehensive progress tracking.",
    images: { thumbnail: "/projects/classroom-neo-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["thr-intelligence"]
  },
  {
    id: "presentai",
    title: "PresentAI",
    description: "AI-powered presentation platform with decision sign-off",
    category: "ai",
    status: "live",
    complexity: 4,
    techStack: [
      "HTML5", "JavaScript", "Netlify Functions", "Neon PostgreSQL", "OpenAI GPT-4"
    ],
    links: {
      live: "https://presentation.neotodak.com"
    },
    metrics: {
      users: 150,
      apiCalls: 8000,
      uptime: 99.5,
      lastUpdated: "2025-12-22"
    },
    icon: "📽️",
    highlights: [
      "AI presentation builder using Claude/GPT",
      "Decision tracking with dual sign-off",
      "Remarks and revision history",
      "Real-time stats dashboard"
    ],
    challenges: [
      "Building intuitive presentation workflows",
      "Implementing dual-party sign-off system",
      "Real-time collaboration features"
    ],
    outcomes: [
      "Streamlined corporate presentations",
      "Complete decision audit trail",
      "Multi-party collaboration enabled"
    ],
    featured: false,
    longDescription: "PresentAI transforms presentation creation and decision-making with AI-powered content generation and a unique dual sign-off system for tracking presenter and client decisions.",
    images: { thumbnail: "/projects/presentai-thumbnail.png", screenshots: [] },
    startDate: "2024-12-01",
    relatedProjects: ["venture-canvas"]
  },
  {
    id: "n8n-integration-hub",
    title: "n8n Integration Hub",
    description: "Enterprise workflow automation powering all NEOTODAK systems",
    category: "automation",
    status: "live",
    complexity: 4,
    techStack: [
      "n8n", "Node.js", "JavaScript", "API Integration", "Webhook Management"
    ],
    links: {
      live: "https://n8n.todak.io"
    },
    metrics: {
      users: 125,
      apiCalls: 650000,
      uptime: 99.9,
      lastUpdated: "2025-12-22"
    },
    icon: "⚡",
    highlights: [
      "Powers TODAK AI, ARS, and THR backends",
      "200+ workflow integrations",
      "Real-time monitoring and alerts",
      "Enterprise-grade security"
    ],
    challenges: [
      "Reliable execution across diverse APIs",
      "Intelligent error handling and recovery",
      "Scaling concurrent executions"
    ],
    outcomes: [
      "Automated 15,000+ business processes",
      "99.9% workflow reliability",
      "3M+ workflow executions processed"
    ],
    featured: false,
    longDescription: "n8n Integration Hub serves as the automation backbone for all NEOTODAK projects, powering TODAK AI, ARS Intelligence, and THR system workflows.",
    images: { thumbnail: "/projects/n8n-integration-hub-thumbnail.png", screenshots: [] },
    startDate: "2024-01-01",
    relatedProjects: ["todak-ai-hq", "ars-intelligence", "thr-intelligence"]
  },
  {
    id: "todak-llm-dataset",
    title: "TODAK LLM Dataset",
    description: "Custom training dataset for fine-tuning Sofia AI",
    category: "research",
    status: "live",
    complexity: 4,
    techStack: [
      "JSONL", "Python", "Hugging Face", "NLP", "Data Processing"
    ],
    links: {},
    metrics: {
      users: 85,
      apiCalls: 5000,
      uptime: 100,
      lastUpdated: "2025-12-22"
    },
    icon: "🧬",
    highlights: [
      "25+ specialized JSONL datasets",
      "Bilingual (English/Malay) conversations",
      "Real Sofia conversation logs",
      "Company knowledge and HR policies"
    ],
    challenges: [
      "Curating high-quality training data",
      "Ensuring bilingual consistency",
      "Balancing personality with accuracy"
    ],
    outcomes: [
      "50,000+ training examples created",
      "40% improvement in Sofia responses",
      "Published on Hugging Face"
    ],
    featured: false,
    longDescription: "TODAK LLM Dataset provides custom training data for Sofia AI, including company knowledge, HR policies, bilingual conversations, and real interaction logs.",
    images: { thumbnail: "/projects/todak-llm-dataset-thumbnail.png", screenshots: [] },
    startDate: "2024-06-01",
    relatedProjects: ["todak-ai-hq", "thr-intelligence"]
  },
  {
    id: "neo-progress-bridge",
    title: "Neo Progress Bridge",
    description: "MCP-style bridge for unified progress tracking",
    category: "tool",
    status: "beta",
    complexity: 4,
    techStack: [
      "Node.js", "JavaScript", "Supabase", "Webhook", "MCP Protocol"
    ],
    links: {
      github: "https://github.com/broneotodak/neo-progress-bridge"
    },
    metrics: {
      users: 50,
      apiCalls: 8000,
      uptime: 99.0,
      lastUpdated: "2025-12-22"
    },
    icon: "🌉",
    highlights: [
      "Unified progress tracking across dev tools",
      "CTK Memory → Multiple output adapters",
      "Website and social media integration",
      "Webhook endpoints for external tools"
    ],
    challenges: [
      "Building reliable multi-output sync",
      "Handling diverse data formats",
      "Real-time updates without delays"
    ],
    outcomes: [
      "Connected 5+ output platforms",
      "Automated progress updates",
      "Reduced manual reporting by 80%"
    ],
    featured: false,
    longDescription: "Neo Progress Bridge connects development tools with multiple output channels, automatically syncing progress from CTK memory to FlowState AI, websites, and social media.",
    images: { thumbnail: "/projects/neo-progress-bridge-thumbnail.png", screenshots: [] },
    startDate: "2024-07-01",
    relatedProjects: ["flowstate-ai", "claude-tools-kit"]
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
