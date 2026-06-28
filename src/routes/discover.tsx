import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Flame,
  Heart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { EVENT_META } from "@/constants/events";
import { rooms, templates } from "@/mock/data";
import { formatINR, formatNumber } from "@/utils/format";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — ShopRooms" },
      { name: "description", content: "Trending shopping rooms, seasonal inspiration, and featured templates." },
    ],
  }),
  component: DiscoverPage,
});

const seasonal = [
  { tag: "Monsoon Ready", desc: "Umbrellas, raincoats, dehumidifiers", color: "#0ea5e9", emoji: "🌧️" },
  { tag: "Wedding Season", desc: "Sangeet, mandap, hampers", color: "#f97316", emoji: "💐" },
  { tag: "Diwali 2026", desc: "Diyas, sweets, gifts", color: "#eab308", emoji: "🪔" },
  { tag: "New Home", desc: "Move-in essentials, decor", color: "#10b981", emoji: "🏠" },
];

const products = [
  { name: "Samsung 4K QLED TV", brand: "Samsung", price: 64990, emoji: "📺", g: ["#3b82f6", "#1e3a8a"] },
  { name: "Sony WH-1000XM5", brand: "Sony", price: 29990, emoji: "🎧", g: ["#8b5cf6", "#581c87"] },
  { name: "Dyson V12 Detect", brand: "Dyson", price: 49900, emoji: "🌀", g: ["#ec4899", "#831843"] },
  { name: "Le Creuset Dutch Oven", brand: "Le Creuset", price: 18500, emoji: "🍲", g: ["#f97316", "#7c2d12"] },
  { name: "Bose Soundlink Flex", brand: "Bose", price: 14900, emoji: "🔊", g: ["#10b981", "#064e3b"] },
  { name: "Diptyque Baies 190g", brand: "Diptyque", price: 8700, emoji: "🕯️", g: ["#eab308", "#713f12"] },
];

function DiscoverPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/20 via-card to-card p-8 shadow-soft"
        >
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                <Compass className="h-3 w-3" /> Discover
              </span>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Inspiration that ships with a checklist.
              </h1>
              <p className="mt-2 text-muted-foreground">
                Trending rooms, seasonal collections, and the products other
                teams are buying right now.
              </p>
            </div>
            <Button asChild className="rounded-full">
              <Link to="/templates">
                Browse templates <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Seasonal */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Seasonal picks</h2>
            <span className="text-xs text-muted-foreground">Updated weekly</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {seasonal.map((s, i) => (
              <motion.div
                key={s.tag}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div
                  className="mb-3 grid h-12 w-12 place-items-center rounded-2xl text-2xl"
                  style={{ background: `${s.color}22` }}
                >
                  {s.emoji}
                </div>
                <p className="font-display text-base font-semibold">{s.tag}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Rooms */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Flame className="h-4 w-4 text-orange-500" /> Trending rooms
            </h2>
            <Link to="/rooms" className="text-xs font-medium text-accent hover:underline">
              See all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 3).map((r, i) => {
              const meta = EVENT_META[r.event];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
                >
                  <div
                    className="h-24"
                    style={{ background: `linear-gradient(135deg, ${r.coverColor}, ${meta.color}aa)` }}
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `${r.coverColor}22`, color: r.coverColor }}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{r.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{r.description}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {r.members.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {formatNumber(120 + i * 80)}
                      </span>
                      <span className="font-mono">{formatINR(r.budget)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Trending products */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <TrendingUp className="h-4 w-4 text-accent" /> What teams are buying
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5"
              >
                <div
                  className="grid h-24 place-items-center text-4xl"
                  style={{ background: `linear-gradient(135deg, ${p.g[0]}, ${p.g[1]})` }}
                >
                  {p.emoji}
                </div>
                <div className="p-3">
                  <p className="truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                    {p.brand}
                  </p>
                  <p className="truncate text-xs font-medium">{p.name}</p>
                  <p className="mt-1 font-mono text-xs font-semibold tabular-nums">
                    {formatINR(p.price)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured templates */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Sparkles className="h-4 w-4 text-accent" /> Featured templates
            </h2>
            <Link to="/templates" className="text-xs font-medium text-accent hover:underline">
              See all →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {templates.slice(0, 3).map((t) => (
              <Link
                key={t.id}
                to="/templates"
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:border-accent/40"
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white"
                  style={{ background: t.accent }}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
