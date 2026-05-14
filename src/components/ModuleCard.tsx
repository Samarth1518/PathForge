import { Rocket, Target, Map, Code2, Calendar, MessageCircle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Rocket, Target, Map, Code2, Calendar, MessageCircle,
};

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  iconName: string;
  accent: "violet" | "cyan";
  status?: string;
  onClick?: () => void;
}

export default function ModuleCard({ id, title, description, iconName, accent, status, onClick }: ModuleCardProps) {
  const Icon = iconMap[iconName] || Rocket;
  const isViolet = accent === "violet";

  return (
    <div
      className="glass-card"
      style={{ cursor: "pointer", transition: "all 0.3s ease", position: "relative" }}
      onClick={onClick}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = isViolet
          ? "0 0 32px rgba(124,58,237,0.25)"
          : "0 0 32px rgba(6,182,212,0.2)";
        el.style.borderColor = isViolet ? "rgba(124,58,237,0.4)" : "rgba(6,182,212,0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "";
        el.style.borderColor = "";
      }}
    >
      {status && (
        <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontWeight: 500,
              background: status === "Ready" ? "rgba(34,197,94,0.15)" : "rgba(251,191,36,0.15)",
              color: status === "Ready" ? "#4ade80" : "#fbbf24",
              border: `1px solid ${status === "Ready" ? "rgba(34,197,94,0.3)" : "rgba(251,191,36,0.3)"}`,
            }}
          >
            {status}
          </span>
        </div>
      )}

      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: isViolet
            ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
            : "linear-gradient(135deg, #0891b2, #06b6d4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={22} color="white" />
      </div>

      <h3 style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.05rem", marginTop: "1rem" }}>{title}</h3>
      <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "0.5rem", lineHeight: 1.6 }}>{description}</p>
      <p
        style={{
          color: isViolet ? "#a78bfa" : "#22d3ee",
          fontSize: "0.875rem",
          marginTop: "1rem",
          fontWeight: 500,
          transition: "color 0.2s",
        }}
      >
        Open Module →
      </p>
    </div>
  );
}
