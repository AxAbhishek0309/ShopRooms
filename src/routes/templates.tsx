import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Plus, Sparkles, TrendingUp, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { EVENT_META } from "@/constants/events";
import { templates } from "@/mock/data";
import { formatINR, formatNumber } from "@/utils/format";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — ShopRooms" },
      { name: "description", content: "Pre-curated shopping templates for weddings, housewarmings, festivals, and more." },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Templates
            </h1>
            <p className="mt-1 max-w-xl text-muted-foreground">
              Start a new room in seconds. Every template ships with curated
              products, budget ranges, and a recommended team setup.
            </p>
          </div>
          <Button asChild className="rounded-full">
            <Link to="/rooms/new">
              <Plus className="mr-1.5 h-4 w-4" /> Start blank
            </Link>
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-1.5 text-xs">
          {["All", "Trending", "Wedding", "Home", "Festival", "Office", "Birthday"].map((t, i) => (
            <button
              key={t}
              className={`rounded-full px-3 py-1 font-medium transition ${
                i === 0
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => {
            const meta = EVENT_META[t.event];
            const Icon = meta.icon;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div
                  className="relative h-32 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${t.accent}, ${meta.color}aa)`,
                  }}
                >
                  <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {meta.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-orange-600">
                      <Flame className="h-3 w-3" /> TRENDING
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {t.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {t.description}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-border/60 bg-surface/40 p-3 text-center">
                    <div>
                      <p className="font-mono text-sm font-semibold tabular-nums">
                        {t.itemCount}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Items
                      </p>
                    </div>
                    <div className="border-x border-border/60">
                      <p className="font-mono text-sm font-semibold tabular-nums">
                        {formatINR(t.estimatedBudget)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Est. budget
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold tabular-nums">
                        {formatNumber(t.uses)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Uses
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Users className="h-3 w-3" /> Team-ready
                    </span>
                    <Button asChild size="sm" className="rounded-full">
                      <Link to="/rooms/new">
                        Create room <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between rounded-3xl border border-dashed border-border bg-surface/40 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-base font-semibold">Generate a custom template with AI</p>
              <p className="text-sm text-muted-foreground">
                Describe your event — Copilot drafts a checklist, budget split, and member roles.
              </p>
            </div>
          </div>
          <Button className="rounded-full">
            <TrendingUp className="mr-1.5 h-4 w-4" /> Try Copilot
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
