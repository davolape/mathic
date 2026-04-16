import { useState } from "react";

// Список математических аватаров на выбор
const AVATARS = ["∑", "π", "∞", "√", "∂", "Δ", "λ", "θ"];

// Данные пользователя (потом подключим к настоящей БД)
const USER = {
  username: "mathic_user",
  level: 3,
  xp: 1250,
  xpToNext: 2000,       // XP до следующего уровня
  tasksCompleted: 12,
  streak: 5,            // дней подряд
  clan: "Euler's Squad",
  joinedDate: "March 2025",
};

// Последние действия пользователя
const ACTIVITY = [
  { id: 1, text: "Completed Matrix Multiplication",  xp: "+50 XP",  time: "2h ago"  },
  { id: 2, text: "Solved Eigenvalue task with Code", xp: "+75 XP",  time: "1d ago"  },
  { id: 3, text: "Used hint on PCA project",         xp: "+10 XP",  time: "2d ago"  },
  { id: 4, text: "Joined Euler's Squad clan",        xp: "+25 XP",  time: "5d ago"  },
];

function ProfilePage({ darkMode }) {
  // Какой аватар выбран (индекс из массива AVATARS)
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Показывать ли выбор аватара
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Считаем процент XP до следующего уровня
  const xpPercent = Math.round((USER.xp / USER.xpToNext) * 100);

  return (
    <div className="profile-page">

      {/* ── Верхний блок: аватар + имя ── */}
      <div className="profile-header">

        {/* Аватар */}
        <div
          className="profile-avatar"
          onClick={() => setShowAvatarPicker(!showAvatarPicker)}
          title="Click to change avatar"
        >
          {AVATARS[avatarIndex]}
        </div>

        {/* Выбор аватара */}
        {showAvatarPicker && (
          <div className="avatar-picker">
            <p className="picker-label">Choose your symbol</p>
            <div className="avatar-grid">
              {AVATARS.map((symbol, i) => (
                <button
                  key={i}
                  className={`avatar-option ${i === avatarIndex ? "selected" : ""}`}
                  onClick={() => {
                    setAvatarIndex(i);
                    setShowAvatarPicker(false);
                  }}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Имя и уровень */}
        <div className="profile-info">
          <h1 className="profile-username">{USER.username}</h1>
          <div className="profile-level">
            <span className="level-badge">Level {USER.level}</span>
            <span className="xp-text">{USER.xp} / {USER.xpToNext} XP</span>
          </div>

          {/* XP прогресс бар */}
          <div className="xp-bar-wrap">
            <div
              className="xp-bar-fill"
              style={{ width: xpPercent + "%" }}
            />
          </div>
          <p className="xp-hint">
            {USER.xpToNext - USER.xp} XP to Level {USER.level + 1}
          </p>
        </div>
      </div>

      {/* ── Статистика ── */}
      <div className="stats-grid">
        <StatCard label="Tasks Completed" value={USER.tasksCompleted} icon="📐" />
        <StatCard label="Day Streak"       value={USER.streak}          icon="🔥" />
        <StatCard label="Clan"             value={USER.clan}            icon="⚔️" />
        <StatCard label="Member Since"     value={USER.joinedDate}      icon="📅" />
      </div>

      {/* ── Последние действия ── */}
      <div className="activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          {ACTIVITY.map((item) => (
            <div key={item.id} className="activity-item">
              <span className="activity-text">{item.text}</span>
              <div className="activity-right">
                <span className="activity-xp">{item.xp}</span>
                <span className="activity-time">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// Маленький компонент — карточка со статистикой
function StatCard({ label, value, icon }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default ProfilePage;