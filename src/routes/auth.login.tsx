import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Sign in — ShopRooms" }] }),
  component: AuthLogin,
});

function AuthLogin() {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.62_0.22_256/0.35),transparent_60%)]" />
        <div className="relative flex items-center gap-2">
          <BrandMark />
          <span className="font-display text-base font-semibold tracking-tight">ShopRooms</span>
        </div>
        <div className="relative">
          <p className="font-display text-3xl font-semibold leading-snug tracking-tight">
            "We planned our entire wedding across three cities without losing
            our minds."
          </p>
          <p className="mt-4 text-sm opacity-70">— Priya Sharma, Bride</p>
        </div>
        <div className="relative text-xs opacity-60">
          © 2026 ShopRooms
        </div>
      </div>

      <div className="flex flex-col px-6 py-10 sm:px-10">
        <Link to="/" className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
        <div className="my-auto mx-auto w-full max-w-sm">
          <div className="flex items-center gap-2 lg:hidden">
            <BrandMark />
            <span className="font-display text-base font-semibold tracking-tight">ShopRooms</span>
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight lg:mt-0">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your workspace.
          </p>

          <div className="mt-8 space-y-3">
            <Button variant="outline" className="h-11 w-full rounded-xl text-sm">
              Continue with Google
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-xl text-sm">
              Continue with Apple
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> Or with email <div className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none ring-ring/40 focus:ring-2"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground" htmlFor="pw">
                Password
              </label>
              <input
                id="pw"
                type="password"
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none ring-ring/40 focus:ring-2"
              />
            </div>
            <Button asChild className="h-11 w-full rounded-xl text-sm">
              <Link to="/dashboard">Sign in</Link>
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New to ShopRooms?{" "}
            <Link to="/auth/signup" className="font-medium text-accent hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
