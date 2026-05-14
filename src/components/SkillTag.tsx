interface SkillTagProps {
  label: string;
  variant?: "green" | "amber" | "violet" | "cyan" | "default";
  onRemove?: () => void;
}

export default function SkillTag({ label, variant = "default", onRemove }: SkillTagProps) {
  const styles: Record<string, { bg: string; border: string; color: string }> = {
    green: {
      bg: "rgba(34,197,94,0.15)",
      border: "rgba(34,197,94,0.3)",
      color: "#4ade80",
    },
    amber: {
      bg: "rgba(251,191,36,0.15)",
      border: "rgba(251,191,36,0.3)",
      color: "#fbbf24",
    },
    violet: {
      bg: "rgba(124,58,237,0.2)",
      border: "rgba(124,58,237,0.3)",
      color: "#a78bfa",
    },
    cyan: {
      bg: "rgba(6,182,212,0.2)",
      border: "rgba(6,182,212,0.3)",
      color: "#22d3ee",
    },
    default: {
      bg: "rgba(255,255,255,0.05)",
      border: "rgba(255,255,255,0.1)",
      color: "#94a3b8",
    },
  };

  const s = styles[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 12px",
        borderRadius: "9999px",
        fontSize: "0.8rem",
        fontWeight: 500,
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
      }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: "none",
            border: "none",
            color: s.color,
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
            fontSize: "0.9rem",
            opacity: 0.7,
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
