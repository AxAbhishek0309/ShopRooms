import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Briefcase,
  Check,
  ChevronRight,
  GraduationCap,
  Heart,
  Home,
  MessageSquare,
  Quote,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  Vote,
  Wallet,
  Zap,
} from "lucide-react";
import { BrandMark } from "@/components/app-shell";
import { AvatarStack } from "@/components/avatar-stack";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { users } from "@/mock/data";
import { formatINR } from "@/utils/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopRooms — Shop together. Plan better. Decide faster." },
      {
        name: "description",
        content:
          "A calm, collaborative workspace for the things you buy together — weddings, housewarmings, baby showers, festivals and more.",
      },
      { property: "og:title", content: "ShopRooms — Collaborative Shopping" },
      {
        property: "og:description",
        content:
          "Plan lists, set budgets, vote on items, and decide together in real time.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <EventGrid />
      <Showcase />
      <Testimonials />
      <FAQ />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <BrandMark />
          <span className="font-display text-[15px] font-semibold tracking-tight">
            ShopRooms
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#events" className="transition-colors hover:text-foreground">
            Events
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link to="/auth/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link to="/dashboard">
              Open app <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-radial-fade pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28">
        <motion.div
          {...fadeUp}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Live collaboration · Now in private beta
          </div>

          <h1 className="text-balance mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Shop together.{" "}
            <span className="bg-gradient-to-br from-accent via-[oklch(0.55_0.22_290)] to-[oklch(0.6_0.22_320)] bg-clip-text text-transparent">
              Plan better.
            </span>
            <br />
            Decide faster.
          </h1>

          <p className="text-pretty mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            ShopRooms is a calm, collaborative workspace for the things you buy
            together — weddings, housewarmings, baby showers, festivals, and
            anything in between.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/dashboard">
                Create a room <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6"
            >
              <Link to="/rooms/r_wedding">Explore a live demo</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
            <AvatarStack users={users.slice(1, 6)} size="sm" />
            <span>Loved by 12,400+ teams and families</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-elevated">
        <div className="flex items-center gap-1.5 border-b border-border bg-secondary/40 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShoppingBag className="h-3.5 w-3.5" />
            shoprooms.app / Rahul & Priya Wedding
          </div>
        </div>
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 border-b border-border p-5 md:col-span-8 md:border-b-0 md:border-r">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Active list
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  Sangeet & Reception
                </h3>
              </div>
              <AvatarStack users={users.slice(0, 5)} size="sm" />
            </div>
            <div className="space-y-2">
              {[
                {
                  t: "Mandap floral arrangement",
                  p: 45000,
                  s: "approved",
                  by: users[1],
                },
                {
                  t: "Welcome hampers × 320",
                  p: 192000,
                  s: "approved",
                  by: users[0],
                },
                {
                  t: "Sangeet stage lighting",
                  p: 78000,
                  s: "purchased",
                  by: users[2],
                },
                {
                  t: "Photo booth backdrop",
                  p: 22000,
                  s: "suggested",
                  by: users[5],
                },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3.5 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <StatusDot status={row.s} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{row.t}</p>
                      <p className="text-xs text-muted-foreground">
                        Added by {row.by.name.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-mono text-sm tabular-nums">
                      {formatINR(row.p)}
                    </span>
                    <AvatarStack users={[row.by]} size="sm" max={1} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-4 p-5 md:col-span-4">
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Budget
              </p>
              <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
                {formatINR(412300)}
              </p>
              <p className="text-xs text-muted-foreground">
                of {formatINR(850000)} · 48%
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-[oklch(0.55_0.22_290)]"
                  style={{ width: "48%" }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Live chat
              </p>
              <div className="mt-3 space-y-3 text-sm">
                <ChatBubble user={users[1]} text="Lighting is locked" />
                <ChatBubble user={users[3]} text="Add jasmine at entrance?" />
                <ChatBubble user={users[0]} text="Approved. Move to vendor lock." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ user, text }: { user: (typeof users)[number]; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <AvatarStack users={[user]} max={1} size="sm" />
      <div>
        <p className="text-[11px] font-medium text-muted-foreground">
          {user.name.split(" ")[0]}
        </p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: "bg-accent",
    purchased: "bg-success",
    suggested: "bg-amber-400",
  };
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${map[status] ?? "bg-muted-foreground"}`}
    />
  );
}

function TrustedBy() {
  const logos = [
    "Lumen Labs",
    "Northwind",
    "Acme Studios",
    "Polaris",
    "Westwood",
    "Foundry",
  ];
  return (
    <section className="border-y border-border/60 bg-surface/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by event planners, families and teams worldwide
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-6 opacity-60 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((l) => (
            <div
              key={l}
              className="text-center font-display text-sm font-semibold tracking-tight text-muted-foreground"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Users,
      title: "Real-time co-shopping",
      body: "Everyone sees the same list, in the same instant. No more endless WhatsApp threads.",
    },
    {
      icon: Vote,
      title: "Vote, don't argue",
      body: "Suggest items, react with emoji, lock in decisions. Group taste, not group chaos.",
    },
    {
      icon: Wallet,
      title: "Budgets that breathe",
      body: "Track spend per category and per person. Subtle alerts before you overshoot.",
    },
    {
      icon: MessageSquare,
      title: "Conversations attached to things",
      body: "Chat lives next to items, not buried under it. Every decision has a paper trail.",
    },
    {
      icon: Sparkles,
      title: "AI suggestions, gently offered",
      body: "Recommendations based on event type, season and past rooms. Never pushy.",
    },
    {
      icon: Zap,
      title: "Templates for every occasion",
      body: "Wedding to hostel move-in — start with a head start, customise from there.",
    },
  ];
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            What's inside
          </p>
          <h2 className="text-balance mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A workspace, not a checkout.
          </h2>
          <p className="mt-4 text-muted-foreground">
            ShopRooms borrows from the tools you already love — and applies
            them to the messy, joyful work of shopping together.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group relative bg-background p-8 transition-colors hover:bg-surface"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Create a room",
      b: "Pick an event template or start from scratch. Set a budget and a date.",
    },
    {
      n: "02",
      t: "Invite your people",
      b: "Family, friends, teammates. Owners, editors, viewers — granular roles built-in.",
    },
    {
      n: "03",
      t: "Plan & decide together",
      b: "Add items, vote, chat in context, watch the budget live. Mark as purchased.",
    },
  ];
  return (
    <section id="how" className="border-y border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            How it works
          </p>
          <h2 className="text-balance mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Three steps from idea to event.
          </h2>
        </motion.div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="rounded-3xl border border-border bg-surface-elevated p-8 shadow-soft"
            >
              <p className="font-mono text-xs font-medium tracking-widest text-accent">
                {s.n}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                {s.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.b}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventGrid() {
  const events = [
    { icon: Heart, label: "Weddings", color: "from-orange-400 to-rose-500" },
    { icon: Home, label: "Housewarming", color: "from-emerald-400 to-teal-500" },
    { icon: Baby, label: "Baby Showers", color: "from-pink-400 to-fuchsia-500" },
    { icon: Sparkles, label: "Festivals", color: "from-amber-400 to-orange-500" },
    { icon: Briefcase, label: "Office Setup", color: "from-indigo-400 to-violet-500" },
    { icon: GraduationCap, label: "Hostel Kit", color: "from-sky-400 to-cyan-500" },
  ];
  return (
    <section id="events" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Built for moments
            </p>
            <h2 className="text-balance mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              An event for every kind of room.
            </h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/templates">
              Browse all templates <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={e.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${e.color} text-white shadow-soft`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-display text-sm font-semibold tracking-tight">
                  {e.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Curated template
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="border-y border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Designed with care
            </p>
            <h2 className="text-balance mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Calm by default. Loud when you need it.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Soft surfaces, generous whitespace, and an interaction model that
              gets out of your way. Important changes are surfaced — everything
              else fades into the background.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Native dark mode that respects your system",
                "Keyboard-first navigation, every screen",
                "Built for desktop, tuned for mobile",
                "Granular permissions for every room",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild className="rounded-full">
                <Link to="/dashboard">
                  Open the dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-elevated">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-sm font-semibold">
                  Spend this week
                </p>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                  Under budget
                </span>
              </div>
              <div className="grid grid-cols-7 items-end gap-2 h-32">
                {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                    className="rounded-md bg-gradient-to-t from-accent to-[oklch(0.7_0.2_256)]"
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { l: "Decor", v: 184000, c: "bg-orange-400" },
                  { l: "Apparel", v: 96000, c: "bg-fuchsia-400" },
                  { l: "Services", v: 78000, c: "bg-sky-400" },
                  { l: "Gifting", v: 54000, c: "bg-emerald-400" },
                ].map((cat) => (
                  <div
                    key={cat.l}
                    className="rounded-xl border border-border bg-background p-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`h-2 w-2 rounded-full ${cat.c}`} />
                      {cat.l}
                    </div>
                    <p className="mt-1 font-mono text-sm font-semibold tabular-nums">
                      {formatINR(cat.v)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      q: "We planned our entire wedding across three cities without losing our minds. ShopRooms replaced four group chats.",
      a: "Priya Sharma",
      r: "Bride",
    },
    {
      q: "Our office moved buildings and we ran the whole fit-out from one room. Budget visibility was the killer feature.",
      a: "Vikram Singh",
      r: "Ops Lead, Lumen Labs",
    },
    {
      q: "It feels like Linear for shopping. Quiet, fast, and somehow exactly what I needed for the baby shower.",
      a: "Ananya Kapoor",
      r: "Mom-to-be",
    },
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Loved by users
          </p>
          <h2 className="text-balance mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Words from the rooms.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div
              key={t.a}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-surface-elevated p-7 shadow-soft"
            >
              <Quote className="h-5 w-5 text-accent" />
              <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                "{t.q}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {t.a
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.a}</p>
                  <p className="text-xs text-muted-foreground">{t.r}</p>
                </div>
                <div className="ml-auto flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    {
      q: "Is ShopRooms free to use?",
      a: "Yes — every team gets unlimited rooms on the free plan. Pro plans unlock advanced budgeting, custom roles, and integrations.",
    },
    {
      q: "Can I use it for things other than events?",
      a: "Absolutely. Teams use ShopRooms for office procurement, group gifting, family pantry runs and more. Anything you'd buy with other people.",
    },
    {
      q: "Does it work offline?",
      a: "Edits queue locally and sync the moment you're back online. Real-time presence resumes automatically.",
    },
    {
      q: "Who can see my room?",
      a: "Only people you invite. Rooms are private by default with granular owner/editor/viewer roles.",
    },
    {
      q: "What does the AI actually do?",
      a: "It quietly suggests items based on your event type, flags duplicates, and surfaces price comparisons. You can turn it off per room.",
    },
  ];
  return (
    <section id="faq" className="border-y border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            FAQ
          </p>
          <h2 className="text-balance mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions, answered.
          </h2>
        </motion.div>
        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {qs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-surface-elevated px-5 shadow-soft"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-primary px-8 py-16 text-center text-primary-foreground shadow-elevated sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.62_0.22_256/0.35),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              The next thing you buy together
              <br />
              starts with a room.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base opacity-80">
              Free forever for small teams. No credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-full px-6"
              >
                <Link to="/dashboard">
                  Create your first room
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full px-6 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link to="/rooms/r_wedding">See it in action</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <BrandMark />
            <span className="font-display text-[15px] font-semibold tracking-tight">
              ShopRooms
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Shop together. Plan better. Decide faster.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Product
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#features" className="hover:text-accent">
                Features
              </a>
            </li>
            <li>
              <Link to="/templates" className="hover:text-accent">
                Templates
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-accent">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Company
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-accent">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent">
                Press
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border px-4 pt-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>© 2026 ShopRooms. Crafted with care.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-accent">
            Privacy
          </a>
          <a href="#" className="hover:text-accent">
            Terms
          </a>
          <a href="#" className="hover:text-accent">
            Status
          </a>
        </div>
      </div>
    </footer>
  );
}
