// NEOTODAK Portfolio Projects Data
// Last updated: 2026-09-26 (catalogue cut to live properties after the Sep 2026 clean-up)
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
    id: "digital-twin",
    title: "Neo Digital Twin",
    description: "AI clone built from 4,000+ memories with Gemini semantic search",
    category: "ai",
    status: "live",
    complexity: 5,
    techStack: [
      "React", "TypeScript", "Supabase", "pgVector", "Gemini Embeddings",
      "GPT-4o-mini", "Tailwind CSS", "Vite"
    ],
    links: {
      live: "https://neotodak.com/twin",
      github: "https://github.com/broneotodak/neotodak-ai-labs"
    },
    icon: "🧬",
    highlights: [
      "4,000+ memories with Gemini embedding-001 (768 dims) for semantic search",
      "Privacy-gated: public twin only sees memories with visibility='public'",
      "Personality traits, knowledge graph, and facts drive responses",
      "Auto-reply to WhatsApp messages via OpenClaw integration",
      "Social media comment drafting with approval workflow"
    ],
    challenges: [
      "Building authentic personality from scattered memory data",
      "Privacy pipeline — public vs internal vs private memory separation",
      "Semantic search quality across thousands of diverse memories"
    ],
    outcomes: [
      "Public-facing AI that authentically represents Neo 24/7",
      "Auto-replies to WhatsApp with personality-matched responses",
      "Social media engagement automation"
    ],
    featured: true,
    longDescription: "Neo Digital Twin is an AI clone built from thousands of real memories, personality traits, and knowledge graph data. It powers the public chat at neotodak.com/twin, auto-replies to WhatsApp, and drafts social media comments.",
    images: { thumbnail: "/projects/digital-twin-thumbnail.png", screenshots: [] },
    startDate: "2025-03-01",
    relatedProjects: ["clauden-dashboard", "openclaw"]
  },
  {
    id: "openclaw",
    title: "OpenClaw",
    description: "Autonomous AI agent fleet — WhatsApp, scraping, reminders, voice ingestion",
    category: "automation",
    status: "live",
    complexity: 5,
    techStack: [
      "Node.js", "Baileys (WhatsApp)", "Puppeteer", "Tailscale", "n8n",
      "Supabase", "GPT-4o", "Express"
    ],
    links: {},
    icon: "🦀",
    highlights: [
      "Gateway service — WhatsApp message routing and auto-reply",
      "Router service — dispatches to specialized agents",
      "Reminder agent — scheduled notifications via WhatsApp",
      "Plaud voice ingestion — meeting notes to pgVector pipeline",
      "Social media scraper — TikTok/Instagram comment collection",
      "Forex signal pipeline — friend WhatsApp → auto-execute paper trades"
    ],
    challenges: [
      "Running multiple always-on services on a single machine",
      "WhatsApp API reliability without official Business API",
      "Multi-service orchestration with health monitoring"
    ],
    outcomes: [
      "Fully autonomous WhatsApp agent fleet running 24/7",
      "Voice meeting notes automatically transcribed and embedded",
      "Forex signals auto-executed from WhatsApp messages"
    ],
    featured: true,
    longDescription: "OpenClaw is an autonomous agent fleet running on a dedicated CLAW machine via Tailscale. It handles WhatsApp routing, social media scraping, voice ingestion, reminders, and forex signal execution.",
    images: { thumbnail: "/projects/openclaw-thumbnail.png", screenshots: [] },
    startDate: "2025-02-01",
    relatedProjects: ["digital-twin", "todak-ai-hq"]
  },
  {
    id: "crypto-dashboard",
    title: "Crypto Auto-Trader",
    description: "AI paper trading with V2 engine, LLM tiebreaker, and live charts",
    category: "ai",
    status: "live",
    complexity: 5,
    techStack: [
      "JavaScript", "Lightweight Charts", "Supabase", "Luno API",
      "GPT-4o-mini", "Netlify Functions", "KNN"
    ],
    links: {
      live: "https://presentation.neotodak.com/crypto-dashboard.html"
    },
    icon: "📈",
    highlights: [
      "V2 scoring engine: news sentiment, KNN patterns, multi-timeframe, Kelly criterion",
      "LLM tiebreaker — GPT-4o-mini for borderline trading decisions",
      "TradingView Lightweight Charts with Bollinger Bands + news markers",
      "WhatsApp alerts on sells, portfolio milestones, and close commands",
      "Paper trading with real Luno prices — tracking win rate toward 51%"
    ],
    challenges: [
      "Preventing FGI extreme-fear signals from triggering buys into bear markets",
      "Multi-device sync — DB-authoritative architecture to prevent stale clobbering",
      "Balancing formula speed with LLM accuracy for borderline signals"
    ],
    outcomes: [
      "152 paper trades executed, tracking toward 51% win rate target",
      "Three-layer protection: pair blacklist + FGI trend-clamp + LLM tiebreaker",
      "Real-time dashboard with auto-pilot logging"
    ],
    featured: true,
    longDescription: "A comprehensive crypto paper trading system with a multi-indicator V2 scoring engine, GPT-4o-mini LLM tiebreaker for borderline decisions, and live TradingView charts with AI news markers.",
    images: { thumbnail: "/projects/crypto-dashboard-thumbnail.png", screenshots: [] },
    startDate: "2025-04-01",
    relatedProjects: ["presentai"]
  },
  {
    id: "todak-academy-v2",
    title: "Todak Academy V2",
    description: "Laravel → React+Supabase rewrite of student portal (3,141 students)",
    category: "education",
    status: "live",
    complexity: 5,
    techStack: [
      "React 18", "TypeScript", "Vite", "MUI v7", "Supabase", "Netlify"
    ],
    links: {
      live: "https://academy.neotodak.com",
      github: "https://github.com/broneotodak/todak-academy-v2"
    },
    icon: "🎓",
    highlights: [
      "Full migration from Laravel 10 + MySQL to React + Supabase",
      "58 tables migrated with data integrity verification",
      "Student directory, course list, per-course finance grouping",
      "RLS security with role-based helpers",
      "Phase 1 ~40% complete — read-only pages built"
    ],
    challenges: [
      "Migrating complex MySQL schema to Supabase without FK constraints",
      "Invoice totals computed from SUM(invoice_details) — no total column",
      "GoTrue crashes on NULL string columns"
    ],
    outcomes: [
      "3,141 students and 59 courses successfully migrated",
      "New portal live at academy.neotodak.com",
      "Monthly cost reduced from ~RM 400 to ~RM 25"
    ],
    featured: true,
    longDescription: "Complete rewrite of Todak Academy student portal from Laravel to React+Supabase, migrating 3,141 students across 59 courses with full data integrity verification.",
    images: { thumbnail: "/projects/todak-academy-v2-thumbnail.png", screenshots: [] },
    startDate: "2026-04-01",
    relatedProjects: ["classroom-neo", "presentai"]
  },
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
