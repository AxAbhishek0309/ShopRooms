import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Compass,
  LayoutDashboard,
  LineChart,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { rooms, templates, users } from "@/mock/data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nav = useMemo(
    () => [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { label: "All Rooms", to: "/rooms", icon: ShoppingBag },
      { label: "Templates", to: "/templates", icon: Sparkles },
      { label: "Discover", to: "/discover", icon: Compass },
      { label: "Analytics", to: "/analytics", icon: LineChart },
      { label: "Notifications", to: "/notifications", icon: Bell },
      { label: "Profile", to: "/profile", icon: UserRound },
      { label: "Settings", to: "/settings", icon: Settings },
    ],
    [],
  );

  const go = (to: string) => {
    setOpen(false);
    setTimeout(() => navigate({ to }), 50);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search rooms, members, commands…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => go("/rooms/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Create new room
          </CommandItem>
          <CommandItem onSelect={() => go("/discover")}>
            <Search className="mr-2 h-4 w-4" />
            Browse trending rooms
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigate">
          {nav.map((n) => {
            const Icon = n.icon;
            return (
              <CommandItem key={n.to} onSelect={() => go(n.to)}>
                <Icon className="mr-2 h-4 w-4" />
                {n.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Rooms">
          {rooms.slice(0, 5).map((r) => (
            <CommandItem key={r.id} onSelect={() => go(`/rooms/${r.id}`)}>
              <span
                className="mr-2 h-3 w-3 rounded-full"
                style={{ backgroundColor: r.coverColor }}
              />
              {r.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Templates">
          {templates.slice(0, 4).map((t) => (
            <CommandItem key={t.id} onSelect={() => go("/templates")}>
              <Sparkles className="mr-2 h-4 w-4" />
              {t.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="People">
          {users.slice(1).map((u) => (
            <CommandItem key={u.id} onSelect={() => go("/profile")}>
              <span className="mr-2 grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-[9px] font-bold text-accent">
                {u.initials}
              </span>
              {u.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
