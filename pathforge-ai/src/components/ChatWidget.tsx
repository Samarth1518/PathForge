import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot } from "lucide-react";
import { initialChatMessages, chatResponseMap, offTopicResponse } from "../data/mockData";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "Should I focus on DSA or AI first?",
  "Can I get an ML role without internships?",
  "What skills should I prioritize?",
  "Am I on track for my 6-month goal?",
];

function getSmartResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of chatResponseMap) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return offTopicResponse;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>(initialChatMessages as Message[]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;

    const userMsg: Message = { id: Date.now(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getSmartResponse(content),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900 + Math.random() * 500);
  };

  return (
    <div className="glass-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <MessageCircle size={20} color="#a78bfa" />
        <span style={{ color: "#ffffff", fontWeight: 600 }}>AI Career Advisor</span>
        <span
          style={{
            fontSize: "0.7rem",
            padding: "2px 10px",
            borderRadius: "9999px",
            background: "rgba(6,182,212,0.15)",
            color: "#22d3ee",
            border: "1px solid rgba(6,182,212,0.3)",
            marginLeft: "auto",
            fontWeight: 500,
          }}
        >
          Powered by LLaMA 3.2
        </span>
      </div>

      <div
        ref={messagesContainerRef}
        className="custom-scrollbar"
        style={{ height: "320px", overflowY: "auto", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem", paddingRight: "4px" }}
      >
        {messages.length === 0 && !isTyping && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: "10px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={22} color="white" />
            </div>
            <p style={{ color: "#64748b", fontSize: "0.85rem", textAlign: "center" }}>Ask me anything about your AI/ML career path!</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: "flex", alignItems: "flex-start", gap: "10px", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
            {msg.role === "assistant" && (
              <div
                style={{
                  width: "32px", height: "32px", borderRadius: "9999px",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <Bot size={14} color="white" />
              </div>
            )}
            <div
              style={{
                maxWidth: "75%",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.role === "user" ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.06)",
                border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                color: "#e2e8f0",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9999px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Bot size={14} color="white" />
            </div>
            <div style={{ padding: "10px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "5px", alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "1rem" }}>
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "9999px",
              padding: "6px 12px",
              color: "#cbd5e1",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(124,58,237,0.5)";
              el.style.color = "#a78bfa";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "#cbd5e1";
            }}
          >
            {q}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask anything about your career..."
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "10px 16px",
            color: "#ffffff",
            fontSize: "0.875rem",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)")}
          onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
        />
        <button
          onClick={() => sendMessage()}
          className="gradient-btn"
          style={{ width: "48px", height: "48px", padding: 0, borderRadius: "12px", justifyContent: "center" }}
        >
          <Send size={18} color="white" />
        </button>
      </div>
    </div>
  );
}
