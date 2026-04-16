import { useState } from "react";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import MatlicPage from "./pages/MatlicPage";
import KnowledgePage from "./pages/KnowledgePage";
import StudyRoomPage from "./pages/StudyRoomPage";
import ClansPage from "./pages/ClansPage";
import SubscriptionPage from "./pages/SubscriptionPage";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("project");

  // Авторизация
  const { user, loading, signInWithGoogle, logout, addXP } = useAuth();

  // Пока загружается — показываем спиннер
  if (loading) {
    return (
      <div className={`app ${darkMode ? "dark" : "light"}`}
        style={{ display: "flex", alignItems: "center",
                 justifyContent: "center", minHeight: "100vh" }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, color: "#7C3AED",
                        fontWeight: 700, letterSpacing: 3 }}>
            MATHIC
          </div>
          <div style={{ color: "#64748B", marginTop: 8, fontSize: 14 }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // Не авторизован — показываем страницу входа
  if (!user) {
    return (
      <div className={`login-page ${darkMode ? "dark" : "light"}`}>
        <LoginPage
          onLogin={signInWithGoogle}
          darkMode={darkMode}
        />
      </div>
    );
  }

  // Авторизован — показываем приложение
  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        user={user}
        onLogout={logout}
      />

      <div className="main-content">

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {currentPage === "project"      && <ProjectPage      darkMode={darkMode} user={user} addXP={addXP} />}
        {currentPage === "profile"      && <ProfilePage      darkMode={darkMode} user={user} />}
        {currentPage === "matlic"       && <MatlicPage       darkMode={darkMode} />}
        {currentPage === "knowledge"    && <KnowledgePage    darkMode={darkMode} />}
        {currentPage === "studyroom"    && <StudyRoomPage    darkMode={darkMode} />}
        {currentPage === "clans"        && <ClansPage        darkMode={darkMode} />}
        {currentPage === "subscription" && <SubscriptionPage darkMode={darkMode} />}

      </div>
    </div>
  );
}

export default App;