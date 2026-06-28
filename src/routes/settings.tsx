import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { EmptyRoute } from "@/components/empty-route";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — ShopRooms" }] }),
  component: () => (
    <EmptyRoute
      title="Settings"
      description="Workspace preferences, notifications, and integrations."
      icon={Settings}
    />
  ),
});
