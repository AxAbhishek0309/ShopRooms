import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { EVENT_META } from "@/constants/events";
import { templates } from "@/mock/data";
import { formatINR } from "@/utils/format";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — ShopRooms" },
      { name: "description", content: "Curated starting points for every occasion." },
    ],
  }),
  component: Templates,
});

function Templates() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Templates
          </h1>
          <p className="mt-1 text-muted-foreground">
            Curated starting points so you don't begin with a blank canvas.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => {
            const meta = EVENT_META[t.event];
            const Icon = meta.icon;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div
                  className="relative h-28"
                  style={{
                    background: `linear-gradient(135deg, ${t.accent}, ${t.accent}99)`,
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.3),transparent_60%)]" />
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    {t.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {t.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span>{t.itemCount} items</span>
                    <span>·</span>
                    <span className="tabular-nums">~{formatINR(t.estimatedBudget)}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      Used {t.uses.toLocaleString("en-IN")}×
                    </span>
                    <Button asChild size="sm" variant="ghost" className="rounded-full">
                      <Link to="/rooms/new">
                        Use template <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
