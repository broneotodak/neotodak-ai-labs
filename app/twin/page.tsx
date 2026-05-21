import type { Metadata } from "next";
import { TwinChat } from "@/components/TwinChat";

export const metadata: Metadata = {
  title: "Neo's Digital Twin | NEOTODAK",
  description:
    "Chat with Neo Todak's digital twin — memory-backed, not scripted. " +
    "Ask about projects, decisions, Todak Studios, or AI agentic work.",
  openGraph: {
    title: "Neo's Digital Twin",
    description: "Talk to my AI twin — memory-backed, not scripted.",
    type: "website",
  },
};

export default function TwinPage() {
  return <TwinChat />;
}
