import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CATEGORY_META, PRODUCT_CATEGORIES } from "@/features/rooms/mockProducts";
import type { Product } from "@/types";
import { formatINR } from "@/utils/format";

export function BudgetWidget({
  budget,
  products,
}: {
  budget: number;
  products: Product[];
}) {
  const spent = products
    .filter((p) => p.status === "purchased")
    .reduce((s, p) => s + p.price, 0);
  const reserved = products
    .filter((p) => p.status === "reserved")
    .reduce((s, p) => s + p.price, 0);
  const remaining = Math.max(0, budget - spent - reserved);
  const totalMRP = products.reduce((s, p) => s + p.mrp, 0);
  const totalPrice = products.reduce((s, p) => s + p.price, 0);
  const savings = Math.max(0, totalMRP - totalPrice);

  const spentPct = (spent / budget) * 100;
  const reservedPct = (reserved / budget) * 100;
  const counted = Math.min(100, spentPct + reservedPct);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dash = (counted / 100) * circumference;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Budget
        </p>
        <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          On track
        </span>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-32 w-32 shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="10"
              className="stroke-secondary"
            />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className="stroke-accent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - dash }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Counter value={Math.round(counted)} suffix="%" />
            <p className="text-[10px] text-muted-foreground">used</p>
          </div>
        </div>
        <div className="flex-1 space-y-1.5 text-xs">
          <Row label="Budget" value={formatINR(budget)} />
          <Row label="Spent" value={formatINR(spent)} dot="bg-accent" />
          <Row label="Reserved" value={formatINR(reserved)} dot="bg-amber-400" />
          <Row label="Remaining" value={formatINR(remaining)} dot="bg-success" emphasize />
          <Row label="Saved" value={formatINR(savings)} subtle />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          By category
        </p>
        {PRODUCT_CATEGORIES.map((c) => {
          const subset = products.filter((p) => p.category === c);
          if (subset.length === 0) return null;
          const total = subset.reduce((s, p) => s + p.price, 0);
          const pct = budget > 0 ? Math.min(100, (total / budget) * 100) : 0;
          const meta = CATEGORY_META[c];
          return (
            <div key={c}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span>{meta.emoji}</span>
                  <span className="text-muted-foreground">{c}</span>
                </span>
                <span className="font-mono tabular-nums text-muted-foreground">
                  {formatINR(total)}
                </span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${meta.gradient[0]}, ${meta.gradient[1]})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  dot,
  emphasize,
  subtle,
}: {
  label: string;
  value: string;
  dot?: string;
  emphasize?: boolean;
  subtle?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
        {label}
      </span>
      <span
        className={
          subtle
            ? "font-mono text-[11px] text-muted-foreground"
            : emphasize
              ? "font-mono font-semibold tabular-nums"
              : "font-mono tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <span className="font-display text-2xl font-bold tabular-nums">
      {v}
      {suffix}
    </span>
  );
}
