import { createFileRoute } from "@tanstack/react-router";
import { AdminCreateEventPage } from "./admin.events.create";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/events/$id")({
  head: () => meta("Edit Event — Admin Dashboard", "Configure and edit event details."),
  component: AdminCreateEventPage,
});
