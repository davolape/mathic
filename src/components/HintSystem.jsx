import { useState } from "react";

// Три уровня подсказок
const HINT_LEVELS = [
  {
    id: "small",
    icon: "💡",
    label: "Small Hint",
    cost: 1,
    description: "A gentle nudge in the right direction",
    // Текст подсказки (не даёт ответ — только направление)
    hint: "Think about what happens when you take the first row of A and combine it with the first column of B. What operation connects each pair of numbers?",
  },
  {
    id: "medium",
    icon: "🔍",
    label: "Medium Hint",
    cost: 5,
    description: "A more detailed explanation",
    hint: "For cell [0][0] of the result: multiply each element of row 0 in A with the corresponding element of column 0 in B, then add them together. Try: A[0][0]×B[0][0] + A[0][1]×B[1][0]. Now apply the same pattern to all other cells.",
  },
  {
    id: "strong",
    icon: "⚡",
    label: "Strong Hint",
    cost: 10,
    description: "A step-by-step breakdown",
    hint: "The result matrix has 4 cells. For each cell [i][j]: sum up A[i][k]×B[k][j] for all k. Start with cell [0][0]: (2×3)+(1×1)=7. Use this exact pattern for [0][1], [1][0], and [1][1]. You still need to calculate each one yourself.",
  },
];

function HintSystem({ hintsLeft, setHintsLeft, darkMode }) {
  // Открыто ли модальное окно
  const [isOpen, setIsOpen] = useState(false);

  // Какой уровень подсказки выбран
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Текст подсказки (после подтверждения)
  const [hintText, setHintText] = useState(null);

  // Пользователь нажал "Get Hint" — показываем подсказку и списываем hints
  function handleGetHint() {
    if (!selectedLevel) return;
    if (hintsLeft < selectedLevel.cost) return;

    // Списываем hints
    setHintsLeft(hintsLeft - selectedLevel.cost);

    // Показываем текст подсказки
    setHintText(selectedLevel.hint);

    // Сбрасываем выбор уровня
    setSelectedLevel(null);
  }

  // Закрываем модальное окно и сбрасываем всё
  function handleClose() {
    setIsOpen(false);
    setSelectedLevel(null);
    setHintText(null);
  }

  return (
    <>
      {/* Кнопка Hint — показывается на странице */}
      <button
        className="hint-trigger-btn"
        onClick={() => setIsOpen(true)}
      >
        💡 Hint ({hintsLeft})
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="modal-backdrop" onClick={handleClose}>

          {/* Останавливаем закрытие при клике внутри */}
          <div
            className={`modal-box ${darkMode ? "dark" : "light"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="modal-header">
              <h2 className="modal-title">Choose Hint Level</h2>
              <button className="modal-close" onClick={handleClose}>✕</button>
            </div>

            {/* Если подсказка ещё не получена — показываем выбор */}
            {!hintText ? (
              <>
                <p className="modal-subtitle">
                  Hints remaining: <strong>{hintsLeft}</strong>
                </p>

                {/* Три уровня */}
                <div className="hint-levels">
                  {HINT_LEVELS.map((level) => {
                    // Хватает ли hints на этот уровень?
                    const canAfford = hintsLeft >= level.cost;

                    return (
                      <button
                        key={level.id}
                        className={
                          "hint-level-btn " +
                          (selectedLevel?.id === level.id ? "selected " : "") +
                          (!canAfford ? "disabled" : "")
                        }
                        onClick={() => canAfford && setSelectedLevel(level)}
                        disabled={!canAfford}
                      >
                        <span className="hint-level-icon">{level.icon}</span>
                        <div className="hint-level-info">
                          <span className="hint-level-name">{level.label}</span>
                          <span className="hint-level-desc">{level.description}</span>
                        </div>
                        <span className="hint-level-cost">
                          {level.cost} {level.cost === 1 ? "hint" : "hints"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Кнопка получить подсказку */}
                <button
                  className={
                    "get-hint-btn " +
                    (!selectedLevel ? "get-hint-disabled" : "")
                  }
                  onClick={handleGetHint}
                  disabled={!selectedLevel}
                >
                  Get Hint
                </button>

                <p className="hint-warning">
                  ⚠️ Hints do not give the full answer — only guidance.
                </p>
              </>
            ) : (
              /* Если подсказка получена — показываем текст */
              <>
                <div className="hint-result">
                  <div className="hint-result-icon">💡</div>
                  <p className="hint-result-text">{hintText}</p>
                </div>
                <button className="get-hint-btn" onClick={handleClose}>
                  Got it, thanks!
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default HintSystem;