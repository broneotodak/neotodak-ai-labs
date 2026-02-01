// NEOTODAK Portfolio Projects Data
// Last updated: 2026-01-30
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
      "Full HRMS suite with payroll, attendance, and memo modules",
      "WhatsApp integration for employee self-service",
      "Multi-organization support with role-based access"
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
      "Semantic search capability for past activities",
      "Reduced context loss between sessions"
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
      "Deployed across 20+ AI projects",
      "Zero data loss incidents since implementation",
      "Simplified development setup workflow"
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
      live: "https://todakai.neotodak.com",
      github: "https://github.com/broneotodak/todak-ai",
      demo: "https://wa.me/628112109610"
    },
    icon: "💬",
    highlights: [
      "Sofia AI - Intelligent WhatsApp assistant with natural conversation",
      "Integration with THR for HR queries via WhatsApp",
      "Media storage for voice notes and images",
      "Multi-language support (English, Malay, Indonesian)"
    ],
    challenges: [
      "Building reliable WhatsApp API integration",
      "Creating context-aware responses across conversations",
      "Handling voice notes and media at scale"
    ],
    outcomes: [
      "Automated customer inquiries via WhatsApp",
      "HR self-service through natural conversation",
      "Multi-modal support (text, voice, image)"
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
      "Automated initial screening process",
      "Consistent interview experience for all candidates",
      "Detailed scoring and transcript reports"
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
      "Complete asset visibility across organization",
      "Maintenance scheduling automation",
      "Compliance report generation"
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
      "Streamlined corporate event management",
      "Real-time participant engagement",
      "Automated winner selection and verification"
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
      "Cultural heritage preservation through technology",
      "Privacy-first facial analysis approach"
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
      "Centralized user management dashboard",
      "Simplified permission configuration",
      "Audit trail for all access changes"
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
      "Simplified business planning process",
      "AI-assisted pitch deck creation",
      "Structured startup evaluation framework"
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
      "Visual interface for AI memory ecosystem",
      "Real-time monitoring capabilities",
      "Simplified memory management workflow"
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
      "AI-assisted assignment feedback",
      "Comprehensive progress tracking"
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
      "Central automation hub for all projects",
      "Reliable workflow execution",
      "Comprehensive error monitoring"
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
      "Comprehensive training dataset for Sofia",
      "Bilingual conversation coverage",
      "Domain-specific knowledge base"
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
      "Connected multiple output platforms",
      "Automated progress updates",
      "Reduced manual reporting"
    ],
    featured: false,
    longDescription: "Neo Progress Bridge connects development tools with multiple output channels, automatically syncing progress from CTK memory to FlowState AI, websites, and social media.",
    images: { thumbnail: "/projects/neo-progress-bridge-thumbnail.png", screenshots: [] },
    startDate: "2024-07-01",
    relatedProjects: ["flowstate-ai", "claude-tools-kit"]
  },
  {
    id: "flipper-ai",
    title: "Flipper Zero AI",
    description: "AI-assisted security research platform with Flipper Zero integration",
    category: "research",
    status: "development",
    complexity: 4,
    techStack: [
      "Python", "Flipper Zero", "Serial Communication", "IR/NFC/RFID", "Unleashed Firmware"
    ],
    links: {
      github: "https://github.com/broneotodak/Flipper"
    },
    icon: "🐬",
    highlights: [
      "AI-assisted signal analysis and identification",
      "Mac-Flipper communication bridge via serial",
      "IR remote code testing and diagnostics",
      "NFC card analysis and comparison tools",
      "Unleashed firmware with extended capabilities"
    ],
    challenges: [
      "Building reliable serial communication with Flipper",
      "Integrating LLM for intelligent signal analysis",
      "Hardware constraints (256KB RAM) for on-device AI"
    ],
    outcomes: [
      "Working Python bridge for Flipper control",
      "IR diagnostic tools for device testing",
      "NFC card dump and comparison utilities"
    ],
    featured: false,
    longDescription: "Flipper Zero AI transforms the Flipper Zero from a standalone hacking tool into an AI-assisted security research platform, integrating LLM capabilities for intelligent analysis and automated reconnaissance.",
    images: { thumbnail: "/projects/flipper-ai-thumbnail.png", screenshots: [] },
    startDate: "2025-01-01",
    relatedProjects: ["claude-tools-kit"]
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

  return {
    totalProjects: total,
    liveProjects: live,
    categories: [...new Set(projectsData.map(p => p.category))].length
  };
}
