import type { Metadata } from "next";
import { TwinChat } from "@/components/TwinChat";

export const metadata: Metadata = {
  title: "Talk to the Twin — Neo Todak Labs",
  description:
    "Chat with Neo Todak's digital twin — memory-backed, not scripted. " +
    "Ask about projects, decisions, Todak Studios, or the AI fleet.",
  openGraph: {
    title: "Neo's Digital Twin",
    description: "Talk to my AI twin — memory-backed, not scripted.",
    type: "website",
  },
};

export default function TwinPage() {
  return (
    <>
      <header className="masthead">
        <div className="container">
          <a className="wordmark" href="/">
            <span className="block" aria-hidden="true" />
            Neo Todak <span style={{ color: "var(--accent)" }}>Labs</span>
          </a>
          <nav className="nav" aria-label="Sections">
            <a href="/#operator">The Operator</a>
            <a href="/#lab">The Lab</a>
            <a href="/#shipped">Shipped</a>
            <a href="/#contact">Contact</a>
          </nav>
          <span className="chip live">TWIN · ONLINE</span>
        </div>
      </header>
      <main style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            <span className="tick">▮</span> MEMORY-BACKED · PRIVACY-GATED · NOT A SCRIPT
          </div>
          <div
            style={{
              border: "2px solid var(--line)",
              background: "var(--surface)",
              boxShadow: "6px 6px 0 var(--ink)",
              padding: "8px 0",
            }}
          >
            <TwinChat />
          </div>
        </div>
      </main>
    </>
  );
}
