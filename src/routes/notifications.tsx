import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { notifications } from "@/mock/data";
import { fromNow } from "@/utils/format";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — ShopRooms" }] }),
  component: NotificationsPage,
});

const kindMeta: Record<string, { dot: string; label: string }> = {
  mention: { dot: "bg-accent", label: "Mention" },
  purchase: { dot: "bg-success", label: "Purchase" },
  invite: { dot: "bg-amber-400", label: "Invite" },
  budget: { dot: "bg-destructive", label: "Budget" },
  system: { dot: "bg-muted-foreground", label: "System" },
};

function NotificationsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Notifications
            </h1>
            <p className="mt-1 text-muted-foreground">
              All updates from your rooms.
            </p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Check className="mr-1.5 h-3.5 w-3.5" /> Mark all read
          </Button>
        </div>
        <div className="mt-8 space-y-2">
          {notifications.map((n, i) => {
            const k = kindMeta[n.kind];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-surface/60"
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${k.dot}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {k.label}
                    </span>
                    <span className="ml-auto text-[11px] text-muted-foreground">
                      {fromNow(n.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                </div>
                {!n.read && (
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" aria-label="Unread" />
                )}
              </motion.div>
            );
          })}
        </div>
        {notifications.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-border bg-surface/40 py-16 text-center">
            <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">You're all caught up</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
