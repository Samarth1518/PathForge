import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileUp, PenLine, UploadCloud, Zap, X, FileText, CheckCircle } from "lucide-react";

const domainOptions = ["AI/ML", "Full Stack", "Web Dev", "Data Science", "Cybersecurity", "Mobile Dev", "DevOps"];
const subjectOptions = ["Programming", "Mathematics", "Design", "Databases", "Networking", "Cloud", "Security", "AI/ML"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const careerPathOptions = ["Job", "Startup", "Freelance", "Research"];
const learningStyleOptions = ["Videos", "Reading", "Projects", "Mixed"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Record<string, unknown>>({});
  const [level, setLevel] = useState("");
  const [domain, setDomain] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [techSkills, setTechSkills] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [toolInput, setToolInput] = useState("");
  const [careerPath, setCareerPath] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [studyHours, setStudyHours] = useState(2);
  const [shortGoal, setShortGoal] = useState("");
  const [longGoal, setLongGoal] = useState("");
  const [name, setName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const progressWidth = `${(step / 4) * 100}%`;

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else if (file) {
      alert("Please upload a PDF file.");
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleAnalyze = () => {
    if (!resumeFile) {
      fileInputRef.current?.click();
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setProfile({ ...profile, method: "resume", resumeName: resumeFile.name });
      setStep(2);
    }, 1800);
  };

  const addTag = (value: string, list: string[], setter: (v: string[]) => void, inputSetter: (v: string) => void) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setter([...list, trimmed]);
    }
    inputSetter("");
  };

  const removeTag = (tag: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.filter((t) => t !== tag));
  };

  const handleFinish = () => {
    const finalProfile = {
      ...profile,
      name,
      level,
      domain,
      subjects,
      techSkills,
      tools,
      careerPath,
      learningStyle,
      studyHours,
      shortGoal,
      longGoal,
    };
    navigate("/dashboard", { state: { profile: finalProfile } });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    padding: "10px 14px",
    color: "#ffffff",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    color: "#94a3b8",
    fontSize: "0.875rem",
    fontWeight: 500,
    display: "block",
    marginBottom: "8px",
  };

  const toggleBtnStyle = (selected: boolean): React.CSSProperties => ({
    padding: "8px 20px",
    borderRadius: "9999px",
    border: selected ? "none" : "1px solid rgba(255,255,255,0.12)",
    background: selected ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.04)",
    color: selected ? "#ffffff" : "#94a3b8",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.875rem",
    transition: "all 0.2s",
  });

  const chipStyle = (selected: boolean): React.CSSProperties => ({
    padding: "6px 16px",
    borderRadius: "9999px",
    border: selected ? "1px solid rgba(124,58,237,0.6)" : "1px solid rgba(255,255,255,0.1)",
    background: selected ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
    color: selected ? "#a78bfa" : "#94a3b8",
    cursor: "pointer",
    fontSize: "0.82rem",
    fontWeight: 500,
    transition: "all 0.2s",
  });

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0e1a 0%, #12082a 100%)" }}>
      {/* Top Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={() => (step === 1 ? navigate("/") : setStep(step - 1))}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "0.9rem" }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Zap size={18} color="#7c3aed" fill="#7c3aed" />
          <span style={{ fontWeight: 700, color: "#ffffff" }}>PathForge <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span></span>
        </div>
        <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Step {step} of 4</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", background: "rgba(255,255,255,0.06)" }}>
        <div style={{ height: "100%", width: progressWidth, background: "linear-gradient(90deg, #7c3aed, #06b6d4)", transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h1 style={{ color: "#ffffff", fontWeight: 800, fontSize: "2rem", textAlign: "center" }}>Let's Build Your Profile</h1>
            <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "0.5rem" }}>Choose how you want to get started</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2.5rem", position: "relative" }}>
              {/* Card A */}
              <div
                className="glass-card"
                style={{ textAlign: "center", border: "1px solid rgba(124,58,237,0.3)", transition: "all 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(124,58,237,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <FileUp size={48} color="#a78bfa" style={{ margin: "0 auto" }} />
                <h3 style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.2rem", marginTop: "1rem" }}>Upload Your Resume</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "0.5rem", lineHeight: 1.6 }}>AI will automatically extract your skills, projects, education and experience</p>

                {/* Hidden real file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  style={{ display: "none" }}
                  onChange={handleFileInput}
                />

                {/* Drop zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  style={{
                    margin: "1.5rem 0",
                    border: isDragging ? "2px dashed #7c3aed" : resumeFile ? "2px dashed rgba(34,197,94,0.6)" : "1px dashed rgba(124,58,237,0.4)",
                    borderRadius: "12px",
                    padding: "2rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: isDragging ? "rgba(124,58,237,0.08)" : resumeFile ? "rgba(34,197,94,0.05)" : "transparent",
                  }}
                >
                  {resumeFile ? (
                    <>
                      <CheckCircle size={32} color="#4ade80" style={{ margin: "0 auto" }} />
                      <p style={{ color: "#4ade80", fontSize: "0.875rem", marginTop: "0.5rem", fontWeight: 500 }}>{resumeFile.name}</p>
                      <p style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "4px" }}>
                        {(resumeFile.size / 1024).toFixed(0)} KB · Click to change
                      </p>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={32} color={isDragging ? "#a78bfa" : "#475569"} style={{ margin: "0 auto" }} />
                      <p style={{ color: isDragging ? "#a78bfa" : "#64748b", fontSize: "0.875rem", marginTop: "0.5rem" }}>
                        {isDragging ? "Drop it here!" : "Drop your PDF here or click to browse"}
                      </p>
                      <p style={{ color: "#475569", fontSize: "0.75rem", marginTop: "4px" }}>PDF only · Max 5MB</p>
                    </>
                  )}
                </div>

                <button
                  className="gradient-btn"
                  style={{ width: "100%", justifyContent: "center", opacity: isAnalyzing ? 0.8 : 1 }}
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <FileText size={16} />
                      Analyzing Resume...
                    </>
                  ) : resumeFile ? (
                    "Analyze Resume →"
                  ) : (
                    "Select PDF to Upload →"
                  )}
                </button>
              </div>

              {/* OR divider */}
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,0.08)" }} />
                  <span style={{ background: "#12082a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", padding: "4px 10px", color: "#64748b", fontSize: "0.75rem", fontWeight: 500 }}>or</span>
                  <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,0.08)" }} />
                </div>
              </div>

              {/* Card B */}
              <div
                className="glass-card"
                style={{ textAlign: "center", cursor: "pointer", border: "1px solid rgba(6,182,212,0.3)", transition: "all 0.3s" }}
                onClick={() => { setProfile({ ...profile, method: "manual" }); setStep(2); }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(6,182,212,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <PenLine size={48} color="#22d3ee" style={{ margin: "0 auto" }} />
                <h3 style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.2rem", marginTop: "1rem" }}>Build Profile Manually</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "0.5rem", lineHeight: 1.6 }}>Fill in your details, skills, and goals directly without a resume</p>
                <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[0.7, 0.85, 0.6].map((w, i) => (
                    <div key={i} className="shimmer-bg" style={{ height: "12px", borderRadius: "6px", width: `${w * 100}%`, margin: "0 auto" }} />
                  ))}
                </div>
                <button
                  style={{ width: "100%", padding: "12px", borderRadius: "9999px", background: "linear-gradient(135deg, #0891b2, #06b6d4)", color: "white", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "0.95rem" }}
                  onClick={() => { setProfile({ ...profile, method: "manual" }); setStep(2); }}
                >
                  Build Manually →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "2rem" }}>
              {[1, 2, 3].map((dot) => (
                <div key={dot} style={{ width: "10px", height: "10px", borderRadius: "9999px", background: dot === 1 ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.15)", border: dot !== 1 ? "1px solid rgba(255,255,255,0.2)" : "none" }} />
              ))}
            </div>
            <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.6rem", textAlign: "center" }}>Tell us about yourself</h2>
            <div className="glass-card" style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Current Level</label>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {levelOptions.map((l) => (
                      <button key={l} onClick={() => setLevel(l)} style={toggleBtnStyle(level === l)}>{l}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Domain Interest</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    style={{ ...inputStyle, appearance: "none" as const }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                  >
                    <option value="" style={{ background: "#0f0a1e" }}>Select your domain...</option>
                    {domainOptions.map((d) => <option key={d} value={d} style={{ background: "#0f0a1e" }}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Favorite Subjects</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                    {subjectOptions.map((s) => (
                      <button key={s} onClick={() => setSubjects(subjects.includes(s) ? subjects.filter((x) => x !== s) : [...subjects, s])} style={chipStyle(subjects.includes(s))}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button className="gradient-btn" style={{ width: "100%", marginTop: "2rem", justifyContent: "center" }} onClick={() => setStep(3)}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "2rem" }}>
              {[1, 2, 3].map((dot) => (
                <div key={dot} style={{ width: "10px", height: "10px", borderRadius: "9999px", background: dot === 2 ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.15)", border: dot !== 2 ? "1px solid rgba(255,255,255,0.2)" : "none" }} />
              ))}
            </div>
            <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.6rem", textAlign: "center" }}>What are your skills?</h2>
            <div className="glass-card" style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Tech Skills <span style={{ color: "#475569" }}>(press Enter to add)</span></label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", minHeight: "50px", alignItems: "center" }}>
                    {techSkills.map((s) => (
                      <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 12px", borderRadius: "9999px", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "0.82rem" }}>
                        {s}
                        <button onClick={() => removeTag(s, techSkills, setTechSkills)} style={{ background: "none", border: "none", color: "#a78bfa", cursor: "pointer", padding: 0, lineHeight: 1, fontSize: "1rem", opacity: 0.8 }}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTag(techInput, techSkills, setTechSkills, setTechInput)}
                      placeholder="Type a skill..."
                      style={{ background: "none", border: "none", outline: "none", color: "#ffffff", fontSize: "0.875rem", minWidth: "120px", fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Tools & Technologies <span style={{ color: "#475569" }}>(press Enter to add)</span></label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", minHeight: "50px", alignItems: "center" }}>
                    {tools.map((s) => (
                      <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 12px", borderRadius: "9999px", background: "rgba(6,182,212,0.2)", border: "1px solid rgba(6,182,212,0.3)", color: "#22d3ee", fontSize: "0.82rem" }}>
                        {s}
                        <button onClick={() => removeTag(s, tools, setTools)} style={{ background: "none", border: "none", color: "#22d3ee", cursor: "pointer", padding: 0, lineHeight: 1 }}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      value={toolInput}
                      onChange={(e) => setToolInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTag(toolInput, tools, setTools, setToolInput)}
                      placeholder="Type a tool..."
                      style={{ background: "none", border: "none", outline: "none", color: "#ffffff", fontSize: "0.875rem", minWidth: "120px", fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                <button className="outline-btn" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(2)}>← Back</button>
                <button className="gradient-btn" style={{ flex: 2, justifyContent: "center" }} onClick={() => setStep(4)}>Next →</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "2rem" }}>
              {[1, 2, 3].map((dot) => (
                <div key={dot} style={{ width: "10px", height: "10px", borderRadius: "9999px", background: dot === 3 ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.15)", border: dot !== 3 ? "1px solid rgba(255,255,255,0.2)" : "none" }} />
              ))}
            </div>
            <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.6rem", textAlign: "center" }}>Your goals and learning style</h2>
            <div className="glass-card" style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Short-term Goal</label>
                  <textarea
                    value={shortGoal}
                    onChange={(e) => setShortGoal(e.target.value)}
                    rows={3}
                    placeholder="e.g. Get an AI internship in 6 months"
                    style={{ ...inputStyle, resize: "none" as const, lineHeight: 1.6 }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Long-term Goal</label>
                  <textarea
                    value={longGoal}
                    onChange={(e) => setLongGoal(e.target.value)}
                    rows={2}
                    placeholder="e.g. Lead AI research at a top tech company"
                    style={{ ...inputStyle, resize: "none" as const, lineHeight: 1.6 }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Career Path Interest</label>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {careerPathOptions.map((c) => (
                      <button key={c} onClick={() => setCareerPath(c)} style={toggleBtnStyle(careerPath === c)}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Study Hours / Day</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <input
                      type="range"
                      min={1}
                      max={8}
                      step={1}
                      value={studyHours}
                      onChange={(e) => setStudyHours(Number(e.target.value))}
                      style={{ flex: 1, accentColor: "#7c3aed" }}
                    />
                    <span style={{ color: "#a78bfa", fontWeight: 600, minWidth: "80px" }}>{studyHours} hrs/day</span>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Learning Style</label>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {learningStyleOptions.map((s) => (
                      <button key={s} onClick={() => setLearningStyle(s)} style={toggleBtnStyle(learningStyle === s)}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="gradient-btn"
                style={{ width: "100%", marginTop: "2rem", justifyContent: "center", fontSize: "1.05rem", padding: "14px" }}
                onClick={handleFinish}
              >
                Build My Career Workspace →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
