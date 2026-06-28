import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  MessageCircle,
  PiggyBank,
  Plus,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { users } from "@/mock/data";
import type { ActivityEvent, ActivityKind } from "@/types";
import { fromNow } from "@/utils/format";

const iconFor: Record<ActivityKind, React.ComponentType<{ className?: string }>> = {
  added: Plus,
  reserved: ShieldCheck,
  purchased: CheckCircle2,
  assigned: Users,
  budget: PiggyBank,
  joined: UserPlus,
  commented: MessageCircle,
};

const labelFor: Record<ActivityKind, string> = {
  added: "added",
  reserved: "reserved",
  purchased: "purchased",
  assigned: "assigned",
  budget: "updated budget",
  joined: "joined the room",
  commented: "commented on",
};

export function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-soft">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Live activity
        </p>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Activity className="h-3 w-3 text-success" />
          live
        </span>
      </div>
      <ol className="space-y-2.5">
        <AnimatePresence initial={false}>
          {events.map((e) => {
            const u = users.find((x) => x.id === e.userId);
            const Icon = iconFor[e.kind];
            return (
              <motion.li
                key={e.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Icon className="h-3 w-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs">
                    <span className="font-semibold">
                      {u?.name.split(" ")[0] ?? "Someone"}
                    </span>{" "}
                    <span className="text-muted-foreground">{labelFor[e.kind]}</span>
                    {e.target && (
                      <span className="ml-1 font-medium">{e.target}</span>
                    )}
                    {e.meta && (
                      <span className="ml-1 text-muted-foreground">· {e.meta}</span>
                    )}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{fromNow(e.createdAt)}</p>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </div>
  );
}
