import { AnimatePresence, motion } from "framer-motion";
import { Image as ImageIcon, Mic, Paperclip, Pin, Search, Send, Smile } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { chatMessages as seedMessages, currentUser, users } from "@/mock/data";
import type { ChatMessage } from "@/types";
import { formatINR } from "@/utils/format";

function dayLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

const QUICK_REACTIONS = ["❤️", "🎉", "👏", "🔥", "👍"];

export function ChatPanel({ roomId }: { roomId: string }) {
  const [list, setList] = useState<ChatMessage[]>(() =>
    seedMessages.filter((m) => m.roomId === roomId),
  );
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [typing, setTyping] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [list, typing]);

  // Simulate a teammate typing
  useEffect(() => {
    const t = setTimeout(() => setTyping("Priya"), 2500);
    const t2 = setTimeout(() => setTyping(null), 5500);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const grouped = useMemo(() => {
    const filtered = query
      ? list.filter((m) => m.body?.toLowerCase().includes(query.toLowerCase()))
      : list;
    const groups: { day: string; items: ChatMessage[] }[] = [];
    filtered.forEach((m) => {
      const d = dayLabel(m.createdAt);
      const last = groups[groups.length - 1];
      if (last && last.day === d) last.items.push(m);
      else groups.push({ day: d, items: [m] });
    });
    return groups;
  }, [list, query]);

  function send() {
    if (!text.trim()) return;
    setList((l) => [
      ...l,
      {
        id: crypto.randomUUID(),
        roomId,
        author: currentUser,
        body: text.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setText("");
  }

  function addReaction(id: string, emoji: string) {
    setList((l) =>
      l.map((m) => {
        if (m.id !== id) return m;
        const rx = m.reactions ? [...m.reactions] : [];
        const i = rx.findIndex((r) => r.emoji === emoji);
        if (i >= 0) rx[i] = { ...rx[i], count: rx[i].count + 1 };
        else rx.push({ emoji, count: 1 });
        return { ...m, reactions: rx };
      }),
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5">
        <p className="text-xs font-semibold">Room Chat</p>
        <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-success">
          {users.length} members
        </span>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setShowSearch((s) => !s)}
            aria-label="Search messages"
          >
            <Search className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Pinned">
            <Pin className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {showSearch && (
        <div className="border-b border-border/60 px-3 py-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages…"
            autoFocus
            className="h-7 w-full rounded-lg border border-input bg-secondary/40 px-2 text-xs outline-none focus:bg-background"
          />
        </div>
      )}

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {grouped.map((g) => (
          <div key={g.day} className="space-y-2">
            <div className="sticky top-0 z-10 flex justify-center">
              <span className="rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
                {g.day}
              </span>
            </div>
            {g.items.map((m) => {
              const mine = m.author.id === currentUser.id;
              if (m.kind === "system") {
                return (
                  <p key={m.id} className="text-center text-[10px] text-muted-foreground">
                    · {m.body} ·
                  </p>
                );
              }
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("group flex gap-2", mine && "flex-row-reverse")}
                >
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 text-[10px] font-bold text-accent">
                    {m.author.initials}
                  </div>
                  <div className={cn("max-w-[80%]", mine && "items-end")}>
                    <div
                      className={cn(
                        "mb-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground",
                        mine && "justify-end",
                      )}
                    >
                      <span className="font-medium text-foreground/80">
                        {mine ? "You" : m.author.name.split(" ")[0]}
                      </span>
                      <span>
                        {new Date(m.createdAt).toLocaleTimeString("en-IN", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {m.kind === "item" && m.itemRef ? (
                      <div className="rounded-2xl border border-border bg-background px-3 py-2 text-xs">
                        <p className="font-medium">🛍️ {m.itemRef.title}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                          {formatINR(m.itemRef.price)}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "rounded-2xl px-3 py-2 text-xs leading-relaxed",
                          mine
                            ? "rounded-br-sm bg-foreground text-background"
                            : "rounded-bl-sm bg-secondary/70",
                        )}
                      >
                        {m.body}
                      </div>
                    )}
                    {m.reactions && m.reactions.length > 0 && (
                      <div className={cn("mt-1 flex flex-wrap gap-1", mine && "justify-end")}>
                        {m.reactions.map((r) => (
                          <span
                            key={r.emoji}
                            className="rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px]"
                          >
                            {r.emoji} {r.count}
                          </span>
                        ))}
                      </div>
                    )}
                    <div
                      className={cn(
                        "mt-1 hidden gap-0.5 group-hover:flex",
                        mine && "justify-end",
                      )}
                    >
                      {QUICK_REACTIONS.map((e) => (
                        <button
                          key={e}
                          onClick={() => addReaction(m.id, e)}
                          className="rounded-full px-1 text-xs transition hover:bg-secondary"
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="grid h-7 w-7 place-items-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
                {typing[0]}
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
                <span className="ml-1 text-[10px] text-muted-foreground">
                  {typing} is typing
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="border-t border-border/60 px-3 py-2"
      >
        <div className="flex items-end gap-1.5 rounded-xl border border-input bg-background px-2 py-1.5">
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" aria-label="Emoji">
            <Smile className="h-3.5 w-3.5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" aria-label="Attach">
            <Paperclip className="h-3.5 w-3.5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" aria-label="Image">
            <ImageIcon className="h-3.5 w-3.5" />
          </Button>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Message the room…"
            className="max-h-24 min-h-[28px] flex-1 resize-none bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" aria-label="Voice">
            <Mic className="h-3.5 w-3.5" />
          </Button>
          <button
            type="submit"
            disabled={!text.trim()}
            className="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-background disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
