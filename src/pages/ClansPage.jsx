import { useState } from "react";

// ─── Interest Clans ───────────────────────────────────────────────
const INTEREST_CLANS = [
  {
    id: "linear_algebra",
    name: "Linear Algebra",
    icon: "∑",
    color: "#7C3AED",
    rank: 1,
    members: 248,
    description: "Master matrices, eigenvalues, and transformations. The foundation of ML.",
    tags: ["Matrices", "Eigenvalues", "PCA"],
    xpBoost: "+100% XP",
    badge: "🔷 Matrix Master",
    projects: 12,
    joined: false,
    test: [
      {
        question: "What is the result of multiplying a 2×3 matrix by a 3×2 matrix?",
        options: ["2×2 matrix", "3×3 matrix", "2×3 matrix", "Cannot multiply"],
        correct: 0,
      },
      {
        question: "What does the determinant of a matrix tell us?",
        options: ["The sum of all elements", "Whether the matrix is invertible", "The number of rows", "The largest eigenvalue"],
        correct: 1,
      },
      {
        question: "An eigenvector of matrix A satisfies which equation?",
        options: ["Av = 0", "Av = λv", "A + v = λ", "det(A) = v"],
        correct: 1,
      },
    ],
  },
  {
    id: "ml_engineers",
    name: "ML Engineers",
    icon: "🤖",
    color: "#06B6D4",
    rank: 2,
    members: 189,
    description: "Apply math to real ML problems. Neural nets, backprop, optimization.",
    tags: ["Neural Nets", "Backprop", "Optimization"],
    xpBoost: "+150% XP",
    badge: "⚡ ML Pioneer",
    projects: 18,
    joined: false,
    test: [
      {
        question: "What does gradient descent minimize?",
        options: ["The learning rate", "The loss function", "The number of layers", "The batch size"],
        correct: 1,
      },
      {
        question: "What is backpropagation used for?",
        options: ["Forward pass computation", "Data preprocessing", "Computing gradients for weight updates", "Normalizing inputs"],
        correct: 2,
      },
      {
        question: "Which activation function outputs values between 0 and 1?",
        options: ["ReLU", "Tanh", "Sigmoid", "Softmax"],
        correct: 2,
      },
    ],
  },
  {
    id: "statistics",
    name: "Statistics Guild",
    icon: "📊",
    color: "#EAB308",
    rank: 3,
    members: 142,
    description: "Probability, distributions, hypothesis testing. The language of data.",
    tags: ["Probability", "Distributions", "Hypothesis"],
    xpBoost: "+75% XP",
    badge: "🎯 Data Oracle",
    projects: 9,
    joined: false,
    test: [
      {
        question: "What does a p-value less than 0.05 typically indicate?",
        options: ["The null hypothesis is true", "The result is statistically significant", "The sample size is too small", "The data is normally distributed"],
        correct: 1,
      },
      {
        question: "Which distribution is described by its mean and variance?",
        options: ["Binomial", "Poisson", "Normal", "Uniform"],
        correct: 2,
      },
      {
        question: "What is the Central Limit Theorem about?",
        options: ["All data is normally distributed", "Sample means approach normal distribution as n increases", "The median equals the mean", "Variance always equals standard deviation"],
        correct: 1,
      },
    ],
  },
  {
    id: "calculus",
    name: "Calculus Crew",
    icon: "∫",
    color: "#F97316",
    rank: 4,
    members: 98,
    description: "Derivatives, integrals, limits. The math behind everything that changes.",
    tags: ["Derivatives", "Integrals", "Series"],
    xpBoost: "+75% XP",
    badge: "∞ Infinite Mind",
    projects: 8,
    joined: false,
    test: [
      {
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²/2", "2"],
        correct: 1,
      },
      {
        question: "What does the integral represent geometrically?",
        options: ["The slope at a point", "The maximum value", "The area under the curve", "The function's period"],
        correct: 2,
      },
      {
        question: "What is the chain rule used for?",
        options: ["Integrating composite functions", "Differentiating composite functions", "Finding limits", "Solving differential equations"],
        correct: 1,
      },
    ],
  },
];

// ─── Community Clan типы ──────────────────────────────────────────
const COMMUNITY_TYPES = [
  { id: "city",       icon: "🌍", label: "City",        placeholder: "e.g. Tashkent, Berlin, Lagos",    color: "#7C3AED" },
  { id: "country",    icon: "🌐", label: "Country",     placeholder: "e.g. Uzbekistan, Germany, Nigeria", color: "#06B6D4" },
  { id: "university", icon: "🎓", label: "University",  placeholder: "e.g. TUIT, MIT, Oxford",           color: "#EAB308" },
  { id: "class",      icon: "📚", label: "Class/Group", placeholder: "e.g. CS-21, Group 304",            color: "#86efac" },
  { id: "workplace",  icon: "🏢", label: "Workplace",   placeholder: "e.g. Yandex, Uzum, Google",       color: "#F97316" },
];

// ─── Пример существующих community кланов ────────────────────────
const EXAMPLE_COMMUNITY = [
  { id: "tashkent",  type: "city",       icon: "🌍", name: "Tashkent Math Club",   color: "#7C3AED", members: 34,  joined: false },
  { id: "uzbekistan",type: "country",    icon: "🌐", name: "Uzbekistan",           color: "#06B6D4", members: 156, joined: false },
  { id: "tuit",      type: "university", icon: "🎓", name: "TUIT",                 color: "#EAB308", members: 67,  joined: false },
  { id: "cs21",      type: "class",      icon: "📚", name: "CS-21 Group",          color: "#86efac", members: 28,  joined: false },
];

// ─── Главный компонент ────────────────────────────────────────────
function ClansPage({ darkMode }) {
  // Активная вкладка
  const [activeTab, setActiveTab] = useState("interest");

  // Состояние interest кланов
  const [interestClans, setInterestClans] = useState(INTEREST_CLANS);

  // Состояние community кланов
  const [communityClans, setCommunityClans] = useState(EXAMPLE_COMMUNITY);

  // Тест для вступления
  const [testClan, setTestClan] = useState(null);

  // Модальное окно создания community клана
  const [showCreate, setShowCreate] = useState(false);

  // Вступить в interest клан (после теста)
  function handleJoinInterest(clanId) {
    setInterestClans((prev) =>
      prev.map((c) => (c.id === clanId ? { ...c, joined: true } : c))
    );
    setTestClan(null);
  }

  // Вступить в community клан (без теста)
  function handleJoinCommunity(clanId) {
    setCommunityClans((prev) =>
      prev.map((c) => (c.id === clanId ? { ...c, joined: true } : c))
    );
  }

  // Создать новый community клан
  function handleCreateClan(newClan) {
    setCommunityClans((prev) => [...prev, newClan]);
    setShowCreate(false);
  }

  // Мои кланы
  const myInterest   = interestClans.find((c) => c.joined);
  const myCommunity  = communityClans.filter((c) => c.joined);

  return (
    <div className="clans-page">

      {/* Заголовок */}
      <div className="clans-header">
        <h1 className="clans-title">Clans</h1>
        <p className="clans-desc">
          Join by interest or find your community. Unlock exclusive projects and rewards.
        </p>
      </div>

      {/* Мои кланы */}
      {(myInterest || myCommunity.length > 0) && (
        <div className="my-clans-row">
          <div className="my-clans-label">Your Clans</div>
          <div className="my-clans-list">
            {myInterest && (
              <div
                className="my-clan-chip"
                style={{ borderColor: myInterest.color, color: myInterest.color }}
              >
                {myInterest.icon} {myInterest.name}
                <span className="chip-boost">{myInterest.xpBoost}</span>
              </div>
            )}
            {myCommunity.map((c) => (
              <div
                key={c.id}
                className="my-clan-chip"
                style={{ borderColor: c.color, color: c.color }}
              >
                {c.icon} {c.name}
                <span className="chip-members">{c.members} members</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Вкладки */}
      <div className="clans-tabs">
        <button
          className={`clan-tab ${activeTab === "interest" ? "clan-tab-active" : ""}`}
          onClick={() => setActiveTab("interest")}
        >
          🧠 Interest Clans
        </button>
        <button
          className={`clan-tab ${activeTab === "community" ? "clan-tab-active" : ""}`}
          onClick={() => setActiveTab("community")}
        >
          🌍 Community Clans
        </button>
      </div>

      {/* ── Interest Clans ── */}
      {activeTab === "interest" && (
        <div className="clans-grid">
          {interestClans.map((clan) => (
            <InterestClanCard
              key={clan.id}
              clan={clan}
              onJoin={() => setTestClan(clan)}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}

      {/* ── Community Clans ── */}
      {activeTab === "community" && (
        <div className="community-section">

          {/* Типы community кланов */}
          <div className="community-types">
            {COMMUNITY_TYPES.map((type) => (
              <div
                key={type.id}
                className="community-type-chip"
                style={{ borderColor: type.color + "44", color: type.color }}
              >
                {type.icon} {type.label}
              </div>
            ))}
          </div>

          {/* Кнопка создать */}
          <div className="community-actions">
            <button
              className="create-clan-btn"
              onClick={() => setShowCreate(true)}
            >
              + Create Community Clan
            </button>
          </div>

          {/* Список community кланов */}
          <div className="community-grid">
            {communityClans.map((clan) => (
              <CommunityClanCard
                key={clan.id}
                clan={clan}
                onJoin={() => handleJoinCommunity(clan.id)}
                darkMode={darkMode}
              />
            ))}
          </div>

        </div>
      )}

      {/* Модальное окно теста */}
      {testClan && (
        <ClanTest
          clan={testClan}
          onPass={() => handleJoinInterest(testClan.id)}
          onClose={() => setTestClan(null)}
          darkMode={darkMode}
        />
      )}

      {/* Модальное окно создания */}
      {showCreate && (
        <CreateClanModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreateClan}
          darkMode={darkMode}
        />
      )}

    </div>
  );
}

// ─── Карточка Interest клана ──────────────────────────────────────
function InterestClanCard({ clan, onJoin }) {
  return (
    <div
      className={`clan-card ${clan.joined ? "clan-joined" : ""}`}
      style={{ borderColor: clan.joined ? clan.color : undefined }}
    >
      <div className="clan-rank">#{clan.rank}</div>

      <div className="clan-top">
        <div className="clan-icon" style={{ background: clan.color + "22", color: clan.color }}>
          {clan.icon}
        </div>
        <div>
          <div className="clan-name" style={{ color: clan.color }}>{clan.name}</div>
          <div className="clan-members">{clan.members} members</div>
        </div>
      </div>

      <p className="clan-desc">{clan.description}</p>

      <div className="clan-tags">
        {clan.tags.map((tag) => (
          <span key={tag} className="clan-tag" style={{ background: clan.color + "22", color: clan.color }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="clan-perks">
        <div className="clan-perk"><span>⚡</span> {clan.xpBoost}</div>
        <div className="clan-perk"><span>🏆</span> {clan.badge}</div>
        <div className="clan-perk"><span>📐</span> {clan.projects} exclusive projects</div>
      </div>

      {clan.joined ? (
        <div className="clan-joined-badge">✓ Member</div>
      ) : (
        <button
          className="clan-join-btn"
          style={{ borderColor: clan.color, color: clan.color }}
          onClick={onJoin}
        >
          Join — Take Test →
        </button>
      )}
    </div>
  );
}

// ─── Карточка Community клана ─────────────────────────────────────
function CommunityClanCard({ clan, onJoin }) {
  return (
    <div
      className={`community-card ${clan.joined ? "clan-joined" : ""}`}
      style={{ borderColor: clan.joined ? clan.color : undefined }}
    >
      <div className="community-card-left">
        <div className="community-icon" style={{ background: clan.color + "22", color: clan.color }}>
          {clan.icon}
        </div>
        <div>
          <div className="community-name">{clan.name}</div>
          <div className="clan-members">{clan.members} members</div>
        </div>
      </div>

      {clan.joined ? (
        <div className="clan-joined-badge">✓ Joined</div>
      ) : (
        <button
          className="community-join-btn"
          style={{ borderColor: clan.color, color: clan.color }}
          onClick={onJoin}
        >
          Join →
        </button>
      )}
    </div>
  );
}

// ─── Создание нового community клана ─────────────────────────────
function CreateClanModal({ onClose, onCreate, darkMode }) {
  const [selectedType, setSelectedType] = useState(null);
  const [name, setName] = useState("");

  function handleCreate() {
    if (!selectedType || !name.trim()) return;
    const type = COMMUNITY_TYPES.find((t) => t.id === selectedType);
    onCreate({
      id: Date.now().toString(),
      type: selectedType,
      icon: type.icon,
      name: name.trim(),
      color: type.color,
      members: 1,
      joined: true,
    });
  }

  const selectedTypeObj = COMMUNITY_TYPES.find((t) => t.id === selectedType);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-box ${darkMode ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 480 }}
      >
        <div className="modal-header">
          <h2 className="modal-title">Create Community Clan</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Выбор типа */}
        <div className="create-section-label">Choose type</div>
        <div className="create-types-grid">
          {COMMUNITY_TYPES.map((type) => (
            <button
              key={type.id}
              className={`create-type-btn ${selectedType === type.id ? "create-type-active" : ""}`}
              style={{
                borderColor: selectedType === type.id ? type.color : undefined,
                color: selectedType === type.id ? type.color : undefined,
              }}
              onClick={() => {
                setSelectedType(type.id);
                setName("");
              }}
            >
              <span style={{ fontSize: 20 }}>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        {/* Поле ввода названия */}
        {selectedType && (
          <>
            <div className="create-section-label">
              {selectedTypeObj.label} name
            </div>
            <input
              className="create-input"
              placeholder={selectedTypeObj.placeholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </>
        )}

        <button
          className="get-hint-btn"
          style={{
            background: !selectedType || !name.trim() ? "#2D2D50" : "#7C3AED",
          }}
          disabled={!selectedType || !name.trim()}
          onClick={handleCreate}
        >
          Create Clan →
        </button>

      </div>
    </div>
  );
}

// ─── Тест для вступления ──────────────────────────────────────────
function ClanTest({ clan, onPass, onClose, darkMode }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const question = clan.test[currentQ];
  const totalQ = clan.test.length;

  function handleAnswer(i) {
    setAnswers((prev) => ({ ...prev, [currentQ]: i }));
  }

  function handleNext() {
    if (currentQ < totalQ - 1) setCurrentQ((p) => p + 1);
    else setSubmitted(true);
  }

  const correctCount = clan.test.filter((q, i) => answers[i] === q.correct).length;
  const passed = correctCount >= 2;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-box ${darkMode ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 520 }}
      >
        <div className="modal-header">
          <div>
            <div className="test-clan-name" style={{ color: clan.color }}>
              {clan.icon} {clan.name}
            </div>
            <h2 className="modal-title">Entry Test</h2>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {!submitted ? (
          <>
            <div className="test-progress">
              {clan.test.map((_, i) => (
                <div
                  key={i}
                  className={`test-dot ${i < currentQ ? "test-dot-done" : i === currentQ ? "test-dot-active" : ""}`}
                  style={{ background: i <= currentQ ? clan.color : undefined }}
                />
              ))}
              <span className="test-progress-text">{currentQ + 1} / {totalQ}</span>
            </div>

            <div className="test-question">{question.question}</div>

            <div className="test-options">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  className={`test-option ${answers[currentQ] === i ? "test-option-selected" : ""}`}
                  style={{
                    borderColor: answers[currentQ] === i ? clan.color : undefined,
                    background: answers[currentQ] === i ? clan.color + "22" : undefined,
                  }}
                  onClick={() => handleAnswer(i)}
                >
                  <span className="option-letter">{["A", "B", "C", "D"][i]}</span>
                  {option}
                </button>
              ))}
            </div>

            <button
              className="get-hint-btn"
              style={{ background: answers[currentQ] === undefined ? "#2D2D50" : clan.color }}
              disabled={answers[currentQ] === undefined}
              onClick={handleNext}
            >
              {currentQ < totalQ - 1 ? "Next →" : "Submit Test"}
            </button>
          </>
        ) : (
          <div className="test-result">
            <div className="result-score">
              <span className="score-number" style={{ color: passed ? "#86efac" : "#f87171" }}>
                {correctCount}/{totalQ}
              </span>
              <span className="score-label">correct answers</span>
            </div>

            {passed ? (
              <>
                <div className="result-pass">🎉 You passed! Welcome to {clan.name}!</div>
                <div className="result-perks">
                  <div className="perk-unlock">⚡ {clan.xpBoost} activated</div>
                  <div className="perk-unlock">{clan.badge} badge unlocked</div>
                  <div className="perk-unlock">📐 {clan.projects} exclusive projects unlocked</div>
                </div>
                <button className="get-hint-btn" style={{ background: clan.color }} onClick={onPass}>
                  Enter {clan.name} →
                </button>
              </>
            ) : (
              <>
                <div className="result-fail">Need 2/3 to pass. Review the material and try again!</div>
                <button className="get-hint-btn" onClick={onClose}>Try Again Later</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClansPage;