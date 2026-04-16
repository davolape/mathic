function Navbar({ currentPage, setCurrentPage, darkMode }) {

  // Список пунктов меню
  const menuItems = [
    { id: "project",      label: "📐 Project"      },
    { id: "knowledge",    label: "📚 Knowledge"     },
    { id: "studyroom",    label: "👥 Study Room"    },
    { id: "clans",        label: "⚔️ Clans"         },
    { id: "profile",      label: "👤 Profile"       },
    { id: "subscription", label: "⭐ Subscription"  },
    { id: "matlic", label: "🤖 Matlic AI" },
  ];

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>

      {/* Logo */}
      <div className="navbar-logo">
        <span className="logo-text">MATHIC</span>
        <span className="logo-badge">β</span>
      </div>

      {/* Menu */}
      <ul className="navbar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-item ${currentPage === item.id ? "active" : ""}`}
              onClick={() => setCurrentPage(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default Navbar;