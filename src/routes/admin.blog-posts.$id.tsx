import { createFileRoute } from "@tanstack/react-router";
import { AdminCreateBlogPostPage } from "./admin.blog-posts.create";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/blog-posts/$id")({
  head: () => meta("Edit Blog Post — Admin Dashboard", "Edit post content and metadata."),
  component: AdminCreateBlogPostPage,
});
