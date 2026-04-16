import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const AVATARS = ["∑", "π", "∞", "√", "∂", "Δ", "λ", "θ"];

const ACTIVITY = [
  { id: 1, text: "Completed Matrix Multiplication", xp: "+50 XP", time: "2h ago" },
  { id: 2, text: "Solved Eigenvalue task with Code", xp: "+75 XP", time: "1d ago" },
  { id: 3, text: "Used hint on PCA project",         xp: "+10 XP", time: "2d ago" },
  { id: 4, text: "Daily login streak bonus",         xp: "+5 XP",  time: "today"  },
];

function ProfilePage({ darkMode, user }) {
  const [avatarIndex, setAvatarIndex] = useState(
    AVATARS.indexOf(user?.avatar || "∑") >= 0
      ? AVATARS.indexOf(user?.avatar || "∑")
      : 0
  );
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const currentXP    = user?.xp || 0;
  const currentLevel = user?.level || 1;
  const xpInLevel    = currentXP % 500;
  const xpPercent    = Math.round((xpInLevel / 500) * 100);

  async function handleAvatarChange(i) {
    setAvatarIndex(i);
    setShowAvatarPicker(false);
    if (user?.uid) {
      await setDoc(doc(db, "users", user.uid), {
        ...user,
        avatar: AVATARS[i],
      });
    }
  }

  return (
    <div className="profile-page">

      <div className="profile-header">
        <div
          className="profile-avatar"
          onClick={() => setShowAvatarPicker(!showAvatarPicker)}
          title="Click to change avatar"
        >
          {AVATARS[avatarIndex]}
        </div>

        {showAvatarPicker && (
          <div className="avatar-picker">
            <p className="picker-label">Choose your symbol</p>
            <div className="avatar-grid">
              {AVATARS.map((symbol, i) => (
                <button
                  key={i}
                  className={`avatar-option ${i === avatarIndex ? "selected" : ""}`}
                  onClick={() => handleAvatarChange(i)}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="profile-info">
          <h1 className="profile-username">
            {user?.name || "mathic_user"}
          </h1>
          <div className="profile-level">
            <span className="level-badge">Level {currentLevel}</span>
            <span className="xp-text">{currentXP} XP total</span>
          </div>
          <div className="xp-bar-wrap">
            <div
              className="xp-bar-fill"
              style={{ width: xpPercent + "%" }}
            />
          </div>
          <p className="xp-hint">
            {xpInLevel} / 500 XP · {500 - xpInLevel} XP to Level {currentLevel + 1}
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label="Tasks Completed" value={user?.tasksCompleted || 0} icon="📐" />
        <StatCard label="Day Streak"      value={user?.streak || 0}          icon="🔥" />
        <StatCard label="Total XP"        value={user?.xp || 0}              icon="⚡" />
        <StatCard label="Level"           value={user?.level || 1}           icon="🏆" />
      </div>

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