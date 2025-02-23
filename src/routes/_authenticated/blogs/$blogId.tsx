import { createFileRoute } from "@tanstack/react-router";

import { BlogDetailsPage } from "@/components/pages/blog-details";

export const Route = createFileRoute("/_authenticated/blogs/$blogId")({
  component: BlogDetailsPage,
  beforeLoad: async ({ params }) => {
    return {
      blogId: params.blogId,
    };
  },
});
