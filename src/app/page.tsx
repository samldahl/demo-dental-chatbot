"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

const EXAMPLE_PROMPTS = [
  "Show me today’s appointment schedule.",
  "How many hygiene appointments are booked this week?",
  "Do we need to reorder gloves or masks?",
  "Send a reminder to all patients with appointments tomorrow.",
  "What’s the outstanding balance for John Smith?",
  "How many new patients did we get this month?",
  "Can you generate a daily revenue report?",
  "Who is on the schedule for tomorrow’s morning shift?",
  "What insurance plans do we accept?",
  "How do I update our office hours?",
];

const MOCK_RESPONSES: Record<string, string> = {
  "Show me today’s appointment schedule.":
    "You have 12 appointments today. The first is at 8:00 AM with Jane Doe for a cleaning.",
  "How many hygiene appointments are booked this week?":
    "There are 27 hygiene appointments booked for this week.",
  "Do we need to reorder gloves or masks?":
    "You have less than 20 boxes of gloves left. Would you like to reorder now?",
  "Send a reminder to all patients with appointments tomorrow.":
    "Reminders have been sent to all patients with appointments tomorrow.",
  "What’s the outstanding balance for John Smith?":
    "John Smith has an outstanding balance of $120. Would you like to send a payment reminder?",
  "How many new patients did we get this month?":
    "You’ve added 8 new patients so far this month.",
  "Can you generate a daily revenue report?":
    "Today’s revenue is $3,200. Would you like a detailed breakdown?",
  "Who is on the schedule for tomorrow’s morning shift?":
    "Tomorrow’s morning shift: Dr. Lee, Hygienist: Maria, Assistant: Tom.",
  "What insurance plans do we accept?":
    "We accept Delta Dental, MetLife, Cigna, and Aetna.",
  "How do I update our office hours?":
    "Please provide the new office hours and I’ll update them for you.",
};

function getMockResponse(prompt: string): string {
  return (
    MOCK_RESPONSES[prompt] ||
    "Thank you for your question! Our team will get back to you soon with more information."
  );
}

export default function DentalChatbotDemo() {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([
    {
      sender: "bot",
      text: "Hi! I'm Petal, your dental business assistant. How can I help you manage your practice today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: getMockResponse(text) },
      ]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Petal AI Chatbot</h1>
        <p>Ask me anything about managing your dental practice—appointments, staff, inventory, billing, and more!</p>
        <div>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Try these example prompts:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                className={styles.examplePromptBtn}
                onClick={() => sendMessage(prompt)}
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.chatWindow}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                styles.message +
                " " +
                (msg.sender === "user" ? styles.userMsg : styles.botMsg)
              }
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className={styles.typing}>Petal is typing…</div>}
          <div ref={endOfMessagesRef} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
            setInput("");
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            autoFocus
          />
          <button type="submit" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </main>
      <footer className={styles.footer}>
        <span>
          Demo only. No real patient data. &copy; {new Date().getFullYear()} Petal Dental AI
        </span>
      </footer>
    </div>
  );
}
