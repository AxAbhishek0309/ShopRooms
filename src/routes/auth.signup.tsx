import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { EmptyRoute } from "@/components/empty-route";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [{ title: "Sign up — ShopRooms" }] }),
  component: () => (
    <EmptyRoute
      title="Create your account"
      description="Sign up to start collaborating on shopping rooms."
      icon={UserPlus}
    >
      <Link
        to="/auth/login"
        className="mt-4 text-xs font-medium text-accent hover:underline"
      >
        Or sign in instead →
      </Link>
    </EmptyRoute>
  ),
});
