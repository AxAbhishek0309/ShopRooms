import { motion } from "framer-motion";
import {
  Check,
  Clock,
  ExternalLink,
  Flag,
  MessageCircle,
  Send,
  Star,
  TrendingDown,
  Truck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AvatarStack } from "@/components/avatar-stack";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CATEGORY_META } from "@/features/rooms/mockProducts";
import { cn } from "@/lib/utils";
import { users } from "@/mock/data";
import { useRoomStore } from "@/store/roomStore";
import type { Product } from "@/types";
import { formatINR, fromNow } from "@/utils/format";

export function ItemDrawer() {
  const drawerProductId = useRoomStore((s) => s.drawerProductId);
  const openDrawer = useRoomStore((s) => s.openDrawer);
  const setStatus = useRoomStore((s) => s.setStatus);
  const productsByRoom = useRoomStore((s) => s.productsByRoom);
  const product: Product | undefined = Object.values(productsByRoom)
    .flat()
    .find((p) => p.id === drawerProductId);

  return (
    <Sheet open={!!drawerProductId} onOpenChange={(v) => !v && openDrawer(null)}>
      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
        {product && <DrawerBody product={product} onPurchase={() => setStatus(product.roomId, product.id, "purchased", "u_me")} onReserve={() => setStatus(product.roomId, product.id, "reserved", "u_me")} />}
      </SheetContent>
    </Sheet>
  );
}

function DrawerBody({
  product,
  onPurchase,
  onReserve,
}: {
  product: Product;
  onPurchase: () => void;
  onReserve: () => void;
}) {
  const [comment, setComment] = useState("");
  const meta = CATEGORY_META[product.category];
  const assigned = users.find((u) => u.id === product.assignedToId);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <>
      <div
        className="relative h-56 w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative flex h-full items-center justify-center text-8xl drop-shadow-xl"
        >
          {product.emoji}
        </motion.div>
        <div className="absolute left-4 top-4 flex gap-1.5">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-foreground">
            {meta.emoji} {product.category}
          </span>
          {discount > 0 && (
            <span className="rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-white">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      <SheetHeader className="px-6 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </p>
        <SheetTitle className="font-display text-xl leading-snug">
          {product.name}
        </SheetTitle>
        <SheetDescription className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {product.rating} ({product.ratingCount.toLocaleString("en-IN")})
          </span>
          <span className="flex items-center gap-1">
            <Truck className="h-3 w-3" /> Delivery in {product.deliveryDays} days
          </span>
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-5 px-6 pb-8 pt-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold tabular-nums">
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <>
              <span className="font-mono text-sm text-muted-foreground line-through">
                {formatINR(product.mrp)}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                <TrendingDown className="h-3 w-3" />
                Save {formatINR(product.mrp - product.price)}
              </span>
            </>
          )}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 rounded-full" onClick={onPurchase}>
            <Check className="mr-1.5 h-3.5 w-3.5" /> Mark purchased
          </Button>
          <Button variant="outline" className="flex-1 rounded-full" onClick={onReserve}>
            Reserve
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open link">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        <Section title="Specifications">
          <ul className="grid grid-cols-2 gap-2 text-xs">
            <Spec label="Category" value={product.category} />
            <Spec label="Brand" value={product.brand} />
            <Spec label="Priority" value={product.priority} />
            <Spec label="Status" value={product.status} />
            <Spec label="Delivery" value={`${product.deliveryDays} days`} />
            <Spec label="Added" value={fromNow(product.createdAt)} />
          </ul>
        </Section>

        <Section title="Assigned">
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface/40 p-3">
            {assigned ? (
              <div className="flex items-center gap-2">
                <AvatarStack users={[assigned]} size="md" max={1} />
                <div>
                  <p className="text-xs font-semibold">{assigned.name}</p>
                  <p className="text-[10px] text-muted-foreground">{assigned.role}</p>
                </div>
              </div>
            ) : (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> Unassigned
              </p>
            )}
            <Button size="sm" variant="ghost" className="rounded-full">
              Change
            </Button>
          </div>
        </Section>

        <Section title="Price history">
          <PriceSparkline />
          <p className="mt-2 text-[11px] text-muted-foreground">
            Lowest in last 30 days: {formatINR(product.price)} · tracked across 4 retailers
          </p>
        </Section>

        <Section title="Alternative suggestions">
          <ul className="space-y-2">
            {[
              { name: "Similar from LG", price: product.price - 1500 },
              { name: "Premium variant", price: product.price + 4500 },
            ].map((alt) => (
              <li
                key={alt.name}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-xs"
              >
                <span>{alt.name}</span>
                <span className="font-mono font-semibold tabular-nums">
                  {formatINR(Math.max(0, alt.price))}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={`Comments (${product.commentsCount})`}>
          <div className="space-y-2">
            <Comment
              author="Priya"
              body="Found this on sale on Croma — link in chat."
              time="2h ago"
            />
            <Comment
              author="Rahul"
              body="Color should match the living room. I'm reserving for now."
              time="4h ago"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background p-2 focus-within:ring-2 focus-within:ring-ring/40">
            <MessageCircle className="ml-1 h-4 w-4 text-muted-foreground" />
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment…"
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
            <Button size="icon" className="h-7 w-7 rounded-full" disabled={!comment.trim()}>
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </Section>

        <Section title="Purchase timeline">
          <ol className="relative space-y-3 border-l border-border pl-4 text-xs">
            <TimelineItem dotCls="bg-success" label="Added to room" time={fromNow(product.createdAt)} />
            <TimelineItem
              dotCls={product.status !== "pending" ? "bg-amber-400" : "bg-muted"}
              label="Reserved"
              time={product.status !== "pending" ? "2h ago" : "Pending"}
            />
            <TimelineItem
              dotCls={product.status === "purchased" ? "bg-success" : "bg-muted"}
              label="Purchased"
              time={product.status === "purchased" ? "30m ago" : "Pending"}
            />
            <TimelineItem dotCls="bg-muted" label="Delivered" time="Awaiting" />
          </ol>
        </Section>

        <div className="rounded-xl border border-dashed border-border bg-surface/40 p-3 text-[11px] text-muted-foreground">
          <Flag className="mb-1 inline h-3 w-3" /> Notes from team appear here. Add any
          purchase context, vendor info, or warranty details.
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <li className="rounded-lg border border-border bg-surface/40 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 capitalize">{value}</p>
    </li>
  );
}

function Comment({ author, body, time }: { author: string; body: string; time: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold">{author}</p>
        <p className="text-[10px] text-muted-foreground">{time}</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
    </div>
  );
}

function TimelineItem({
  label,
  time,
  dotCls,
}: {
  label: string;
  time: string;
  dotCls: string;
}) {
  return (
    <li className="relative">
      <span className={cn("absolute -left-[1.30rem] top-0.5 h-2 w-2 rounded-full", dotCls)} />
      <p className="font-medium">{label}</p>
      <p className="text-[10px] text-muted-foreground">{time}</p>
    </li>
  );
}

function PriceSparkline() {
  const pts = [62, 58, 60, 55, 52, 48, 50, 46, 44, 47, 42, 40];
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const w = 280;
  const h = 60;
  const d = pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <svg viewBox={`0 0 ${w} ${h + 6}`} className="w-full">
        <motion.path
          d={d}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-accent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
      </svg>
      <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> 30 day trend
        </span>
        <span className="text-success">↓ 12% from peak</span>
      </div>
    </div>
  );
}
