import { ArrowRight, Calendar, Copy, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AvatarStack } from "@/components/avatar-stack";
import type { Room } from "@/types";
import { formatDate, formatINR } from "@/utils/format";

export function ShareDialog({
  room,
  open,
  onOpenChange,
}: {
  room: Room;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Share preview</DialogTitle>
        </DialogHeader>

        <div
          className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${room.coverColor}, oklch(0.55 0.22 290))`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_60%)]" />
          <p className="relative text-[10px] font-semibold uppercase tracking-wider opacity-80">
            ShopRooms
          </p>
          <h3 className="relative mt-1 font-display text-2xl font-bold leading-tight">
            {room.name}
          </h3>
          <p className="relative mt-1 max-w-sm text-sm opacity-90">
            {room.description}
          </p>

          <div className="relative mt-4 grid grid-cols-3 gap-3 text-[11px]">
            <Stat icon={Users} label="Members" value={`${room.members.length}`} />
            <Stat icon={Wallet} label="Budget" value={formatINR(room.budget)} />
            <Stat icon={Calendar} label="Event" value={formatDate(room.eventDate)} />
          </div>

          <div className="relative mt-5 flex items-center justify-between">
            <AvatarStack users={room.members} max={4} size="sm" />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
              Join room <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        <Button
          className="rounded-full"
          onClick={() => {
            navigator.clipboard?.writeText(`https://shoprooms.app/join/${room.id}`);
            toast.success("Share link copied");
          }}
        >
          <Copy className="mr-2 h-3.5 w-3.5" /> Copy share link
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/15 p-2 backdrop-blur">
      <Icon className="h-3 w-3 opacity-80" />
      <p className="mt-1 text-[9px] uppercase tracking-wider opacity-80">{label}</p>
      <p className="font-mono text-xs font-semibold tabular-nums">{value}</p>
    </div>
  );
}
