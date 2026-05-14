import { useState, useEffect } from "react";
import { Rocket, Sparkles, Zap, Code2, Loader } from "lucide-react";
import { simulationTimeline, simulationResults } from "../data/mockData";

const timelineColors = [
  { label: "3 Months", border: "#7c3aed", bg: "rgba(124,58,237,0.15)", color: "#a78bfa", data: simulationTimeline.threeMonth },
  { label: "6 Months", border: "#06b6d4", bg: "rgba(6,182,212,0.15)", color: "#22d3ee", data: simulationTimeline.sixMonth },
  { label: "12 Months", border: "#4ade80", bg: "rgba(34,197,94,0.15)", color: "#4ade80", data: simulationTimeline.twelveMonth },
];

const opportunityIcons = [Rocket, Zap, Code2];

export default function SimulationPanel() {
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animatedScores, setAnimatedScores] = useState(simulationResults.map(() => 0));

  const runSimulation = () => {
    if (running) return;
    setRunning(true);
    setRan(false);
    setProgress(0);
    setAnimatedScores(simulationResults.map(() => 0));

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 4;
      });
    }, 60);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setRunning(false);
      setRan(true);
      simulationResults.forEach((r, i) => {
        let current = 0;
        const scoreInterval = setInterval(() => {
          current += 3;
          if (current >= r.match) {
            current = r.match;
            clearInterval(scoreInterval);
          }
          setAnimatedScores((prev) => {
            const next = [...prev];
            next[i] = current;
            return next;
          });
        }, 20);
      });
    }, 1800);
  };

  useEffect(() => {
    // Animate scores on mount too
    simulationResults.forEach((r, i) => {
      let current = 0;
      const scoreInterval = setInterval(() => {
        current += 2;
        if (current >= r.match) {
          current = r.match;
          clearInterval(scoreInterval);
        }
        setAnimatedScores((prev) => {
          const next = [...prev];
          next[i] = current;
          return next;
        });
      }, 25);
    });
  }, []);

  return (
    <div id="career-simulation" className="glass-card" style={{ marginBottom: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Rocket size={20} color="#a78bfa" />
          <span style={{ color: "#ffffff", fontWeight: 600 }}>Career Simulation Engine</span>
          {ran && (
            <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "9999px", background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", fontWeight: 500 }}>
              Updated
            </span>
          )}
        </div>
        <button
          className="gradient-btn"
          style={{ padding: "6px 16px", fontSize: "0.8rem", borderRadius: "8px", opacity: running ? 0.7 : 1, display: "flex", alignItems: "center", gap: "6px" }}
          onClick={runSimulation}
          disabled={running}
        >
          {running ? <><Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> Running...</> : "Run Simulation"}
        </button>
      </div>

      {/* Progress bar (visible while running) */}
      {running && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>Analyzing your profile...</span>
            <span style={{ color: "#a78bfa", fontSize: "0.8rem", fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "9999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "9999px", transition: "width 0.1s linear" }} />
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "8px" }}>
            {["Parsing skills...", "Mapping opportunities...", "Projecting timeline..."].map((step, i) => (
              <span key={step} style={{ fontSize: "0.72rem", color: progress > i * 33 ? "#a78bfa" : "#475569", transition: "color 0.3s" }}>
                ✓ {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Context bar */}
      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "10px 14px", marginTop: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
        <Sparkles size={14} color="#a78bfa" />
        <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Based on: AI + Full Stack profile · 8 months consistent learning</span>
      </div>

      {/* Timeline cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
        {timelineColors.map((t) => (
          <div key={t.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.07)`, borderLeft: `3px solid ${t.border}`, borderRadius: "10px", padding: "1rem", transition: "all 0.3s" }}>
            <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: "9999px", background: t.bg, color: t.color, fontWeight: 600 }}>
              {t.label}
            </span>
            <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
              {t.data.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: t.border, marginTop: "5px", flexShrink: 0, display: "inline-block" }} />
                  <span style={{ color: "#cbd5e1", fontSize: "0.82rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Opportunity match cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
        {simulationResults.map((o, idx) => {
          const Icon = opportunityIcons[idx];
          const score = animatedScores[idx];
          return (
            <div key={o.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} color="white" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: 500 }}>{o.label}</p>
                <p style={{ color: "#64748b", fontSize: "0.75rem" }}>{score}% match</p>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "9999px", marginTop: "6px" }}>
                  <div style={{ height: "100%", width: `${score}%`, background: "linear-gradient(90deg, #7c3aed, #06b6d4)", borderRadius: "9999px", transition: "width 0.05s linear" }} />
                </div>
              </div>
              <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: "1rem" }}>{score}%</span>
            </div>
          );
        })}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
