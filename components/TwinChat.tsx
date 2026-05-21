"use client";

// Neo's Digital Twin chat — consolidated from broneotodak.com (2026-05-21).
// The hero/about/social-links/contact-buttons that lived on broneotodak.com
// already exist on neotodak.com's home page; this page is *just* the chat.

import { useState, useRef, useEffect, Fragment, type ReactNode } from "react";
import { Send, Loader2 } from "lucide-react";
import { sendMessage, getStats, type Message, type TwinStats } from "@/lib/twin-api";

const QUICK_PROMPTS = [
  "Who is Neo?",
  "What are you working on?",
  "What is Todak Studios?",
  "Tell me about your AI projects",
  "What's Neo's background?",
];

// Inline-render Markdown-style links, raw URLs, wa.me shortlinks, and MY
// phone numbers as clickable anchors. Lifted verbatim from the original
// ChatPage.tsx renderContent so behaviour stays consistent.
function renderContent(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s<>"')]+)|(\bwa\.me\/\d+)|(\+?60\s?1\d[-\s]?\d{3,4}[-\s]?\d{4}|\b01\d[-\s]?\d{3,4}[-\s]?\d{4}\b)/g;
  let lastIndex = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > lastIndex) {
      out.push(<Fragment key={key++}>{text.slice(lastIndex, m.index)}</Fragment>);
    }
    if (m[1]) {
      out.push(
        <a key={key++} href={m[3]} target="_blank" rel="noopener noreferrer"
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 break-all">{m[2]}</a>
      );
    } else if (m[4]) {
      out.push(
        <a key={key++} href={m[4]} target="_blank" rel="noopener noreferrer"
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 break-all">{m[4]}</a>
      );
    } else if (m[5]) {
      const url = "https://" + m[5];
      out.push(
        <a key={key++} href={url} target="_blank" rel="noopener noreferrer"
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 break-all">{m[5]}</a>
      );
    } else if (m[6]) {
      const digits = m[6].replace(/[^\d]/g, "");
      const intl = digits.startsWith("60") ? digits : "60" + digits.replace(/^0/, "");
      out.push(
        <a key={key++} href={`https://wa.me/${intl}`} target="_blank" rel="noopener noreferrer"
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 break-all">{m[6]}</a>
      );
    }
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    out.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return out;
}

export function TwinChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<TwinStats | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content, timestamp: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(newMessages);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, timestamp: Date.now() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Try again in a moment.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Slim header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
          N
        </div>
        <div>
          <h1 className="text-base font-semibold">Neo&apos;s Digital Twin</h1>
          <p className="text-xs text-muted-foreground">Powered by memory, not scripts</p>
        </div>
      </div>

      {/* Live-brain stats badge */}
      {stats && (
        <div className="flex gap-4 mb-8 text-xs text-muted-foreground">
          <span><strong className="text-foreground">{stats.facts.toLocaleString()}</strong> memories</span>
          <span><strong className="text-foreground">{stats.personality_traits}</strong> traits</span>
          <span><strong className="text-foreground">{stats.relationships}</strong> connections</span>
        </div>
      )}

      {/* Quick prompts (only when chat is empty) */}
      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-3">Ask me anything:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-4 py-2 rounded-full border border-border bg-card hover:bg-muted text-sm transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="space-y-6 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1">
                  N
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border rounded-bl-md"
                }`}
              >
                {msg.role === "assistant" ? renderContent(msg.content) : msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1">
                N
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex items-center gap-2 sticky bottom-4"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about Neo..."
          disabled={loading}
          className="flex-1 h-11 rounded-full bg-card border border-border px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <p className="text-[10px] text-muted-foreground text-center mt-3">
        neotodak.com/twin &middot; Digital Twin by Neo Todak
      </p>
    </div>
  );
}
