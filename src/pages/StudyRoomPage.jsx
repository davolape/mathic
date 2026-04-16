import { useState } from "react";

// Клановые проекты (только для членов клана)
const CLAN_PROJECTS = [
  {
    id: "svd_decomp",
    title: "SVD Decomposition Visualizer",
    clan: "Linear Algebra",
    clanIcon: "∑",
    clanColor: "#7C3AED",
    difficulty: "Hard",
    xp: 500,
    badge: "🔷 Decomposer",
    description: "Build a system that visualizes Singular Value Decomposition step by step.",
    participants: 3,
    maxParticipants: 4,
    sessions: [
      { id: 1, user: "alex_pi",     avatar: "π", time: "Today 18:00",   status: "waiting" },
      { id: 2, user: "lambda_lee",  avatar: "λ", time: "Today 18:00",   status: "waiting" },
      { id: 3, user: "delta_d",     avatar: "Δ", time: "Tomorrow 10:00", status: "waiting" },
    ],
  },
  {
    id: "neural_scratch",
    title: "Neural Network from Scratch",
    clan: "ML Engineers",
    clanIcon: "🤖",
    clanColor: "#06B6D4",
    difficulty: "Expert",
    xp: 800,
    badge: "⚡ Net Builder",
    description: "Implement a fully connected neural network using only NumPy. No frameworks.",
    participants: 2,
    maxParticipants: 3,
    sessions: [
      { id: 1, user: "ml_max",   avatar: "μ", time: "Today 20:00",    status: "waiting" },
      { id: 2, user: "theta_t",  avatar: "θ", time: "Tomorrow 15:00", status: "waiting" },
    ],
  },
  {
    id: "bayesian_model",
    title: "Bayesian Inference Model",
    clan: "Statistics Guild",
    clanIcon: "📊",
    clanColor: "#EAB308",
    difficulty: "Hard",
    xp: 450,
    badge: "🎯 Bayesian",
    description: "Build a Bayesian model to predict outcomes from prior and likelihood.",
    participants: 1,
    maxParticipants: 4,
    sessions: [
      { id: 1, user: "sigma_s", avatar: "σ", time: "Saturday 14:00", status: "waiting" },
    ],
  },
];

// Доступные слоты времени
const TIME_SLOTS = [
  "Today 17:00", "Today 18:00", "Today 19:00", "Today 20:00",
  "Tomorrow 10:00", "Tomorrow 14:00", "Tomorrow 18:00",
  "Saturday 10:00", "Saturday 14:00", "Saturday 18:00",
];

function StudyRoomPage({ darkMode }) {
  // Какой проект выбран
  const [selectedProject, setSelectedProject] = useState(null);

  // Открыта ли комната (активная сессия)
  const [activeRoom, setActiveRoom] = useState(null);

  // Показывать ли планировщик времени
  const [showScheduler, setShowScheduler] = useState(false);

  // Режим конференции в комнате
  const [confMode, setConfMode] = useState("text");

  if (activeRoom) {
    return (
      <ActiveRoom
        project={activeRoom}
        confMode={confMode}
        setConfMode={setConfMode}
        onLeave={() => setActiveRoom(null)}
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className="studyroom-page">

      {/* Заголовок */}
      <div className="sr-header">
        <div>
          <h1 className="sr-title">Study Room</h1>
          <p className="sr-desc">
            Clan-exclusive projects. Schedule a session. Solve together.
          </p>
        </div>
        <div className="sr-header-badge">
          ⚔️ Clan Members Only
        </div>
      </div>

      {/* Как это работает */}
      <div className="sr-how-it-works">
        <div className="how-step">
          <div className="how-num">1</div>
          <div className="how-text">Choose a clan project</div>
        </div>
        <div className="how-arrow">→</div>
        <div className="how-step">
          <div className="how-num">2</div>
          <div className="how-text">Pick your time slot</div>
        </div>
        <div className="how-arrow">→</div>
        <div className="how-step">
          <div className="how-num">3</div>
          <div className="how-text">Clan members get notified</div>
        </div>
        <div className="how-arrow">→</div>
        <div className="how-step">
          <div className="how-num">4</div>
          <div className="how-text">Session starts — solve together</div>
        </div>
      </div>

      {/* Список проектов */}
      <div className="sr-projects">
        {CLAN_PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={selectedProject?.id === project.id}
            onSelect={() => setSelectedProject(
              selectedProject?.id === project.id ? null : project
            )}
            onSchedule={() => {
              setSelectedProject(project);
              setShowScheduler(true);
            }}
            onJoinNow={() => setActiveRoom(project)}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* Модальное окно планировщика */}
      {showScheduler && selectedProject && (
        <SchedulerModal
          project={selectedProject}
          onClose={() => setShowScheduler(false)}
          onJoinNow={() => {
            setShowScheduler(false);
            setActiveRoom(selectedProject);
          }}
          darkMode={darkMode}
        />
      )}

    </div>
  );
}

// ─── Карточка проекта ─────────────────────────────────────────────
function ProjectCard({ project, isSelected, onSelect, onSchedule, onJoinNow }) {
  // Проверяем есть ли совпадение по времени (Today 18:00 — имитация)
  const hasMatch = project.sessions.some((s) => s.time === "Today 18:00");

  return (
    <div
      className={`sr-project-card ${isSelected ? "sr-project-selected" : ""}`}
      style={{ borderColor: isSelected ? project.clanColor : undefined }}
    >
      {/* Верх карточки */}
      <div className="sr-project-top" onClick={onSelect}>

        {/* Клан + сложность */}
        <div className="sr-project-meta">
          <span
            className="sr-clan-badge"
            style={{ background: project.clanColor + "22", color: project.clanColor }}
          >
            {project.clanIcon} {project.clan}
          </span>
          <span className={`sr-difficulty ${project.difficulty.toLowerCase()}`}>
            {project.difficulty}
          </span>
        </div>

        {/* Название */}
        <h3 className="sr-project-title">{project.title}</h3>
        <p className="sr-project-desc">{project.description}</p>

        {/* Награды */}
        <div className="sr-rewards">
          <span className="sr-reward">
            ⚡ <strong style={{ color: "#EAB308" }}>+{project.xp} XP</strong>
          </span>
          <span className="sr-reward">
            🏆 {project.badge}
          </span>
          <span className="sr-reward">
            👥 {project.participants}/{project.maxParticipants} joined
          </span>
        </div>
      </div>

      {/* Участники которые уже выбрали время */}
      {isSelected && (
        <div className="sr-sessions">
          <div className="sr-sessions-title">
            Clan members available:
          </div>
          {project.sessions.map((session) => (
            <div key={session.id} className="sr-session-item">
              <div className="sr-session-avatar">{session.avatar}</div>
              <span className="sr-session-user">{session.user}</span>
              <span className="sr-session-time">{session.time}</span>
              {session.time === "Today 18:00" && (
                <span className="sr-match-badge">✓ matches you</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Кнопки */}
      <div className="sr-project-actions">
        {hasMatch && (
          <button
            className="sr-join-now-btn"
            style={{ background: project.clanColor }}
            onClick={onJoinNow}
          >
            ▶ Join Now — Today 18:00
          </button>
        )}
        <button
          className="sr-schedule-btn"
          style={{ borderColor: project.clanColor, color: project.clanColor }}
          onClick={onSchedule}
        >
          🗓 Schedule Session
        </button>
      </div>

    </div>
  );
}

// ─── Планировщик времени ──────────────────────────────────────────
function SchedulerModal({ project, onClose, onJoinNow, darkMode }) {
  const [selectedTime, setSelectedTime] = useState(null);
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!selectedTime) return;
    setSent(true);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-box ${darkMode ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 500 }}
      >
        <div className="modal-header">
          <div>
            <div
              className="test-clan-name"
              style={{ color: project.clanColor }}
            >
              {project.clanIcon} {project.clan}
            </div>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {!sent ? (
          <>
            <p className="modal-subtitle">
              Pick a time that works for you. Clan members will be notified.
            </p>

            {/* Слоты времени */}
            <div className="time-slots-grid">
              {TIME_SLOTS.map((slot) => {
                // Проверяем сколько участников уже выбрали этот слот
                const count = project.sessions.filter(
                  (s) => s.time === slot
                ).length;

                return (
                  <button
                    key={slot}
                    className={`time-slot ${selectedTime === slot ? "time-slot-active" : ""}`}
                    style={{
                      borderColor: selectedTime === slot
                        ? project.clanColor
                        : undefined,
                      background: selectedTime === slot
                        ? project.clanColor + "22"
                        : undefined,
                    }}
                    onClick={() => setSelectedTime(slot)}
                  >
                    <span className="slot-time">{slot}</span>
                    {count > 0 && (
                      <span
                        className="slot-count"
                        style={{ color: project.clanColor }}
                      >
                        {count} member{count > 1 ? "s" : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              className="get-hint-btn"
              style={{
                background: !selectedTime ? "#2D2D50" : project.clanColor,
              }}
              disabled={!selectedTime}
              onClick={handleSend}
            >
              Send to Clan Members →
            </button>
          </>
        ) : (
          /* Подтверждение отправки */
          <div className="scheduler-sent">
            <div className="sent-icon">🔔</div>
            <h3 className="sent-title">Notification Sent!</h3>
            <p className="sent-desc">
              All {project.clan} members who haven't completed this project
              have been notified about your session at{" "}
              <strong style={{ color: project.clanColor }}>{selectedTime}</strong>.
            </p>
            <div className="sent-info">
              When enough members confirm the same time, your Study Room
              will open automatically.
            </div>
            {selectedTime === "Today 18:00" && (
              <button
                className="get-hint-btn"
                style={{ background: project.clanColor }}
                onClick={onJoinNow}
              >
                ▶ Join Now — 2 members already waiting!
              </button>
            )}
            <button
              className="get-hint-btn"
              style={{ background: "transparent", border: "1px solid #2D2D50", color: "#94A3B8" }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Активная комната ─────────────────────────────────────────────
function ActiveRoom({ project, confMode, setConfMode, onLeave, darkMode }) {
  const [code, setCode] = useState(
`import numpy as np

# ${project.title}
# Collaborative solution

# Start coding here...
`
  );
  const [messages, setMessages] = useState([
    { id: 1, user: "alex_pi", avatar: "π", text: "Hey! Ready to start?", time: "18:00" },
    { id: 2, user: "lambda_lee", avatar: "λ", text: "Yes! Let's begin with the theory first.", time: "18:01" },
  ]);
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: Date.now(),
      user: "mathic_user",
      avatar: "∑",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isYou: true,
    }]);
    setInput("");
  }

  return (
    <div className="active-room">

      {/* Топбар комнаты */}
      <div className="room-topbar">
        <div className="room-topbar-left">
          <div
            className="room-live-dot"
            style={{ background: project.clanColor }}
          />
          <span className="room-live-label">LIVE</span>
          <span
            className="room-project-name"
            style={{ color: project.clanColor }}
          >
            {project.title}
          </span>
        </div>

        {/* Участники */}
        <div className="room-participants">
          {["∑", "π", "λ"].map((av, i) => (
            <div key={i} className="room-participant-av">{av}</div>
          ))}
          <span className="room-participant-count">3 online</span>
        </div>

        {/* Режим конференции */}
        <div className="conf-modes">
          {[
            { id: "text",  icon: "💬", label: "Text"  },
            { id: "audio", icon: "🎤", label: "Audio" },
            { id: "video", icon: "📹", label: "Video" },
          ].map((mode) => (
            <button
              key={mode.id}
              className={`conf-mode-btn ${confMode === mode.id ? "conf-mode-active" : ""}`}
              style={{
                background: confMode === mode.id ? project.clanColor : undefined,
              }}
              onClick={() => setConfMode(mode.id)}
            >
              {mode.icon} {mode.label}
            </button>
          ))}
        </div>

        <button className="leave-btn" onClick={onLeave}>
          ✕ Leave Room
        </button>
      </div>

      {/* Основной layout комнаты */}
      <div className="room-body">

        {/* Видео/аудио область */}
        {confMode !== "text" && (
          <div className="conf-area">
            {confMode === "video" ? (
              <div className="video-grid">
                {["∑ You", "π alex_pi", "λ lambda_lee"].map((p, i) => (
                  <div key={i} className="video-tile">
                    <div className="video-avatar">{p.split(" ")[0]}</div>
                    <div className="video-name">{p.split(" ")[1] || "You"}</div>
                    {i === 0 && <div className="video-you-badge">You</div>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="audio-row">
                {["∑ You", "π alex_pi", "λ lambda_lee"].map((p, i) => (
                  <div key={i} className="audio-tile">
                    <div className="audio-avatar"
                      style={{ borderColor: i === 1 ? project.clanColor : "#2D2D50" }}
                    >
                      {p.split(" ")[0]}
                    </div>
                    <div className="audio-name">{p.split(" ")[1] || "You"}</div>
                    {i === 1 && <div className="audio-speaking">speaking...</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Редактор кода */}
        <div className="room-editor-wrap">
          <div className="editor-topbar">
            <span className="editor-label">Shared Code Editor</span>
            <span className="editor-collab">
              ● 3 collaborators
            </span>
          </div>
          <textarea
            className="room-code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            style={{ minHeight: confMode !== "text" ? "200px" : "340px" }}
          />
          <div className="editor-actions">
            <button className="action-btn btn-run">▶ Run</button>
            <button className="action-btn btn-check">✦ Matlic Check</button>
          </div>
        </div>

        {/* Текстовый чат */}
        <div className="room-chat-panel">
          <div className="sidebar-title">Room Chat</div>
          <div className="room-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`room-msg ${msg.isYou ? "room-msg-you" : ""}`}
              >
                {!msg.isYou && (
                  <div className="room-msg-avatar">{msg.avatar}</div>
                )}
                <div className="room-msg-content">
                  {!msg.isYou && (
                    <div className="room-msg-name">{msg.user}</div>
                  )}
                  <div className="room-msg-bubble">{msg.text}</div>
                  <div className="room-msg-time">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="room-input-row">
            <input
              className="room-input"
              placeholder="Message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="room-send-btn"
              onClick={sendMessage}
              disabled={!input.trim()}
            >↑</button>
          </div>
        </div>

      </div>

      {/* XP прогресс внизу */}
      <div className="room-footer">
        <span className="room-footer-text">
          Complete this project together to earn
        </span>
        <span className="room-footer-xp">
          ⚡ +{project.xp} XP each
        </span>
        <span className="room-footer-badge">
          🏆 {project.badge}
        </span>
      </div>

    </div>
  );
}

export default StudyRoomPage;