export const userProfile = {
  name: "Rahul Sharma",
  domain: "AI/ML",
  level: "Intermediate",
  hoursPerDay: 2,
  learningStyle: "Projects",
  careerGoal: "Job",
  techSkills: ["Python", "React", "ML Basics", "HTML/CSS", "Git", "Jupyter"],
  tools: ["VS Code", "Jupyter", "GitHub", "Figma"],
};

export const modules = [
  { id: "career-simulation", title: "Career Simulation Engine", description: "Predict realistic future opportunities based on your current trajectory and skills", iconName: "Rocket", accent: "violet" as const, status: "Ready" },
  { id: "skill-gap", title: "Skill Gap Analysis", description: "Discover exactly what skills you're missing for your dream role", iconName: "Target", accent: "cyan" as const, status: "Ready" },
  { id: "roadmap", title: "Personalized Roadmap", description: "Get 30-day, 3-month, and 6-month tailored learning plans", iconName: "Map", accent: "violet" as const, status: "Ready" },
  { id: "projects", title: "Project Recommendations", description: "AI-suggested projects perfectly matched to your target role", iconName: "Code2", accent: "cyan" as const, status: "Ready" },
  { id: "7-day-plan", title: "7-Day Starter Plan", description: "A practical first-week execution schedule to get you moving", iconName: "Calendar", accent: "violet" as const, status: "Generating..." },
  { id: "ai-chat", title: "AI Career Chat", description: "Ask contextual questions, get answers based on your profile", iconName: "MessageCircle", accent: "cyan" as const, status: "Ready" },
];

export const roadmapData = {
  "30 Days": [
    { week: "Week 1", tasks: [{ task: "Python Deep Dive", duration: "4h", icon: "Code2" }, { task: "NumPy & Pandas", duration: "3h", icon: "Database" }, { task: "Git workflow", duration: "2h", icon: "GitBranch" }] },
    { week: "Week 2", tasks: [{ task: "SQL Fundamentals", duration: "4h", icon: "Database" }, { task: "Database design", duration: "3h", icon: "Layout" }] },
    { week: "Week 3", tasks: [{ task: "FastAPI basics", duration: "3h", icon: "Zap" }, { task: "REST API project", duration: "4h", icon: "Code2" }, { task: "Docker intro", duration: "2h", icon: "Box" }] },
    { week: "Week 4", tasks: [{ task: "LangChain intro", duration: "4h", icon: "Link" }, { task: "Mini RAG project", duration: "5h", icon: "Brain" }] },
  ],
  "3 Months": [
    { week: "Month 1", tasks: [{ task: "Python + SQL Mastery", duration: "20h", icon: "Code2" }, { task: "FastAPI + Docker", duration: "16h", icon: "Box" }, { task: "Mini RAG App", duration: "10h", icon: "Brain" }] },
    { week: "Month 2", tasks: [{ task: "LangChain Deep Dive", duration: "20h", icon: "Link" }, { task: "Vector DBs (ChromaDB)", duration: "12h", icon: "Database" }, { task: "AI Portfolio Project", duration: "15h", icon: "Rocket" }] },
    { week: "Month 3", tasks: [{ task: "LangGraph & Agents", duration: "18h", icon: "Zap" }, { task: "Open Source Contribution", duration: "10h", icon: "GitBranch" }] },
    { week: "Milestone", tasks: [{ task: "Internship Application Ready", duration: "Goal", icon: "CheckCircle" }, { task: "3 Portfolio Projects", duration: "Goal", icon: "Layout" }] },
  ],
  "6 Months": [
    { week: "Q1 (Months 1–2)", tasks: [{ task: "Full AI Stack Foundations", duration: "60h", icon: "Code2" }, { task: "2 Portfolio Projects", duration: "30h", icon: "Brain" }, { task: "Technical Blog Started", duration: "8h", icon: "FileText" }] },
    { week: "Q2 (Month 3)", tasks: [{ task: "LangGraph Multi-Agent", duration: "25h", icon: "Zap" }, { task: "Deploy on HuggingFace", duration: "10h", icon: "Rocket" }] },
    { week: "Q3 (Months 4–5)", tasks: [{ task: "Freelance AI Projects", duration: "40h", icon: "Link" }, { task: "Networking & Outreach", duration: "10h", icon: "MessageCircle" }, { task: "Interview Prep (ML)", duration: "20h", icon: "Target" }] },
    { week: "Q4 (Month 6)", tasks: [{ task: "ML Engineer Role Applications", duration: "Goal", icon: "CheckCircle" }, { task: "AI Consultant Pitch Deck", duration: "8h", icon: "Layout" }] },
  ],
};

// Legacy export for backward compat
export const roadmapWeeks = {
  week1: roadmapData["30 Days"][0].tasks,
  week2: roadmapData["30 Days"][1].tasks,
  week3: roadmapData["30 Days"][2].tasks,
  week4: roadmapData["30 Days"][3].tasks,
};

export const projects = [
  { id: 1, icon: "FileText", name: "OCR Medical Assistant", description: "Build an AI system that extracts and analyzes medical records using OCR and vision models", difficulty: "Hard" as const, tags: ["Python", "Vision AI", "Healthcare", "PIL"], duration: "3–4 weeks", skills: ["OpenCV", "Tesseract", "PIL", "FastAPI"], outcome: "A deployable API that processes medical PDFs and returns structured data" },
  { id: 2, icon: "Database", name: "RAG PDF Chat System", description: "Create a retrieval-augmented generation system for chatting with PDF documents", difficulty: "Hard" as const, tags: ["LangChain", "ChromaDB", "GenAI", "FastAPI"], duration: "2–3 weeks", skills: ["LangChain", "ChromaDB", "Ollama", "FastAPI"], outcome: "A chat interface that answers questions from any uploaded PDF" },
  { id: 3, icon: "Network", name: "Multi-Agent News Analyzer", description: "Design a multi-agent pipeline that aggregates, summarizes, and classifies news articles", difficulty: "Hard" as const, tags: ["LangGraph", "Agents", "NLP", "Python"], duration: "4–5 weeks", skills: ["LangGraph", "CrewAI", "NewsAPI", "NLP"], outcome: "An autonomous pipeline that monitors, classifies and summarizes news 24/7" },
  { id: 4, icon: "Brain", name: "AI Resume Screener", description: "Build a tool that automatically scores and ranks resumes against job descriptions using LLMs", difficulty: "Medium" as const, tags: ["Python", "LLM", "NLP", "Streamlit"], duration: "1–2 weeks", skills: ["Ollama", "LangChain", "pdfplumber", "Streamlit"], outcome: "A Streamlit app that ranks candidates and explains scores" },
  { id: 5, icon: "Code2", name: "Smart Code Reviewer", description: "An AI agent that reviews GitHub PRs, suggests improvements, and detects bugs automatically", difficulty: "Medium" as const, tags: ["Python", "GitHub API", "LLM", "FastAPI"], duration: "2–3 weeks", skills: ["GitHub API", "Ollama", "LangChain", "Webhooks"], outcome: "An automated PR reviewer bot integrated with GitHub" },
  { id: 6, icon: "Zap", name: "AI Study Planner", description: "Generate personalized daily study plans using AI based on your goals and available time", difficulty: "Easy" as const, tags: ["Python", "LLM", "React", "Calendar"], duration: "1 week", skills: ["Ollama", "React", "FastAPI", "FullCalendar"], outcome: "A web app that creates and tracks personalized study schedules" },
];

export const skillGaps = {
  strengths: ["Python", "React", "ML Basics", "HTML/CSS", "Git", "Jupyter"],
  toLearn: ["Docker", "FastAPI", "SQL", "LangChain", "Kubernetes", "AWS"],
};

export const fullSkillReport = {
  overallScore: 58,
  categories: [
    { name: "Programming", score: 82, skills: ["Python ✓", "JavaScript ✓", "TypeScript ✗", "Go ✗"], color: "#4ade80" },
    { name: "AI / ML", score: 60, skills: ["ML Basics ✓", "LangChain ✗", "PyTorch ✗", "Transformers ✗"], color: "#a78bfa" },
    { name: "Backend", score: 40, skills: ["FastAPI ✗", "Docker ✗", "REST APIs ~", "SQL ✗"], color: "#fbbf24" },
    { name: "Cloud / DevOps", score: 15, skills: ["AWS ✗", "Kubernetes ✗", "CI/CD ✗", "GCP ✗"], color: "#f87171" },
    { name: "Databases", score: 50, skills: ["Jupyter ✓", "ChromaDB ✗", "PostgreSQL ✗", "Redis ✗"], color: "#22d3ee" },
    { name: "Version Control", score: 75, skills: ["Git ✓", "GitHub ✓", "PR Workflow ✓", "Actions ✗"], color: "#4ade80" },
  ],
  topPriority: ["FastAPI", "SQL", "LangChain"],
  estimatedWeeks: { junior: 8, mid: 20, senior: 52 },
};

export const simulationTimeline = {
  threeMonth: ["Internship eligible", "AI portfolio ready", "3 open-source contributions"],
  sixMonth: ["GenAI startup roles", "Freelance AI projects", "Technical blog established"],
  twelveMonth: ["ML Engineer positions", "AI Consultant roles", "Independent SaaS project"],
};

export const simulationResults = [
  { match: 82, label: "AI Internships" },
  { match: 74, label: "GenAI Startup Roles" },
  { match: 91, label: "Freelance AI Dev" },
];

export const initialChatMessages: Array<{ id: number; role: string; content: string }> = [];

export const chatResponseMap: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["dsa", "data structure", "algorithm", "leetcode"],
    response: "For the AI/ML track, DSA is less critical than for pure SWE roles. I'd spend ~20% of your time on it — focus on arrays, trees, and graphs. Prioritize LangChain and FastAPI first for maximum AI career impact.",
  },
  {
    keywords: ["internship", "intern", "hired", "hire"],
    response: "You'll be internship-ready in ~8 weeks if you follow the roadmap. Build 2–3 strong projects (RAG system + one LangGraph project) and you'll stand out even without prior internships.",
  },
  {
    keywords: ["job", "role", "career", "opportunity", "work"],
    response: "Your AI/ML track opens doors to AI Engineer, ML Engineer, and GenAI Developer roles. With 6 months on the roadmap you'll be competitive for ₹10–18 LPA roles in India or entry-level remote positions globally.",
  },
  {
    keywords: ["skill", "prioritize", "learn", "focus", "next", "what should"],
    response: "Top 3 skills to focus on right now: 1) FastAPI (backend APIs), 2) LangChain (AI pipelines), 3) SQL (your weakest area). These three unlock 80% of AI/ML job descriptions.",
  },
  {
    keywords: ["track", "progress", "goal", "plan", "pace", "on track"],
    response: "You're on track! At 2h/day, you'll complete the 30-day plan in exactly 30 days. Biggest risk: skipping the SQL week. Week 2 roadmap tasks are critical — don't rush past them.",
  },
  {
    keywords: ["python", "programming", "code", "coding"],
    response: "Python is your strongest asset at 82%. Build on it by adding FastAPI (1 week) then LangChain (2 weeks). These stack perfectly on your existing Python knowledge and are the most in-demand GenAI skills.",
  },
  {
    keywords: ["project", "portfolio", "build", "make"],
    response: "Best projects for your profile: 1) RAG PDF Chat (showcases LangChain + GenAI), 2) OCR Medical Assistant (vision AI), 3) Multi-Agent News Analyzer. All three are in your Projects section — add them to your roadmap!",
  },
  {
    keywords: ["salary", "pay", "money", "income", "earn", "lpa", "package"],
    response: "AI/ML engineers with 1–2 years experience earn ₹8–18 LPA in India or $90k–130k in the US. Your GenAI + FastAPI + Python track is one of the highest-paying specializations right now.",
  },
  {
    keywords: ["langchain", "langgraph", "langraph", "rag", "vector", "chroma", "chromadb"],
    response: "LangChain is Week 4 in your 30-day plan. After that, move to LangGraph for multi-agent systems — it's the hottest GenAI skill in 2025. You're 3–4 weeks away from being job-ready in it.",
  },
  {
    keywords: ["resume", "cv", "interview"],
    response: "Your resume should prominently feature Python, ML Basics, Git, and React. Lead with AI projects — the RAG or OCR project titles immediately get attention from ML hiring managers. Keep it to one page.",
  },
  {
    keywords: ["freelance", "startup", "consultant", "gig"],
    response: "Freelancing in AI is very accessible after 3 months. Upwork and Toptal have high demand for LangChain/RAG developers. Your 6-month roadmap includes a 'Freelance AI Projects' quarter — perfect timing.",
  },
  {
    keywords: ["roadmap", "week", "month", "day", "schedule", "when"],
    response: "Your roadmap is split into 30 days (Python, SQL, FastAPI, LangChain basics), 3 months (LangGraph, Vector DBs, portfolio), and 6 months (freelancing, multi-agent systems, ML Engineer applications). Check the Roadmap section above!",
  },
  {
    keywords: ["sql", "database", "db"],
    response: "SQL is flagged as a gap in your profile. Spend Week 2 (per the 30-day plan) on SQL Fundamentals and database design. It's required for ~70% of backend AI/ML roles and often overlooked by ML-focused devs.",
  },
  {
    keywords: ["docker", "fastapi", "api", "backend", "deploy"],
    response: "FastAPI + Docker is your Week 3 focus. FastAPI is the go-to Python web framework for AI services — it's used by OpenAI, Hugging Face, and most AI startups. Docker ensures your APIs are deployment-ready.",
  },
];

export const offTopicResponse = "That's outside my focus area! I specialize in career guidance for your AI/ML learning path. Try asking me about skills to learn, projects to build, your roadmap, job opportunities, or specific technologies like LangChain or FastAPI.";
