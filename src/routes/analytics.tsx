import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { EmptyRoute } from "@/components/empty-route";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — ShopRooms" }] }),
  component: () => (
    <EmptyRoute
      title="Analytics"
      description="Spend trends, vendor performance, and team activity."
      icon={LineChart}
      actionLabel="View sample report"
    />
  ),
});
