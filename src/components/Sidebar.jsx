import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/chat", label: "Chat Tutor", icon: "🎓" },
  { to: "/flashcards", label: "Flashcards", icon: "🃏" },
  { to: "/quiz", label: "Quiz Mode", icon: "📝" },
  { to: "/summarizer", label: "Summarizer", icon: "📄" },
  { to: "/planner", label: "Study Planner", icon: "📅" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        padding: "1rem 1.25rem",
        alignItems: "center",
        justifyContent: "space-between",
        className: "mobile-bar",
      }} id="mobile-bar">
        <h1 style={{ fontSize: "1.2rem", color: "var(--accent)" }}>
          Scholar<span style={{ color: "var(--text-primary)" }}>AI</span>
        </h1>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-primary)",
            padding: "0.4rem 0.75rem",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 98,
            display: "none",
          }}
          id="overlay"
        />
      )}

      {/* Sidebar */}
      <aside id="sidebar" className={open ? "open" : ""} style={{
        width: "240px",
        minHeight: "100vh",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "2rem 1rem",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        transition: "transform 0.3s ease",
      }}>
        <div style={{ marginBottom: "2.5rem", paddingLeft: "0.5rem" }} className="fade-in">
          <h1 style={{ fontSize: "1.4rem", color: "var(--accent)", lineHeight: 1.2 }}>
            Scholar<span style={{ color: "var(--text-primary)" }}>AI</span>
          </h1>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>
            Your AI Study Assistant
          </p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {links.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.65rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontFamily: "Jost, sans-serif",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                background: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                transition: "all 0.2s ease",
                animation: `fadeIn 0.3s ease ${i * 0.07}s forwards`,
                opacity: 0,
              })}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: "auto", paddingLeft: "0.5rem" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
            Powered by OpenRouter AI
          </p>
        </div>
      </aside>
    </>
  );
}