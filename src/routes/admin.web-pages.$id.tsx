import { createFileRoute } from "@tanstack/react-router";
import { AdminEditWebPage } from "./admin.web-pages.edit";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/web-pages/$id")({
  head: () => meta("Edit Web Page — Admin Dashboard", "Customize layout, content and settings for web pages."),
  component: AdminEditWebPage,
});
