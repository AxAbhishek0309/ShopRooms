import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Filter,
  Hash,
  MoreHorizontal,
  Paperclip,
  Plus,
  Send,
  Settings,
  Share2,
  ShoppingBag,
  Smile,
  ThumbsUp,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AvatarStack } from "@/components/avatar-stack";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EVENT_META } from "@/constants/events";
import { cn } from "@/lib/utils";
import {
  chatMessages,
  currentUser,
  rooms,
  shoppingItems,
} from "@/mock/data";
import type { ChatMessage } from "@/types";
import { formatDate, formatINR, fromNow } from "@/utils/format";

export const Route = createFileRoute("/rooms/$roomId")({
  loader: ({ params }) => {
    const room = rooms.find((r) => r.id === params.roomId);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.room.name ?? "Room"} — ShopRooms` },
      {
        name: "description",
        content:
          loaderData?.room.description ??
          "A collaborative shopping room on ShopRooms.",
      },
    ],
  }),
  component: RoomView,
});

function RoomView() {
  const { room } = Route.useLoaderData();
  const items = useMemo(
    () => shoppingItems.filter((i) => i.roomId === room.id),
    [room.id],
  );
  const meta = EVENT_META[room.event as keyof typeof EVENT_META];
  const Icon = meta.icon;
  const pct = Math.round((room.spent / room.budget) * 100);

  const [filter, setFilter] = useState<"all" | "suggested" | "approved" | "purchased">("all");
  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <AppShell>
      {/* Room header */}
      <div className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
          </Link>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
            <div className="flex min-w-0 items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-soft"
                style={{ backgroundColor: room.coverColor }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {room.name}
                  </h1>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
                    {room.status}
                  </span>
                </div>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  {room.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(room.eventDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    {meta.label}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {room.members.length} members
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AvatarStack users={room.members} size="md" max={5} />
              <Button size="sm" variant="outline" className="rounded-full">
                <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Invite
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Budget bar */}
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <BudgetStat label="Budget" value={formatINR(room.budget)} />
            <BudgetStat label="Spent" value={formatINR(room.spent)} accent />
            <BudgetStat
              label="Remaining"
              value={formatINR(room.budget - room.spent)}
            />
            <BudgetStat label="Items" value={`${room.completedItems}/${room.itemCount}`} />
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, pct)}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-accent to-[oklch(0.55_0.22_290)]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        {/* Main column */}
        <div className="min-w-0">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="bg-transparent p-0 gap-1">
              <TabsTrigger
                value="items"
                className="rounded-full px-4 data-[state=active]:bg-secondary data-[state=active]:shadow-none"
              >
                Shopping list
              </TabsTrigger>
              <TabsTrigger
                value="board"
                className="rounded-full px-4 data-[state=active]:bg-secondary data-[state=active]:shadow-none"
              >
                Board
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className="rounded-full px-4 data-[state=active]:bg-secondary data-[state=active]:shadow-none"
              >
                Files
              </TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="mt-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {(["all", "suggested", "approved", "purchased"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                        filter === f
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-secondary",
                      )}
                    >
                      {f}
                      <span className="ml-1.5 opacity-60">
                        {f === "all"
                          ? items.length
                          : items.filter((i) => i.status === f).length}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="rounded-full">
                    <Filter className="mr-1.5 h-3.5 w-3.5" /> Filter
                  </Button>
                  <Button size="sm" className="rounded-full">
                    <Plus className="mr-1.5 h-3.5 w-3.5" /> Add item
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {filtered.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-border bg-surface/40 py-12 text-center">
                    <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">No items here yet</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Add the first item to get started.
                    </p>
                  </div>
                )}
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-border-strong hover:shadow-soft"
                  >
                    <StatusPill status={item.status} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {item.title}
                        </p>
                        <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {item.category}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Added by {item.addedBy.name.split(" ")[0]} ·{" "}
                        {fromNow(item.createdAt)}
                        {item.assignedTo && ` · Assigned to ${item.assignedTo.name.split(" ")[0]}`}
                      </p>
                    </div>
                    <button className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary">
                      <ThumbsUp className="h-3 w-3" />
                      <span className="tabular-nums">{item.votes}</span>
                    </button>
                    <div className="hidden text-right sm:block">
                      <p className="font-mono text-sm font-semibold tabular-nums">
                        {formatINR(item.estimatedPrice)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        × {item.quantity}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="board" className="mt-5">
              <BoardView items={items} />
            </TabsContent>

            <TabsContent value="files" className="mt-5">
              <div className="rounded-2xl border border-dashed border-border bg-surface/40 py-16 text-center">
                <Paperclip className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">No files yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Drop receipts, invoices, and inspiration here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right rail: chat */}
        <aside className="min-w-0">
          <ChatPanel room={room} />
        </aside>
      </div>
    </AppShell>
  );
}

function BudgetStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-display text-lg font-semibold tabular-nums",
          accent && "text-accent",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; icon?: React.ReactNode }> = {
    suggested: { label: "Suggested", cls: "bg-amber-400/15 text-amber-600 dark:text-amber-400" },
    approved: { label: "Approved", cls: "bg-accent/15 text-accent" },
    purchased: { label: "Done", cls: "bg-success/15 text-success", icon: <CheckCircle2 className="h-3 w-3" /> },
    rejected: { label: "Rejected", cls: "bg-destructive/15 text-destructive" },
  };
  const m = map[status] ?? map.suggested;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
        m.cls,
      )}
    >
      {m.icon}
      {m.label}
    </span>
  );
}

function BoardView({ items }: { items: typeof shoppingItems }) {
  const cols = [
    { key: "suggested", title: "Suggested" },
    { key: "approved", title: "Approved" },
    { key: "purchased", title: "Purchased" },
  ] as const;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cols.map((c) => {
        const subset = items.filter((i) => i.status === c.key);
        return (
          <div key={c.key} className="rounded-2xl border border-border bg-surface/40 p-3">
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-sm font-semibold">{c.title}</p>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {subset.length}
              </span>
            </div>
            <div className="space-y-2">
              {subset.map((i) => (
                <div
                  key={i.id}
                  className="rounded-xl border border-border bg-card p-3 shadow-soft"
                >
                  <p className="text-sm font-medium">{i.title}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {i.category}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <AvatarStack users={[i.addedBy]} size="sm" max={1} />
                    <span className="font-mono text-xs font-semibold tabular-nums">
                      {formatINR(i.estimatedPrice)}
                    </span>
                  </div>
                </div>
              ))}
              {subset.length === 0 && (
                <p className="px-2 py-6 text-center text-xs text-muted-foreground">
                  Nothing here yet.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChatPanel({ room }: { room: (typeof rooms)[number] }) {
  const initial = useMemo(
    () => chatMessages.filter((m) => m.roomId === room.id),
    [room.id],
  );
  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const [draft, setDraft] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!draft.trim()) return;
    const next: ChatMessage = {
      id: `m_${Date.now()}`,
      roomId: room.id,
      author: currentUser,
      body: draft.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, next]);
    setDraft("");
    requestAnimationFrame(() => {
      scrollerRef.current?.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  return (
    <div className="sticky top-20 flex h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="font-display text-sm font-semibold">Room chat</p>
          <p className="text-[11px] text-muted-foreground">
            {room.members.length} members · {messages.length} messages
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Live
        </span>
      </div>

      <div ref={scrollerRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m) => {
          if (m.kind === "system") {
            return (
              <div key={m.id} className="text-center text-[11px] text-muted-foreground">
                <span className="rounded-full bg-secondary px-3 py-1">{m.body}</span>
              </div>
            );
          }
          if (m.kind === "item" && m.itemRef) {
            return (
              <div key={m.id} className="flex items-start gap-2.5">
                <AvatarStack users={[m.author]} size="sm" max={1} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-muted-foreground">
                    {m.author.name.split(" ")[0]} added an item
                  </p>
                  <div className="mt-1 flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">
                        {m.itemRef.title}
                      </p>
                      <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        {formatINR(m.itemRef.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          const mine = m.author.id === currentUser.id;
          return (
            <div
              key={m.id}
              className={cn("flex items-start gap-2.5", mine && "flex-row-reverse")}
            >
              {!mine && <AvatarStack users={[m.author]} size="sm" max={1} />}
              <div className={cn("min-w-0 max-w-[80%]", mine && "items-end")}>
                {!mine && (
                  <div className="mb-0.5 flex items-baseline gap-2">
                    <p className="text-[11px] font-medium">{m.author.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {fromNow(m.createdAt)}
                    </p>
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    mine
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm",
                  )}
                >
                  {m.body}
                </div>
                {m.reactions && m.reactions.length > 0 && (
                  <div className={cn("mt-1 flex gap-1", mine && "justify-end")}>
                    {m.reactions.map((r) => (
                      <span
                        key={r.emoji}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-1.5 py-0.5 text-[10px]"
                      >
                        <span>{r.emoji}</span>
                        <span className="tabular-nums text-muted-foreground">
                          {r.count}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 focus-within:ring-2 focus-within:ring-ring/40">
          <button
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
            aria-label="Attach"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Message the room…"
            rows={1}
            className="max-h-32 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
            aria-label="Emoji"
          >
            <Smile className="h-4 w-4" />
          </button>
          <Button
            size="icon"
            onClick={send}
            disabled={!draft.trim()}
            className="h-8 w-8 shrink-0 rounded-full"
            aria-label="Send message"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
