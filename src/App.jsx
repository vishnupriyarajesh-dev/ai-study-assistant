import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatTutor from "./pages/ChatTutor";
import Flashcards from "./pages/Flashcards";
import QuizMode from "./pages/QuizMode";
import Summarizer from "./pages/Summarizer";
import StudyPlanner from "./pages/StudyPlanner";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{
          marginLeft: "240px",
          flex: 1,
          minHeight: "100vh",
          padding: "2.5rem",
          background: "var(--bg-primary)",
        }}>
          <Routes>
            <Route path="/" element={<ChatTutor />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quiz" element={<QuizMode />} />
            <Route path="/summarizer" element={<Summarizer />} />
            <Route path="/planner" element={<StudyPlanner />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}