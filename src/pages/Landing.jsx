import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(226,184,75,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div className="fade-in" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}>
          <span style={{ color: "var(--accent)" }}>Scholar</span>
          <span style={{ color: "var(--text-primary)" }}>AI</span>
        </h1>
        <div style={{
          width: "60px",
          height: "2px",
          background: "var(--accent)",
          margin: "1rem auto",
          opacity: 0.6,
        }} />
      </div>

      {/* Tagline */}
      <div className="fade-in" style={{ animationDelay: "0.15s", opacity: 0, marginBottom: "1rem" }}>
        <p style={{
          fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
          color: "var(--text-primary)",
          fontFamily: "Bodoni Moda, serif",
          maxWidth: "600px",
          lineHeight: 1.5,
        }}>
          Your personal AI-powered study companion
        </p>
      </div>

      <div className="fade-in" style={{ animationDelay: "0.25s", opacity: 0, marginBottom: "3rem" }}>
        <p style={{
          fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
          color: "var(--text-secondary)",
          maxWidth: "500px",
          lineHeight: 1.7,
        }}>
          Chat with a tutor, generate flashcards, get quizzed, summarize notes,
          and build a study plan — all powered by AI.
        </p>
      </div>

      {/* CTA Button */}
      <div className="fade-in" style={{ animationDelay: "0.35s", opacity: 0, marginBottom: "4rem" }}>
        <button
          onClick={() => navigate("/chat")}
          className="btn-gold"
          style={{
            padding: "1rem 2.5rem",
            background: "var(--accent)",
            color: "#0d1b2a",
            border: "none",
            borderRadius: "var(--radius)",
            fontFamily: "Jost, sans-serif",
            fontWeight: "500",
            fontSize: "1rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          Start Studying →
        </button>
      </div>

      {/* Features grid */}
      <div className="fade-in" style={{
        animationDelay: "0.45s",
        opacity: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1rem",
        maxWidth: "700px",
        width: "100%",
      }}>
        {[
          { icon: "🎓", label: "Chat Tutor" },
          { icon: "🃏", label: "Flashcards" },
          { icon: "📝", label: "Quiz Mode" },
          { icon: "📄", label: "Summarizer" },
          { icon: "📅", label: "Study Planner" },
        ].map((f, i) => (
          <div
            key={i}
            onClick={() => navigate("/chat")}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1.25rem 1rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{f.icon}</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontFamily: "Jost, sans-serif" }}>
              {f.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}