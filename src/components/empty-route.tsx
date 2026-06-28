import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

interface EmptyRouteProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export function EmptyRoute({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  children,
}: EmptyRouteProps) {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface/40 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-accent">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold tracking-tight">
            Coming together soon
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            This surface is being polished. The data layer and UI primitives are
            in place — feature work plugs right in.
          </p>
          {actionLabel && (
            <Button onClick={onAction} className="mt-6 rounded-full">
              {actionLabel}
            </Button>
          )}
          {children}
        </div>
      </div>
    </AppShell>
  );
}
