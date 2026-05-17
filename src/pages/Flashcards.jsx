import { useState } from "react";
import useAnthropicStream from "../hooks/useAnthropicStream";
import { PROMPTS } from "../utils/prompts";

export default function Flashcards() {
  const [input, setInput] = useState("");
  const [flipped, setFlipped] = useState({});
  const [current, setCurrent] = useState(0);
  const { response, isLoading, error, sendMessage } = useAnthropicStream();

  const parseCards = (text) => {
    try {
      const clean = text.replace(/```json|```/g, "").trim();
      return JSON.parse(clean);
    } catch {
      return [];
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setFlipped({});
    setCurrent(0);
    await sendMessage([{ role: "user", content: input }], PROMPTS.flashcards);
  };

  const handleFlip = (i) => {
    setFlipped((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const parsed = response ? parseCards(response) : [];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }} className="fade-in">

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "0.4rem" }}>
          Flashcards
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Paste your notes and get a full flashcard deck instantly.
        </p>
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your notes or topic here..."
        rows={6}
        className="input-glow"
        style={{
          width: "100%",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1rem 1.25rem",
          color: "var(--text-primary)",
          fontFamily: "Jost, sans-serif",
          fontSize: "0.95rem",
          resize: "vertical",
          outline: "none",
          lineHeight: 1.7,
          transition: "border 0.2s ease",
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={isLoading || !input.trim()}
        className="btn-gold"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 2rem",
          background: isLoading ? "transparent" : "var(--accent)",
          color: isLoading ? "var(--text-secondary)" : "#0d1b2a",
          border: "1px solid var(--border-hover)",
          borderRadius: "var(--radius-sm)",
          fontFamily: "Jost, sans-serif",
          fontWeight: "500",
          fontSize: "0.95rem",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Generating..." : "Generate Flashcards"}
      </button>

      {error && <p style={{ color: "#e05c5c", marginTop: "1rem" }}>{error}</p>}

      {/* Cards */}
      {parsed.length > 0 && (
        <div style={{ marginTop: "2.5rem" }} className="fade-in">

          {/* Progress */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Card {current + 1} of {parsed.length}
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => { setCurrent((p) => Math.max(0, p - 1)); setFlipped({}); }}
                disabled={current === 0}
                className="btn-gold"
                style={{
                  padding: "0.4rem 1rem",
                  background: "transparent",
                  border: "1px solid var(--border-hover)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-secondary)",
                  fontFamily: "Jost, sans-serif",
                  cursor: current === 0 ? "not-allowed" : "pointer",
                }}
              >← Prev</button>
              <button
                onClick={() => { setCurrent((p) => Math.min(parsed.length - 1, p + 1)); setFlipped({}); }}
                disabled={current === parsed.length - 1}
                className="btn-gold"
                style={{
                  padding: "0.4rem 1rem",
                  background: "transparent",
                  border: "1px solid var(--border-hover)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-secondary)",
                  fontFamily: "Jost, sans-serif",
                  cursor: current === parsed.length - 1 ? "not-allowed" : "pointer",
                }}
              >Next →</button>
            </div>
          </div>

          {/* 3D Flip Card */}
          <div className="card-scene" onClick={() => handleFlip(current)}>
            <div className={`card-inner ${flipped[current] ? "flipped" : ""}`}>

              {/* Front */}
              <div className="card-face card-front">
                <p style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                }}>Question</p>
                <p style={{
                  fontSize: "1.2rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.6,
                  fontFamily: "Bodoni Moda, serif",
                }}>
                  {parsed[current]?.question}
                </p>
                <p style={{
                  marginTop: "1.5rem",
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                }}>Click to flip</p>
              </div>

              {/* Back */}
              <div className="card-face card-back">
                <p style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#0d1b2a99",
                  marginBottom: "1rem",
                }}>Answer</p>
                <p style={{
                  fontSize: "1.2rem",
                  color: "#0d1b2a",
                  lineHeight: 1.6,
                  fontFamily: "Bodoni Moda, serif",
                }}>
                  {parsed[current]?.answer}
                </p>
                <p style={{
                  marginTop: "1.5rem",
                  fontSize: "0.78rem",
                  color: "#0d1b2a77",
                }}>Click to flip back</p>
              </div>
            </div>
          </div>

          {/* All cards grid */}
          <div style={{ marginTop: "2rem" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>All Cards</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}>
              {parsed.map((card, i) => (
                <div
                  key={i}
                  onClick={() => { setCurrent(i); setFlipped({}); }}
                  className="msg-bubble"
                  style={{
                    background: i === current ? "rgba(226,184,75,0.1)" : "var(--bg-secondary)",
                    border: `1px solid ${i === current ? "var(--border-hover)" : "var(--border)"}`,
                    borderRadius: "var(--radius-sm)",
                    padding: "0.75rem",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                    transition: "all 0.2s ease",
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {card.question}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {response && parsed.length === 0 && !isLoading && (
        <p style={{ color: "#e05c5c", marginTop: "1rem" }}>Could not parse flashcards. Try again.</p>
      )}
    </div>
  );
}