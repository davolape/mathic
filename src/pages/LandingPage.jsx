function LandingPage({ onGetStarted, darkMode }) {
  return (
    <div className={`landing ${darkMode ? "dark" : "light"}`}>

      {/* Навбар */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <span className="landing-logo-text">MATHIC</span>
          <span className="landing-logo-badge">β</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#how" className="landing-nav-link">How it works</a>
          <a href="#pricing" className="landing-nav-link">Pricing</a>
        </div>
        <button className="landing-cta-small" onClick={onGetStarted}>
          Get Started →
        </button>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-badge">🚀 Now in Beta · Free to join</div>
        <h1 className="hero-title">
          Learn Math the Way<br />
          <span className="hero-highlight">Engineers Do</span>
        </h1>
        <p className="hero-desc">
          MATHIC is the first platform where you learn mathematics
          through real projects — solving every problem with both
          math and code. Guided by AI. Powered by community.
        </p>
        <div className="hero-btns">
          <button className="hero-btn-primary" onClick={onGetStarted}>
            Start Learning Free →
          </button>
          <a href="#how" className="hero-btn-secondary">
            See how it works
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">2x</span>
            <span className="stat-label">faster learning</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="stat-num">AI</span>
            <span className="stat-label">powered mentor</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="stat-num">Free</span>
            <span className="stat-label">to get started</span>
          </div>
        </div>
      </section>

      {/* Dual solving */}
      <section className="landing-section" id="how">
        <div className="section-tag">Core Feature</div>
        <h2 className="section-title">
          Every problem. Two ways to solve it.
        </h2>
        <p className="section-desc">
          Choose math or code — or master both.
          This is how real engineers think.
        </p>
        <div className="dual-grid">
          <div className="dual-card math-card">
            <div className="dual-card-header">
              <span className="dual-icon">📐</span>
              <span className="dual-label">Solve with Math</span>
            </div>
            <div className="dual-preview">
              <div className="preview-line">Row 1 × Col 1 = 2×3 + 1×1 = 7</div>
              <div className="preview-line">Row 1 × Col 2 = 2×0 + 1×2 = 2</div>
              <div className="preview-line">Row 2 × Col 1 = 0×3 + 3×1 = 3</div>
              <div className="preview-line preview-result">Result = [[7, 2], [3, 6]]</div>
            </div>
          </div>
          <div className="dual-vs">VS</div>
          <div className="dual-card code-card">
            <div className="dual-card-header">
              <span className="dual-icon">🐍</span>
              <span className="dual-label">Solve with Code</span>
            </div>
            <div className="dual-preview code-preview">
              <div className="preview-line">import numpy as np</div>
              <div className="preview-line"> </div>
              <div className="preview-line">A = np.array([[2, 1], [0, 3]])</div>
              <div className="preview-line">B = np.array([[3, 0], [1, 2]])</div>
              <div className="preview-line preview-result">np.dot(A, B) → [[7,2],[3,6]]</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section" id="features">
        <div className="section-tag">Features</div>
        <h2 className="section-title">
          Everything you need to master math
        </h2>
        <div className="features-grid">
          {[
            {
              icon: "🤖",
              title: "Matlic AI Mentor",
              desc: "Your personal AI tutor that guides you without giving away answers. Asks the right questions to make you think.",
              color: "#7C3AED",
            },
            {
              icon: "🧬",
              title: "Knowledge DNA",
              desc: "Your personal knowledge graph. See exactly which skills you've mastered and what to learn next.",
              color: "#06B6D4",
            },
            {
              icon: "⚔️",
              title: "Math Clans",
              desc: "Join a clan by passing an entry test. Unlock exclusive projects, XP boosts and rare badges.",
              color: "#EAB308",
            },
            {
              icon: "👥",
              title: "Study Room",
              desc: "Schedule group sessions with clan members. Solve hard projects together with video, audio or text.",
              color: "#86efac",
            },
            {
              icon: "💡",
              title: "Smart Hints",
              desc: "Three levels of hints that guide without spoiling. Small nudge, medium help, or full breakdown.",
              color: "#F97316",
            },
            {
              icon: "🔍",
              title: "Explain My Code",
              desc: "AI explains your code line by line in plain English. Understand what you wrote and why it works.",
              color: "#a78bfa",
            },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div
                className="feature-icon-wrap"
                style={{ background: f.color + "22" }}
              >
                <span className="feature-icon">{f.icon}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="landing-section">
        <div className="section-tag">Curriculum</div>
        <h2 className="section-title">
          From matrices to machine learning
        </h2>
        <div className="topics-row">
          {[
            { icon: "📐", name: "Matrices",       level: "Beginner"     },
            { icon: "λ",  name: "Eigenvalues",    level: "Intermediate" },
            { icon: "📊", name: "PCA",            level: "Intermediate" },
            { icon: "∫",  name: "Calculus",       level: "Beginner"     },
            { icon: "📈", name: "Statistics",     level: "Intermediate" },
            { icon: "🤖", name: "ML Math",        level: "Advanced"     },
          ].map((t, i) => (
            <div key={i} className="topic-pill">
              <span className="topic-pill-icon">{t.icon}</span>
              <span className="topic-pill-name">{t.name}</span>
              <span className={`topic-pill-level level-${t.level.toLowerCase()}`}>
                {t.level}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="landing-section" id="pricing">
        <div className="section-tag">Pricing</div>
        <h2 className="section-title">Simple, honest pricing</h2>
        <div className="landing-plans">
          {[
            {
              name: "Free",
              price: "$0",
              desc: "Perfect to get started",
              features: ["Full project access", "10 hints/day", "Matlic AI", "Knowledge DNA"],
              cta: "Start Free",
              highlight: false,
            },
            {
              name: "Plus",
              price: "$10",
              desc: "For serious learners",
              features: ["Everything in Free", "Smarter hints", "+50% XP boost", "Clan projects", "Explain My Code"],
              cta: "Get Plus",
              highlight: true,
            },
            {
              name: "Pro",
              price: "$20",
              desc: "Maximum learning power",
              features: ["Everything in Plus", "Best AI model", "Unlimited hints", "+100% XP boost", "Early access"],
              cta: "Get Pro",
              highlight: false,
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`landing-plan ${plan.highlight ? "plan-highlight" : ""}`}
            >
              {plan.highlight && (
                <div className="plan-popular-tag">⭐ Most Popular</div>
              )}
              <div className="landing-plan-name">{plan.name}</div>
              <div className="landing-plan-price">{plan.price}</div>
              <div className="landing-plan-desc">{plan.desc}</div>
              <ul className="landing-plan-features">
                {plan.features.map((f, j) => (
                  <li key={j}>
                    <span className="plan-check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`landing-plan-btn ${plan.highlight ? "plan-btn-highlight" : ""}`}
                onClick={onGetStarted}
              >
                {plan.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA финальный */}
      <section className="landing-cta-section">
        <h2 className="cta-title">
          Ready to think like a mathematician?
        </h2>
        <p className="cta-desc">
          Join MATHIC today. Free forever. No credit card required.
        </p>
        <button className="hero-btn-primary" onClick={onGetStarted}>
          Start Learning Free →
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-logo">MATHIC</div>
        <div className="footer-links">
          <span>Made with 💜 for math lovers</span>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;