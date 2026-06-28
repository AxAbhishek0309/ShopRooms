/**
 * Mock AI service. UI-ready; swap with FastAPI streaming + LLM call later.
 * The shape (streamReply, suggestions, command parsing) is intentionally
 * stable so the chat panel UI does not change when wiring real models.
 */
import { formatINR } from "@/utils/format";

export type AIChip = { label: string; prompt: string };

export const aiSuggestions: AIChip[] = [
  { label: "Generate wedding checklist", prompt: "Generate a wedding checklist for 320 guests" },
  { label: "What are we missing?", prompt: "What essentials are still missing in this room?" },
  { label: "Find cheaper refrigerator", prompt: "Find a cheaper refrigerator alternative" },
  { label: "Keep budget under ₹75,000", prompt: "Keep budget under ₹75,000 and suggest cuts" },
  { label: "Suggest gifts for parents", prompt: "Suggest premium gifts for parents under ₹15,000" },
  { label: "Summarize recent activity", prompt: "Summarize the last 24h of activity" },
];

export type AIReply = {
  intro: string;
  bullets?: string[];
  followups?: string[];
  callout?: { label: string; value: string };
};

/** Realistic canned responses keyed by intent keywords. */
export function inferReply(prompt: string, ctx: { budget: number; spent: number; pending: number }): AIReply {
  const p = prompt.toLowerCase();
  const remaining = ctx.budget - ctx.spent;
  if (p.includes("checklist") || p.includes("wedding")) {
    return {
      intro: "Here's a tight wedding checklist tailored to 320 guests, split into priority tiers.",
      bullets: [
        "Sangeet stage & lighting (booked ✓)",
        "Mandap floral arrangement (locked with Dadar florist)",
        "Welcome hampers — 320 units, brass diya + dry fruits",
        "Mehendi artists — 3 stations × 4 hours",
        "Photo booth backdrop + props",
        "Catering tasting slot — block this Saturday",
      ],
      followups: ["Add all to room", "Split by family", "Estimate cost"],
      callout: { label: "Est. cost", value: formatINR(287000) },
    };
  }
  if (p.includes("missing") || p.includes("essentials")) {
    return {
      intro: "Based on similar wedding rooms, you're missing a few common essentials.",
      bullets: [
        "Bridal entry music — DJ shortlist",
        "Guest transport (airport pickups for 18 guests)",
        "Backup generator at venue",
        "Stage anchor / MC for sangeet",
      ],
      followups: ["Add all", "Skip transport", "Get vendor quotes"],
    };
  }
  if (p.includes("cheaper") || p.includes("alternative")) {
    return {
      intro: "Found 3 cheaper alternatives that match your style and reviews ≥ 4.3.",
      bullets: [
        "LG 260L Frost-Free — ₹24,990 (save ₹8,010)",
        "Samsung 253L Convertible — ₹26,490 (save ₹6,510)",
        "Whirlpool 240L Intellisense — ₹22,790 (save ₹10,210)",
      ],
      followups: ["Swap in room", "Compare specs", "Show reviews"],
      callout: { label: "Best save", value: formatINR(10210) },
    };
  }
  if (p.includes("budget") || p.includes("under")) {
    return {
      intro: `You have ${formatINR(remaining)} left. Here's how to stay on track.`,
      bullets: [
        "Move sangeet lighting from premium to standard tier — save ₹18,000",
        "Negotiate florist quote, target 8% off — save ₹3,600",
        "Defer photo booth props to last week — frees ₹22,000 now",
      ],
      followups: ["Apply all", "Apply top 1", "Show breakdown"],
      callout: { label: "Projected save", value: formatINR(43600) },
    };
  }
  if (p.includes("activity") || p.includes("summary") || p.includes("summarize")) {
    return {
      intro: "Last 24h summary across all members.",
      bullets: [
        "Priya added 4 items, reserved 1 (Air Fryer)",
        "Rahul confirmed sangeet lighting payment",
        "Meera joined the room and picked mehendi coordination",
        "Budget moved from 46% → 48% utilised",
      ],
      followups: ["Send digest to email", "Pin summary"],
    };
  }
  if (p.includes("gift") || p.includes("brand")) {
    return {
      intro: "Curated gift ideas in the ₹8k–₹15k band — premium but practical.",
      bullets: [
        "Bose SoundLink Flex — ₹14,900",
        "Fossil Gen 6 Smartwatch — ₹13,995",
        "Le Creuset Stoneware Set — ₹11,200",
        "Diptyque Baies Candle (190g) — ₹8,700",
      ],
      followups: ["Add all to room", "Group as hamper"],
    };
  }
  return {
    intro: "On it. Here's what I'd do next based on the room context.",
    bullets: [
      "Lock the top 3 pending items by Sunday",
      "Confirm vendor payment terms (Net-7 vs Net-15)",
      "Share a recap with the WhatsApp family group",
    ],
    followups: ["Generate recap", "Draft a message"],
  };
}

/** Simulate token streaming for the typing animation. */
export async function* streamReply(text: string, ms = 14) {
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    await new Promise((r) => setTimeout(r, ms + Math.random() * 24));
    yield (i === 0 ? "" : " ") + words[i];
  }
}
