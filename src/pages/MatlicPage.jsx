import MatlicChat from "../components/MatlicChat";

function MatlicPage({ darkMode }) {
  return (
    <div className="matlic-page">
      <div className="matlic-page-header">
        <h1 className="matlic-page-title">Matlic</h1>
        <p className="matlic-page-desc">
          Your personal AI math assistant. Ask anything — but expect guidance, not just answers.
        </p>
      </div>
      <MatlicChat darkMode={darkMode} />
    </div>
  );
}

export default MatlicPage;