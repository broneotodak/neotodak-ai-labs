// Twin chat API — talks to clauden.neotodak.com, which reads from neo-brain.
// Ported from neo-grid-nexus/src/lib/api.ts during the 2026-05-21 consolidation
// of broneotodak.com into neotodak.com/twin (option A — one canonical site).

const TWIN_API = "https://clauden.neotodak.com/api";

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface TwinStats {
  facts: number;
  relationships: number;
  personality_traits: number;
}

export async function sendMessage(messages: Message[]): Promise<string> {
  // /api/ai on clauden has built-in digital twin fallback against neo-brain
  // (Phase 2 Step 5 of project_rag_upgrade landed this — server-side service-role).
  const res = await fetch(`${TWIN_API}/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      model: "gpt-4o-mini",
      fallbackToTwin: true,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to get response");
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "I couldn't process that. Try again?";
}

export async function getStats(): Promise<TwinStats | null> {
  try {
    const res = await fetch(`${TWIN_API}/twin`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.stats || null;
  } catch {
    return null;
  }
}
