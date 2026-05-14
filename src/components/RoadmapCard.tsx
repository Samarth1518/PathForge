import { Code2, Database, Zap, Brain, Link, GitBranch, Layout, Box, Rocket, CheckCircle, FileText, Target, MessageCircle, BookOpen } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Code2, Database, Zap, Brain, Link, GitBranch, Layout, Box, Rocket, CheckCircle, FileText, Target, MessageCircle, BookOpen,
};

interface Task {
  task: string;
  duration: string;
  icon: string;
}

interface AddedProject {
  name: string;
}

interface RoadmapCardProps {
  week: string;
  tasks: Task[];
  addedProjects?: AddedProject[];
}

export default function RoadmapCard({ week, tasks, addedProjects = [] }: RoadmapCardProps) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: addedProjects.length > 0 ? "1px solid rgba(124,58,237,0.25)" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        padding: "1rem",
      }}
    >
      <p style={{ color: "#a78bfa", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
        {week}
      </p>
      {tasks.map((t, i) => {
        const Icon = iconMap[t.icon] || Code2;
        return (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "0.75rem" }}>
            <div
              style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
            >
              <Icon size={14} />
            </div>
            <div>
              <p style={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: 500, lineHeight: 1.3 }}>{t.task}</p>
              <span
                style={{
                  display: "inline-block", marginTop: "2px", fontSize: "0.7rem", color: "#64748b",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "9999px", padding: "1px 7px",
                }}
              >
                {t.duration}
              </span>
            </div>
          </div>
        );
      })}

      {addedProjects.length > 0 && (
        <div style={{ marginTop: "0.75rem", borderTop: "1px dashed rgba(124,58,237,0.25)", paddingTop: "0.75rem" }}>
          <p style={{ color: "#a78bfa", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
            + Your Projects
          </p>
          {addedProjects.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", flexShrink: 0 }} />
              <span style={{ color: "#c4b5fd", fontSize: "0.78rem", fontWeight: 500, lineHeight: 1.3 }}>{p.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
