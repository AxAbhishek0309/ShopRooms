import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/rooms/product-card";
import { cn } from "@/lib/utils";
import { useRoomStore } from "@/store/roomStore";
import type { Product, ProductCategory } from "@/types";
import { CATEGORY_META } from "@/features/rooms/mockProducts";
import { formatINR } from "@/utils/format";

export function CategorySection({
  roomId,
  category,
  products,
}: {
  roomId: string;
  category: ProductCategory;
  products: Product[];
}) {
  const key = `${roomId}|${category}`;
  const collapsed = useRoomStore((s) => s.collapsed[key]);
  const toggle = useRoomStore((s) => s.toggleCategory);
  const meta = CATEGORY_META[category];
  const subtotal = products.reduce((s, p) => s + p.price, 0);
  const purchased = products.filter((p) => p.status === "purchased").length;

  return (
    <section className="rounded-2xl border border-border bg-surface/30">
      <button
        type="button"
        onClick={() => toggle(roomId, category)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
            style={{
              background: `linear-gradient(135deg, ${meta.gradient[0]}, ${meta.gradient[1]})`,
            }}
          >
            <span className="drop-shadow">{meta.emoji}</span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">
              {category}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {products.length} items · {purchased} done · {formatINR(subtotal)}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            collapsed && "-rotate-90",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
