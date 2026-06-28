import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Compass,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { AvatarStack } from "@/components/avatar-stack";
import { CommandPalette } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { currentUser, notifications } from "@/mock/data";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/rooms", label: "Rooms", icon: ShoppingBag },
  { to: "/templates", label: "Templates", icon: Sparkles },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/analytics", label: "Analytics", icon: LineChart },
  { to: "/notifications", label: "Notifications", icon: Bell },
] as const;

const secondaryItems = [
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-16 items-center gap-2 px-5">
          <Link to="/" className="flex items-center gap-2">
            <BrandMark />
            <span className="font-display text-[15px] font-semibold tracking-tight">
              ShopRooms
            </span>
          </Link>
        </div>

        <div className="px-3 pb-3">
          <Button
            asChild
            className="w-full justify-start gap-2 rounded-xl"
            size="sm"
          >
            <Link to="/rooms/new">
              <Plus className="h-4 w-4" />
              New Room
            </Link>
          </Button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2 text-sm">
          {navItems.map((item) => {
            const active =
              pathname === item.to ||
              (item.to !== "/dashboard" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2 transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.to === "/notifications" && unread > 0 && (
                  <span className="rounded-full bg-accent px-1.5 text-[10px] font-semibold text-accent-foreground">
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-0.5 border-t border-sidebar-border px-3 py-3 text-sm">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <LifeBuoy className="h-4 w-4" /> Help & feedback
          </a>
        </div>

        <div className="flex items-center gap-3 border-t border-sidebar-border p-3">
          <AvatarStack users={[currentUser]} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <BrandMark />
          </Link>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search rooms, items, people…"
              className="h-9 w-full rounded-lg border border-input bg-secondary/50 pl-9 pr-12 text-sm outline-none ring-ring/40 transition focus:bg-background focus:ring-2"
            />
            <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline-block">
              ⌘K
            </kbd>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative rounded-full"
              aria-label="Notifications"
            >
              <Link to="/notifications">
                <Bell className="h-4 w-4" />
                {unread > 0 && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
                )}
              </Link>
            </Button>
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="ml-2 hidden rounded-full sm:inline-flex"
            >
              <Link to="/rooms/new">
                <Plus className="mr-1 h-4 w-4" /> New Room
              </Link>
            </Button>
          </div>
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[oklch(0.55_0.22_290)] text-white shadow-soft",
        className,
      )}
    >
      <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
    </div>
  );
}
