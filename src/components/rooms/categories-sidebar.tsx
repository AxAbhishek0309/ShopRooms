import { Search } from "lucide-react";
import { CATEGORY_META, PRODUCT_CATEGORIES } from "@/features/rooms/mockProducts";
import { cn } from "@/lib/utils";
import { useRoomStore } from "@/store/roomStore";
import type { Product, ProductCategory } from "@/types";

export function CategoriesSidebar({
  products,
  activeCategory,
  onSelectCategory,
}: {
  products: Product[];
  activeCategory: ProductCategory | "all";
  onSelectCategory: (c: ProductCategory | "all") => void;
}) {
  const search = useRoomStore((s) => s.search);
  const setSearch = useRoomStore((s) => s.setSearch);
  const counts = PRODUCT_CATEGORIES.reduce<Record<string, number>>((acc, c) => {
    acc[c] = products.filter((p) => p.category === c).length;
    return acc;
  }, {});

  return (
    <aside className="hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col border-r border-border bg-surface/40 xl:flex">
      <div className="border-b border-border p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="h-8 w-full rounded-lg border border-input bg-background pl-8 pr-2 text-xs outline-none ring-ring/40 focus:ring-2"
          />
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2 text-sm">
        <button
          onClick={() => onSelectCategory("all")}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors",
            activeCategory === "all"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-secondary",
          )}
        >
          <span className="font-medium">All categories</span>
          <span className="opacity-70">{products.length}</span>
        </button>
        {PRODUCT_CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c];
          const active = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => onSelectCategory(c)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{meta.emoji}</span>
                <span className="font-medium">{c}</span>
              </span>
              <span className="rounded-full bg-background px-1.5 text-[10px] tabular-nums">
                {counts[c] ?? 0}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
