import { cn } from "@/lib/utils";
import type { User } from "@/types";

interface AvatarStackProps {
  users: User[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-6 w-6 text-[10px] -ml-1.5 ring-2",
  md: "h-8 w-8 text-xs -ml-2 ring-2",
  lg: "h-10 w-10 text-sm -ml-2.5 ring-[3px]",
};

const palette = [
  "bg-amber-500/90 text-white",
  "bg-emerald-500/90 text-white",
  "bg-sky-500/90 text-white",
  "bg-fuchsia-500/90 text-white",
  "bg-indigo-500/90 text-white",
  "bg-rose-500/90 text-white",
  "bg-teal-500/90 text-white",
];

const colorFor = (id: string) => {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) | 0;
  return palette[Math.abs(h) % palette.length];
};

export function AvatarStack({
  users,
  max = 4,
  size = "md",
  className,
}: AvatarStackProps) {
  const shown = users.slice(0, max);
  const rest = users.length - shown.length;
  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((u, i) => (
        <div
          key={u.id}
          className={cn(
            "relative inline-flex items-center justify-center rounded-full font-semibold ring-background",
            sizeMap[size],
            colorFor(u.id),
            i === 0 && "ml-0",
          )}
          title={u.name}
        >
          {u.initials}
        </div>
      ))}
      {rest > 0 && (
        <div
          className={cn(
            "relative inline-flex items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground ring-background",
            sizeMap[size],
          )}
        >
          +{rest}
        </div>
      )}
    </div>
  );
}
