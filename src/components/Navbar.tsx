import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,14,26,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <Zap size={22} color="#7c3aed" fill="#7c3aed" />
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#ffffff" }}>
            PathForge{" "}
            <span className="gradient-text">AI</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {["features", "how-it-works", "tech"].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#94a3b8")}
            >
              {id === "how-it-works" ? "How It Works" : id === "tech" ? "Tech Stack" : "Features"}
            </button>
          ))}
          <button className="gradient-btn" style={{ padding: "8px 20px", fontSize: "0.875rem" }} onClick={() => navigate("/onboarding")}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
