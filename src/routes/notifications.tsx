import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AtSign,
  Bell,
  CheckCheck,
  Gift,
  PiggyBank,
  ShoppingBag,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { notifications as seed } from "@/mock/data";
import type { AppNotification } from "@/types";
import { fromNow } from "@/utils/format";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — ShopRooms" },
      { name: "description", content: "Mentions, budget alerts, invites and AI recommendations in one place." },
    ],
  }),
  component: NotificationsPage,
});

const extra: AppNotification[] = [
  {
    id: "n_5",
    title: "Duplicate detected",
    body: "Air Fryer was added twice. Tap to merge.",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    read: false,
    kind: "system",
    roomId: "r_wedding",
  },
  {
    id: "n_6",
    title: "AI recommendation",
    body: "Copilot found 3 cheaper alternatives for the refrigerator.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    kind: "system",
    roomId: "r_housewarming",
  },
  {
    id: "n_7",
    title: "Deadline approaching",
    body: "Diwali Shopping 2026 has 4 unpurchased items, 12 days left.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    read: true,
    kind: "budget",
    roomId: "r_diwali",
  },
];

const ICON: Record<AppNotification["kind"], typeof Bell> = {
  mention: AtSign,
  purchase: ShoppingBag,
  invite: UserPlus,
  budget: PiggyBank,
  system: Sparkles,
};

const FILTERS = ["All", "Unread", "Budget", "AI", "Members", "Purchases"] as const;

function NotificationsPage() {
  const [items, setItems] = useState<AppNotification[]>([...seed, ...extra]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = items.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Budget") return n.kind === "budget";
    if (filter === "AI") return n.kind === "system" && n.title.toLowerCase().includes("ai");
    if (filter === "Members") return n.kind === "invite" || n.kind === "mention";
    if (filter === "Purchases") return n.kind === "purchase";
    return true;
  });

  const markAll = () => setItems((l) => l.map((n) => ({ ...n, read: true })));

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Notifications
            </h1>
            <p className="mt-1 text-muted-foreground">
              {items.filter((i) => !i.read).length} unread · stay in sync with your rooms.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={markAll} className="rounded-full">
            <CheckCheck className="mr-1.5 h-4 w-4" /> Mark all read
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition",
                filter === f
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:bg-secondary",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-surface/40 py-16 text-center">
              <Gift className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">You're all caught up.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                New activity will appear here in real time.
              </p>
            </div>
          )}
          {filtered.map((n, i) => {
            const Icon = ICON[n.kind];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "group flex items-start gap-3 rounded-2xl border bg-card p-4 transition hover:border-accent/40 hover:shadow-soft",
                  n.read ? "border-border" : "border-accent/30 bg-accent/[0.03]",
                )}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {fromNow(n.createdAt)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                  {n.roomId && (
                    <Link
                      to="/rooms/$roomId"
                      params={{ roomId: n.roomId }}
                      className="mt-2 inline-block text-[11px] font-medium text-accent hover:underline"
                    >
                      Open room →
                    </Link>
                  )}
                </div>
                {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
