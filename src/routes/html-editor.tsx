import { createFileRoute } from "@tanstack/react-router";

import HTMLEditor from "@/components/pages/tiptap/html-editor";

export const Route = createFileRoute("/html-editor")({
  component: HTMLEditor,
});
