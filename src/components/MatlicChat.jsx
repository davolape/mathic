import { useState, useRef, useEffect } from "react";

// Системный промпт — объясняет AI как себя вести
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
    const text = input.trim();
    if (!text) return;

    // Добавляем сообщение пользователя
    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Готовим историю сообщений для API
      // Groq ожидает массив {role, content}
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.text,
      }));

      // Добавляем новое сообщение пользователя
      history.push({ role: "user", content: text });

      // Отправляем запрос к Groq API
      const response = await fetch(
        "/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Берём ключ из .env файла
            Authorization: `Bearer ${process.env.REACT_APP_GROQ_KEY}`,
          },
          body: JSON.stringify({
            // Используем быструю модель Llama
            model: "llama-3.3-70b-versatile",
            messages: [
              // Сначала системный промпт
              { role: "system", content: SYSTEM_PROMPT },
              // Затем история переписки
              ...history,
            ],
            // Максимум 300 токенов — чтобы ответы были короткими
            max_tokens: 300,
            // temperature — насколько "творческий" AI
            // 0 = точный, 1 = творческий. 0.7 — хороший баланс
            temperature: 0.7,
          }),
        }
      );

      // Парсим ответ
      const data = await response.json();
      

      // Временно — смотрим что вернул Groq
      console.log("Groq response:", data);
      console.log("Groq error detail:", JSON.stringify(data.error));
      // Достаём текст ответа из структуры Groq
      const aiText = data.choices[0].message.content;

      const assistantMsg = {
        id: Date.now() + 1,
        role: "assistant",
        text: aiText,
      };

      setMessages((prev) => [...prev, assistantMsg]);

    } catch (error) {
      // Если что-то пошло не так — показываем ошибку
      console.error("Groq API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Sorry, I had trouble connecting. Please check your API key in the .env file and try again.",
        },
      ]);
    } finally {
      // В любом случае убираем анимацию печатания
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