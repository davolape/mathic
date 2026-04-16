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

function SolveTab({ darkMode }) {
  const [solveMode, setSolveMode] = useState(null);
  const [mathAnswer, setMathAnswer] = useState("");
  const [codeAnswer, setCodeAnswer] = useState(
`import numpy as np

A = np.array([[2, 1],
              [0, 3]])

B = np.array([[3, 0],
              [1, 2]])

result = np.dot(A, B)
print(result)`
  );
  const [explanation, setExplanation] = useState(null);
  const [isExplaining, setIsExplaining] = useState(false);

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
Format your response as a numbered list.
Each item explains one line or logical block in 1-2 sentences.
Focus on WHAT the code does and WHY.
Do not give away full solutions — guide the student to understand.`,
              },
              {
                role: "user",
                content: `Explain this Python code line by line:\n\n${codeAnswer}`,
              },
            ],
          }),
        }
      );

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const data = await response.json();
      const aiText = data.choices[0].message.content;
      setExplanation(aiText);

    } catch (err) {
      console.error("Explain error:", err);
      setExplanation("Sorry, could not connect to AI. Please try again.");
    } finally {
      setIsExplaining(false);
    }
  }

  return (
    <div className="tab-panel">
      <h2>Choose your solve method</h2>

      <div className="solve-btns">
        <button
          className={`solve-method-btn ${solveMode === "math" ? "active" : ""}`}
          onClick={() => setSolveMode("math")}
        >
          📐 Solve with Math
        </button>
        <button
          className={`solve-method-btn ${solveMode === "code" ? "active" : ""}`}
          onClick={() => setSolveMode("code")}
        >
          🐍 Solve with Code
        </button>
      </div>

      {solveMode === "math" && (
        <div className="solve-area">
          <p>Write your step-by-step solution:</p>
          <textarea
            className="math-input"
            placeholder="Example: Row 1 × Col 1 = 2×3 + 1×1 = 7..."
            value={mathAnswer}
            onChange={(e) => setMathAnswer(e.target.value)}
          />
        </div>
      )}

      {solveMode === "code" && (
        <div className="solve-area">
          <p>Write your Python solution:</p>
          <textarea
            className="code-input"
            value={codeAnswer}
            onChange={(e) => setCodeAnswer(e.target.value)}
            spellCheck={false}
          />

          <button
            className="explain-btn"
            onClick={handleExplainCode}
            disabled={isExplaining || !codeAnswer.trim()}
          >
            {isExplaining ? "⏳ Analyzing..." : "🔍 Explain My Code"}
          </button>

          {explanation && (
            <div className="explanation-box">
              <div className="explanation-header">
                <span className="explanation-title">
                  🔍 Code Explanation
                </span>
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
                    <div key={i} className="explanation-line">
                      {line}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectPage;