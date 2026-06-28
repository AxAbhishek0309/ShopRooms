import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Download,
  Filter,
  Mic,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AvatarStack } from "@/components/avatar-stack";
import { ActivityFeed } from "@/components/rooms/activity-feed";
import { BudgetWidget } from "@/components/rooms/budget-widget";
import { CategoriesSidebar } from "@/components/rooms/categories-sidebar";
import { CategorySection } from "@/components/rooms/category-section";
import { DuplicateWarning } from "@/components/rooms/duplicate-warning";
import { InviteDialog } from "@/components/rooms/invite-dialog";
import { ItemDrawer } from "@/components/rooms/item-drawer";
import { MemberRail } from "@/components/rooms/member-rail";
import { QuickActionsFab } from "@/components/rooms/quick-actions-fab";
import { ShareDialog } from "@/components/rooms/share-dialog";
import { Button } from "@/components/ui/button";
import { EVENT_META } from "@/constants/events";
import { roomActivity } from "@/features/rooms/activity";
import { PRODUCT_CATEGORIES } from "@/features/rooms/mockProducts";
import { roomPresence } from "@/features/rooms/presence";
import { roomSocket } from "@/features/rooms/socketService";
import { cn } from "@/lib/utils";
import { rooms } from "@/mock/data";
import { useRoomStore, type RoomFilter } from "@/store/roomStore";
import type { ProductCategory } from "@/types";
import { formatDate, formatINR } from "@/utils/format";

export const Route = createFileRoute("/rooms/$roomId")({
  loader: ({ params }) => {
    const room = rooms.find((r) => r.id === params.roomId);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.room.name ?? "Room"} — ShopRooms` },
      {
        name: "description",
        content:
          loaderData?.room.description ??
          "A collaborative shopping room on ShopRooms.",
      },
    ],
  }),
  component: RoomView,
});

const FILTERS: { key: RoomFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "reserved", label: "Reserved" },
  { key: "purchased", label: "Purchased" },
  { key: "mine", label: "Assigned to me" },
  { key: "high", label: "High priority" },
  { key: "budget", label: "Budget friendly" },
];

function RoomView() {
  const { room } = Route.useLoaderData();
  const allProducts = useRoomStore((s) => s.productsByRoom[room.id] ?? []);
  const filter = useRoomStore((s) => s.filter);
  const setFilter = useRoomStore((s) => s.setFilter);
  const search = useRoomStore((s) => s.search);
  const setSearch = useRoomStore((s) => s.setSearch);

  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const presence = roomPresence[room.id] ?? [];
  const activity = roomActivity[room.id] ?? [];
  const onlineCount = presence.filter((p) => p.status === "online").length;

  useEffect(() => {
    roomSocket.connect(room.id);
    return () => roomSocket.disconnect();
  }, [room.id]);

  const filtered = useMemo(() => {
    let list = allProducts;
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (filter === "pending") list = list.filter((p) => p.status === "pending");
    if (filter === "reserved") list = list.filter((p) => p.status === "reserved");
    if (filter === "purchased") list = list.filter((p) => p.status === "purchased");
    if (filter === "mine") list = list.filter((p) => p.assignedToId === "u_me");
    if (filter === "high") list = list.filter((p) => p.priority === "high");
    if (filter === "budget") list = list.filter((p) => p.price <= 5000);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [allProducts, activeCategory, filter, search]);

  const duplicates = useMemo(() => {
    const seen = new Map<string, number>();
    allProducts.forEach((p) => {
      const k = `${p.brand}|${p.name}`.toLowerCase();
      seen.set(k, (seen.get(k) ?? 0) + 1);
    });
    return allProducts.filter((p) => (seen.get(`${p.brand}|${p.name}`.toLowerCase()) ?? 0) > 1);
  }, [allProducts]);

  const meta = EVENT_META[room.event as keyof typeof EVENT_META];
  const Icon = meta.icon;
  const totalSpent = allProducts
    .filter((p) => p.status === "purchased")
    .reduce((s, p) => s + p.price, 0);
  const pct = Math.round((totalSpent / room.budget) * 100);
  const daysLeft = room.eventDate
    ? Math.max(0, Math.ceil((new Date(room.eventDate).getTime() - Date.now()) / 86400000))
    : null;
  const purchasedCount = allProducts.filter((p) => p.status === "purchased").length;

  return (
    <AppShell>
      <div className="flex min-w-0 flex-col">
        {/* Top bar */}
        <div className="border-b border-border bg-surface/40">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
            </Link>

            <header className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-soft"
                  style={{ backgroundColor: room.coverColor }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="truncate font-display text-xl font-semibold tracking-tight sm:text-2xl">
                      {room.name}
                    </h1>
                    <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
                      {room.status}
                    </span>
                    <span className="hidden items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                      </span>
                      {onlineCount} live
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 max-w-2xl text-xs text-muted-foreground sm:text-sm">
                    {room.description}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(room.eventDate)}
                      {daysLeft !== null && (
                        <span className="ml-1 rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] font-semibold text-accent">
                          {daysLeft}d left
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {room.members.length} members
                    </span>
                    <span className="flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3" />
                      {purchasedCount}/{allProducts.length} purchased
                    </span>
                    <span className="font-mono tabular-nums">
                      {formatINR(totalSpent)} / {formatINR(room.budget)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <AvatarStack users={room.members} size="md" max={4} />
                <Button
                  size="sm"
                  onClick={() => setInviteOpen(true)}
                  className="rounded-full"
                >
                  <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Invite
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full"
                  aria-label="Share"
                  onClick={() => setShareOpen(true)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full" aria-label="Export">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full" aria-label="Settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, pct)}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-[oklch(0.55_0.22_290)]"
              />
            </div>
          </div>
        </div>

        {/* Three column workspace */}
        <div className="flex min-w-0">
          <CategoriesSidebar
            products={allProducts}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
            {/* Search + filters */}
            <div className="mb-4 space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, brands, categories…"
                  className="h-10 w-full rounded-xl border border-input bg-secondary/40 pl-10 pr-20 text-sm outline-none ring-ring/40 transition focus:bg-background focus:ring-2"
                />
                <button
                  aria-label="Voice search"
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      filter === f.key
                        ? "bg-foreground text-background"
                        : "border border-border text-muted-foreground hover:bg-secondary",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
                <Button variant="ghost" size="sm" className="ml-auto rounded-full">
                  <Filter className="mr-1.5 h-3.5 w-3.5" /> More
                </Button>
              </div>
            </div>

            <DuplicateWarning duplicates={duplicates} roomId={room.id} />

            {/* Categories */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-surface/40 py-16 text-center">
                <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">No products match these filters</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try clearing the search or switching to All.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {PRODUCT_CATEGORIES.map((c) => {
                  const subset = filtered.filter((p) => p.category === c);
                  if (subset.length === 0) return null;
                  return (
                    <CategorySection
                      key={c}
                      roomId={room.id}
                      category={c}
                      products={subset}
                    />
                  );
                })}
              </div>
            )}
          </main>

          {/* Right rail */}
          <RightRail
            members={room.members}
            presence={presence}
            activity={activity}
            budget={room.budget}
            products={allProducts}
          />
        </div>
      </div>

      <ItemDrawer />
      <InviteDialog room={room} open={inviteOpen} onOpenChange={setInviteOpen} />
      <ShareDialog room={room} open={shareOpen} onOpenChange={setShareOpen} />
      <QuickActionsFab onInvite={() => setInviteOpen(true)} />
    </AppShell>
  );
}

function RightRail({
  members,
  presence,
  activity,
  budget,
  products,
}: {
  members: import("@/types").User[];
  presence: import("@/types").Presence[];
  activity: import("@/types").ActivityEvent[];
  budget: number;
  products: import("@/types").Product[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  return (
    <aside
      ref={scrollerRef}
      className="hidden h-[calc(100vh-4rem)] w-80 shrink-0 overflow-y-auto border-l border-border bg-background p-4 lg:block"
    >
      <div className="space-y-4">
        <BudgetWidget budget={budget} products={products} />
        <MemberRail members={members} presence={presence} />
        <ActivityFeed events={activity} />
      </div>
    </aside>
  );
}
