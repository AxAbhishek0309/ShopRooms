import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AvatarStack } from "@/components/avatar-stack";
import { Button } from "@/components/ui/button";
import { EVENT_META } from "@/constants/events";
import { cn } from "@/lib/utils";
import { users } from "@/mock/data";
import type { EventType } from "@/types";

export const Route = createFileRoute("/rooms/new")({
  head: () => ({
    meta: [{ title: "Create Room — ShopRooms" }],
  }),
  component: NewRoom,
});

const steps = [
  { n: 1, label: "Event" },
  { n: 2, label: "Details" },
  { n: 3, label: "Budget" },
  { n: 4, label: "Invite" },
  { n: 5, label: "Review" },
];

const eventOptions = (Object.keys(EVENT_META) as EventType[]).filter(
  (e) => e !== "custom",
);

function NewRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [event, setEvent] = useState<EventType>("wedding");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(100000);
  const [invited, setInvited] = useState<string[]>([users[1].id]);

  const canNext = () => {
    if (step === 2) return name.trim().length > 1;
    return true;
  };

  const toggleInvite = (id: string) =>
    setInvited((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  const meta = EVENT_META[event];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          New Room
        </h1>
        <p className="mt-1 text-muted-foreground">
          Five quick steps. Less than a minute.
        </p>

        {/* Progress */}
        <ol className="mt-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s.n} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  step > s.n
                    ? "bg-success text-success-foreground"
                    : step === s.n
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground",
                )}
              >
                {step > s.n ? <Check className="h-3.5 w-3.5" /> : s.n}
              </div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  step === s.n ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className="h-px flex-1 bg-border" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-8 min-h-[360px] rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    What are you planning?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pick an event. We'll suggest a template you can customise.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {eventOptions.map((e) => {
                      const m = EVENT_META[e];
                      const Icon = m.icon;
                      const active = event === e;
                      return (
                        <button
                          key={e}
                          onClick={() => setEvent(e)}
                          className={cn(
                            "flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                            active
                              ? "border-accent bg-primary-soft shadow-soft"
                              : "border-border hover:border-border-strong hover:bg-secondary/40",
                          )}
                        >
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-soft"
                            style={{ backgroundColor: m.color }}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    Name your room
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Give it something memorable — you'll see this everywhere.
                  </p>
                  <div className="mt-6 space-y-4">
                    <Field label="Room name">
                      <input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={`e.g. ${meta.label} 2026`}
                        className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none ring-ring/40 focus:ring-2"
                      />
                    </Field>
                    <Field label="Description (optional)">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="What's this room for?"
                        className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none ring-ring/40 focus:ring-2"
                      />
                    </Field>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    Set a budget
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Don't worry — you can change this anytime.
                  </p>
                  <div className="mt-8 text-center">
                    <p className="font-display text-5xl font-semibold tabular-nums">
                      ₹{budget.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={1000000}
                    step={5000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="mt-6 w-full accent-[color:var(--accent)]"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>₹10K</span>
                    <span>₹10L</span>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    Invite your people
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    They'll get an email and an instant invite link.
                  </p>
                  <div className="mt-6 space-y-2">
                    {users.slice(1).map((u) => {
                      const on = invited.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          onClick={() => toggleInvite(u.id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                            on
                              ? "border-accent bg-primary-soft"
                              : "border-border hover:bg-secondary/40",
                          )}
                        >
                          <AvatarStack users={[u]} size="md" max={1} />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border-2",
                              on ? "border-accent bg-accent text-accent-foreground" : "border-border",
                            )}
                          >
                            {on && <Check className="h-3 w-3" strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    Ready to launch
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Quick review before we create your room.
                  </p>
                  <div className="mt-6 space-y-3 rounded-2xl border border-border bg-surface/40 p-5">
                    <ReviewRow label="Event" value={meta.label} />
                    <ReviewRow label="Name" value={name || "Untitled room"} />
                    <ReviewRow
                      label="Budget"
                      value={`₹${budget.toLocaleString("en-IN")}`}
                    />
                    <ReviewRow
                      label="Members"
                      value={`${invited.length + 1} people`}
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="rounded-full"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
          </Button>
          {step < 5 ? (
            <Button
              disabled={!canNext()}
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="rounded-full"
            >
              Continue <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => navigate({ to: "/rooms/$roomId", params: { roomId: "r_wedding" } })}
              className="rounded-full"
            >
              Launch room <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
