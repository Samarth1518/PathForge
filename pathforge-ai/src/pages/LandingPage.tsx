import { useNavigate } from "react-router-dom";
import {
  Upload, Edit3, ShieldCheck, Lock, Gift, Cpu, ChevronDown,
  Sparkles, FileText, TrendingUp, Map, Rocket, Brain, LayoutDashboard,
  CheckCircle, Target, Code2, Calendar, MessageCircle, Star,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import ModuleCard from "../components/ModuleCard";

const modules = [
  { id: "simulation", title: "Career Simulation Engine", description: "Predict realistic future opportunities based on your current trajectory and skills", iconName: "Rocket", accent: "violet" as const },
  { id: "skill-gap", title: "Skill Gap Analysis", description: "Discover exactly what skills you're missing for your dream role", iconName: "Target", accent: "cyan" as const },
  { id: "roadmap", title: "Personalized Roadmap", description: "Get 30-day, 3-month, and 6-month tailored learning plans", iconName: "Map", accent: "violet" as const },
  { id: "projects", title: "Project Recommendations", description: "AI-suggested projects perfectly matched to your target role", iconName: "Code2", accent: "cyan" as const },
  { id: "7-day-plan", title: "7-Day Starter Plan", description: "A practical first-week execution schedule to get you moving", iconName: "Calendar", accent: "violet" as const },
  { id: "ai-chat", title: "AI Career Chat", description: "Ask contextual questions, get answers based on your profile", iconName: "MessageCircle", accent: "cyan" as const },
];

const steps = [
  { num: "1", icon: Upload, title: "Upload or Build Profile", desc: "Start with your resume or manual input" },
  { num: "2", icon: Brain, title: "AI Analyzes Your Skills", desc: "Local LLaMA 3.2 processes your profile" },
  { num: "3", icon: LayoutDashboard, title: "Explore Your Workspace", desc: "6 AI modules unlock for you" },
  { num: "4", icon: CheckCircle, title: "Follow Your Plan", desc: "Execute your personalized roadmap" },
];

const testimonials = [
  { initials: "AR", name: "Arjun R.", role: "CS Final Year Student", quote: "PathForge told me exactly which projects to build. I had a full AI portfolio roadmap in 10 minutes." },
  { initials: "SM", name: "Sanya M.", role: "Career Switcher", quote: "The skill gap analysis showed me I was only 3 skills away from qualifying for ML engineer roles." },
  { initials: "PK", name: "Priya K.", role: "Freelance Developer", quote: "Finally something that got me actually executing instead of just planning endlessly." },
];

const techPills = [
  { name: "Ollama", color: "#7c3aed" },
  { name: "LLaMA 3.2", color: "#7c3aed" },
  { name: "LangGraph", color: "#06b6d4" },
  { name: "ChromaDB", color: "#06b6d4" },
  { name: "Streamlit", color: "#7c3aed" },
  { name: "Python", color: "#06b6d4" },
  { name: "pdfplumber", color: "#64748b" },
  { name: "nomic-embed-text", color: "#64748b" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", textAlign: "center", padding: "2rem 1.5rem" }}>
        {/* Orbs */}
        <div className="animate-float" style={{ position: "absolute", top: "15%", left: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "#7c3aed", opacity: 0.1, filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="animate-float-delayed" style={{ position: "absolute", top: "40%", right: "8%", width: "300px", height: "300px", borderRadius: "50%", background: "#06b6d4", opacity: 0.1, filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="animate-float-slow" style={{ position: "absolute", bottom: "10%", left: "30%", width: "350px", height: "350px", borderRadius: "50%", background: "#7c3aed", opacity: 0.08, filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "9999px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", marginBottom: "2rem" }}>
            <Sparkles size={14} color="#a78bfa" />
            <span style={{ color: "#a78bfa", fontSize: "0.8rem", fontWeight: 500 }}>Powered by LLaMA 3.2 · 100% Local AI</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.15, color: "#ffffff", marginBottom: "0" }}>
            Forge Your Career Path
          </h1>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "0" }}>
            <span className="gradient-text">with AI</span>
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "1.15rem", maxWidth: "600px", margin: "1.5rem auto 0", lineHeight: 1.7 }}>
            PathForge AI analyzes your skills, predicts your future, and builds a personalized roadmap — powered entirely by local AI running on your machine.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="gradient-btn" style={{ fontSize: "1rem" }} onClick={() => navigate("/onboarding")}>
              <Upload size={18} /> Upload Resume
            </button>
            <button className="outline-btn" style={{ fontSize: "1rem" }} onClick={() => navigate("/onboarding")}>
              <Edit3 size={18} /> Build Profile Manually
            </button>
          </div>

          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: ShieldCheck, label: "100% Local" },
              { icon: Lock, label: "No Data Shared" },
              { icon: Gift, label: "Free Forever" },
              { icon: Cpu, label: "Powered by Ollama" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "0.85rem" }}>
                <Icon size={15} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="animate-bounce-slow" style={{ marginTop: "3rem" }}>
            <ChevronDown size={28} color="#475569" />
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <div className="glass-card" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", padding: "2rem 0" }}>
          {[
            { icon: FileText, color: "#a78bfa", title: "Resume Intelligence", desc: "AI extracts skills, projects, and experience automatically" },
            { icon: TrendingUp, color: "#22d3ee", title: "Career Simulation", desc: "Predict your future career paths and opportunities" },
            { icon: Map, color: "#a78bfa", title: "Smart Roadmaps", desc: "Personalized 30-day to 6-month learning plans" },
          ].map((f, i) => (
            <div
              key={f.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 2rem",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <f.icon size={28} color={f.color} />
              <h3 style={{ color: "#ffffff", fontWeight: 600, marginTop: "0.75rem", fontSize: "1rem" }}>{f.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#a78bfa", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>PROCESS</p>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, marginTop: "0.5rem" }}>How PathForge AI Works</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "4rem", position: "relative" }}>
          <div style={{ position: "absolute", top: "28px", left: "calc(12.5% + 20px)", right: "calc(12.5% + 20px)", height: "1px", borderTop: "2px dashed rgba(124,58,237,0.3)", zIndex: 0 }} />
          {steps.map((s) => (
            <div key={s.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
                {s.num}
              </div>
              <s.icon size={24} color="#a78bfa" style={{ marginTop: "1rem" }} />
              <h3 style={{ color: "#ffffff", fontWeight: 600, marginTop: "0.75rem", fontSize: "0.95rem" }}>{s.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "0.5rem", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Modules */}
      <section id="features" style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#a78bfa", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>WORKSPACE</p>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, marginTop: "0.5rem" }}>Your AI-Powered Career Workspace</h2>
          <p style={{ color: "#94a3b8", marginTop: "0.75rem", fontSize: "1rem" }}>6 intelligent modules working together to guide your career</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {modules.map((m) => (
            <ModuleCard key={m.id} {...m} onClick={() => navigate("/onboarding")} />
          ))}
        </div>
      </section>

      {/* Career Simulation Spotlight */}
      <section id="simulation" style={{ background: "rgba(255,255,255,0.02)", padding: "4rem 1.5rem", marginTop: "2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.7rem", padding: "4px 12px", borderRadius: "9999px", background: "rgba(124,58,237,0.2)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.4)", fontWeight: 600 }}>WOW FEATURE</span>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, marginTop: "1rem", lineHeight: 1.2 }}>See Your Career Future</h2>
            <p style={{ color: "#94a3b8", marginTop: "1rem", lineHeight: 1.7 }}>
              Our career simulation engine uses your current skills, learning pace, and domain interests to project where you'll be at 3, 6, and 12 months — giving you a clear, data-driven view of your trajectory.
            </p>
            {[
              "Predicts realistic timelines based on your current skills",
              "Shows exactly which roles you'll qualify for at 3, 6, 12 months",
              "Adjusts dynamically as you add new skills to your profile",
            ].map((point) => (
              <div key={point} style={{ display: "flex", gap: "10px", marginTop: "1rem", alignItems: "flex-start" }}>
                <CheckCircle size={18} color="#a78bfa" style={{ marginTop: "2px", flexShrink: 0 }} />
                <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.6 }}>{point}</p>
              </div>
            ))}
            <button className="gradient-btn" style={{ marginTop: "2rem", fontSize: "1rem" }} onClick={() => navigate("/onboarding")}>
              Try Career Simulation →
            </button>
          </div>

          <div style={{ border: "1px solid rgba(124,58,237,0.3)", borderRadius: "16px", padding: "1.5rem", background: "rgba(255,255,255,0.04)", boxShadow: "0 0 40px rgba(124,58,237,0.15)", backdropFilter: "blur(16px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
              <Sparkles size={18} color="#a78bfa" />
              <span style={{ color: "#ffffff", fontWeight: 600 }}>Simulation Result</span>
              <span style={{ marginLeft: "auto", fontSize: "0.7rem", padding: "2px 8px", borderRadius: "9999px", background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", fontWeight: 500 }}>Live Preview</span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "1rem" }}>AI + Full Stack · 8 months consistent</p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { period: "3 Months", desc: "Internship eligible · AI portfolio ready", color: "#7c3aed" },
                { period: "6 Months", desc: "GenAI Startup Roles · Freelance AI projects", color: "#06b6d4" },
                { period: "12 Months", desc: "ML Engineer · AI Consultant roles", color: "#4ade80" },
              ].map((t) => (
                <div key={t.period} style={{ borderLeft: `3px solid ${t.color}`, paddingLeft: "12px", padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "0 8px 8px 0" }}>
                  <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: "9999px", background: `${t.color}22`, color: t.color, fontWeight: 600 }}>{t.period}</span>
                  <p style={{ color: "#cbd5e1", fontSize: "0.85rem", marginTop: "4px" }}>{t.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Career Readiness</span>
                <span style={{ color: "#a78bfa", fontWeight: 600, fontSize: "0.85rem" }}>73%</span>
              </div>
              <div style={{ height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "9999px" }}>
                <div style={{ width: "73%", height: "100%", background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "9999px" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700 }}>Built With Local AI Stack</h2>
        <p style={{ color: "#94a3b8", marginTop: "0.75rem" }}>Zero API costs. Complete privacy. Runs entirely on your machine.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginTop: "2.5rem" }}>
          {techPills.map((p) => (
            <div key={p.name} className="glass-card" style={{ padding: "8px 16px", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, display: "inline-block" }} />
              <span style={{ color: "#ffffff", fontSize: "0.875rem", fontWeight: 500 }}>{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <h2 style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700, textAlign: "center", marginBottom: "2.5rem" }}>What Builders Say</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card">
              <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} color="#fbbf24" fill="#fbbf24" />)}
              </div>
              <p style={{ color: "#cbd5e1", fontSize: "0.875rem", fontStyle: "italic", lineHeight: 1.7 }}>"{t.quote}"</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "1rem", paddingTop: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#ffffff", fontSize: "0.875rem", flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>{t.name}</p>
                  <p style={{ color: "#64748b", fontSize: "0.75rem" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "6rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
          Ready to Forge Your{" "}
          <span className="gradient-text">Career Path?</span>
        </h2>
        <p style={{ color: "#94a3b8", marginTop: "1rem", fontSize: "1.05rem" }}>It's free, local, and takes 2 minutes to get started.</p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="gradient-btn" style={{ fontSize: "1rem" }} onClick={() => navigate("/onboarding")}>
            <Upload size={18} /> Upload Resume
          </button>
          <button className="outline-btn" style={{ fontSize: "1rem" }} onClick={() => navigate("/onboarding")}>
            <Edit3 size={18} /> Build Profile Manually
          </button>
        </div>
        <p style={{ color: "#475569", fontSize: "0.8rem", marginTop: "1.5rem" }}>No account needed · Runs on your machine · Powered by Ollama</p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
              <Zap size={18} color="#7c3aed" fill="#7c3aed" />
              <span style={{ fontWeight: 700, color: "#ffffff" }}>PathForge AI</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.6 }}>Your AI-powered career intelligence platform, running locally on your machine.</p>
          </div>
          <div>
            <p style={{ color: "#94a3b8", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>Navigate</p>
            {["Features", "How It Works", "Tech Stack"].map((l) => (
              <p key={l} style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0.5rem", cursor: "pointer" }}>{l}</p>
            ))}
          </div>
          <div>
            <p style={{ color: "#94a3b8", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem" }}>Connect</p>
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0.5rem", cursor: "pointer" }}>GitHub</p>
            <p style={{ color: "#64748b", fontSize: "0.85rem", cursor: "pointer" }}>Twitter</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#475569", fontSize: "0.75rem" }}>© 2025 PathForge AI — Built with Ollama · LLaMA 3.2 · LangGraph · ChromaDB</p>
          <p style={{ color: "#475569", fontSize: "0.75rem" }}>100% Local · Zero API Costs</p>
        </div>
      </footer>
    </div>
  );
}
