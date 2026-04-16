import { useState } from "react";

// ─── Данные: все навыки и зависимости ───────────────────────────
const SKILLS = [
  // ── Matrices ──
  {
    id: "mat_basics",
    label: "Matrix\nBasics",
    topic: "Matrices",
    color: "#7C3AED",
    status: "done",
    x: 120, y: 60,
    description: "Understand what a matrix is, rows, columns, dimensions.",
    tasks: 3, tasksDone: 3,
    requires: [],
  },
  {
    id: "mat_add",
    label: "Matrix\nAddition",
    topic: "Matrices",
    color: "#7C3AED",
    status: "done",
    x: 280, y: 60,
    description: "Add and subtract matrices of the same dimensions.",
    tasks: 3, tasksDone: 3,
    requires: ["mat_basics"],
  },
  {
    id: "mat_mul",
    label: "Matrix\nMultiply",
    topic: "Matrices",
    color: "#7C3AED",
    status: "done",
    x: 440, y: 60,
    description: "Multiply matrices using dot product of rows and columns.",
    tasks: 4, tasksDone: 4,
    requires: ["mat_add"],
  },
  {
    id: "mat_transpose",
    label: "Transpose",
    topic: "Matrices",
    color: "#7C3AED",
    status: "done",
    x: 280, y: 180,
    description: "Flip a matrix along its diagonal. Rows become columns.",
    tasks: 2, tasksDone: 2,
    requires: ["mat_basics"],
  },
  {
    id: "mat_det",
    label: "Determinant",
    topic: "Matrices",
    color: "#7C3AED",
    status: "active",
    x: 440, y: 180,
    description: "Calculate the determinant of a 2×2 and 3×3 matrix.",
    tasks: 4, tasksDone: 2,
    requires: ["mat_mul", "mat_transpose"],
  },
  {
    id: "mat_inv",
    label: "Inverse\nMatrix",
    topic: "Matrices",
    color: "#7C3AED",
    status: "locked",
    x: 600, y: 180,
    description: "Find the inverse of a matrix. Understand when it exists.",
    tasks: 4, tasksDone: 0,
    requires: ["mat_det"],
  },

  // ── Eigenvalues ──
  {
    id: "eig_intro",
    label: "Eigen\nIntro",
    topic: "Eigenvalues",
    color: "#EAB308",
    status: "locked",
    x: 120, y: 320,
    description: "What are eigenvalues and eigenvectors? Geometric intuition.",
    tasks: 3, tasksDone: 0,
    requires: ["mat_mul"],
  },
  {
    id: "eig_char",
    label: "Char.\nEquation",
    topic: "Eigenvalues",
    color: "#EAB308",
    status: "locked",
    x: 280, y: 320,
    description: "Solve det(A - λI) = 0 to find eigenvalues.",
    tasks: 4, tasksDone: 0,
    requires: ["eig_intro", "mat_det"],
  },
  {
    id: "eig_vec",
    label: "Eigen\nVectors",
    topic: "Eigenvalues",
    color: "#EAB308",
    status: "locked",
    x: 440, y: 320,
    description: "Find eigenvectors by solving (A - λI)v = 0.",
    tasks: 4, tasksDone: 0,
    requires: ["eig_char"],
  },
  {
    id: "eig_diag",
    label: "Diagonal-\nization",
    topic: "Eigenvalues",
    color: "#EAB308",
    status: "locked",
    x: 600, y: 320,
    description: "Decompose A = PDP⁻¹. Understand when it's possible.",
    tasks: 3, tasksDone: 0,
    requires: ["eig_vec", "mat_inv"],
  },

  // ── PCA ──
  {
    id: "pca_variance",
    label: "Variance &\nCovariance",
    topic: "PCA",
    color: "#06B6D4",
    status: "locked",
    x: 120, y: 460,
    description: "Understand variance and covariance matrix computation.",
    tasks: 3, tasksDone: 0,
    requires: ["mat_transpose"],
  },
  {
    id: "pca_cov",
    label: "Covariance\nMatrix",
    topic: "PCA",
    color: "#06B6D4",
    status: "locked",
    x: 280, y: 460,
    description: "Build and interpret a covariance matrix from data.",
    tasks: 3, tasksDone: 0,
    requires: ["pca_variance", "mat_mul"],
  },
  {
    id: "pca_eigen",
    label: "Eigen-\ndecompose",
    topic: "PCA",
    color: "#06B6D4",
    status: "locked",
    x: 440, y: 460,
    description: "Apply eigendecomposition to the covariance matrix.",
    tasks: 3, tasksDone: 0,
    requires: ["pca_cov", "eig_diag"],
  },
  {
    id: "pca_final",
    label: "PCA\nProject",
    topic: "PCA",
    color: "#06B6D4",
    status: "locked",
    x: 600, y: 460,
    description: "Project data onto principal components. Reduce dimensions.",
    tasks: 4, tasksDone: 0,
    requires: ["pca_eigen"],
  },
];

// Строим список рёбер из requires
const EDGES = [];
SKILLS.forEach((skill) => {
  skill.requires.forEach((reqId) => {
    EDGES.push({ from: reqId, to: skill.id });
  });
});

// Радиус узла
const R = 38;

// ─── Главный компонент ───────────────────────────────────────────
function KnowledgePage({ darkMode }) {
  // Выбранный навык (для панели деталей)
  const [selected, setSelected] = useState(null);

  // Находим объект выбранного навыка
  const selectedSkill = SKILLS.find((s) => s.id === selected);

  // Считаем общий прогресс
  const totalTasks = SKILLS.reduce((sum, s) => sum + s.tasks, 0);
  const doneTasks = SKILLS.reduce((sum, s) => sum + s.tasksDone, 0);
  const overallPercent = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="dna-page">

      {/* Заголовок */}
      <div className="dna-header">
        <div>
          <h1 className="knowledge-title">Knowledge DNA</h1>
          <p className="knowledge-desc">
            {SKILLS.length} skills · {overallPercent}% complete ·
            Click any node to see details
          </p>
        </div>

        {/* Легенда */}
        <div className="dna-legend">
          <span className="legend-item">
            <span className="legend-dot dot-done" /> Completed
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-active" /> In progress
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-locked" /> Locked
          </span>
        </div>
      </div>

      {/* Основная область: граф + панель деталей */}
      <div className="dna-main">

        {/* SVG граф */}
        <div className="dna-graph-wrap">
          <svg
            viewBox="0 0 720 560"
            width="100%"
            style={{ overflow: "visible" }}
          >
            <defs>
              {/* Стрелка для активных связей */}
              <marker
                id="arr-active"
                viewBox="0 0 10 10"
                refX="8" refY="5"
                markerWidth="5" markerHeight="5"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1L8 5L2 9"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </marker>

              {/* Стрелка для заблокированных связей */}
              <marker
                id="arr-locked"
                viewBox="0 0 10 10"
                refX="8" refY="5"
                markerWidth="5" markerHeight="5"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1L8 5L2 9"
                  fill="none"
                  stroke="#2D2D50"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </marker>
            </defs>

            {/* Рисуем рёбра (связи между навыками) */}
            {EDGES.map((edge, i) => {
              const from = SKILLS.find((s) => s.id === edge.from);
              const to = SKILLS.find((s) => s.id === edge.to);
              if (!from || !to) return null;

              // Вычисляем точки начала и конца линии
              // чтобы линия начиналась/заканчивалась на краю круга
              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const x1 = from.x + (dx / dist) * R;
              const y1 = from.y + (dy / dist) * R;
              const x2 = to.x - (dx / dist) * R;
              const y2 = to.y - (dy / dist) * R;

              // Цвет линии зависит от статуса начального узла
              const isActive = from.status === "done" || from.status === "active";

              return (
                <line
                  key={i}
                  x1={x1} y1={y1}
                  x2={x2} y2={y2}
                  stroke={isActive ? "#7C3AED" : "#2D2D50"}
                  strokeWidth={isActive ? 2 : 1.5}
                  strokeDasharray={isActive ? "none" : "5 3"}
                  markerEnd={
                    isActive ? "url(#arr-active)" : "url(#arr-locked)"
                  }
                  opacity={isActive ? 0.7 : 0.4}
                />
              );
            })}

            {/* Рисуем узлы (навыки) */}
            {SKILLS.map((skill) => (
              <SkillNode
                key={skill.id}
                skill={skill}
                isSelected={selected === skill.id}
                onClick={() =>
                  setSelected(selected === skill.id ? null : skill.id)
                }
              />
            ))}
          </svg>
        </div>

        {/* Панель деталей */}
        {selectedSkill && (
          <SkillDetail
            skill={selectedSkill}
            onClose={() => setSelected(null)}
            darkMode={darkMode}
          />
        )}

      </div>
    </div>
  );
}

// ─── Компонент: один узел графа ──────────────────────────────────
function SkillNode({ skill, isSelected, onClick }) {
  // Цвет обводки зависит от статуса
  const strokeColor =
    skill.status === "done"   ? skill.color :
    skill.status === "active" ? skill.color :
    "#2D2D50";

  const strokeWidth = isSelected ? 3 : skill.status === "active" ? 2.5 : 1.5;

  // Цвет фона
  const fillColor =
    skill.status === "done"   ? "#1f1040" :
    skill.status === "active" ? "#231535" :
    "#0d0d1a";

  // Разбиваем label на строки (по \n)
  const lines = skill.label.split("\n");

  // Прогресс для дуги (только для active)
  const progress = skill.tasks > 0
    ? skill.tasksDone / skill.tasks
    : 0;
  const circumference = 2 * Math.PI * R;
  const dashOffset = circumference * (1 - progress);

  return (
    <g
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Фоновый круг */}
      <circle
        cx={skill.x}
        cy={skill.y}
        r={R}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={skill.status === "locked" ? "5 3" : "none"}
        opacity={skill.status === "locked" ? 0.6 : 1}
      />

      {/* Дуга прогресса для active навыков */}
      {skill.status === "active" && (
        <circle
          cx={skill.x}
          cy={skill.y}
          r={R}
          fill="none"
          stroke={skill.color}
          strokeWidth={3}
          strokeDasharray={`${circumference * progress} ${circumference * (1 - progress)}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          transform={`rotate(-90 ${skill.x} ${skill.y})`}
          opacity={0.9}
        />
      )}

      {/* Галочка для done */}
      {skill.status === "done" && (
        <text
          x={skill.x}
          y={skill.y - 14}
          textAnchor="middle"
          fontSize="13"
          fill="#86efac"
          fontFamily="Inter, sans-serif"
        >
          ✓
        </text>
      )}

      {/* Замок для locked */}
      {skill.status === "locked" && (
        <text
          x={skill.x}
          y={skill.y - 12}
          textAnchor="middle"
          fontSize="14"
          fill="#4A4A7A"
          fontFamily="Inter, sans-serif"
        >
          🔒
        </text>
      )}

      {/* Текст навыка */}
      {lines.map((line, i) => (
        <text
          key={i}
          x={skill.x}
          y={
            skill.status === "locked"
              ? skill.y + 6 + i * 14
              : skill.status === "done"
              ? skill.y + 2 + i * 14
              : skill.y + 4 + i * 14
          }
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
          fill={
            skill.status === "locked" ? "#4A4A7A" :
            skill.status === "done"   ? "#c4b5fd" :
            skill.color
          }
        >
          {line}
        </text>
      ))}

      {/* Подсветка при выборе */}
      {isSelected && (
        <circle
          cx={skill.x}
          cy={skill.y}
          r={R + 6}
          fill="none"
          stroke={skill.color}
          strokeWidth={2}
          opacity={0.4}
        />
      )}
    </g>
  );
}

// ─── Компонент: панель деталей навыка ────────────────────────────
function SkillDetail({ skill, onClose, darkMode }) {
  const percent = skill.tasks > 0
    ? Math.round((skill.tasksDone / skill.tasks) * 100)
    : 0;

  // Находим навыки которые требуются для разблокировки
  const requiredSkills = SKILLS.filter((s) =>
    skill.requires.includes(s.id)
  );

  return (
    <div className={`skill-detail ${darkMode ? "dark" : "light"}`}>

      {/* Заголовок панели */}
      <div className="detail-header">
        <div
          className="detail-topic-dot"
          style={{ background: skill.color }}
        />
        <div>
          <div className="detail-topic">{skill.topic}</div>
          <h3 className="detail-title">
            {skill.label.replace("\n", " ")}
          </h3>
        </div>
        <button className="detail-close" onClick={onClose}>✕</button>
      </div>

      {/* Статус */}
      <div className="detail-status-row">
        <span
          className="detail-status-badge"
          style={{
            background:
              skill.status === "done"   ? "#14532d" :
              skill.status === "active" ? "#1f1040" :
              "#1a1a2e",
            color:
              skill.status === "done"   ? "#86efac" :
              skill.status === "active" ? skill.color :
              "#4A4A7A",
            border: `1px solid ${
              skill.status === "done"   ? "#86efac" :
              skill.status === "active" ? skill.color :
              "#2D2D50"
            }`,
          }}
        >
          {skill.status === "done"   ? "✓ Completed" :
           skill.status === "active" ? "● In Progress" :
           "🔒 Locked"}
        </span>
        <span className="detail-tasks">
          {skill.tasksDone}/{skill.tasks} tasks
        </span>
      </div>

      {/* Прогресс бар */}
      <div className="detail-bar-wrap">
        <div className="detail-bar">
          <div
            className="detail-bar-fill"
            style={{
              width: percent + "%",
              background: skill.color,
            }}
          />
        </div>
        <span className="detail-percent">{percent}%</span>
      </div>

      {/* Описание */}
      <p className="detail-desc">{skill.description}</p>

      {/* Требования (если locked) */}
      {skill.status === "locked" && requiredSkills.length > 0 && (
        <div className="detail-requires">
          <div className="detail-requires-title">
            Complete first:
          </div>
          <div className="detail-requires-list">
            {requiredSkills.map((req) => (
              <span
                key={req.id}
                className="requires-pill"
                style={{ borderColor: req.color, color: req.color }}
              >
                {req.label.replace("\n", " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Кнопка действия */}
      <button
        className="detail-action-btn"
        style={{
          background: skill.status === "locked" ? "#1a1a2e" : skill.color,
          color: skill.status === "locked" ? "#4A4A7A" : "#fff",
          cursor: skill.status === "locked" ? "not-allowed" : "pointer",
        }}
        disabled={skill.status === "locked"}
      >
        {skill.status === "done"   ? "Review Topic →" :
         skill.status === "active" ? "Continue →" :
         "🔒 Locked"}
      </button>

    </div>
  );
}

export default KnowledgePage;