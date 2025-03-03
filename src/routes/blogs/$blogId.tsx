import { createFileRoute } from "@tanstack/react-router";

import { BlogDetailsPage } from "@/components/pages/blog-details";

export const Route = createFileRoute("/blogs/$blogId")({
  component: BlogDetailsPage,
});
