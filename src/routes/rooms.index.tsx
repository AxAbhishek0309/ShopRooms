import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AvatarStack } from "@/components/avatar-stack";
import { Button } from "@/components/ui/button";
import { EVENT_META } from "@/constants/events";
import { cn } from "@/lib/utils";
import { rooms } from "@/mock/data";
import { formatDate, formatINR, fromNow } from "@/utils/format";

export const Route = createFileRoute("/rooms/")({
  head: () => ({
    meta: [
      { title: "Rooms — ShopRooms" },
      { name: "description", content: "All your shopping rooms in one place." },
    ],
  }),
  component: RoomsList,
});

const filters = ["All", "Active", "Planning", "Completed"] as const;

function RoomsList() {
  const [tab, setTab] = useState<(typeof filters)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = rooms
    .filter((r) =>
      tab === "All" ? true : r.status === tab.toLowerCase(),
    )
    .filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Rooms
            </h1>
            <p className="mt-1 text-muted-foreground">
              {rooms.length} rooms across your workspace
            </p>
          </div>
          <Button asChild className="rounded-full">
            <Link to="/rooms/new">
              <Plus className="mr-1.5 h-4 w-4" /> New Room
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setTab(f)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  tab === f
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search rooms…"
              className="h-9 w-full rounded-full border border-input bg-secondary/50 pl-9 pr-3 text-sm outline-none ring-ring/40 focus:bg-background focus:ring-2"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          {filtered.length === 0 && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              No rooms match your filters.
            </div>
          )}
          {filtered.map((room) => {
            const meta = EVENT_META[room.event as keyof typeof EVENT_META];
            const Icon = meta.icon;
            const pct = Math.round((room.spent / room.budget) * 100);
            return (
              <Link
                to="/rooms/$roomId"
                params={{ roomId: room.id }}
                key={room.id}
                className="flex items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-secondary/40"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-soft"
                  style={{ backgroundColor: room.coverColor }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold">{room.name}</p>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                      {room.status}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {room.description}
                  </p>
                </div>
                <div className="hidden text-right md:block">
                  <p className="font-mono text-sm font-semibold tabular-nums">
                    {formatINR(room.spent)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    of {formatINR(room.budget)} ({pct}%)
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-xs">{formatDate(room.eventDate)}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Updated {fromNow(room.updatedAt)}
                  </p>
                </div>
                <AvatarStack users={room.members} size="sm" max={3} />
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
