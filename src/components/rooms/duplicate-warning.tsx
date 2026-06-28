import { AlertTriangle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { users } from "@/mock/data";
import type { Product } from "@/types";

export function DuplicateWarning({
  duplicates,
  roomId,
}: {
  duplicates: Product[];
  roomId: string;
}) {
  if (duplicates.length === 0) return null;
  const sample = duplicates[0];
  const owner =
    users.find((u) => u.id === (sample.reservedById ?? sample.purchasedById));
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3 flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-amber-50/60 px-4 py-3 text-sm dark:bg-amber-500/10"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300">
        <AlertTriangle className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1 text-amber-900 dark:text-amber-100">
        <p className="font-medium">
          {sample.name} already exists in this room
          {owner && sample.status === "reserved" && ` — reserved by ${owner.name.split(" ")[0]}`}
          {owner && sample.status === "purchased" && ` — purchased by ${owner.name.split(" ")[0]}`}
        </p>
        <p className="mt-0.5 text-[11px] opacity-80">
          We caught {duplicates.length} potential duplicate{duplicates.length > 1 ? "s" : ""}.
          {" "}
          <Link
            to="/rooms/$roomId"
            params={{ roomId }}
            className="font-semibold underline-offset-2 hover:underline"
          >
            View existing item
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
