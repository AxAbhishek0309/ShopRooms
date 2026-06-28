import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AvatarStack } from "@/components/avatar-stack";
import { Button } from "@/components/ui/button";
import { EVENT_META } from "@/constants/events";
import { currentUser, notifications, rooms, templates } from "@/mock/data";
import { formatDate, formatINR, fromNow } from "@/utils/format";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ShopRooms" },
      {
        name: "description",
        content:
          "Your active rooms, budgets, and team activity at a glance.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const active = rooms.filter((r) => r.status !== "completed" && r.status !== "archived");
  const totalBudget = active.reduce((s, r) => s + r.budget, 0);
  const totalSpent = active.reduce((s, r) => s + r.spent, 0);
  const collaborators = new Set(active.flatMap((r) => r.members.map((m) => m.id))).size;

  const stats = [
    { label: "Active rooms", value: active.length.toString(), trend: "+2 this month" },
    { label: "Total budget", value: formatINR(totalBudget), trend: "Across 5 events" },
    { label: "Spent so far", value: formatINR(totalSpent), trend: `${Math.round((totalSpent / totalBudget) * 100)}% utilized` },
    { label: "Collaborators", value: collaborators.toString(), trend: "+3 this week" },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Good morning, {currentUser.name.split(" ")[0]}.
            </h1>
            <p className="mt-1 text-muted-foreground">
              You have <span className="font-medium text-foreground">{active.length} active rooms</span> and{" "}
              <span className="font-medium text-foreground">
                {notifications.filter((n) => !n.read).length} unread updates
              </span>.
            </p>
          </div>
          <Button asChild className="rounded-full">
            <Link to="/rooms/new">
              <Plus className="mr-1.5 h-4 w-4" /> New Room
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight tabular-nums">
                {s.value}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-success" />
                {s.trend}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Continue rooms */}
        <section className="mt-12">
          <SectionHeader title="Continue shopping" subtitle="Pick up where you left off">
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/rooms">
                View all <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </SectionHeader>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {active.slice(0, 3).map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        </section>

        {/* Two-col: AI + Activity */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeader title="Trending templates" subtitle="What other people are planning this week" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {templates.slice(0, 4).map((t, i) => {
                const meta = EVENT_META[t.event];
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-elevated"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-soft"
                      style={{ backgroundColor: t.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold">
                        {t.name}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {t.description}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{t.itemCount} items</span>
                        <span>·</span>
                        <span className="tabular-nums">
                          ~{formatINR(t.estimatedBudget)}
                        </span>
                        <span>·</span>
                        <span>{t.uses.toLocaleString("en-IN")} uses</span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <SectionHeader title="Recent activity" subtitle="From your rooms" />
            <div className="mt-5 space-y-1 rounded-2xl border border-border bg-card p-2 shadow-soft">
              {notifications.map((n) => (
                <Link
                  key={n.id}
                  to="/notifications"
                  className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-secondary/60"
                >
                  <span
                    className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${
                      n.read ? "bg-muted" : "bg-accent"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{n.title}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {n.body}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {fromNow(n.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft to-transparent p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                AI suggestion
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                Your wedding room is 12 days behind on vendor lock-ins.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on similar weddings, we'd recommend confirming the photographer
                and mehendi artists this week. We've drafted a checklist for you.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <Link to="/rooms/r_wedding">
                    Open room <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </AppShell>
  );
}

function SectionHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function RoomCard({ room, index }: { room: (typeof rooms)[number]; index: number }) {
  const meta = EVENT_META[room.event];
  const Icon = meta.icon;
  const pct = Math.round((room.spent / room.budget) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <Link
        to="/rooms/$roomId"
        params={{ roomId: room.id }}
        className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
      >
        <div
          className="relative h-24 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${room.coverColor}, ${room.coverColor}CC)`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.3),transparent_60%)]" />
          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur">
            <Icon className="h-4 w-4" />
          </div>
          {room.pinned && (
            <span className="absolute left-4 top-4 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
              Pinned
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-base font-semibold tracking-tight">
                {room.name}
              </h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                {room.description}
              </p>
            </div>
            <AvatarStack users={room.members} max={3} size="sm" />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-mono tabular-nums">
                {formatINR(room.spent)} / {formatINR(room.budget)}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-[oklch(0.55_0.22_290)]"
                style={{ width: `${Math.min(100, pct)}%` }}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {formatDate(room.eventDate)}
            </span>
            <span>
              {room.completedItems}/{room.itemCount} items
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
