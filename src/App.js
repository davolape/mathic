import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProjectPage from "./pages/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import MatlicPage from "./pages/MatlicPage";
import KnowledgePage from "./pages/KnowledgePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import StudyRoomPage from "./pages/StudyRoomPage";
import ClansPage from "./pages/ClansPage";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("project");

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
      />

      <div className="main-content">

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Показываем нужную страницу */}
        {currentPage === "project"      && <ProjectPage   darkMode={darkMode} />}
        {currentPage === "profile"      && <ProfilePage   darkMode={darkMode} />}
        {currentPage === "matlic"       && <MatlicPage     darkMode={darkMode} />}
        {currentPage === "knowledge"    && <KnowledgePage  darkMode={darkMode} />}
        {currentPage === "subscription" && <SubscriptionPage darkMode={darkMode} />}
        {currentPage === "studyroom"    && <StudyRoomPage darkMode={darkMode} />}
        {currentPage === "clans"        && <ClansPage darkMode={darkMode} />}
      </div>

    </div>
  );
}

export default App;