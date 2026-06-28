import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { users } from "@/mock/data";
import type { Presence, User } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const statusDot: Record<Presence["status"], string> = {
  online: "bg-success",
  idle: "bg-amber-400",
  offline: "bg-muted-foreground/40",
};

const palette = [
  ["from-amber-400", "to-orange-500"],
  ["from-emerald-400", "to-teal-500"],
  ["from-sky-400", "to-indigo-500"],
  ["from-fuchsia-400", "to-pink-500"],
  ["from-indigo-400", "to-violet-500"],
  ["from-rose-400", "to-red-500"],
];

function paletteFor(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) | 0;
  return palette[Math.abs(h) % palette.length];
}

export function MemberRail({
  members,
  presence,
}: {
  members: User[];
  presence: Presence[];
}) {
  const presenceMap = new Map(presence.map((p) => [p.userId, p]));
  const sorted = [...members].sort((a, b) => {
    const pa = presenceMap.get(a.id)?.status ?? "offline";
    const pb = presenceMap.get(b.id)?.status ?? "offline";
    const order = { online: 0, idle: 1, offline: 2 } as const;
    return order[pa] - order[pb];
  });

  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-soft">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Members
        </p>
        <p className="text-[10px] text-muted-foreground">
          {presence.filter((p) => p.status === "online").length} online
        </p>
      </div>
      <ul className="space-y-1">
        {sorted.map((u) => {
          const p = presenceMap.get(u.id);
          const status = p?.status ?? "offline";
          const [from, to] = paletteFor(u.id);
          return (
            <li key={u.id}>
              <HoverCard openDelay={120}>
                <HoverCardTrigger asChild>
                  <div className="flex cursor-default items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary/60">
                    <div className="relative shrink-0">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white shadow",
                          from,
                          to,
                        )}
                      >
                        {u.initials}
                      </div>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card",
                          statusDot[status],
                        )}
                      />
                      {p?.status === "online" && (
                        <motion.span
                          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.6 }}
                          className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{u.name}</p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {p?.activity ??
                          (status === "offline" ? "Offline" : "Idle")}
                        {p?.typingIn && (
                          <span className="ml-1 text-accent">· typing…</span>
                        )}
                      </p>
                    </div>
                    <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                      {u.role ?? "viewer"}
                    </span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent side="left" className="w-64">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white",
                        from,
                        to,
                      )}
                    >
                      {u.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{u.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {u.email}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-[11px]">
                        <span className={cn("h-2 w-2 rounded-full", statusDot[status])} />
                        <span className="capitalize text-muted-foreground">{status}</span>
                        {p?.activity && (
                          <span className="text-muted-foreground">· {p.activity}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { users };
