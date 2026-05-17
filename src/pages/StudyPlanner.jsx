import { useState } from "react";
import ReactMarkdown from "react-markdown";
import useAnthropicStream from "../hooks/useAnthropicStream";
import { PROMPTS } from "../utils/prompts";

export default function StudyPlanner() {
  const [topic, setTopic] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hours, setHours] = useState("");
  const { response, isLoading, error, sendMessage } = useAnthropicStream();

  const handleGenerate = () => {
    if (!topic.trim() || !examDate || !hours) return;
    const prompt = `Topic: ${topic}\nExam Date: ${examDate}\nDaily study hours available: ${hours}`;
    sendMessage([{ role: "user", content: prompt }], PROMPTS.studyPlanner);
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: "0.75rem 1rem",
    color: "var(--text-primary)",
    fontFamily: "Jost, sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }} className="fade-in">

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "0.4rem" }}>
          Study Planner
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Tell me your topic, exam date, and available hours — I'll build your perfect study plan.
        </p>
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="slide-in" style={{ animationDelay: "0.05s", opacity: 0 }}>
          <label style={{ color: "var(--text-secondary)", fontSize: "0.85rem", display: "block", marginBottom: "0.4rem" }}>
            Topic / Subject
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Organic Chemistry, World War II, Calculus"
            className="input-glow"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="slide-in" style={{ flex: 1, animationDelay: "0.1s", opacity: 0 }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "0.85rem", display: "block", marginBottom: "0.4rem" }}>
              Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="input-glow"
              style={{ ...inputStyle, colorScheme: "dark" }}
            />
          </div>

          <div className="slide-in" style={{ flex: 1, animationDelay: "0.15s", opacity: 0 }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "0.85rem", display: "block", marginBottom: "0.4rem" }}>
              Daily Study Hours
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. 3"
              min="1"
              max="12"
              className="input-glow"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim() || !examDate || !hours}
          className="btn-gold"
          style={{
            padding: "0.75rem 2rem",
            background: isLoading ? "transparent" : "var(--accent)",
            color: isLoading ? "var(--text-secondary)" : "#0d1b2a",
            border: "1px solid var(--border-hover)",
            borderRadius: "var(--radius-sm)",
            fontFamily: "Jost, sans-serif",
            fontWeight: "500",
            fontSize: "0.95rem",
            cursor: isLoading ? "not-allowed" : "pointer",
            alignSelf: "flex-start",
          }}
        >
          {isLoading ? "Building your plan..." : "Generate Study Plan"}
        </button>
      </div>

      {/* Loading dots */}
      {isLoading && (
        <div className="fade-in" style={{ display: "flex", gap: "6px", marginTop: "1.5rem", alignItems: "center" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="thinking-dot" style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--accent)",
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}
          <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginLeft: "8px" }}>
            Building your plan...
          </span>
        </div>
      )}

      {error && <p style={{ color: "#e05c5c", marginTop: "1rem" }}>{error}</p>}

      {/* Output */}
      {response && (
        <div className="fade-in" style={{
          marginTop: "2.5rem",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.5rem",
        }}>
          <h3 style={{
            fontSize: "1.1rem",
            color: "var(--accent)",
            marginBottom: "1.25rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid var(--border)",
          }}>
            Your Study Plan
          </h3>
          <div style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}