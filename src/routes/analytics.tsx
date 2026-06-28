import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  IndianRupee,
  Package,
  PiggyBank,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { rooms, users } from "@/mock/data";
import { formatINR, formatNumber } from "@/utils/format";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — ShopRooms" },
      { name: "description", content: "Spend, savings, contribution, and completion analytics across your rooms." },
    ],
  }),
  component: AnalyticsPage,
});

const monthly = [
  { m: "Jan", v: 42 },
  { m: "Feb", v: 58 },
  { m: "Mar", v: 71 },
  { m: "Apr", v: 64 },
  { m: "May", v: 88 },
  { m: "Jun", v: 96 },
  { m: "Jul", v: 73 },
];

const categories = [
  { name: "Electronics", v: 184000, color: "#3b82f6" },
  { name: "Decor", v: 142000, color: "#f97316" },
  { name: "Apparel", v: 96000, color: "#ec4899" },
  { name: "Kitchen", v: 64000, color: "#10b981" },
  { name: "Services", v: 48000, color: "#8b5cf6" },
  { name: "Gifting", v: 38000, color: "#eab308" },
];

function AnalyticsPage() {
  const totalBudget = rooms.reduce((s, r) => s + r.budget, 0);
  const totalSpent = rooms.reduce((s, r) => s + r.spent, 0);
  const utilization = Math.round((totalSpent / totalBudget) * 100);
  const completion = Math.round(
    (rooms.reduce((s, r) => s + r.completedItems, 0) /
      rooms.reduce((s, r) => s + r.itemCount, 0)) *
      100,
  );

  const stats = [
    {
      label: "Total Budget",
      value: formatINR(totalBudget),
      delta: "+12%",
      up: true,
      icon: IndianRupee,
    },
    {
      label: "Total Spent",
      value: formatINR(totalSpent),
      delta: `${utilization}% utilized`,
      up: false,
      icon: PiggyBank,
    },
    {
      label: "Items Purchased",
      value: formatNumber(rooms.reduce((s, r) => s + r.completedItems, 0)),
      delta: `${completion}% complete`,
      up: true,
      icon: CheckCircle2,
    },
    {
      label: "Active Members",
      value: formatNumber(users.length),
      delta: "+3 this week",
      up: true,
      icon: Users,
    },
  ];

  const catTotal = categories.reduce((s, c) => s + c.v, 0);
  const memberContrib = users.slice(1, 7).map((u, i) => ({
    user: u,
    pct: 28 - i * 4,
    spend: 92000 - i * 14000,
  }));

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Analytics
            </h1>
            <p className="mt-1 text-muted-foreground">
              Spend, savings, and collaboration health across all your rooms.
            </p>
          </div>
          <div className="flex gap-2 text-xs">
            {["7d", "30d", "90d", "All"].map((t, i) => (
              <button
                key={t}
                className={`rounded-full px-3 py-1.5 font-medium transition ${
                  i === 1
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold tabular-nums">
                      {s.value}
                    </p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <p
                  className={`mt-3 flex items-center gap-1 text-xs ${
                    s.up ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {s.up ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {s.delta}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* Spend over time */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-display text-base font-semibold">Spend trend</p>
                <p className="text-xs text-muted-foreground">Across all active rooms · INR thousands</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3.5 w-3.5" /> +18% vs last quarter
              </span>
            </div>
            <div className="flex h-48 items-end gap-3">
              {monthly.map((m, i) => (
                <div key={m.m} className="flex flex-1 flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${m.v}%` }}
                    transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-accent/80 to-[oklch(0.55_0.22_290)]"
                  />
                  <span className="text-[10px] text-muted-foreground">{m.m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="font-display text-base font-semibold">Category split</p>
            <p className="text-xs text-muted-foreground">Top spend categories</p>
            <div className="mt-4 space-y-2.5">
              {categories.map((c, i) => {
                const pct = Math.round((c.v / catTotal) * 100);
                return (
                  <div key={c.name}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.name}
                      </span>
                      <span className="font-mono text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.1 + i * 0.04, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Member contribution + Rooms */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-base font-semibold">Top contributors</p>
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>
            <ul className="space-y-3">
              {memberContrib.map((m, i) => (
                <li key={m.user.id} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 text-xs font-bold text-accent">
                    {m.user.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <p className="truncate font-medium">{m.user.name}</p>
                      <p className="font-mono text-muted-foreground">{formatINR(m.spend)}</p>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.pct * 3}%` }}
                        transition={{ delay: i * 0.05, duration: 0.6 }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-[oklch(0.55_0.22_290)]"
                      />
                    </div>
                  </div>
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold">
                    {m.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-base font-semibold">Room performance</p>
              <span className="text-xs text-muted-foreground">{rooms.length} rooms</span>
            </div>
            <ul className="space-y-3">
              {rooms.slice(0, 5).map((r) => {
                const pct = Math.round((r.spent / r.budget) * 100);
                const done = Math.round((r.completedItems / r.itemCount) * 100);
                return (
                  <li key={r.id} className="rounded-xl border border-border/60 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: r.coverColor }}
                        />
                        <p className="truncate text-sm font-medium">{r.name}</p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatINR(r.spent)} / {formatINR(r.budget)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="h-3 w-3" />
                        {done}% items
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {pct}% budget
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
