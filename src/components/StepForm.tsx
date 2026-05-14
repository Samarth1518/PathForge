interface StepFormProps {
  fields: { label: string; type: string; placeholder?: string }[];
  onNext: () => void;
}

export default function StepForm({ fields, onNext }: StepFormProps) {
  return (
    <div className="glass-card">
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {fields.map((field) => (
          <div key={field.label}>
            <label style={{ color: "#94a3b8", fontSize: "0.875rem", fontWeight: 500, display: "block", marginBottom: "6px" }}>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "#ffffff",
                fontSize: "0.875rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>
      <button className="gradient-btn" style={{ width: "100%", marginTop: "2rem", justifyContent: "center" }} onClick={onNext}>
        Next →
      </button>
    </div>
  );
}
