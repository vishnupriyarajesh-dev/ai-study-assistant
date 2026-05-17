import { useState } from "react";
import ReactMarkdown from "react-markdown";
import useAnthropicStream from "../hooks/useAnthropicStream";
import { PROMPTS } from "../utils/prompts";

export default function Summarizer() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const { response, isLoading, error, sendMessage } = useAnthropicStream();

  const handleSummarize = () => {
    if (!input.trim()) return;
    sendMessage([{ role: "user", content: input }], PROMPTS.summarizer);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }} className="fade-in">

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "0.4rem" }}>
          Summarizer
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Paste any text — lecture notes, articles, chapters — and get clean study notes instantly.
        </p>
      </div>

      {/* Input Area */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your text here..."
        rows={8}
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
          transition: "border 0.2s ease, box-shadow 0.2s ease",
        }}
      />

      {/* Button */}
      <button
        onClick={handleSummarize}
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
        {isLoading ? "Summarizing..." : "Generate Study Notes"}
      </button>

      {/* Loading dots */}
      {isLoading && (
        <div style={{ display: "flex", gap: "6px", marginTop: "1.5rem", alignItems: "center" }}>
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
            Generating notes...
          </span>
        </div>
      )}

      {error && (
        <p style={{ color: "#e05c5c", marginTop: "1rem", fontSize: "0.9rem" }}>{error}</p>
      )}

      {/* Output */}
      {response && (
        <div className="fade-in" style={{
          marginTop: "2rem",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.5rem",
        }}>
          {/* Output Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid var(--border)",
          }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--accent)" }}>Study Notes</h3>
            <button
              onClick={handleCopy}
              className="btn-gold"
              style={{
                padding: "0.4rem 1rem",
                background: copied ? "var(--accent)" : "transparent",
                border: "1px solid var(--border-hover)",
                borderRadius: "var(--radius-sm)",
                color: copied ? "#0d1b2a" : "var(--text-secondary)",
                fontFamily: "Jost, sans-serif",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Markdown Output */}
          <div style={{
            color: "var(--text-primary)",
            lineHeight: 1.8,
            fontSize: "0.95rem",
          }}>
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}