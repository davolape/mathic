import { useState } from "react";
const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    color: "#4A4A7A",
    borderColor: "#2D2D50",
    popular: false,
    features: [
      "Full access to all projects",
      "10 hints per day",
      "Matlic AI assistant",
      "Knowledge DNA graph",
      "Study Room access",
    ],
    limitations: [
      "Hints reset daily",
      "Standard AI model",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: "$5",
    period: "per month",
    color: "#7C3AED",
    borderColor: "#7C3AED",
    popular: false,
    features: [
      "Everything in Free",
      "Explain My Code button",
      "Hints carry over (max 30)",
      "+25% XP boost",
      "Priority support",
    ],
    limitations: [],
  },
  {
    id: "plus",
    name: "Plus",
    price: "$10",
    period: "per month",
    color: "#EAB308",
    borderColor: "#EAB308",
    popular: true,
    features: [
      "Everything in Basic",
      "Smarter hints (GPT-4 level)",
      "Hint history saved",
      "+50% XP boost",
      "Custom avatar badges",
      "Clan creation",
    ],
    limitations: [],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$20",
    period: "per month",
    color: "#06B6D4",
    borderColor: "#06B6D4",
    popular: false,
    features: [
      "Everything in Plus",
      "Best AI model (Claude)",
      "Unlimited hints",
      "+100% XP boost",
      "Early access to new topics",
      "1-on-1 project reviews",
    ],
    limitations: [],
  },
];

function SubscriptionPage({ darkMode }) {
  // Какой план выбран для просмотра
  const [selected, setSelected] = useState("free");

  // Текущий план пользователя
  const currentPlan = "free";

  return (
    <div className="sub-page">

      {/* Заголовок */}
      <div className="sub-header">
        <h1 className="sub-title">Choose Your Plan</h1>
        <p className="sub-desc">
          Start free. Upgrade when you're ready to go deeper.
        </p>
      </div>

      {/* Карточки планов */}
      <div className="plans-grid">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrent={plan.id === currentPlan}
            isSelected={selected === plan.id}
            onClick={() => setSelected(plan.id)}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* Сноска */}
      <p className="sub-note">
        * Payment UI coming soon. This is a preview of available plans.
        No charges will be made.
      </p>

    </div>
  );
}

// Карточка одного плана
function PlanCard({ plan, isCurrent, isSelected, onClick, darkMode }) {
  return (
    <div
      className={`plan-card ${isSelected ? "plan-selected" : ""} ${plan.popular ? "plan-popular" : ""}`}
      style={{
        borderColor: isSelected ? plan.borderColor : undefined,
      }}
      onClick={onClick}
    >

      {/* Значок Popular */}
      {plan.popular && (
        <div className="popular-badge">⭐ Most Popular</div>
      )}

      {/* Заголовок плана */}
      <div className="plan-header">
        <span
          className="plan-name"
          style={{ color: plan.color }}
        >
          {plan.name}
        </span>
        {isCurrent && (
          <span className="current-badge">Current plan</span>
        )}
      </div>

      {/* Цена */}
      <div className="plan-price-row">
        <span className="plan-price">{plan.price}</span>
        <span className="plan-period">/ {plan.period}</span>
      </div>

      {/* Список функций */}
      <ul className="plan-features">
        {plan.features.map((f, i) => (
          <li key={i} className="feature-item">
            <span className="feature-check">✓</span>
            {f}
          </li>
        ))}
        {plan.limitations.map((l, i) => (
          <li key={i} className="feature-item limitation">
            <span className="feature-check limit-icon">–</span>
            {l}
          </li>
        ))}
      </ul>

      {/* Кнопка */}
      <button
        className="plan-btn"
        style={{
          background: isCurrent ? "transparent" : plan.color,
          borderColor: plan.color,
          color: isCurrent ? plan.color : "#fff",
          cursor: isCurrent ? "default" : "pointer",
        }}
        disabled={isCurrent}
      >
        {isCurrent ? "Current Plan" : "Get " + plan.name}
      </button>

    </div>
  );
}

export default SubscriptionPage;