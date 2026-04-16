import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are Matlic, an AI math tutor inside the MATHIC learning platform.

Your personality:
- Friendly, encouraging, and patient
- You guide students toward answers, never just give them directly
- You ask follow-up questions to check understanding
- You celebrate small wins ("Great thinking!", "You're on the right track!")

Your rules:
- NEVER give the complete solution to a task
- Always break big problems into smaller steps
- If asked about code, explain what each line does but don't write the full solution
- Keep responses concise — 3-5 sentences max
- Always end with a guiding question to keep the student thinking

Topics you help with:
- Linear algebra (matrices, eigenvalues, vectors)
- Python and NumPy for math
- Mathematical notation and formulas
- Study strategies for math`;

function MatlicChat({ darkMode }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I'm Matlic, your math learning assistant 👋 I'm here to help you understand concepts and guide you through problems — but I won't just give you the answer. What are you working on?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const userText = input.trim();
    if (!userText) return;

    const userMsg = { id: Date.now(), role: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.text,
      }));
      history.push({ role: "user", content: userText });

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
            max_tokens: 300,
            temperature: 0.7,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...history,
            ],
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Groq error:", response.status, errText);
        throw new Error(`Status ${response.status}`);
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0]) {
        throw new Error("Empty response");
      }

      const aiText = data.choices[0].message.content;

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        text: aiText,
      }]);

    } catch (error) {
      console.error("Groq API error:", error);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        text: `Sorry, I had trouble connecting (${error.message}). Please try again.`,
      }]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={`matlic-chat ${darkMode ? "dark" : "light"}`}>

      <div className="matlic-header">
        <div className="matlic-avatar">M</div>
        <div className="matlic-title-wrap">
          <span className="matlic-title">Matlic</span>
          <span className="matlic-status">● AI Assistant · Groq</span>
        </div>
      </div>

      <div className="matlic-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.role === "user" ? "message-user" : "message-assistant"}`}
          >
            {msg.role === "assistant" && (
              <div className="message-avatar">M</div>
            )}
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}

        {isTyping && (
          <div className="message message-assistant">
            <div className="message-avatar">M</div>
            <div className="message-bubble typing-bubble">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="matlic-input-row">
        <textarea
          className="matlic-input"
          placeholder="Ask Matlic anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="matlic-send-btn"
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
        >
          ↑
        </button>
      </div>
      <p className="matlic-hint">Press Enter to send · Shift+Enter for new line</p>

    </div>
  );
}

export default MatlicChat;