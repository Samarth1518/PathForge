import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Zap, LayoutDashboard, Rocket, Target, Map, Code2, Calendar, MessageCircle,
  AlertCircle, CheckCircle, Check, X, FileText, Database, Network,
  Brain, TrendingUp, ArrowLeft,
} from "lucide-react";
import {
  userProfile as mockProfile, modules, roadmapData, projects,
  skillGaps, fullSkillReport,
} from "../data/mockData";
import ModuleCard from "../components/ModuleCard";
import SimulationPanel from "../components/SimulationPanel";
import RoadmapCard from "../components/RoadmapCard";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../components/ProjectCard";
import ChatWidget from "../components/ChatWidget";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FileText, Database, Network, Brain, Code2, Zap,
};

const navItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Rocket, label: "Career Simulation", id: "career-simulation" },
  { icon: Target, label: "Skill Gap", id: "skill-gap" },
  { icon: Map, label: "Roadmap", id: "roadmap" },
  { icon: Code2, label: "Projects", id: "projects" },
  { icon: Calendar, label: "7-Day Plan", id: "7-day-plan" },
  { icon: MessageCircle, label: "AI Chat", id: "ai-chat" },
];

const dayPlan = [
  { day: 1, task: "Python Revision", time: "2h" },
  { day: 2, task: "SQL Basics", time: "2h" },
  { day: 3, task: "Flask Mini Project", time: "3h" },
  { day: 4, task: "Git & GitHub", time: "1.5h" },
  { day: 5, task: "REST API with FastAPI", time: "3h" },
  { day: 6, task: "ChromaDB Intro", time: "2h" },
  { day: 7, task: "Portfolio Update", time: "2h" },
];

const overlayStyle: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
  zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
};

const modalStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #0f0a1e 0%, #12082a 100%)",
  border: "1px solid rgba(124,58,237,0.3)",
  borderRadius: "20px",
  padding: "2rem",
  width: "100%",
  maxWidth: "720px",
  maxHeight: "85vh",
  overflowY: "auto",
  position: "relative",
};

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = (location.state as { profile?: typeof mockProfile })?.profile ?? mockProfile;
  const [activeNav, setActiveNav] = useState("overview");
  const [roadmapTab, setRoadmapTab] = useState<"30 Days" | "3 Months" | "6 Months">("30 Days");
  const [completed, setCompleted] = useState<number[]>([]);

  // Modal states
  const [showSkillReport, setShowSkillReport] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [addedToRoadmap, setAddedToRoadmap] = useState<Set<number>>(new Set());
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggleDay = (day: number) => {
    setCompleted((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);
  };

  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top on first load so dashboard starts at Overview
  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToRoadmap = (project: Project) => {
    setAddedToRoadmap((prev) => new Set([...prev, project.id]));
    setSelectedProject(null);
    setShowAllProjects(false);
    showToast(`"${project.name}" added to your roadmap!`);
    setTimeout(() => scrollToSection("roadmap"), 400);
  };

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const sectionIds = navItems.map((n) => n.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveNav(visible[0].target.id);
        }
      },
      { root: mainEl, rootMargin: "-10% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = mainEl.querySelector(`#${CSS.escape(id)}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const mainEl = mainRef.current;
    const el = mainEl ? mainEl.querySelector(`#${CSS.escape(id)}`) : document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const userName = (profile as Record<string, unknown>).name as string || mockProfile.name;
  const initials = userName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  const currentRoadmap = roadmapData[roadmapTab];

  const getProjectsForColumn = (colIndex: number) => {
    const added = projects.filter((p) => addedToRoadmap.has(p.id));
    const colMap: Record<string, Record<number, string[]>> = {
      "30 Days":   { 2: ["Easy"], 3: ["Medium", "Hard"] },
      "3 Months":  { 0: ["Easy"], 1: ["Medium"], 2: ["Hard"] },
      "6 Months":  { 0: ["Easy"], 1: ["Medium"], 2: ["Hard"] },
    };
    const allowed = colMap[roadmapTab]?.[colIndex] ?? [];
    return added.filter((p) => allowed.includes(p.difficulty));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>

      {/* ── Toast notification ── */}
      {toast && (
        <div style={{ position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 200, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "#fff", fontWeight: 600, fontSize: "0.9rem", padding: "12px 24px", borderRadius: "12px", boxShadow: "0 8px 32px rgba(124,58,237,0.4)", display: "flex", alignItems: "center", gap: "10px", whiteSpace: "nowrap" }}>
          <Check size={16} /> {toast}
        </div>
      )}

      {/* ── Skill Gap Full Report Modal ── */}
      {showSkillReport && (
        <div style={overlayStyle} onClick={() => setShowSkillReport(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Target size={20} color="#22d3ee" />
                <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.15rem" }}>Full Skill Gap Report</span>
              </div>
              <button onClick={() => setShowSkillReport(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            {/* Overall score */}
            <div style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "12px", padding: "1.2rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "2.5rem", fontWeight: 800, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
                  {fullSkillReport.overallScore}%
                </p>
                <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginTop: "4px" }}>AI Engineer Readiness</p>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.82rem" }}>Overall Score</span>
                  <span style={{ color: "#a78bfa", fontWeight: 600, fontSize: "0.82rem" }}>{fullSkillReport.overallScore}/100</span>
                </div>
                <div style={{ height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "9999px" }}>
                  <div style={{ width: `${fullSkillReport.overallScore}%`, height: "100%", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "9999px" }} />
                </div>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem" }}>
                  {[{ label: "Junior ML", weeks: fullSkillReport.estimatedWeeks.junior }, { label: "Mid-level ML", weeks: fullSkillReport.estimatedWeeks.mid }, { label: "Senior ML", weeks: fullSkillReport.estimatedWeeks.senior }].map((r) => (
                    <div key={r.label}>
                      <p style={{ color: "#64748b", fontSize: "0.72rem" }}>{r.label}</p>
                      <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.85rem" }}>{r.weeks} weeks</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category breakdown */}
            <h3 style={{ color: "#94a3b8", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem", fontWeight: 600 }}>Category Breakdown</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {fullSkillReport.categories.map((cat) => (
                <div key={cat.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#ffffff", fontSize: "0.875rem", fontWeight: 500 }}>{cat.name}</span>
                    <span style={{ color: cat.color, fontWeight: 600, fontSize: "0.875rem" }}>{cat.score}%</span>
                  </div>
                  <div style={{ height: "6px", background: "rgba(255,255,255,0.07)", borderRadius: "9999px", marginBottom: "8px" }}>
                    <div style={{ width: `${cat.score}%`, height: "100%", background: cat.color, borderRadius: "9999px", opacity: 0.8 }} />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {cat.skills.map((s) => (
                      <span key={s} style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: "9999px", background: s.includes("✓") ? "rgba(34,197,94,0.1)" : s.includes("~") ? "rgba(251,191,36,0.1)" : "rgba(239,68,68,0.1)", color: s.includes("✓") ? "#4ade80" : s.includes("~") ? "#fbbf24" : "#f87171", border: `1px solid ${s.includes("✓") ? "rgba(34,197,94,0.2)" : s.includes("~") ? "rgba(251,191,36,0.2)" : "rgba(239,68,68,0.2)"}` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Top priorities */}
            <div style={{ marginTop: "1.5rem", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "12px", padding: "1rem" }}>
              <p style={{ color: "#fbbf24", fontWeight: 600, fontSize: "0.875rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <TrendingUp size={15} /> Top 3 Skills to Learn First
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {fullSkillReport.topPriority.map((s, i) => (
                  <span key={s} style={{ fontSize: "0.82rem", padding: "4px 14px", borderRadius: "9999px", background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", fontWeight: 500 }}>
                    #{i + 1} {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Project Details Modal ── */}
      {selectedProject && (
        <div style={overlayStyle} onClick={() => setSelectedProject(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {(() => { const Icon = iconMap[selectedProject.icon] || FileText; return <Icon size={22} color="white" />; })()}
                </div>
                <div>
                  <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.2rem" }}>{selectedProject.name}</h2>
                  <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                    {(() => {
                      const dc = { Easy: { bg: "rgba(34,197,94,0.15)", color: "#4ade80", border: "rgba(34,197,94,0.3)" }, Medium: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "rgba(251,191,36,0.3)" }, Hard: { bg: "rgba(239,68,68,0.15)", color: "#f87171", border: "rgba(239,68,68,0.3)" } }[selectedProject.difficulty];
                      return <span style={{ fontSize: "0.72rem", padding: "2px 10px", borderRadius: "9999px", background: dc.bg, color: dc.color, border: `1px solid ${dc.border}`, fontWeight: 600 }}>{selectedProject.difficulty}</span>;
                    })()}
                    {selectedProject.duration && (
                      <span style={{ fontSize: "0.72rem", padding: "2px 10px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}>
                        ⏱ {selectedProject.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "1.5rem" }}>{selectedProject.description}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1rem" }}>
                <p style={{ color: "#a78bfa", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Key Skills You'll Learn</p>
                {(selectedProject.skills || selectedProject.tags).map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ color: "#cbd5e1", fontSize: "0.875rem" }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1rem" }}>
                <p style={{ color: "#22d3ee", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Tech Stack</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "0.78rem", padding: "3px 10px", borderRadius: "9999px", background: "rgba(6,182,212,0.1)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.2)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {selectedProject.outcome && (
              <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "12px", padding: "1rem", marginBottom: "1.5rem" }}>
                <p style={{ color: "#4ade80", fontWeight: 600, fontSize: "0.875rem", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle size={15} /> Expected Outcome
                </p>
                <p style={{ color: "#cbd5e1", fontSize: "0.875rem", lineHeight: 1.6 }}>{selectedProject.outcome}</p>
              </div>
            )}

            {addedToRoadmap.has(selectedProject.id) ? (
              <button style={{ width: "100%", justifyContent: "center", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", border: "1px solid rgba(34,197,94,0.4)", background: "rgba(34,197,94,0.12)", color: "#4ade80", fontWeight: 600, cursor: "default" }}>
                <Check size={18} /> Added to Roadmap
              </button>
            ) : (
              <button className="gradient-btn" style={{ width: "100%", justifyContent: "center", fontSize: "1rem" }} onClick={() => handleAddToRoadmap(selectedProject)}>
                Add to My Roadmap →
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── See All Projects Modal ── */}
      {showAllProjects && (
        <div style={overlayStyle} onClick={() => setShowAllProjects(false)}>
          <div style={{ ...modalStyle, maxWidth: "900px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Code2 size={20} color="#a78bfa" />
                <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.15rem" }}>All Recommended Projects</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: "9999px", background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)", fontWeight: 500 }}>
                  {projects.length} projects
                </span>
              </div>
              <button onClick={() => setShowAllProjects(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {projects.map((p) => (
                <ProjectCard key={p.id} {...p} onViewDetails={(proj) => { setShowAllProjects(false); setSelectedProject(proj); }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside style={{ width: "256px", height: "100vh", position: "fixed", left: 0, top: 0, background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", zIndex: 40 }}>
        <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
          <Zap size={20} color="#7c3aed" fill="#7c3aed" />
          <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "1rem" }}>PathForge <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span></span>
        </div>

        <div style={{ padding: "0 1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#ffffff", fontSize: "1.1rem" }}>
            {initials}
          </div>
          <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem", marginTop: "0.75rem" }}>{userName}</p>
          <span style={{ display: "inline-block", marginTop: "4px", fontSize: "0.7rem", padding: "2px 10px", borderRadius: "9999px", background: "rgba(124,58,237,0.2)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)", fontWeight: 500 }}>
            AI Engineer Track
          </span>
        </div>

        <nav style={{ flex: 1, padding: "1.5rem 0.75rem", display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = activeNav === id;
            return (
              <button key={id} onClick={() => scrollToSection(id)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", cursor: "pointer", border: isActive ? "1px solid rgba(124,58,237,0.25)" : "1px solid transparent", background: isActive ? "rgba(124,58,237,0.15)" : "transparent", color: isActive ? "#a78bfa" : "#94a3b8", fontSize: "0.875rem", fontWeight: isActive ? 600 : 400, textAlign: "left", width: "100%", transition: "all 0.2s" }}
                onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.color = "#ffffff"; } }}
                onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; } }}
              >
                <Icon size={17} />{label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={() => navigate("/onboarding")}
            style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#94a3b8", fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(124,58,237,0.12)"; el.style.color = "#a78bfa"; el.style.borderColor = "rgba(124,58,237,0.3)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.03)"; el.style.color = "#94a3b8"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <ArrowLeft size={14} /> Back to Profile Setup
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Zap size={13} color="#475569" />
            <span style={{ color: "#475569", fontSize: "0.75rem" }}>Ollama · LLaMA 3.2</span>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main ref={mainRef} style={{ marginLeft: "256px", flex: 1, padding: "2rem", overflowY: "auto", height: "100vh" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.4rem" }}>Your Career Workspace</h1>
            <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: "2px" }}>AI Modules / Overview</p>
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setShowProfileInfo((prev) => !prev)}
              style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#ffffff", fontSize: "0.875rem", border: "none", cursor: "pointer" }}
              aria-label="Open profile info"
            >
              {initials}
            </button>
            {showProfileInfo && (
              <div style={{ position: "absolute", right: 0, top: "calc(100% + 0.75rem)", width: "260px", background: "rgba(15,23,42,0.95)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "16px", padding: "1rem", boxShadow: "0 18px 40px rgba(0,0,0,0.35)", zIndex: 50 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{initials}</div>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 700, margin: 0 }}>{userName}</p>
                    <p style={{ color: "#94a3b8", fontSize: "0.78rem", margin: "0.25rem 0 0" }}>AI developer · Founder</p>
                  </div>
                </div>
                <div style={{ color: "#cbd5e1", fontSize: "0.82rem", lineHeight: 1.6 }}>
                  Welcome back, {userName.split(" ")[0]}! Here you can access your profile details and keep your AI career dashboard organized.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Summary */}
        <div className="glass-card" style={{ borderLeft: "4px solid #7c3aed", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.2rem" }}>{userName}</h2>
            <span style={{ display: "inline-block", marginTop: "6px", fontSize: "0.75rem", padding: "3px 12px", borderRadius: "9999px", background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)", fontWeight: 500 }}>AI Engineer Track</span>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "6px" }}>
              {(profile as Record<string, unknown>).level as string || "Intermediate"} · {(profile as Record<string, unknown>).studyHours as number || 2}h/day
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { label: `${((profile as Record<string, unknown>).techSkills as string[] || mockProfile.techSkills).length} Skills`, style: { bg: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "rgba(124,58,237,0.25)" } },
              { label: (profile as Record<string, unknown>).domain as string || "AI/ML Domain", style: { bg: "rgba(6,182,212,0.15)", color: "#22d3ee", border: "rgba(6,182,212,0.25)" } },
              { label: `${(profile as Record<string, unknown>).studyHours as number || 2}h Daily`, style: { bg: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "rgba(255,255,255,0.1)" } },
              { label: (profile as Record<string, unknown>).learningStyle as string || "Project-Based", style: { bg: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "rgba(255,255,255,0.1)" } },
            ].map((chip) => (
              <span key={chip.label} style={{ display: "inline-block", fontSize: "0.8rem", padding: "4px 12px", borderRadius: "9999px", background: chip.style.bg, color: chip.style.color, border: `1px solid ${chip.style.border}`, fontWeight: 500, whiteSpace: "nowrap" }}>
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <section id="overview" style={{ marginBottom: "3rem", scrollMarginTop: "80px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.05rem" }}>Your AI Modules</h2>
            <span style={{ color: "#64748b", fontSize: "0.8rem" }}>6 active modules</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {modules.map((m) => (
              <ModuleCard key={m.id} {...m} onClick={() => scrollToSection(m.id)} />
            ))}
          </div>
        </section>

        {/* Simulation */}
        <section id="career-simulation" style={{ scrollMarginTop: "80px", marginBottom: "2rem" }}>
          <SimulationPanel />
        </section>

        {/* Skill Gap */}
        <section id="skill-gap" style={{ scrollMarginTop: "80px", marginBottom: "2rem" }}>
          <div className="glass-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Target size={20} color="#22d3ee" />
                <span style={{ color: "#ffffff", fontWeight: 600 }}>Skill Gap Analysis</span>
              </div>
              <button
                onClick={() => setShowSkillReport(true)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#a78bfa", fontSize: "0.85rem", fontWeight: 500, padding: "4px 10px", borderRadius: "6px", transition: "background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                Full Report →
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "1.5rem" }}>
              <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#4ade80", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                  <CheckCircle size={15} /> Your Strengths
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skillGaps.strengths.map((s) => (
                    <span key={s} style={{ fontSize: "0.8rem", padding: "4px 12px", borderRadius: "9999px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", color: "#4ade80" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#fbbf24", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                  <AlertCircle size={15} /> Skills to Develop
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skillGaps.toLearn.map((s) => (
                    <span key={s} style={{ fontSize: "0.8rem", padding: "4px 12px", borderRadius: "9999px", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "1.5rem", paddingTop: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>AI Engineer Readiness</span>
                <span style={{ color: "#a78bfa", fontWeight: 600, fontSize: "0.875rem" }}>58%</span>
              </div>
              <div style={{ height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "9999px" }}>
                <div style={{ width: "58%", height: "100%", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "9999px" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" style={{ scrollMarginTop: "80px", marginBottom: "2rem" }}>
          <div className="glass-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Map size={20} color="#a78bfa" />
                <span style={{ color: "#ffffff", fontWeight: 600 }}>Your Learning Roadmap</span>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {(["30 Days", "3 Months", "6 Months"] as const).map((tab) => (
                  <button key={tab} onClick={() => setRoadmapTab(tab)} style={{ padding: "5px 14px", borderRadius: "9999px", fontSize: "0.8rem", border: "none", cursor: "pointer", background: roadmapTab === tab ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.05)", color: roadmapTab === tab ? "#ffffff" : "#94a3b8", fontWeight: roadmapTab === tab ? 600 : 400, transition: "all 0.2s" }}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
              {currentRoadmap.map((col, colIdx) => (
                <RoadmapCard
                  key={col.week}
                  week={col.week}
                  tasks={col.tasks}
                  addedProjects={getProjectsForColumn(colIdx)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 7-Day Plan */}
        <section id="7-day-plan" style={{ scrollMarginTop: "80px", marginBottom: "2rem" }}>
          <div className="glass-card">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0" }}>
              <Calendar size={20} color="#a78bfa" />
              <span style={{ color: "#ffffff", fontWeight: 600 }}>This Week's Execution Plan</span>
              <span style={{ marginLeft: "auto", color: "#64748b", fontSize: "0.82rem" }}>
                {completed.length}/7 completed
              </span>
            </div>
            <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "0.5rem", marginTop: "1.5rem", scrollbarWidth: "none" }}>
              {dayPlan.map(({ day, task, time }) => {
                const done = completed.includes(day);
                return (
                  <div key={day} className="glass-card" style={{ flexShrink: 0, width: "148px", cursor: "pointer", padding: "1rem", border: done ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.08)", background: done ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.04)", transition: "all 0.2s" }} onClick={() => toggleDay(day)}>
                    <p style={{ fontSize: "2.2rem", fontWeight: 800, lineHeight: 1, background: "linear-gradient(180deg, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{day}</p>
                    <p style={{ color: done ? "#64748b" : "#ffffff", fontWeight: 500, fontSize: "0.85rem", marginTop: "8px", textDecoration: done ? "line-through" : "none", lineHeight: 1.3 }}>{task}</p>
                    <span style={{ display: "inline-block", marginTop: "8px", fontSize: "0.72rem", padding: "2px 8px", borderRadius: "9999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#64748b" }}>{time}</span>
                    <div style={{ marginTop: "14px", width: "22px", height: "22px", borderRadius: "6px", border: done ? "none" : "1px solid rgba(255,255,255,0.2)", background: done ? "#22c55e" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                      {done && <Check size={13} color="white" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" style={{ scrollMarginTop: "80px", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Code2 size={20} color="#a78bfa" />
              <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.05rem" }}>Projects Built for You</span>
            </div>
            <button
              onClick={() => setShowAllProjects(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#a78bfa", fontSize: "0.85rem", fontWeight: 500, padding: "4px 10px", borderRadius: "6px", transition: "background 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              See All ({projects.length}) →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.id} {...p} onViewDetails={(proj) => setSelectedProject(proj)} />
            ))}
          </div>
        </section>

        {/* Chat */}
        <section id="ai-chat" style={{ scrollMarginTop: "80px", marginBottom: "3rem" }}>
          <ChatWidget />
        </section>
      </main>
    </div>
  );
}
