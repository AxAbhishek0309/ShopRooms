import { motion } from "framer-motion";
import {
  Check,
  Clock,
  MessageSquare,
  MoreHorizontal,
  Star,
  Truck,
} from "lucide-react";
import { AvatarStack } from "@/components/avatar-stack";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { users } from "@/mock/data";
import { useRoomStore } from "@/store/roomStore";
import type { Product } from "@/types";
import { formatINR } from "@/utils/format";

const priorityCls: Record<Product["priority"], string> = {
  low: "bg-secondary text-muted-foreground",
  medium: "bg-amber-400/15 text-amber-600 dark:text-amber-400",
  high: "bg-destructive/15 text-destructive",
};

export function ProductCard({ product }: { product: Product }) {
  const openDrawer = useRoomStore((s) => s.openDrawer);
  const setStatus = useRoomStore((s) => s.setStatus);
  const duplicate = useRoomStore((s) => s.duplicate);
  const remove = useRoomStore((s) => s.remove);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const assigned = users.find((u) => u.id === product.assignedToId);
  const ownerLabel =
    product.status === "reserved"
      ? users.find((u) => u.id === product.reservedById)?.name.split(" ")[0]
      : product.status === "purchased"
        ? users.find((u) => u.id === product.purchasedById)?.name.split(" ")[0]
        : undefined;

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lg"
    >
      <button
        type="button"
        onClick={() => openDrawer(product.id)}
        className="relative block aspect-[4/3] w-full overflow-hidden text-left"
        aria-label={`View ${product.name}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
        <div className="relative flex h-full items-center justify-center text-6xl drop-shadow-md transition-transform duration-500 group-hover:scale-110">
          {product.emoji}
        </div>
        <div className="absolute left-3 top-3 flex gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-white shadow">
              {discount}% OFF
            </span>
          )}
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              priorityCls[product.priority],
            )}
          >
            {product.priority}
          </span>
        </div>
        {product.status !== "pending" && (
          <div className="absolute right-3 top-3">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur",
                product.status === "purchased"
                  ? "bg-success/90 text-white"
                  : "bg-accent/90 text-white",
              )}
            >
              {product.status === "purchased" ? (
                <>
                  <Check className="h-2.5 w-2.5" /> Purchased
                </>
              ) : (
                <>Reserved</>
              )}
              {ownerLabel && ` · ${ownerLabel}`}
            </span>
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </p>
            <p className="line-clamp-2 text-sm font-semibold leading-snug">
              {product.name}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-mr-1 h-7 w-7 shrink-0 rounded-full opacity-60 group-hover:opacity-100"
                aria-label="More"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => openDrawer(product.id)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatus(product.roomId, product.id, "reserved", "u_me")}
              >
                Reserve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatus(product.roomId, product.id, "purchased", "u_me")}
              >
                Mark purchased
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => duplicate(product.roomId, product.id)}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => remove(product.roomId, product.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-mono text-base font-bold tabular-nums">
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="font-mono text-xs text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {product.rating}
            <span className="opacity-60">({product.ratingCount.toLocaleString("en-IN")})</span>
          </span>
          <span className="flex items-center gap-1">
            <Truck className="h-3 w-3" />
            {product.deliveryDays}d
          </span>
          {product.commentsCount > 0 && (
            <span className="flex items-center gap-0.5">
              <MessageSquare className="h-3 w-3" />
              {product.commentsCount}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between gap-2 border-t border-border pt-2">
          {assigned ? (
            <div className="flex items-center gap-1.5">
              <AvatarStack users={[assigned]} size="sm" max={1} />
              <span className="text-[11px] text-muted-foreground">
                {assigned.name.split(" ")[0]}
              </span>
            </div>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" /> Unassigned
            </span>
          )}
          {product.status === "pending" && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 rounded-full px-3 text-[11px]"
              onClick={() => setStatus(product.roomId, product.id, "reserved", "u_me")}
            >
              Reserve
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
