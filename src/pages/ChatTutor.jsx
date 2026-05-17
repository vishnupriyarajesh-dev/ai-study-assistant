import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import useAnthropicStream from "../hooks/useAnthropicStream";
import { PROMPTS } from "../utils/prompts";

export default function ChatTutor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { response, isLoading, error, sendMessage } = useAnthropicStream();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, response]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    sendMessage(newMessages, PROMPTS.chatTutor);
  };

  useEffect(() => {
    if (!isLoading && response) {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") return prev;
        return [...prev, { role: "assistant", content: response }];
      });
    }
  }, [isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", height: "90vh" }} className="fade-in">

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "0.4rem" }}>Chat Tutor</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Ask anything — I'll explain it clearly, quiz you, or break it down step by step.
        </p>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        paddingRight: "0.5rem",
        marginBottom: "1rem",
      }}>
        {messages.length === 0 && (
          <div className="fade-in" style={{
            textAlign: "center",
            marginTop: "4rem",
            color: "var(--text-secondary)",
          }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎓</p>
            <p>Ask me anything you want to learn or understand.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="msg-bubble" style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            animationDelay: `${i * 0.05}s`,
          }}>
            <div style={{
              maxWidth: "75%",
              padding: "0.85rem 1.1rem",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? "var(--accent)" : "var(--bg-secondary)",
              color: msg.role === "user" ? "#0d1b2a" : "var(--text-primary)",
              border: msg.role === "assistant" ? "1px solid var(--border)" : "none",
              fontSize: "0.92rem",
              lineHeight: 1.7,
              transition: "all 0.2s ease",
            }}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {/* Thinking dots */}
        {isLoading && !response && (
          <div className="fade-in" style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "0.85rem 1.1rem",
              borderRadius: "16px 16px 16px 4px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              display: "flex",
              gap: "6px",
              alignItems: "center",
            }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="thinking-dot" style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}

        {isLoading && response && (
          <div className="msg-bubble" style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              maxWidth: "75%",
              padding: "0.85rem 1.1rem",
              borderRadius: "16px 16px 16px 4px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              fontSize: "0.92rem",
              lineHeight: 1.7,
            }}>
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}

        {error && <p style={{ color: "#e05c5c", fontSize: "0.9rem" }}>{error}</p>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        display: "flex",
        gap: "0.75rem",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "0.75rem 1rem",
        transition: "border 0.2s ease, box-shadow 0.2s ease",
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question... (Enter to send)"
          rows={1}
          className="input-glow"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.95rem",
            resize: "none",
            lineHeight: 1.6,
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="btn-gold"
          style={{
            padding: "0.5rem 1.25rem",
            background: isLoading ? "transparent" : "var(--accent)",
            color: isLoading ? "var(--text-secondary)" : "#0d1b2a",
            border: "1px solid var(--border-hover)",
            borderRadius: "var(--radius-sm)",
            fontFamily: "Jost, sans-serif",
            fontWeight: "500",
            cursor: isLoading ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}