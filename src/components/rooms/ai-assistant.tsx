import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, Pin, Sparkles, Wand2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { aiSuggestions, inferReply, streamReply, type AIReply } from "@/services/ai";

type Msg =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "ai"; text: string; reply?: AIReply; streaming?: boolean };

export function AIAssistant({
  budget,
  spent,
  pending,
}: {
  budget: number;
  spent: number;
  pending: number;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m_seed",
      role: "ai",
      text: "Hey — I'm your shopping copilot. Ask me anything about this room.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || thinking) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: t };
    const aiId = crypto.randomUUID();
    setMessages((m) => [...m, userMsg, { id: aiId, role: "ai", text: "", streaming: true }]);
    setInput("");
    setThinking(true);

    const reply = inferReply(t, { budget, spent, pending });
    let acc = "";
    for await (const token of streamReply(reply.intro, 12)) {
      acc += token;
      setMessages((m) => m.map((x) => (x.id === aiId ? { ...x, text: acc } : x)));
    }
    setMessages((m) => m.map((x) => (x.id === aiId ? { ...x, reply, streaming: false } : x)));
    setThinking(false);
  }

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-border bg-card/80 shadow-soft backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-[oklch(0.55_0.22_290)] text-white shadow-soft">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold leading-none">Copilot</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            {thinking ? "Thinking…" : "Ready"}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Pin">
          <Pin className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-2", m.role === "user" && "justify-end")}
            >
              {m.role === "ai" && (
                <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Bot className="h-3 w-3" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-sm bg-foreground text-background"
                    : "rounded-bl-sm bg-secondary/70",
                )}
              >
                <p>
                  {m.text}
                  {m.role === "ai" && m.streaming && (
                    <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-foreground/60 align-middle" />
                  )}
                </p>
                {m.role === "ai" && m.reply && !m.streaming && (
                  <div className="mt-2 space-y-2">
                    {m.reply.bullets && (
                      <ul className="space-y-1">
                        {m.reply.bullets.map((b, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="flex gap-1.5"
                          >
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{b}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                    {m.reply.callout && (
                      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/60 px-2 py-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {m.reply.callout.label}
                        </span>
                        <span className="font-mono text-xs font-semibold">
                          {m.reply.callout.value}
                        </span>
                      </div>
                    )}
                    {m.reply.followups && (
                      <div className="flex flex-wrap gap-1">
                        {m.reply.followups.map((f) => (
                          <button
                            key={f}
                            onClick={() => send(f)}
                            className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition hover:bg-secondary"
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {thinking && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-2">
            <div className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-accent">
              <Bot className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-secondary/70 px-3 py-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border/60 px-3 pb-3 pt-2">
        <div className="mb-2 flex flex-wrap gap-1">
          {aiSuggestions.slice(0, 3).map((s) => (
            <button
              key={s.label}
              onClick={() => send(s.prompt)}
              className="flex items-center gap-1 rounded-full border border-border/60 bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition hover:bg-secondary"
            >
              <Wand2 className="h-2.5 w-2.5" />
              {s.label}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="relative"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the copilot…"
            className="h-9 w-full rounded-xl border border-input bg-background pl-3 pr-10 text-xs outline-none ring-ring/40 transition focus:ring-2"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-lg bg-foreground text-background transition disabled:opacity-40"
            aria-label="Send"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
