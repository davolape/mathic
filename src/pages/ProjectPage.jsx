import { useState } from "react";
import HintSystem from "../components/HintSystem";

// Шаги проекта (прогресс вверху)
const STEPS = [
  { id: 1, label: "Matrix Basics",     done: true  },
  { id: 2, label: "Transformations",   done: true  },
  { id: 3, label: "Multiplication",    done: false, current: true },
  { id: 4, label: "Eigenvalues",       done: false },
  { id: 5, label: "PCA",               done: false },
];

function ProjectPage({ darkMode }) {
  // math или code
  const [solveMode, setSolveMode] = useState("code");
  //dobavili state dlya hintsov
  const [hintsLeft, setHintsLeft] = useState(10);
  // текст в редакторе кода
  const [code, setCode] = useState(
`import numpy as np

A = np.array([[2, 1],
              [0, 3]])

B = np.array([[3, 0],
              [1, 2]])

result = np.dot(A, B)
print(result)`
  );

  // math решение
  const [mathText, setMathText] = useState("");

  // показывать ли результат
  const [showResult, setShowResult] = useState(false);

  return (
    <div className={`proj ${darkMode ? "dark" : "light"}`}>

      {/* ── Верхняя строка: шаги + прогресс ── */}
      <div className="proj-topbar">
        <div className="proj-steps">
          {STEPS.map((step, i) => (
            <span key={step.id} className="step-wrap">
              {/* Стрелка между шагами */}
              {i > 0 && <span className="step-arrow">›</span>}
              <span className={
                "step-pill " +
                (step.done    ? "step-done"    : "") +
                (step.current ? "step-current" : "") +
                (!step.done && !step.current ? "step-todo" : "")
              }>
                {step.done && "✓ "}
                {step.current && "● "}
                {step.label}
              </span>
            </span>
          ))}
        </div>
        <span className="proj-progress">Step 3/5 · 60% Complete</span>
      </div>

      {/* ── Переключатель Math / Code ── */}
      <div className="proj-mode-row">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${solveMode === "math" ? "mode-active" : ""}`}
            onClick={() => setSolveMode("math")}
          >
            📐 Math
          </button>
          <button
            className={`mode-btn ${solveMode === "code" ? "mode-active" : ""}`}
            onClick={() => setSolveMode("code")}
          >
            🐍 Code
          </button>
        </div>

        {/* Кнопка подсказки */}
        <HintSystem
          hintsLeft={hintsLeft}
          setHintsLeft={setHintsLeft}
          darkMode={darkMode}
        />
      </div>

      {/* ── Основная сетка: 2 колонки ── */}
      <div className="proj-grid">

        {/* ── ЛЕВАЯ КОЛОНКА ── */}
        <div className="proj-col">

          {/* Theory */}
          <div className="proj-section-label">
            <div className="section-icon icon-purple">📖</div>
            <span>Theory</span>
          </div>
          <div className="proj-card">
            <h3 className="card-title">Matrix Multiplication</h3>
            <p className="card-text">
              To multiply matrix A by matrix B, the number of columns in A
              must equal the number of rows in B. Each result cell is
              the dot product of a row from A and a column from B.
            </p>
            <div className="math-formula">
              A×B[i][j] = Σ A[i][k] · B[k][j]
            </div>
            <div className="info-strip">
              <strong>Key rule:</strong> (m×n) · (n×p) = (m×p) matrix
            </div>
          </div>

          {/* Code editor или Math input */}
          <div className="proj-section-label" style={{ marginTop: 16 }}>
            <div className="section-icon icon-blue">⌨️</div>
            <span>{solveMode === "code" ? "Code" : "Math Solution"}</span>
          </div>

          {solveMode === "code" ? (
            <div className="proj-card" style={{ padding: 0 }}>
              <textarea
                className="code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
              <div className="code-actions">
                <button
                  className="action-btn btn-run"
                  onClick={() => setShowResult(true)}
                >
                  ▶ Run
                </button>
                <button className="action-btn btn-check">
                  ✦ Matlic Check
                </button>
                <button className="action-btn btn-review">
                  ↗ Request Review
                </button>
              </div>
            </div>
          ) : (
            <div className="proj-card">
              <textarea
                className="math-editor"
                placeholder={
                  "Write your step-by-step solution:\n\n" +
                  "Row 1 × Col 1 = 2×3 + 1×1 = 7\n" +
                  "Row 1 × Col 2 = 2×0 + 1×2 = 2\n" +
                  "..."
                }
                value={mathText}
                onChange={(e) => setMathText(e.target.value)}
              />
              <button
                className="action-btn btn-run"
                style={{ marginTop: 10 }}
                onClick={() => setShowResult(true)}
              >
                ✓ Submit Solution
              </button>
            </div>
          )}

        </div>

        {/* ── Вертикальный разделитель ── */}
        <div className="proj-divider" />

        {/* ── ПРАВАЯ КОЛОНКА ── */}
        <div className="proj-col">

          {/* Task */}
          <div className="proj-section-label">
            <div className="section-icon icon-yellow">🎯</div>
            <span>Task</span>
          </div>
          <div className="proj-card">
            <h3 className="card-title" style={{ color: "#EAB308" }}>
              Step 3: Multiply these matrices
            </h3>
            <p className="card-text">
              Given the matrices below, compute A × B.
              Show your full working for each cell.
            </p>
            <div className="math-formula">
              A = [[2, 1],    B = [[3, 0],{"\n"}
                   [0, 3]]        [1, 2]]
            </div>
            <div className="requirements-box">
              <div className="req-title">✓ Requirements</div>
              <ul className="req-list">
                <li>Show each dot product step</li>
                <li>Final answer as a 2×2 matrix</li>
                <li>Verify your answer with numpy</li>
              </ul>
            </div>
          </div>

          {/* Result */}
          <div className="proj-section-label" style={{ marginTop: 16 }}>
            <div className="section-icon icon-green">📊</div>
            <span>Result</span>
          </div>
          <div className="proj-card">
            {!showResult ? (
              <p className="card-text" style={{ fontStyle: "italic" }}>
                Run your solution to see the result here.
              </p>
            ) : (
              <>
                <div className="console-label">CONSOLE OUTPUT</div>
                <div className="console-box">
                  <div className="console-line">
                    Result: <span className="console-val">[[7 2] [3 6]]</span>
                  </div>
                  <div className="console-line console-ok">
                    ✓ Test passed
                  </div>
                </div>
                <div className="xp-row">
                  <span className="card-text">XP earned:</span>
                  <span className="xp-badge">+50 XP</span>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProjectPage;