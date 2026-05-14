import { FileText, Database, Network, Brain, Code2, Zap } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FileText, Database, Network, Brain, Code2, Zap,
};

interface Project {
  id: number;
  icon: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  duration?: string;
  skills?: string[];
  outcome?: string;
}

interface ProjectCardProps extends Project {
  onViewDetails?: (project: Project) => void;
}

export default function ProjectCard({ onViewDetails, ...project }: ProjectCardProps) {
  const { icon, name, description, difficulty, tags } = project;
  const Icon = iconMap[icon] || FileText;
  const difficultyColors: Record<string, { bg: string; color: string; border: string }> = {
    Easy: { bg: "rgba(34,197,94,0.15)", color: "#4ade80", border: "rgba(34,197,94,0.3)" },
    Medium: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "rgba(251,191,36,0.3)" },
    Hard: { bg: "rgba(239,68,68,0.15)", color: "#f87171", border: "rgba(239,68,68,0.3)" },
  };
  const dc = difficultyColors[difficulty];

  return (
    <div
      className="glass-card"
      style={{ transition: "all 0.3s ease", cursor: "pointer", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 0 24px rgba(124,58,237,0.2)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = ""; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color="white" />
        </div>
        <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: "9999px", fontWeight: 600, background: dc.bg, color: dc.color, border: `1px solid ${dc.border}` }}>
          {difficulty}
        </span>
      </div>

      <h3 style={{ color: "#ffffff", fontWeight: 600, marginTop: "1rem", fontSize: "1rem" }}>{name}</h3>
      <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: 1.6, flex: 1 }}>{description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1rem" }}>
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1" }}>
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => onViewDetails?.(project)}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#a78bfa", fontSize: "0.875rem", marginTop: "1rem", fontWeight: 500, textAlign: "left", transition: "color 0.2s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c4b5fd"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#a78bfa"; }}
      >
        View Details →
      </button>
    </div>
  );
}

export type { Project };
