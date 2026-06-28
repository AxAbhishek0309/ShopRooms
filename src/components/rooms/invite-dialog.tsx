import { Copy, Link2, Mail, QrCode } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Room } from "@/types";

export function InviteDialog({
  room,
  open,
  onOpenChange,
}: {
  room: Room;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const link = `https://shoprooms.app/join/${room.id}`;
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState<"link" | "email" | "qr">("link");

  const copy = () => {
    navigator.clipboard?.writeText(link);
    toast.success("Invite link copied");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Invite to {room.name}</DialogTitle>
          <DialogDescription>
            Anyone with the link can join as a viewer. You stay in control.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex gap-1 rounded-full bg-secondary p-1">
          {(["link", "email", "qr"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                tab === t
                  ? "bg-background text-foreground shadow-soft"
                  : "text-muted-foreground",
              )}
            >
              {t === "qr" ? "QR" : t}
            </button>
          ))}
        </div>

        {tab === "link" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/40 p-2">
              <Link2 className="ml-1 h-4 w-4 text-muted-foreground" />
              <Input
                readOnly
                value={link}
                className="border-0 bg-transparent text-sm focus-visible:ring-0"
              />
              <Button size="sm" className="rounded-full" onClick={copy}>
                <Copy className="mr-1 h-3 w-3" /> Copy
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(["viewer", "editor", "admin"] as const).map((r) => (
                <button
                  key={r}
                  className="rounded-lg border border-border bg-card px-3 py-2 capitalize transition-colors hover:bg-secondary"
                >
                  {r}
                </button>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-full">
              Generate invitation card
            </Button>
          </div>
        )}

        {tab === "email" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/40 p-2">
              <Mail className="ml-1 h-4 w-4 text-muted-foreground" />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="border-0 bg-transparent text-sm focus-visible:ring-0"
              />
              <Button
                size="sm"
                className="rounded-full"
                onClick={() => {
                  if (!email) return;
                  toast.success(`Invite sent to ${email}`);
                  setEmail("");
                }}
              >
                Send
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Add multiple emails separated by commas. We'll send a personalized invite from you.
            </p>
          </div>
        )}

        {tab === "qr" && (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="grid h-40 w-40 place-items-center rounded-2xl border border-dashed border-border bg-surface/40 text-muted-foreground">
              <QrCode className="h-16 w-16" />
            </div>
            <p className="text-xs text-muted-foreground">
              Scan to join {room.name}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
