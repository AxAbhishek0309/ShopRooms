import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { EmptyRoute } from "@/components/empty-route";

export const Route = createFileRoute("/discover")({
  head: () => ({ meta: [{ title: "Discover — ShopRooms" }] }),
  component: () => (
    <EmptyRoute
      title="Discover"
      description="Trending rooms, public templates, and shopping inspiration."
      icon={Compass}
    />
  ),
});
