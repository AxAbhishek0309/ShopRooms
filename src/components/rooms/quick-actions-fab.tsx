import { AnimatePresence, motion } from "framer-motion";
import {
  CheckSquare,
  MessageSquare,
  Plus,
  UserPlus,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const actions = [
  { icon: Plus, label: "Add Item", hotkey: "A" },
  { icon: UserPlus, label: "Invite", hotkey: "I" },
  { icon: CheckSquare, label: "Checklist", hotkey: "L" },
  { icon: Wallet, label: "Budget", hotkey: "B" },
  { icon: MessageSquare, label: "Chat", hotkey: "M" },
];

export function QuickActionsFab({
  onAddItem,
  onInvite,
}: {
  onAddItem?: () => void;
  onInvite?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handle = (label: string) => {
    setOpen(false);
    if (label === "Add Item") onAddItem?.();
    if (label === "Invite") onInvite?.();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open &&
          actions.map((a, i) => (
            <motion.button
              key={a.label}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => handle(a.label)}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium shadow-soft hover:bg-secondary"
            >
              <a.icon className="h-3.5 w-3.5" />
              {a.label}
              <kbd className="rounded-md border border-border bg-background px-1 text-[9px] text-muted-foreground">
                {a.hotkey}
              </kbd>
            </motion.button>
          ))}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Quick actions"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[oklch(0.55_0.22_290)] text-white shadow-lg transition-transform",
          open && "rotate-45",
        )}
      >
        {open ? <Plus className="h-6 w-6" /> : <Zap className="h-5 w-5" />}
      </button>
    </div>
  );
}
