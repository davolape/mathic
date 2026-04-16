function LoginPage({ onLogin }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "#16162A",
        border: "1px solid #2D2D50",
        borderRadius: "20px",
        padding: "40px 36px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        textAlign: "center",
      }}>

        {/* Логотип */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#7C3AED", letterSpacing: "3px" }}>
            MATHIC
          </span>
          <span style={{ background: "#EAB308", color: "#000", fontSize: "12px", fontWeight: 700, padding: "2px 8px", borderRadius: "6px" }}>
            β
          </span>
        </div>

        <h1 style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.3, color: "#E2E8F0" }}>
          Learn Math Through Projects
        </h1>

        <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.7 }}>
          Master mathematics the way engineers do — by building real things with code and proofs.
        </p>

        {/* Фичи */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          {[
            { icon: "📐", text: "Solve with Math or Code" },
            { icon: "🤖", text: "AI mentor that guides, not answers" },
            { icon: "⚔️", text: "Join clans, compete, grow together" },
            { icon: "🧬", text: "Personal Knowledge DNA graph" },
          ].map((f, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              background: "#0d0d1a",
              border: "1px solid #2D2D50",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#E2E8F0",
              textAlign: "left",
            }}>
              <span style={{ fontSize: "18px" }}>{f.icon}</span>
              {f.text}
            </div>
          ))}
        </div>

        {/* Кнопка Google */}
        <button
          onClick={onLogin}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #2D2D50",
            background: "#1E1E35",
            color: "#E2E8F0",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = "#7C3AED"}
          onMouseOut={(e) => e.currentTarget.style.borderColor = "#2D2D50"}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ fontSize: "12px", color: "#4A4A7A" }}>
          Free forever · No credit card required
        </p>

      </div>
    </div>
  );
}

export default LoginPage;