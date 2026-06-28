import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Accessibility,
  Bell,
  Globe,
  Keyboard,
  Link2,
  Lock,
  Palette,
  User as UserIcon,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ShopRooms" },
      { name: "description", content: "Manage your theme, language, currency, and notification preferences." },
    ],
  }),
  component: SettingsPage,
});

const SECTIONS = [
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "account", label: "Account", icon: UserIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "language", label: "Language & region", icon: Globe },
  { id: "billing", label: "Currency", icon: Wallet },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "accessibility", label: "Accessibility", icon: Accessibility },
  { id: "shortcuts", label: "Shortcuts", icon: Keyboard },
  { id: "connected", label: "Connected accounts", icon: Link2 },
];

function SettingsPage() {
  const [active, setActive] = useState("appearance");

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Personalize your ShopRooms experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <nav className="flex flex-row gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-2 shadow-soft lg:flex-col">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {s.label}
                </button>
              );
            })}
          </nav>

          <motion.section
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            {active === "appearance" && <AppearanceSection />}
            {active === "account" && <SimpleSection title="Account" desc="Update your name, email, and profile details." />}
            {active === "notifications" && <NotificationsSection />}
            {active === "language" && <LanguageSection />}
            {active === "billing" && <CurrencySection />}
            {active === "privacy" && <SimpleSection title="Privacy" desc="Control who can find and message you, and what activity is visible to teammates." />}
            {active === "accessibility" && <AccessibilitySection />}
            {active === "shortcuts" && <ShortcutsSection />}
            {active === "connected" && <ConnectedSection />}
          </motion.section>
        </div>
      </div>
    </AppShell>
  );
}

function AppearanceSection() {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Appearance</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose how ShopRooms looks on this device.
      </p>
      <div className="mt-6 flex items-center justify-between rounded-xl border border-border p-4">
        <div>
          <p className="text-sm font-medium">Theme</p>
          <p className="text-xs text-muted-foreground">Light, Dark, or follow system.</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="mt-3 rounded-xl border border-border p-4">
        <p className="text-sm font-medium">Accent color</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f97316", "#eab308"].map((c, i) => (
            <button
              key={c}
              className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition ${i === 0 ? "ring-accent" : "ring-transparent hover:ring-border"}`}
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const items = [
    "Budget alerts",
    "New member joins",
    "Mentions & replies",
    "AI recommendations",
    "Weekly digest",
  ];
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Notifications</h2>
      <p className="mt-1 text-sm text-muted-foreground">Pick what reaches your inbox and what stays in-app.</p>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border">
        {items.map((it, i) => (
          <div key={it} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">{it}</p>
              <p className="text-xs text-muted-foreground">Email · Push · In-app</p>
            </div>
            <Toggle defaultOn={i !== 4} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageSection() {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Language & region</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Field label="Language" value="English (India)" />
        <Field label="Time zone" value="Asia/Kolkata (GMT+5:30)" />
        <Field label="Date format" value="DD MMM YYYY" />
        <Field label="First day of week" value="Monday" />
      </div>
    </div>
  );
}

function CurrencySection() {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Currency</h2>
      <p className="mt-1 text-sm text-muted-foreground">Default currency used across all rooms.</p>
      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {[
          { code: "INR", label: "Indian Rupee", sym: "₹" },
          { code: "USD", label: "US Dollar", sym: "$" },
          { code: "EUR", label: "Euro", sym: "€" },
        ].map((c, i) => (
          <button
            key={c.code}
            className={`rounded-xl border p-4 text-left transition ${
              i === 0 ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30"
            }`}
          >
            <p className="font-mono text-lg font-bold">{c.sym} {c.code}</p>
            <p className="text-xs text-muted-foreground">{c.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function AccessibilitySection() {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Accessibility</h2>
      <div className="mt-6 space-y-2">
        {["Reduce motion", "High contrast", "Larger text", "Screen reader hints"].map((it, i) => (
          <div key={it} className="flex items-center justify-between rounded-xl border border-border p-4">
            <p className="text-sm font-medium">{it}</p>
            <Toggle defaultOn={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShortcutsSection() {
  const rows = [
    ["Open command palette", "⌘ K"],
    ["New room", "⌘ N"],
    ["Toggle theme", "⌘ ⇧ L"],
    ["Search items", "/"],
    ["Open AI Copilot", "⌘ J"],
    ["Go to dashboard", "G D"],
  ];
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Keyboard shortcuts</h2>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border">
        {rows.map(([label, keys]) => (
          <div key={label} className="flex items-center justify-between p-4 text-sm">
            <span>{label}</span>
            <kbd className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs">{keys}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectedSection() {
  const services = [
    { name: "Google", connected: true },
    { name: "Slack", connected: false },
    { name: "WhatsApp", connected: true },
    { name: "Apple Calendar", connected: false },
  ];
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">Connected accounts</h2>
      <p className="mt-1 text-sm text-muted-foreground">Sync invites, calendars, and notifications.</p>
      <div className="mt-6 space-y-2">
        {services.map((s) => (
          <div key={s.name} className="flex items-center justify-between rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-surface text-sm font-bold">
                {s.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">
                  {s.connected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <Button variant={s.connected ? "outline" : "default"} size="sm" className="rounded-full">
              {s.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleSection({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Field label="Full name" value="Aarav Shah" />
        <Field label="Email" value="aarav@shoprooms.app" />
        <Field label="Phone" value="+91 98765 43210" />
        <Field label="Role" value="Owner" />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-medium">{value}</p>
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative h-6 w-11 rounded-full transition ${on ? "bg-accent" : "bg-border"}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}
