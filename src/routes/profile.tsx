import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AvatarStack } from "@/components/avatar-stack";
import { Button } from "@/components/ui/button";
import { currentUser, rooms } from "@/mock/data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — ShopRooms" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const myRooms = rooms.filter((r) =>
    r.members.some((m) => m.id === currentUser.id),
  );
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <AvatarStack users={[currentUser]} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              {currentUser.name}
            </h1>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span><b className="text-foreground">{myRooms.length}</b> rooms</span>
              <span><b className="text-foreground">84</b> items added</span>
              <span><b className="text-foreground">312</b> messages</span>
            </div>
          </div>
          <Button variant="outline" className="rounded-full">
            <UserRound className="mr-1.5 h-4 w-4" /> Edit profile
          </Button>
        </div>
        <h2 className="mt-10 font-display text-lg font-semibold tracking-tight">
          Your rooms
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {myRooms.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm">{r.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
