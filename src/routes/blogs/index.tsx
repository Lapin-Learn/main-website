import { createFileRoute } from "@tanstack/react-router";

import BlogsPage from "@/components/pages/blogs";

export const Route = createFileRoute("/blogs/")({
  component: BlogsPage,
});
