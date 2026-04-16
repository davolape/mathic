import { useState } from "react";
import HintSystem from "../components/HintSystem";

const STEPS = [
  { id: 1, label: "Matrix Basics",   done: true  },
  { id: 2, label: "Transformations", done: true  },
  { id: 3, label: "Multiplication",  done: false, current: true },
  { id: 4, label: "Eigenvalues",     done: false },
  { id: 5, label: "PCA",             done: false },
];

function ProjectPage({ darkMode }) {
  const [solveMode, setSolveMode]       = useState("code");
  const [hintsLeft, setHintsLeft]       = useState(10);
  const [showResult, setShowResult]     = useState(false);
  const [explanation, setExplanation]   = useState(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [codeAnswer, setCodeAnswer]     = useState(
`import numpy as np

A = np.array([[2, 1],
              [0, 3]])

B = np.array([[3, 0],
              [1, 2]])

result = np.dot(A, B)
print(result)`
  );
  const [mathText, setMathText] = useState("");

  async function handleExplainCode() {
    if (!codeAnswer.trim()) return;
    setIsExplaining(true);
    setExplanation(null);
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GROQ_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            max_tokens: 600,
            temperature: 0.3,
            messages: [
              {
                role: "system",
                content: `You are a math programming tutor.
Explain the given Python code line by line in simple terms.
Format as a numbered list. Each item explains one line in 1-2 sentences.
Focus on WHAT the code does and WHY.
Do not give away full solutions.`,
              },
              {
                role: "user",
                content: `Explain this Python code:\n\n${codeAnswer}`,
              },
            ],
          }),
        }
      );
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      setExplanation(data.choices[0].message.content);
    } catch (err) {
      setExplanation("Sorry, could not connect to AI. Please try again.");
    } finally {
      setIsExplaining(false);
    }
  }

  return (
    <div className={`proj ${darkMode ? "dark" : "light"}`}>

      {/* Шаги вверху */}
      <div className="proj-topbar">
        <div className="proj-steps">
          {STEPS.map((step, i) => (
            <span key={step.id} className="step-wrap">
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

      {/* Переключатель Math / Code + Hint */}
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
        <HintSystem
          hintsLeft={hintsLeft}
          setHintsLeft={setHintsLeft}
          darkMode={darkMode}
        />
      </div>

      {/* Сетка 2 колонки */}
      <div className="proj-grid">

        {/* ЛЕВАЯ КОЛОНКА */}
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

          {/* Code / Math editor */}
          <div className="proj-section-label" style={{ marginTop: 16 }}>
            <div className="section-icon icon-blue">⌨️</div>
            <span>{solveMode === "code" ? "Code" : "Math Solution"}</span>
          </div>

          {solveMode === "code" ? (
            <div className="proj-card" style={{ padding: 0 }}>
              <textarea
                className="code-editor"
                value={codeAnswer}
                onChange={(e) => setCodeAnswer(e.target.value)}
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

              {/* Explain My Code */}
              <div style={{ padding: "10px 14px", background: "#0d0d1a" }}>
                <button
                  className="explain-btn"
                  onClick={handleExplainCode}
                  disabled={isExplaining || !codeAnswer.trim()}
                  style={{ width: "100%" }}
                >
                  {isExplaining ? "⏳ Analyzing..." : "🔍 Explain My Code"}
                </button>
              </div>

              {/* Объяснение */}
              {explanation && (
                <div className="explanation-box" style={{ margin: "0 14px 14px" }}>
                  <div className="explanation-header">
                    <span className="explanation-title">🔍 Code Explanation</span>
                    <button
                      className="explanation-close"
                      onClick={() => setExplanation(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="explanation-content">
                    {explanation.split("\n").map((line, i) =>
                      line.trim() ? (
                        <div key={i} className="explanation-line">{line}</div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="proj-card">
              <textarea
                className="math-editor"
                placeholder={
                  "Write your step-by-step solution:\n\n" +
                  "Row 1 × Col 1 = 2×3 + 1×1 = 7\n" +
                  "Row 1 × Col 2 = 2×0 + 1×2 = 2\n..."
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

        {/* Разделитель */}
        <div className="proj-divider" />

        {/* ПРАВАЯ КОЛОНКА */}
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
                <div className="xp-row" style={{ marginTop: 12 }}>
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