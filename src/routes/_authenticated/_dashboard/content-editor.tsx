import { createFileRoute } from "@tanstack/react-router";

import ContentEditor from "@/components/pages/admin/content-editor";

export const Route = createFileRoute("/_authenticated/_dashboard/content-editor")({
  component: ContentEditor,
});
