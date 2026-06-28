import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  Crown,
  Flame,
  Pencil,
  Settings as SettingsIcon,
  ShoppingBag,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { currentUser, rooms } from "@/mock/data";
import { formatINR, fromNow } from "@/utils/format";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: `${currentUser.name} — ShopRooms` },
      { name: "description", content: "Profile overview, contributions, and badges across your shopping rooms." },
    ],
  }),
  component: ProfilePage,
});

const badges = [
  { name: "First Room", desc: "Created your first room", icon: ShoppingBag, color: "#3b82f6" },
  { name: "Budget Master", desc: "Stayed under budget on 5 rooms", icon: Trophy, color: "#eab308" },
  { name: "Streak 30", desc: "30 days of activity", icon: Flame, color: "#f97316" },
  { name: "Team Player", desc: "Invited 10+ members", icon: Users, color: "#10b981" },
  { name: "AI Pro", desc: "Used Copilot 50+ times", icon: Sparkles, color: "#8b5cf6" },
  { name: "Closer", desc: "Marked 100 items purchased", icon: CheckCircle2, color: "#ec4899" },
];

function ProfilePage() {
  const created = rooms.length;
  const joined = rooms.filter((r) => r.members.some((m) => m.id === currentUser.id)).length;
  const totalSpend = rooms.reduce((s, r) => s + r.spent, 0);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
        >
          <div className="h-32 bg-gradient-to-br from-accent/40 via-[oklch(0.55_0.22_290)]/30 to-card" />
          <div className="-mt-12 px-6 pb-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-accent to-[oklch(0.55_0.22_290)] text-2xl font-bold text-white shadow-lg ring-4 ring-background">
                  {currentUser.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-2xl font-semibold tracking-tight">
                      {currentUser.name}
                    </h1>
                    <span className="flex items-center gap-1 rounded-full bg-yellow-500/15 px-2 py-0.5 text-[10px] font-semibold text-yellow-600">
                      <Crown className="h-3 w-3" /> Pro
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{currentUser.email}</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Planning weddings, housewarmings, and the occasional pantry restock. Coordinating
                    teams across Mumbai & Bangalore.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                </Button>
                <Button asChild variant="ghost" size="sm" className="rounded-full">
                  <Link to="/settings">
                    <SettingsIcon className="mr-1.5 h-3.5 w-3.5" /> Settings
                  </Link>
                </Button>
                <ThemeToggle />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Rooms created", value: created },
                { label: "Rooms joined", value: joined },
                { label: "Spend orchestrated", value: formatINR(totalSpend) },
                { label: "Contribution", value: "92%" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-border/60 bg-surface/40 p-3">
                  <p className="font-display text-lg font-semibold tabular-nums">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        <section className="mt-6">
          <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
            <Award className="h-4 w-4" /> Achievements
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
                    style={{ background: `${b.color}22`, color: b.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Activity */}
        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h3 className="mb-3 font-display text-base font-semibold">Recent rooms</h3>
            <ul className="space-y-2">
              {rooms.slice(0, 4).map((r) => (
                <li key={r.id}>
                  <Link
                    to="/rooms/$roomId"
                    params={{ roomId: r.id }}
                    className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition hover:border-accent/40"
                  >
                    <span
                      className="h-9 w-9 shrink-0 rounded-xl"
                      style={{ background: r.coverColor }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{r.name}</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        Updated {fromNow(r.updatedAt)} · {r.members.length} members
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h3 className="mb-3 font-display text-base font-semibold">Activity timeline</h3>
            <ol className="space-y-3 border-l border-border pl-4">
              {[
                "Marked 3 items purchased in Wedding",
                "Invited Meera to Housewarming",
                "Updated budget to ₹8.5L",
                "Joined Diwali Shopping 2026",
                "Created Office Pantry Refresh",
              ].map((t, i) => (
                <li key={i} className="relative text-xs">
                  <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
                  <p className="font-medium">{t}</p>
                  <p className="text-[10px] text-muted-foreground">{i + 1}d ago</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
